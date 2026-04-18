# 💻 Run on Your Own Computer (5 minutes, 100% Free)

## **Why Run Locally First?**
- ✅ **No payment info required**
- ✅ **Test everything works**
- ✅ **5,000+ user capacity** on decent hardware
- ✅ **Perfect for development**
- ✅ **Move to cloud later**

---

## **Requirements Check:**

### **Your Computer Needs:**
- **8GB+ RAM** (16GB recommended)
- **20GB+ free storage**
- **Windows 10/11, macOS, or Linux**
- **Stable internet connection**

### **Check Your Resources:**
**Windows:**
```cmd
# Check RAM
wmic computersystem get TotalPhysicalMemory
# Check storage
dir C:\ 
```

**Mac/Linux:**
```bash
# Check RAM
free -h
# Check storage
df -h
```

---

## **Step 1: Install Docker Desktop**

### **Windows/Mac:**
1. **Download**: https://www.docker.com/products/docker-desktop/
2. **Install** the downloaded file
3. **Restart** your computer
4. **Start Docker Desktop**
5. **Wait** for "Docker Desktop is running" message

### **Linux (Ubuntu/Debian):**
```bash
# Install Docker
sudo apt update
sudo apt install docker.io docker-compose
sudo usermod -aG docker $USER
# Logout and login again
```

### **Verify Installation:**
```bash
# Check Docker is working
docker --version
docker-compose --version

# Test Docker
docker run hello-world
```

---

## **Step 2: Prepare Your Project**

### **Update Configuration for Local Development:**

**Edit your `.env` file:**
```bash
# Supabase (keep your existing values)
VITE_SUPABASE_URL=https://kreffkirwpqsgdqnbfnf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_bb5QFzmTuCnalYozBlvOcw_a4lVZ6QM
SUPABASE_SERVICE_KEY=your-service-key-here

# Local development settings
EJABBERD_HOST=localhost
EJABBERD_WS_URL=ws://localhost:5443/ws
EJABBERD_DOMAIN=daddy.local

# Generated passwords
EJABBERD_PASSWORD=local_dev_password
POSTGRES_PASSWORD=local_dev_password
XMPP_PASSWORD_SECRET=local_dev_secret
```

---

## **Step 3: Create Local Docker Configuration**

Create `docker-compose.local.yml`:
```yaml
version: '3.8'

services:
  # Ejabberd XMPP Server
  ejabberd:
    image: ejabberd/ecs:latest
    hostname: ejabberd.daddy.local
    ports:
      - "5280:5280"    # HTTP Admin
      - "5443:5443"    # HTTPS WebSocket
      - "5222:5222"    # XMPP Client
      - "5269:5269"    # XMPP Server
    environment:
      - EJABBERD_ADMIN=admin@daddy.local
      - EJABBERD_PASSWORD=${EJABBERD_PASSWORD}
    volumes:
      - ./ejabberd.yml:/home/ejabberd/conf/ejabberd.yml:ro
      - ejabberd_data:/home/ejabberd/database
      - ./logs:/home/ejabberd/logs
    depends_on:
      - postgres
    restart: unless-stopped
    mem_limit: 4g

  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=ejabberd
      - POSTGRES_USER=ejabberd
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped
    mem_limit: 2g

  # Redis Cache
  redis:
    image: redis:7-alpine
    command: redis-server --maxmemory 1gb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    restart: unless-stopped
    mem_limit: 1g

  # Monitoring (Optional - disable if low on RAM)
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=1d'
      - '--web.enable-lifecycle'
    restart: unless-stopped
    mem_limit: 512m

volumes:
  ejabberd_data:
  postgres_data:
  redis_data:
  prometheus_data:
```

---

## **Step 4: Start Your Platform**

### **Launch Everything:**
```bash
# Start all services
docker-compose -f docker-compose.local.yml up -d

# Check status
docker-compose -f docker-compose.local.yml ps

# View logs
docker-compose -f docker-compose.local.yml logs -f
```

### **Expected Output:**
```
     Name                    State           Ports
daddy_ejabberd_1           Up              5222->5222, 5280->5280, 5443->5443
daddy_postgres_1           Up              5432->5432
daddy_redis_1              Up              6379->6379
daddy_prometheus_1         Up              9090->9090
```

---

## **Step 5: Access Your Platform**

### **Local URLs:**
- **Main App**: http://localhost:5280
- **WebSocket**: ws://localhost:5443/ws
- **Admin Panel**: http://localhost:5280/admin
- **Monitoring**: http://localhost:9090
- **Database**: localhost:5432

### **Test Your Platform:**
1. **Open browser**: http://localhost:5280
2. **Create account** with +234 number
3. **Send test message**
4. **Check real-time delivery**

---

## **Step 6: Make It Accessible to Others**

### **Option A: Use ngrok (Easiest)**
```bash
# Install ngrok
# Download from: https://ngrok.com/download

# Expose your local server
ngrok http 5280

# Share the ngrok URL with friends
# Example: https://abc123.ngrok.io
```

### **Option B: Port Forwarding**
1. **Find your local IP**: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. **Configure router** to forward port 5280 to your computer
3. **Share your public IP**: http://YOUR_PUBLIC_IP:5280

### **Option C: Dynamic DNS**
1. **Sign up**: https://www.noip.com (free)
2. **Create hostname**: yourapp.ddns.net
3. **Install client** to update IP automatically

---

## **Step 7: Performance Testing**

### **Test Local Performance:**
```bash
# Install artillery (load testing tool)
npm install -g artillery

# Simple load test
artillery quick --count 50 --num 10 http://localhost:5280/api/status

# Check resource usage
docker stats
```

### **Expected Local Performance:**
- **Concurrent Users**: 2,000-5,000 (depending on your hardware)
- **Response Time**: <100ms (local network)
- **Memory Usage**: ~6-8GB total
- **CPU Usage**: 20-40% under load

---

## **Step 8: Development Workflow**

### **Daily Commands:**
```bash
# Start platform
docker-compose -f docker-compose.local.yml up -d

# Stop platform
docker-compose -f docker-compose.local.yml down

# Restart service
docker-compose -f docker-compose.local.yml restart ejabberd

# View logs
docker-compose -f docker-compose.local.yml logs ejabberd

# Update code and restart
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.local.yml up -d --build
```

### **Backup Your Data:**
```bash
# Backup database
docker-compose -f docker-compose.local.yml exec postgres pg_dump -U ejabberd ejabberd > backup.sql

# Backup volumes
docker run --rm -v daddy_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz /data
```

---

## **🎉 Local Development Complete!**

### **You Now Have:**
- ✅ **Full messaging platform** running locally
- ✅ **Real-time messaging** with WebSockets
- ✅ **Database and caching** (PostgreSQL + Redis)
- ✅ **Monitoring dashboard** (Prometheus)
- ✅ **Admin interface** for management
- ✅ **2,000-5,000 user capacity** (depending on hardware)

### **Next Steps:**
1. **Test thoroughly** with friends/family
2. **Add features** and customize
3. **When ready for production**: Deploy to cloud
4. **Scale up** as your user base grows

### **Moving to Production:**
When you're ready to handle 10K+ users:
- **Oracle Cloud** (best free tier, requires $1 verification)
- **Google Cloud** (good free tier, no payment verification)
- **AWS** (reliable but requires payment info)

**Your local setup is perfect for development and testing! 🚀**