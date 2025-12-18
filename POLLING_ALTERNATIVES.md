# Polling Alternatives Evaluation - Imposter Game

## Current Implementation

**Method**: HTTP Polling (Short Polling)
```typescript
// ImposterGameRoom.tsx:121-134
useEffect(() => {
  if (!room) return;
  const interval = setInterval(() => {
    void callApi({ action: "sync", ... }, { silent: true });
  }, 3000); // Poll every 3 seconds
  return () => clearInterval(interval);
}, [callApi, room]);
```

**Current Issues**:
- ⚠️ High server load (30 requests/minute per client)
- ⚠️ Battery drain on mobile devices
- ⚠️ Wasted bandwidth (most requests return unchanged data)
- ⚠️ Up to 3-second latency for state updates
- ⚠️ Not scalable (rate limit: 30 req/min = max 10 concurrent users per IP)

---

## Alternative 1: WebSocket (Real-time Bidirectional)

### Overview
WebSocket provides full-duplex communication channels over a single TCP connection, enabling real-time updates with minimal latency.

### Architecture

```typescript
// Server: ws/imposter-rooms.ts (new file)
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const roomSubscriptions = new Map<string, Set<WebSocket>>();

wss.on('connection', (ws) => {
  let subscribedRooms = new Set<string>();

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString());

    if (message.type === 'subscribe') {
      const { roomId } = message;
      if (!roomSubscriptions.has(roomId)) {
        roomSubscriptions.set(roomId, new Set());
      }
      roomSubscriptions.get(roomId).add(ws);
      subscribedRooms.add(roomId);
    }

    if (message.type === 'update') {
      // Room state updated, broadcast to all subscribers
      broadcastToRoom(message.roomId, {
        type: 'room_update',
        room: message.room
      });
    }
  });

  ws.on('close', () => {
    subscribedRooms.forEach(roomId => {
      roomSubscriptions.get(roomId)?.delete(ws);
    });
  });
});

function broadcastToRoom(roomId: string, message: any) {
  const subscribers = roomSubscriptions.get(roomId);
  subscribers?.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
```

```typescript
// Client: hooks/useImposterWebSocket.ts (new file)
import { useEffect, useRef, useState } from 'react';

export function useImposterWebSocket(roomId: string | null) {
  const ws = useRef<WebSocket | null>(null);
  const [room, setRoom] = useState<RoomState | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket('ws://localhost:8080');
    ws.current = socket;

    socket.onopen = () => {
      setConnected(true);
      socket.send(JSON.stringify({
        type: 'subscribe',
        roomId,
      }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'room_update') {
        setRoom(message.room);
      }
    };

    socket.onclose = () => setConnected(false);

    return () => socket.close();
  }, [roomId]);

  return { room, connected };
}
```

### Pros
✅ **Real-time updates** (< 100ms latency)
✅ **Low bandwidth** (only sends data when changes occur)
✅ **Battery efficient** (no constant polling)
✅ **Highly scalable** (thousands of concurrent connections)
✅ **Bidirectional** (client and server can push data)
✅ **Mature ecosystem** (many libraries: ws, socket.io)

### Cons
❌ **Complex infrastructure** (requires separate WebSocket server or serverless WS)
❌ **Connection management** (handle reconnects, heartbeats)
❌ **Firewall issues** (some corporate firewalls block WebSocket)
❌ **State synchronization** (need to handle message ordering)
❌ **Not supported by** Vercel serverless functions (need alternative deployment)

### Implementation Complexity: **High**
- Requires WebSocket server setup
- Connection pool management
- Reconnection logic
- Message queue for reliability

### Cost Implications
- **Compute**: Persistent connections require long-running server
- **Serverless**: Requires specific providers (e.g., AWS API Gateway WebSocket, Cloudflare Durable Objects)
- **Infrastructure**: ~$10-30/month for small-scale deployment

---

## Alternative 2: Server-Sent Events (SSE) (Server-to-Client Push)

### Overview
SSE enables servers to push real-time updates to clients over HTTP, providing one-way communication from server to client.

### Architecture

```typescript
// Server: app/api/imposter/stream/route.ts (new file)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const roomId = request.nextUrl.searchParams.get('roomId');
  const playerId = request.nextUrl.searchParams.get('playerId');

  if (!roomId || !playerId) {
    return new Response('Missing parameters', { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Subscribe to room updates
      const subscription = subscribeToRoom(roomId, (room) => {
        const data = serializePlayer(room, playerId);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      });

      // Heartbeat to keep connection alive
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(':heartbeat\n\n'));
      }, 30000);

      // Cleanup on disconnect
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
        unsubscribeFromRoom(roomId, subscription);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

```typescript
// Client: hooks/useImposterSSE.ts (new file)
import { useEffect, useState } from 'react';

export function useImposterSSE(roomId: string | null, playerId: string | null) {
  const [room, setRoom] = useState<RoomState | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!roomId || !playerId) return;

    const url = `/api/imposter/stream?roomId=${roomId}&playerId=${playerId}`;
    const eventSource = new EventSource(url);

    eventSource.onopen = () => setConnected(true);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRoom(data);
    };

    eventSource.onerror = () => {
      setConnected(false);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [roomId, playerId]);

  return { room, connected };
}
```

### Pros
✅ **Simple protocol** (built on HTTP, no special infrastructure)
✅ **Native browser support** (EventSource API)
✅ **Automatic reconnection** (browser handles reconnects)
✅ **Firewall friendly** (uses standard HTTP)
✅ **Good for server-to-client** push notifications
✅ **Works with Vercel/Netlify** Edge Functions

### Cons
❌ **One-way only** (server → client, still need HTTP for client → server)
❌ **Connection limits** (browsers limit to 6 concurrent SSE per domain)
❌ **Requires long-running connection** (may timeout on some platforms)
❌ **Not all platforms support** (some serverless platforms limit connection time)
❌ **Buffering issues** (some proxies buffer responses)

### Implementation Complexity: **Medium**
- Simpler than WebSocket
- Need pub/sub system for room updates
- Automatic reconnection handled by browser

### Cost Implications
- **Compute**: Long-running connections (similar to WebSocket)
- **Serverless**: May timeout on platforms with connection time limits
- **Infrastructure**: ~$5-20/month for small-scale

---

## Alternative 3: Long Polling (Improved Polling)

### Overview
Long polling keeps the HTTP request open until new data is available or a timeout occurs, reducing unnecessary requests.

### Architecture

```typescript
// Server: app/api/imposter/long-poll/route.ts (new file)
export async function POST(request: NextRequest) {
  const { roomId, playerId, lastUpdate } = await request.json();
  const timeout = 25000; // 25 seconds
  const pollInterval = 500; // Check every 500ms
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const room = await store.getRoom(roomId);

    if (room && room.updatedAt > lastUpdate) {
      // Data changed, return immediately
      return NextResponse.json({
        room: serializePlayer(room, playerId),
        timestamp: Date.now(),
      });
    }

    // Wait before checking again
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }

  // Timeout reached, return empty response
  return NextResponse.json({ timeout: true }, { status: 304 });
}
```

```typescript
// Client: Updated callApi function
const callApi = useCallback(async (body: Record<string, unknown>) => {
  const response = await fetch("/api/imposter/long-poll", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      locale,
      lastUpdate: room?.updatedAt || 0,
      ...body
    }),
  });

  if (response.status === 304) {
    // Timeout, immediately start new request
    return callApi(body);
  }

  const data = await response.json();
  if (data.room) setRoom(data.room);
}, [locale, room]);
```

### Pros
✅ **Simple implementation** (similar to current polling)
✅ **Works everywhere** (standard HTTP)
✅ **Reduced requests** (holds connection until data changes)
✅ **No special infrastructure** (works on all platforms)
✅ **Easy to implement** (minimal code changes)

### Cons
❌ **Still uses HTTP requests** (more than WebSocket, less than short polling)
❌ **Connection overhead** (new TCP connection for each request)
❌ **Timeout limitations** (serverless functions have timeout limits)
❌ **Not truly real-time** (still has latency)
❌ **Resource intensive** (holds server resources while waiting)

### Implementation Complexity: **Low**
- Small change to current implementation
- No new infrastructure required
- Works on existing serverless setup

### Cost Implications
- **Compute**: Higher than WebSocket, lower than short polling
- **Serverless**: Works within timeout limits (30s-60s)
- **Infrastructure**: ~$0 additional (uses existing setup)

---

## Alternative 4: Hybrid: Optimized Short Polling

### Overview
Improve current polling with adaptive intervals and conditional requests.

### Architecture

```typescript
// Client: Adaptive polling interval
const POLL_INTERVALS = {
  active: 5000,      // 5s when actively playing
  idle: 15000,       // 15s when idle
  background: 30000, // 30s when tab is hidden
};

function useAdaptivePolling(room: RoomState | null) {
  const [interval, setInterval] = useState(POLL_INTERVALS.active);
  const lastActivity = useRef(Date.now());

  // Detect user activity
  useEffect(() => {
    const handleActivity = () => {
      lastActivity.current = Date.now();
      setInterval(POLL_INTERVALS.active);
    };

    window.addEventListener('focus', handleActivity);
    window.addEventListener('blur', () => setInterval(POLL_INTERVALS.background));

    return () => {
      window.removeEventListener('focus', handleActivity);
      window.removeEventListener('blur', () => setInterval(POLL_INTERVALS.background));
    };
  }, []);

  // Adaptive interval based on activity
  useEffect(() => {
    const check = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity.current;
      if (timeSinceActivity > 60000) {
        setInterval(POLL_INTERVALS.idle);
      }
    }, 10000);

    return () => clearInterval(check);
  }, []);

  return interval;
}
```

### Pros
✅ **Minimal changes** to existing code
✅ **Works on all platforms** (no infrastructure changes)
✅ **Reduced load** (smarter polling intervals)
✅ **Battery friendly** (less frequent requests)
✅ **Easy to implement** (a few hours of work)

### Cons
❌ **Still polling** (not truly real-time)
❌ **Latency** (5-30 second delay)
❌ **Not scalable** for large groups

### Implementation Complexity: **Very Low**
- Modify existing polling logic
- Add activity detection
- Adjust intervals dynamically

### Cost Implications
- **Compute**: 40-60% reduction vs current
- **Infrastructure**: $0 additional

---

## Comparison Matrix

| Feature | Current | WebSocket | SSE | Long Polling | Optimized Polling |
|---------|---------|-----------|-----|--------------|-------------------|
| **Latency** | 0-3s | <100ms | <500ms | 0.5-2s | 0-15s |
| **Server Load** | High | Very Low | Low | Medium | Medium |
| **Battery** | Poor | Excellent | Good | Good | Fair |
| **Bandwidth** | High | Very Low | Low | Medium | Medium |
| **Implementation** | ✓ | Complex | Medium | Easy | Very Easy |
| **Scalability** | Poor | Excellent | Good | Fair | Fair |
| **Vercel Support** | ✓ | ❌ | ⚠️ | ✓ | ✓ |
| **Real-time** | ❌ | ✓ | ✓ | ⚠️ | ❌ |
| **Cost** | Low | Medium | Low-Med | Low | Low |

---

## Recommendations

### Short-term (Immediate): **Optimized Polling** ✅

**Why**:
- Minimal effort (1-2 hours)
- 40-60% reduction in requests
- Works on existing infrastructure
- No deployment changes

**Implementation**:
1. Change polling interval from 3s to 5s
2. Add adaptive intervals based on activity
3. Implement exponential backoff on errors
4. Add tab visibility detection

**Files to modify**:
- `src/components/imposter/ImposterGameRoom.tsx`

---

### Medium-term (Next Sprint): **Server-Sent Events (SSE)** 🎯

**Why**:
- Balance of simplicity and performance
- Real-time updates (< 500ms)
- Works with Vercel Edge Functions
- Reasonable implementation effort (2-3 days)
- Automatic reconnection

**Implementation**:
1. Create SSE endpoint: `/api/imposter/stream`
2. Implement pub/sub system (Redis or in-memory)
3. Create `useImposterSSE` hook
4. Gradual rollout with feature flag

**Requirements**:
- Redis or similar for pub/sub (can use Vercel KV)
- Edge Function support
- Fallback to optimized polling

---

### Long-term (If Scale Requires): **WebSocket** 🚀

**Why**:
- Maximum performance
- True real-time (<100ms)
- Best for large scale (100+ concurrent games)
- Bidirectional communication

**When to implement**:
- > 50 concurrent rooms
- Need for complex real-time features
- Budget allows separate WebSocket server

**Options**:
1. **Cloudflare Durable Objects** (recommended if using Cloudflare)
2. **AWS API Gateway WebSocket** (if using AWS)
3. **Dedicated WebSocket server** (self-hosted)

---

## Migration Path

### Phase 1: Quick Win (This Week)
✅ Implement optimized polling
✅ Change interval to 5 seconds
✅ Add adaptive intervals

**Estimated effort**: 2 hours
**Expected improvement**: 40-60% reduction in requests

### Phase 2: Real-time (Next Sprint)
🎯 Implement SSE
🎯 Add pub/sub system
🎯 Gradual rollout

**Estimated effort**: 2-3 days
**Expected improvement**: Real-time updates, 90% reduction in requests

### Phase 3: Scale (When Needed)
🚀 Evaluate WebSocket
🚀 Choose platform
🚀 Full migration

**Estimated effort**: 1-2 weeks
**Expected improvement**: Maximum performance and scalability

---

## Conclusion

**Immediate Action**: Implement **Optimized Polling** (2 hours, significant improvement)

**Next Step**: Plan **SSE implementation** for real-time updates with reasonable complexity

**Future**: Consider **WebSocket** only when scale demands it (> 50 concurrent rooms)

The recommended path provides:
- ✅ Immediate 40-60% improvement (optimized polling)
- ✅ Real-time capability within next sprint (SSE)
- ✅ Clear migration path to WebSocket when needed
- ✅ Minimal infrastructure changes
- ✅ Works within existing budget
