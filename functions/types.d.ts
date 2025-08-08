// Cloudflare Workers/Pages global types
declare global {
  interface EventContext<Env = any, P extends string = any, Data = any> {
    request: Request;
    env: Env;
    params: Record<P, string>;
    data: Data;
    next: (input?: RequestInit | Request) => Promise<Response>;
    waitUntil: (promise: Promise<any>) => void;
    passThroughOnException: () => void;
  }
}

export {};