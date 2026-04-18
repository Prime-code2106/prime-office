# 🔧 Complete Configuration Explanation

This document explains every configuration file and setting in detail.

## 📋 Table of Contents

1. [Docker Compose Configuration](#docker-compose)
2. [Ejabberd Configuration](#ejabberd)
3. [HAProxy Load Balancer](#haproxy)
4. [Monitoring Setup](#monitoring)
5. [Supabase Integration](#supabase)
6. [Security Configuration](#security)

---

## 🐳 Docker Compose Configuration

### File: `docker-compose.ejabberd.yml`

This is the main orchestration file that defines all services and their relationships.

#### Service Breakdown:

### 1. HAProxy Load Balancer
```yaml
haproxy:
  image: haproxy:2.8
  ports:
    - "80:80"      # HTTP traffic
    - "443:443"    # HTTPS traffic  
    - "5222:5222"  # XMPP client connections
    - "5269:5269"  # XMPP server-to-server
    - "5443:5443"  # XMPP over WebSocket
    - "8080:8080"  # Statistics dashboard
```

**Why HAProxy?**
- **Load Distribution**: Spreads connections across 3 Ejabberd nodes
- **Health Checks**: Automatically removes failed nodes
- **SSL Termination**: Handles HTTPS encryption/decryption
- **Sticky Sessions**: WebSocket connections stay on same server
- **Statistics**: Real-time monitoring of traffic and performance

### 2. Ejabberd Cluster (3 Nodes)
```yaml
ejabberd1:  # Primary node
  hostname: ejabberd1.daddy.local
  environment:
    - EJABBERD_NODE=ejabberd@ejabberd1.daddy.local
    - ERLANG_COOKIE=shared_cluster_secret
```

**Clustering Explained:**
- **Node 1**: Primary node, handles admin operations
- **Node 2 & 3**: Replicas, join the cluster automatically
- **Erlang Cookie**: Shared secret for secure cluster communication
- **Hostname**: Must be resolvable within Docker network

**Why 3 Nodes?**
- **High Availability**: If 1 node fails, 2 remain active
- **Load Distribution**: 10K users = ~3,333 per node
- **Fault Tolerance**: Can lose 1 node without service interruption

### 3. PostgreSQL Database
```yaml
postgres:
  environment:
    - POSTGRES_DB=ejabberd
    - POSTGRES_USER=ejabberd
    - POSTGRES_PASSWORD=secure_password
```

**Database Purpose:**
- **User Accounts**: Store XMPP user credentials
- **Rosters**: Contact lists and subscriptions
- **Message Archive**: Message history (MAM)
- **MUC Rooms**: Group chat configurations
- **Offline Messages**: Messages for offline users

**Why PostgreSQL over MySQL?**
- **Better Performance**: Handles concurrent connections better
- **JSON Support**: Native JSON for message metadata
- **Reliability**: ACID compliance for message integrity
- **Scalability**: Better partitioning and replication

### 4. Redis Cache
```yaml
redis:
  command: redis-server --maxmemory 2gb --maxmemory-policy allkeys-lru
```

**Redis Purpose:**
- **Session Storage**: Active user sessions
- **Presence Cache**: Online/offline status
- **Rate Limiting**: Connection throttling
- **Temporary Data**: Short-lived cache data

**Memory Policy:**
- **allkeys-lru**: Removes least recently used keys when memory full
- **2GB Limit**: Prevents Redis from consuming all server memory

---

## 🔧 Ejabberd Configuration

### File: `ejabberd.yml`

This is the heart of the messaging system configuration.

#### Core Settings:

### 1. Hosts and Domains
```yaml
hosts:
  - "daddy.local"      # Internal cluster communication
  - "chat.daddy.com"   # Public domain for clients
```

**Explanation:**
- **daddy.local**: Used for internal cluster communication
- **chat.daddy.com**: Your public domain that clients connect to
- Multiple hosts allow serving different domains from same cluster

### 2. Database Configuration
```yaml
sql_type: pgsql
sql_server: "postgres"
sql_database: "ejabberd"
sql_pool_size: 50
sql_keepalive_interval: 60
```

**Pool Size Calculation:**
- **50 connections**: Handles ~10K concurrent users
- **Formula**: (Concurrent Users / 200) = Pool Size
- **Keepalive**: Prevents connection timeouts

### 3. Clustering Setup
```yaml
cluster_nodes:
  - "ejabberd@ejabberd1.daddy.local"
  - "ejabberd@ejabberd2.daddy.local"  
  - "ejabberd@ejabberd3.daddy.local"
```

**Node Communication:**
- **Erlang Distribution**: Nodes communicate via Erlang protocols
- **Automatic Failover**: If primary fails, secondary takes over
- **Data Replication**: User sessions replicated across nodes

### 4. Performance Tuning
```yaml
max_fsm_queue: 10000
shaper_rules:
  max_user_sessions: 10
  max_user_offline_messages: 5000
```

**Shaper Rules Explained:**
- **max_fsm_queue**: Maximum queued operations per process
- **max_user_sessions**: Prevents single user from opening too many connections
- **max_user_offline_messages**: Limits offline message storage per user

### 5. Connection Listeners
```yaml
listen:
  - port: 5222        # XMPP client connections
    module: ejabberd_c2s
    max_stanza_size: 262144
    shaper: c2s_shaper
    
  - port: 5443        # WebSocket for web clients
    module: ejabberd_http
    request_handlers:
      "/ws": ejabberd_http_ws
```

**Port Purposes:**
- **5222**: Traditional XMPP clients (mobile apps)
- **5443**: WebSocket for web browsers (your React app)
- **5269**: Server-to-server communication
- **5280**: HTTP admin interface

### 6. Modules Configuration

#### Message Archive Management (MAM)
```yaml
mod_mam:
  db_type: sql
  default: always
  compress_xml: true
```

**Purpose**: Stores message history for:
- **Multi-device sync**: Messages appear on all devices
- **Offline delivery**: Messages delivered when user comes online
- **Search functionality**: Find old messages

#### Multi-User Chat (MUC)
```yaml
mod_muc:
  db_type: sql
  access_create: muc_create
  default_room_options:
    persistent: true
```

**Purpose**: Group chat functionality:
- **Persistent rooms**: Group chats survive server restarts
- **Access control**: Who can create groups
- **Room configuration**: Default settings for new groups

#### Push Notifications
```yaml
mod_push:
  db_type: sql
  include_sender: true
  include_body: "Hello from Daddy!"
```

**Purpose**: Mobile push notifications:
- **include_sender**: Show who sent the message
- **include_body**: Show message preview (privacy consideration)

---

## ⚖️ HAProxy Load Balancer

### File: `haproxy.cfg`

HAProxy distributes traffic across Ejabberd nodes and provides high availability.

#### Global Configuration:
```
global
  maxconn 50000           # Maximum concurrent connections
  tune.bufsize 32768      # Buffer size for high throughput
  tune.ssl.default-dh-param 2048  # SSL security
```

**Performance Tuning:**
- **maxconn**: Total connections across all services
- **bufsize**: Larger buffers = better performance for large messages
- **SSL params**: Security vs performance balance

#### Frontend Configuration:
```
frontend web_frontend
  bind *:80
  bind *:443 ssl crt /etc/ssl/certs/daddy.pem
  redirect scheme https if !{ ssl_fc }
```

**SSL Handling:**
- **Port 80**: Redirects to HTTPS
- **Port 443**: Terminates SSL, forwards plain HTTP to backends
- **Certificate**: Your Let's Encrypt certificate

#### Backend Configuration:
```
backend ejabberd_websocket
  balance source          # Sticky sessions for WebSocket
  timeout tunnel 3600s    # Long timeout for persistent connections
```

**Load Balancing Methods:**
- **roundrobin**: Distributes evenly (default)
- **leastconn**: Sends to server with fewest connections (best for XMPP)
- **source**: Sticky sessions (required for WebSocket)

#### Health Checks:
```
server ejabberd1 ejabberd1:5280 check inter 2000ms rise 2 fall 3
```

**Health Check Parameters:**
- **check**: Enable health monitoring
- **inter 2000ms**: Check every 2 seconds
- **rise 2**: 2 successful checks = server is up
- **fall 3**: 3 failed checks = server is down

---

## 📊 Monitoring Configuration

### Prometheus (`monitoring/prometheus.yml`)

Prometheus collects metrics from all services for monitoring and alerting.

#### Scrape Configurations:
```yaml
scrape_configs:
  - job_name: 'ejabberd'
    static_configs:
      - targets: 
        - 'ejabberd1:5280'
        - 'ejabberd2:5280'
        - 'ejabberd3:5280'
    metrics_path: /api/prometheus
```

**Metrics Collected:**
- **Connection counts**: Active XMPP connections
- **Message throughput**: Messages per second
- **Memory usage**: Erlang VM memory consumption
- **Database performance**: Query times and connection pool usage

### Alert Rules (`monitoring/ejabberd_rules.yml`)

Automated alerts for system issues:

```yaml
- alert: EjabberdHighConnections
  expr: ejabberd_c2s_connections > 8000
  for: 5m
  annotations:
    summary: "High number of XMPP connections"
```

**Alert Thresholds:**
- **8000 connections**: 80% of 10K capacity
- **5 minutes**: Prevents false alarms
- **Severity levels**: warning, critical

---

## 🔗 Supabase Integration

### File: `services/ejabberdSupabaseSync.ts`

This service bridges Ejabberd (XMPP) with Supabase (user management).

#### Architecture Flow:
```
User Login → Supabase Auth → Generate XMPP Password → Connect to Ejabberd
Message Sent → Ejabberd → Sync to Supabase → Update UI
```

#### Key Functions:

### 1. User Authentication
```typescript
async initializeXMPPConnection(userId: string, accessToken: string) {
  // 1. Verify user with Supabase
  const { data: user } = await this.supabase.auth.getUser(accessToken);
  
  // 2. Generate XMPP password
  const xmppPassword = await this.generateXMPPPassword(userId);
  
  // 3. Connect to Ejabberd
  const client = new Client({
    jid: `${userId}@${this.config.ejabberd.domain}`,
    password: xmppPassword,
    transport: 'websocket'
  });
}
```

**Why This Approach?**
- **Single Sign-On**: Users authenticate once with Supabase
- **Secure**: XMPP passwords generated from Supabase user ID
- **Consistent**: Same user identity across web app and XMPP

### 2. Message Synchronization
```typescript
async syncMessageToSupabase(message) {
  // 1. Find or create chat in Supabase
  const chatId = await this.findOrCreateChat(senderId, recipientId);
  
  // 2. Insert message into Supabase
  await this.supabase.from('messages').insert({
    chat_id: chatId,
    sender_id: senderId,
    content: message.content,
    status: 'delivered'
  });
}
```

**Data Flow:**
- **XMPP Message**: Real-time delivery via Ejabberd
- **Supabase Storage**: Persistent storage for web app
- **Status Updates**: Delivery confirmations

### 3. Connection Pool Management
```typescript
class EjabberdConnectionPool {
  private connections: Map<string, EjabberdSupabaseService> = new Map();
  private maxConnections: number = 1000;
}
```

**Why Connection Pooling?**
- **Memory Efficiency**: Reuse connections instead of creating new ones
- **Performance**: Faster message delivery
- **Resource Management**: Prevents memory leaks

---

## 🔒 Security Configuration

### SSL/TLS Setup

#### Certificate Generation:
```bash
certbot certonly --standalone -d chat.daddy.com
```

**Certificate Types:**
- **Let's Encrypt**: Free, auto-renewable
- **Wildcard**: Covers *.daddy.com (requires DNS validation)
- **EV Certificate**: Extended validation (for enterprise)

#### Certificate Formats:
```bash
# Ejabberd format (separate files)
daddy.pem  # Certificate chain
daddy.key  # Private key

# HAProxy format (combined)
daddy-haproxy.pem  # Certificate + private key
```

### Firewall Configuration:
```bash
# Essential ports only
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (redirects to HTTPS)
ufw allow 443/tcp   # HTTPS
ufw allow 5222/tcp  # XMPP client
ufw allow 5443/tcp  # XMPP WebSocket
```

**Security Principles:**
- **Minimal Attack Surface**: Only open required ports
- **Fail2ban**: Automatic IP blocking for brute force attempts
- **Regular Updates**: Automated security patches

### Authentication Security:
```yaml
# Ejabberd auth configuration
auth_method:
  - sql          # Local database
  - http         # Supabase integration

auth_opts:
  http:
    host: "your-supabase-project.supabase.co"
    path_prefix: "/auth/v1/"
```

**Multi-layer Authentication:**
1. **Supabase**: Primary authentication with JWT
2. **XMPP**: Generated password based on Supabase user ID
3. **Rate Limiting**: Prevents brute force attacks

---

## 🎯 Performance Optimizations

### System Level:
```bash
# Network optimizations
net.core.somaxconn = 65536
net.ipv4.tcp_max_syn_backlog = 8192
net.ipv4.tcp_tw_reuse = 1
```

### Erlang VM:
```
# VM arguments for high performance
+P 2097152     # Max processes (2M)
+Q 1048576     # Max ports (1M)  
+A 128         # Async threads
+K true        # Kernel polling
```

### Database:
```sql
-- PostgreSQL optimizations
ALTER SYSTEM SET max_connections = 500;
ALTER SYSTEM SET shared_buffers = '2GB';
ALTER SYSTEM SET effective_cache_size = '6GB';
```

**Performance Targets:**
- **10K concurrent users**: 3,333 per Ejabberd node
- **50K messages/second**: Across entire cluster
- **<50ms response time**: Average message delivery
- **99.9% uptime**: With proper monitoring and failover

---

## 🚀 Scaling Strategies

### Horizontal Scaling (Add Nodes):
```bash
# Add 4th node
docker-compose up -d --scale ejabberd=4
```

### Vertical Scaling (Upgrade Hardware):
| Users | Nodes | CPU/Node | RAM/Node | Total Cost |
|-------|-------|----------|----------|------------|
| 10K   | 3     | 4 cores  | 16GB     | $240/mo    |
| 25K   | 3     | 8 cores  | 32GB     | $480/mo    |
| 50K   | 5     | 8 cores  | 32GB     | $800/mo    |
| 100K  | 8     | 16 cores | 64GB     | $1,600/mo  |

### Database Scaling:
- **Read Replicas**: For message history queries
- **Partitioning**: Split large tables by date/user
- **Connection Pooling**: PgBouncer for connection management

This configuration provides a solid foundation for a WhatsApp-level messaging platform that can scale to millions of users while maintaining high performance and reliability.