/**
 * Basic tests for imposter game security improvements
 * Run with: npm test (or your test runner)
 */

import { describe, it, expect, beforeEach } from "@jest/globals";
import { RateLimiter } from "../rateLimit";

describe("RateLimiter", () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter({
      maxRequests: 5,
      windowMs: 1000, // 1 second for testing
    });
  });

  it("should allow requests within limit", () => {
    const result1 = rateLimiter.check("client1");
    expect(result1.success).toBe(true);
    expect(result1.remaining).toBe(4);

    const result2 = rateLimiter.check("client1");
    expect(result2.success).toBe(true);
    expect(result2.remaining).toBe(3);
  });

  it("should block requests exceeding limit", () => {
    // Use up all requests
    for (let i = 0; i < 5; i++) {
      rateLimiter.check("client1");
    }

    // Next request should be blocked
    const result = rateLimiter.check("client1");
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("should handle multiple clients independently", () => {
    // Client 1 uses up their limit
    for (let i = 0; i < 5; i++) {
      rateLimiter.check("client1");
    }

    // Client 2 should still be able to make requests
    const result = rateLimiter.check("client2");
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("should reset after window expires", async () => {
    // Use up all requests
    for (let i = 0; i < 5; i++) {
      rateLimiter.check("client1");
    }

    // Should be blocked
    const blockedResult = rateLimiter.check("client1");
    expect(blockedResult.success).toBe(false);

    // Wait for window to expire (1 second + buffer)
    await new Promise(resolve => setTimeout(resolve, 1100));

    // Should be allowed again
    const allowedResult = rateLimiter.check("client1");
    expect(allowedResult.success).toBe(true);
  });
});

describe("Security Improvements", () => {
  it("should generate cryptographically secure UUIDs", () => {
    // Test that crypto.randomUUID() is available
    expect(typeof crypto.randomUUID).toBe("function");

    // Generate multiple UUIDs and ensure they're unique
    const uuids = new Set();
    for (let i = 0; i < 100; i++) {
      const uuid = crypto.randomUUID();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      uuids.add(uuid);
    }

    // All UUIDs should be unique
    expect(uuids.size).toBe(100);
  });
});
