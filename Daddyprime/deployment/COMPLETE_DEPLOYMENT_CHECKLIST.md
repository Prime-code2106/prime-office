# ✅ Complete Deployment Checklist

## 🎯 Overview
This checklist ensures a successful deployment of your Ejabberd + Supabase messaging platform for 10K+ concurrent users.

---

## 📋 Pre-Deployment Requirements

### ☐ Server Requirements
- [ ] **3 servers minimum** (for high availability)
- [ ] **4 CPU cores** per server (8 cores recommended)
- [ ] **16GB RAM** per server (32GB recommended)
- [ ] **100GB SSD** per server (200GB recommended)
- [ ] **1Gbps network** connection
- [ ] **Ubuntu 20.04 LTS** or newer

### ☐ Domain & DNS Setup
- [ ] **Domain registered** (e.g., daddy.com)
- [ ] **Subdomain configured** (e.g., chat.daddy.com)
- [ ] **DNS A record** pointing to your primary server
- [ ] **DNS propagation verified** (use dig or nslookup)

### ☐ Supabase Configuration
- [ ] **Supabase project created**
- [ ] **Database schema deployed** (run supabase-schema.sql)
- [ ] **API keys obtained** (anon key and service key)
- [ ] **Authentication configured** (email/password enabled)
- [ ] **RLS policies set up** (for security)

---

## 🚀 Deployment Steps

### Step 1: Server Preparation
```bash
# Run on each server
chmod +x deployment/01-server-setup.sh
sudo ./deployment/01-server-setup.sh

# Reboot each server
sudo reboot
```

**Verification:**
- [ ] Docker installed and running
- [ ] Docker Compose available
- [ ] Firewall configured
- [ ] System optimizations applied
- [ ] Node Exporter running on port 9100

### Step 2: SSL Certificate Setup
```bash
# Run on primary server only
chmod +x deployment/02-ssl-setup.sh
sudo ./deployment/02-ssl-setup.sh
```

**Verification:**
- [ ] SSL certificate generated
- [ ] Certificate files in /opt/daddy-messaging/certs/
- [ ] Auto-renewal configured
- [ ] HTTPS test: `curl -I https://chat.daddy.com`

### Step 3: Application Deployment
```bash
# Run on primary server
chmod +x deployment/03-deploy-application.sh
sudo ./deployment/03-deploy-application.sh

# Edit configuration
cd /opt/daddy-messaging
nano .env  # Update Supabase credentials

# Deploy
./deploy.sh
```

**Verification:**
- [ ] All containers running: `docker-compose ps`
- [ ] Ejabberd cluster formed: `./manage.sh status`
- [ ] HAProxy stats accessible: http://server-ip:8080/haproxy-stats
- [ ] Grafana accessible: http://server-ip:3001

### Step 4: Load Testing
```bash
# Run load tests
chmod +x deployment/04-load-testing.sh
./deployment/04-load-testing.sh

# Execute comprehensive test
./run-full-test.sh
```

**Verification:**
- [ ] WebSocket connections successful
- [ ] Response times < 100ms
- [ ] Error rate < 1%
- [ ] 1000+ concurrent connections handled

---

## 🔧 Configuration Verification

### ☐ Ejabberd Cluster
```bash
# Check cluster status
docker-compose exec ejabberd1 ejabberdctl cluster_info

# Expected output: 3 nodes running
```

### ☐ Database Connection
```bash
# Test PostgreSQL
docker-compose exec postgres psql -U ejabberd -d ejabberd -c "SELECT version();"

# Test Redis
docker-compose exec redis redis-cli ping
```

### ☐ Load Balancer
```bash
# Test HAProxy
curl -I http://localhost:8080/haproxy-stats

# Check backend status (all should be UP)
```

### ☐ SSL/TLS
```bash
# Test SSL certificate
openssl s_client -connect chat.daddy.com:443 -servername chat.daddy.com

# Verify certificate chain
curl -I https://chat.daddy.com
```

---

## 📊 Monitoring Setup

### ☐ Grafana Dashboard
1. **Access**: http://your-server:3001
2. **Login**: admin / (password from .env)
3. **Import dashboards**:
   - Ejabberd metrics
   - HAProxy metrics
   - System metrics

### ☐ Prometheus Targets
1. **Access**: http://your-server:9090
2. **Verify targets**:
   - [ ] ejabberd1:5280 (UP)
   - [ ] ejabberd2:5280 (UP)
   - [ ] ejabberd3:5280 (UP)
   - [ ] haproxy:8404 (UP)
   - [ ] postgres:9187 (UP)
   - [ ] redis:9121 (UP)

### ☐ Alert Configuration
- [ ] **Email notifications** configured
- [ ] **Slack integration** (optional)
- [ ] **Alert thresholds** set:
  - High connection count (>8000)
  - High memory usage (>85%)
  - Node down alerts
  - High response time (>1s)

---

## 🔒 Security Checklist

### ☐ Firewall Configuration
```bash
# Verify firewall rules
sudo ufw status

# Expected open ports:
# 22/tcp (SSH)
# 80/tcp (HTTP)
# 443/tcp (HTTPS)
# 5222/tcp (XMPP)
# 5443/tcp (WebSocket)
```

### ☐ SSL Security
- [ ] **Strong cipher suites** configured
- [ ] **TLS 1.2+ only** (no older versions)
- [ ] **HSTS headers** enabled
- [ ] **Certificate auto-renewal** working

### ☐ Access Control
- [ ] **SSH key authentication** (disable password auth)
- [ ] **Fail2ban** configured and running
- [ ] **Admin interfaces** restricted by IP
- [ ] **Database access** limited to application

### ☐ Secrets Management
- [ ] **Strong passwords** generated (32+ characters)
- [ ] **Erlang cookie** unique and secure
- [ ] **JWT secrets** properly configured
- [ ] **Environment variables** not exposed

---

## 🧪 Performance Testing

### ☐ Load Test Results
Target metrics for 10K concurrent users:

| Metric | Target | Achieved | Status |
|--------|--------|----------|--------|
| **Concurrent Users** | 10,000 | _____ | ☐ |
| **Response Time (P95)** | <100ms | _____ | ☐ |
| **Messages/Second** | 10,000+ | _____ | ☐ |
| **Error Rate** | <1% | _____ | ☐ |
| **Memory Usage** | <80% | _____ | ☐ |
| **CPU Usage** | <70% | _____ | ☐ |

### ☐ Stress Testing
- [ ] **Connection limits** tested
- [ ] **Message throughput** verified
- [ ] **Failover scenarios** tested
- [ ] **Recovery procedures** validated

---

## 🔄 Backup & Recovery

### ☐ Backup Configuration
```bash
# Test backup script
./manage.sh backup

# Verify backup files created
ls -la backup/$(date +%Y%m%d)/
```

### ☐ Recovery Testing
- [ ] **Database restore** tested
- [ ] **Configuration restore** tested
- [ ] **Certificate restore** tested
- [ ] **Full system recovery** documented

---

## 📱 Client Integration

### ☐ React App Configuration
Update your React app to use Ejabberd:

```typescript
// services/messagingConfig.ts
export const messagingConfig = {
  ejabberd: {
    domain: 'chat.daddy.com',
    websocketUrl: 'wss://chat.daddy.com:5443/ws',
    httpApi: 'https://chat.daddy.com/api'
  },
  supabase: {
    url: process.env.VITE_SUPABASE_URL,
    anonKey: process.env.VITE_SUPABASE_ANON_KEY
  }
};
```

### ☐ Integration Testing
- [ ] **User authentication** working
- [ ] **Message sending** functional
- [ ] **Real-time delivery** confirmed
- [ ] **Offline sync** working
- [ ] **Group chats** operational

---

## 🚀 Go-Live Checklist

### ☐ Pre-Launch (24 hours before)
- [ ] **Final load test** completed
- [ ] **Monitoring alerts** configured
- [ ] **Backup systems** verified
- [ ] **DNS TTL** reduced (for quick changes)
- [ ] **Support team** briefed

### ☐ Launch Day
- [ ] **Traffic monitoring** active
- [ ] **Error rates** < 1%
- [ ] **Response times** < 100ms
- [ ] **All services** healthy
- [ ] **Support channels** ready

### ☐ Post-Launch (First 48 hours)
- [ ] **User feedback** collected
- [ ] **Performance metrics** reviewed
- [ ] **Error logs** analyzed
- [ ] **Capacity planning** updated

---

## 📈 Scaling Preparation

### ☐ Horizontal Scaling Plan
When you reach 80% capacity:

1. **Add Ejabberd nodes**:
   ```bash
   docker-compose up -d --scale ejabberd=5
   ```

2. **Update HAProxy** configuration
3. **Add database replicas** if needed
4. **Monitor performance** impact

### ☐ Vertical Scaling Plan
Upgrade server specifications:

| Current Load | Recommended Specs |
|--------------|-------------------|
| 10K users | 4 CPU, 16GB RAM |
| 25K users | 8 CPU, 32GB RAM |
| 50K users | 16 CPU, 64GB RAM |

---

## 🎯 Success Criteria

### ☐ Technical Metrics
- [ ] **99.9% uptime** achieved
- [ ] **<50ms average** response time
- [ ] **10K+ concurrent** users supported
- [ ] **Zero data loss** incidents
- [ ] **<1% error rate** maintained

### ☐ Business Metrics
- [ ] **User satisfaction** >90%
- [ ] **Message delivery** 99.9%
- [ ] **Support tickets** <1% of users
- [ ] **Cost efficiency** <$30 per 1K users/month

---

## 🆘 Troubleshooting Guide

### Common Issues:

#### High Memory Usage
```bash
# Check Erlang processes
docker exec ejabberd1 ejabberdctl debug

# Solution: Reduce max_fsm_queue in ejabberd.yml
```

#### Connection Timeouts
```bash
# Check HAProxy logs
docker logs haproxy

# Solution: Increase timeout values
```

#### Database Issues
```bash
# Check connections
docker exec postgres psql -U ejabberd -c "SELECT * FROM pg_stat_activity;"

# Solution: Increase connection pool
```

#### SSL Certificate Problems
```bash
# Check certificate validity
openssl x509 -in /opt/daddy-messaging/certs/daddy.pem -text -noout

# Solution: Renew certificate
sudo /usr/local/bin/renew-daddy-certs.sh
```

---

## 📞 Support Contacts

### Emergency Contacts
- **System Administrator**: _______________
- **Database Administrator**: _______________
- **Network Administrator**: _______________

### Vendor Support
- **Hosting Provider**: _______________
- **Domain Registrar**: _______________
- **SSL Certificate**: Let's Encrypt (free)

---

## ✅ Final Sign-off

### Deployment Team
- [ ] **System Administrator** - Signed: _______ Date: _______
- [ ] **Application Developer** - Signed: _______ Date: _______
- [ ] **Security Officer** - Signed: _______ Date: _______
- [ ] **Project Manager** - Signed: _______ Date: _______

### Go-Live Approval
- [ ] **Technical Director** - Signed: _______ Date: _______
- [ ] **Business Owner** - Signed: _______ Date: _______

---

**🎉 Congratulations! Your WhatsApp-level messaging platform is now live and ready to serve 10K+ concurrent users!**

**📊 Expected Performance:**
- **30,000 total users** (across 3-node cluster)
- **50,000+ messages/second** throughput
- **<50ms response time** average
- **$260/month** operational cost
- **99.9% uptime** with monitoring

Your platform can now compete with major messaging apps! 🚀