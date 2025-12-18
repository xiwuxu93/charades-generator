/**
 * Simple in-memory rate limiter using sliding window algorithm
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export class RateLimiter {
  private requests = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(private config: RateLimitConfig) {
    this.startCleanup();
  }

  private startCleanup() {
    if (this.cleanupInterval) return;

    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const expired: string[] = [];

      for (const [key, entry] of this.requests.entries()) {
        if (now >= entry.resetAt) {
          expired.push(key);
        }
      }

      expired.forEach(key => this.requests.delete(key));

      if (expired.length > 0) {
        console.log(`[RateLimiter] Cleaned up ${expired.length} expired entries`);
      }
    }, 5 * 60 * 1000);

    // Ensure cleanup doesn't prevent process exit
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry || now >= entry.resetAt) {
      // Create new window
      const resetAt = now + this.config.windowMs;
      this.requests.set(identifier, { count: 1, resetAt });

      return {
        success: true,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests - 1,
        reset: resetAt,
      };
    }

    // Check if limit exceeded
    if (entry.count >= this.config.maxRequests) {
      return {
        success: false,
        limit: this.config.maxRequests,
        remaining: 0,
        reset: entry.resetAt,
      };
    }

    // Increment count
    entry.count++;
    this.requests.set(identifier, entry);

    return {
      success: true,
      limit: this.config.maxRequests,
      remaining: this.config.maxRequests - entry.count,
      reset: entry.resetAt,
    };
  }
}

/**
 * Get client identifier from request headers
 * Uses multiple fallbacks for different deployment environments
 */
export function getClientIdentifier(headers: Headers): string {
  // Try various header combinations
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback to a generic identifier (not ideal but prevents abuse)
  return "unknown";
}
