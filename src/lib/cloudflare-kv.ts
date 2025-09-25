// Cloudflare KV REST API client for Vercel deployment

interface CloudflareKVConfig {
  accountId: string;
  namespaceId: string;
  apiToken: string;
}

class CloudflareKV {
  private config: CloudflareKVConfig;
  private baseUrl: string;

  constructor(config: CloudflareKVConfig) {
    this.config = config;
    this.baseUrl = `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/storage/kv/namespaces/${config.namespaceId}`;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Cloudflare KV API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get(key: string): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseUrl}/values/${encodeURIComponent(key)}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        },
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to get key ${key}: ${response.status}`);
      }

      return response.text();
    } catch (error) {
      console.error('Error getting from KV:', error);
      return null;
    }
  }

  async put(key: string, value: string, metadata?: object): Promise<void> {
    try {
      const body = new FormData();
      body.append('value', value);
      if (metadata) {
        body.append('metadata', JSON.stringify(metadata));
      }

      const response = await fetch(`${this.baseUrl}/values/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`Failed to put key ${key}: ${response.status}`);
      }
    } catch (error) {
      console.error('Error putting to KV:', error);
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/values/${encodeURIComponent(key)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete key ${key}: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting from KV:', error);
      throw error;
    }
  }

  async list(prefix?: string, limit: number = 1000): Promise<{keys: {name: string, metadata?: object}[]}> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
      });

      if (prefix) {
        params.append('prefix', prefix);
      }

      const response = await this.request(`/keys?${params}`);
      return response.result;
    } catch (error) {
      console.error('Error listing KV keys:', error);
      return {keys: []};
    }
  }
}

// Initialize KV client
export const kv = new CloudflareKV({
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
  namespaceId: process.env.CLOUDFLARE_KV_NAMESPACE_ID!,
  apiToken: process.env.CLOUDFLARE_API_TOKEN!,
});

export default kv;