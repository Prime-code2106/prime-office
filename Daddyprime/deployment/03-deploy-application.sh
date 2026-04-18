#!/bin/bash
# Step 3: Deploy Ejabberd + Supabase Application
# Run this on the primary server after SSL setup

set -e

echo "🚀 Deploying Daddy Messaging Application..."

# Configuration
APP_DIR="/opt/daddy-messaging"
DOMAIN="chat.daddy.com"  # Change this to your domain

cd "$APP_DIR"

# Create environment file
echo "📝 Creating environment configuration..."
tee .env << EOF
# Ejabberd Configuration
EJABBERD_DOMAIN=$DOMAIN
EJABBERD_ADMIN=admin@$DOMAIN
EJABBERD_PASSWORD=$(openssl rand -base64 32)
ERLANG_COOKIE=$(openssl rand -base64 32)

# Database Configuration
POSTGRES_DB=ejabberd
POSTGRES_USER=ejabberd
POSTGRES_PASSWORD=$(openssl rand -base64 32)

# Redis Configuration
REDIS_PASSWORD=$(openssl rand -base64 32)

# Supabase Configuration (UPDATE THESE WITH YOUR VALUES)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Monitoring Configuration
GRAFANA_ADMIN_PASSWORD=$(openssl rand -base64 16)

# Security
JWT_SECRET=$(openssl rand -base64 64)
XMPP_PASSWORD_SECRET=$(openssl rand -base64 32)

# Network Configuration
CLUSTER_NETWORK=10.0.0.0/8
EOF

echo "🔐 Generated secure passwords and secrets"
echo "⚠️  IMPORTANT: Update Supabase credentials in .env file!"

# Copy configuration files
echo "📋 Copying configuration files..."

# Docker Compose
cp docker-compose.ejabberd.yml docker-compose.yml

# Ejabberd configuration
mkdir -p config
cp ejabberd.yml config/

# HAProxy configuration
cp haproxy.cfg config/

# Update ejabberd.yml with domain
sed -i "s/daddy.local/$DOMAIN/g" config/ejabberd.yml
sed -i "s/chat.daddy.com/$DOMAIN/g" config/ejabberd.yml

# Update haproxy.cfg with certificate path
sed -i "s|/etc/ssl/certs/daddy.pem|/usr/local/etc/haproxy/certs/daddy-haproxy.pem|g" config/haproxy.cfg

# Create monitoring configuration
mkdir -p monitoring
cp monitoring/prometheus.yml monitoring/
cp monitoring/ejabberd_rules.yml monitoring/

# Create init SQL for PostgreSQL
tee config/init.sql << 'EOF'
-- PostgreSQL initialization for Ejabberd
-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for better performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS i_rosteru_jid ON rosterusers USING btree (jid);
CREATE INDEX CONCURRENTLY IF NOT EXISTS i_rosteru_username ON rosterusers USING btree (username);
CREATE INDEX CONCURRENTLY IF NOT EXISTS i_sr_user_jid ON sr_user USING btree (jid);
CREATE INDEX CONCURRENTLY IF NOT EXISTS i_last_username ON last USING btree (username);
CREATE INDEX CONCURRENTLY IF NOT EXISTS i_archive_username_timestamp ON archive USING btree (username, timestamp);
CREATE INDEX CONCURRENTLY IF NOT EXISTS i_archive_timestamp ON archive USING btree (timestamp);
CREATE INDEX CONCURRENTLY IF NOT EXISTS i_muc_room_host_name ON muc_room USING btree (host, name);

-- Optimize for high load
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET max_connections = 500;
ALTER SYSTEM SET shared_buffers = '2GB';
ALTER SYSTEM SET effective_cache_size = '6GB';
ALTER SYSTEM SET maintenance_work_mem = '512MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '64MB';
ALTER SYSTEM SET default_statistics_target = 100;
ALTER SYSTEM SET random_page_cost = 1.1;
ALTER SYSTEM SET effective_io_concurrency = 200;
EOF

# Update Docker Compose with environment variables
tee docker-compose.yml << 'EOF'
version: '3.8'

services:
  # Load Balancer (HAProxy)
  haproxy:
    image: haproxy:2.8
    ports:
      - "80:80"
      - "443:443"
      - "5222:5222"
      - "5269:5269"
      - "5443:5443"
      - "8080:8080"  # Stats
    volumes:
      - ./config/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro
      - ./certs:/usr/local/etc/haproxy/certs:ro
      - ./logs:/var/log/haproxy
    depends_on:
      - ejabberd1
      - ejabberd2
      - ejabberd3
    networks:
      - ejabberd_network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Ejabberd Node 1 (Primary)
  ejabberd1:
    image: ejabberd/ecs:latest
    hostname: ejabberd1.${EJABBERD_DOMAIN}
    environment:
      - EJABBERD_ADMIN=${EJABBERD_ADMIN}
      - EJABBERD_PASSWORD=${EJABBERD_PASSWORD}
      - ERLANG_COOKIE=${ERLANG_COOKIE}
      - EJABBERD_NODE=ejabberd@ejabberd1.${EJABBERD_DOMAIN}
    volumes:
      - ./config/ejabberd.yml:/home/ejabberd/conf/ejabberd.yml:ro
      - ./certs:/home/ejabberd/conf/certs:ro
      - ejabberd1_data:/home/ejabberd/database
      - ./logs:/home/ejabberd/logs
    networks:
      - ejabberd_network
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "ejabberdctl", "status"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Ejabberd Node 2 (Replica)
  ejabberd2:
    image: ejabberd/ecs:latest
    hostname: ejabberd2.${EJABBERD_DOMAIN}
    environment:
      - EJABBERD_ADMIN=${EJABBERD_ADMIN}
      - EJABBERD_PASSWORD=${EJABBERD_PASSWORD}
      - ERLANG_COOKIE=${ERLANG_COOKIE}
      - EJABBERD_NODE=ejabberd@ejabberd2.${EJABBERD_DOMAIN}
      - EJABBERD_JOIN_CLUSTER=ejabberd@ejabberd1.${EJABBERD_DOMAIN}
    volumes:
      - ./config/ejabberd.yml:/home/ejabberd/conf/ejabberd.yml:ro
      - ./certs:/home/ejabberd/conf/certs:ro
      - ejabberd2_data:/home/ejabberd/database
      - ./logs:/home/ejabberd/logs
    networks:
      - ejabberd_network
    depends_on:
      - ejabberd1
      - postgres
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "ejabberdctl", "status"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Ejabberd Node 3 (Replica)
  ejabberd3:
    image: ejabberd/ecs:latest
    hostname: ejabberd3.${EJABBERD_DOMAIN}
    environment:
      - EJABBERD_ADMIN=${EJABBERD_ADMIN}
      - EJABBERD_PASSWORD=${EJABBERD_PASSWORD}
      - ERLANG_COOKIE=${ERLANG_COOKIE}
      - EJABBERD_NODE=ejabberd@ejabberd3.${EJABBERD_DOMAIN}
      - EJABBERD_JOIN_CLUSTER=ejabberd@ejabberd1.${EJABBERD_DOMAIN}
    volumes:
      - ./config/ejabberd.yml:/home/ejabberd/conf/ejabberd.yml:ro
      - ./certs:/home/ejabberd/conf/certs:ro
      - ejabberd3_data:/home/ejabberd/database
      - ./logs:/home/ejabberd/logs
    networks:
      - ejabberd_network
    depends_on:
      - ejabberd1
      - postgres
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "ejabberdctl", "status"]
      interval: 30s
      timeout: 10s
      retries: 3

  # PostgreSQL Database
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./config/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - ejabberd_network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Redis for Session Management
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --maxmemory 2gb --maxmemory-policy allkeys-lru --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - ejabberd_network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Prometheus Monitoring
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - ./monitoring/ejabberd_rules.yml:/etc/prometheus/ejabberd_rules.yml:ro
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
    networks:
      - ejabberd_network
    restart: unless-stopped

  # Grafana Dashboard
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_ADMIN_PASSWORD}
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - ejabberd_network
    restart: unless-stopped

volumes:
  ejabberd1_data:
  ejabberd2_data:
  ejabberd3_data:
  postgres_data:
  redis_data:
  prometheus_data:
  grafana_data:

networks:
  ejabberd_network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
EOF

# Create deployment script
tee deploy.sh << 'EOF'
#!/bin/bash
# Deployment script for Daddy Messaging

set -e

echo "🚀 Starting deployment..."

# Check if .env file exists and has required variables
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create .env file with required configuration"
    exit 1
fi

# Source environment variables
source .env

# Validate required variables
if [ -z "$VITE_SUPABASE_URL" ] || [ "$VITE_SUPABASE_URL" = "https://your-project.supabase.co" ]; then
    echo "❌ Please update VITE_SUPABASE_URL in .env file"
    exit 1
fi

if [ -z "$VITE_SUPABASE_ANON_KEY" ] || [ "$VITE_SUPABASE_ANON_KEY" = "your-anon-key" ]; then
    echo "❌ Please update VITE_SUPABASE_ANON_KEY in .env file"
    exit 1
fi

# Pull latest images
echo "📦 Pulling Docker images..."
docker-compose pull

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check cluster status
echo "🔍 Checking cluster status..."
docker-compose exec ejabberd1 ejabberdctl status
docker-compose exec ejabberd1 ejabberdctl cluster_info

# Create admin user
echo "👤 Creating admin user..."
docker-compose exec ejabberd1 ejabberdctl register admin $EJABBERD_DOMAIN $EJABBERD_PASSWORD

echo "✅ Deployment completed!"
echo ""
echo "📊 Access URLs:"
echo "- Grafana: http://$(hostname -I | awk '{print $1}'):3001 (admin/${GRAFANA_ADMIN_PASSWORD})"
echo "- Prometheus: http://$(hostname -I | awk '{print $1}'):9090"
echo "- HAProxy Stats: http://$(hostname -I | awk '{print $1}'):8080/haproxy-stats"
echo ""
echo "🔧 XMPP Connection:"
echo "- Domain: $EJABBERD_DOMAIN"
echo "- WebSocket: wss://$EJABBERD_DOMAIN:5443/ws"
echo "- Admin: admin@$EJABBERD_DOMAIN"
echo ""
EOF

chmod +x deploy.sh

# Create management scripts
tee manage.sh << 'EOF'
#!/bin/bash
# Management script for Daddy Messaging

case "$1" in
    start)
        echo "🚀 Starting services..."
        docker-compose up -d
        ;;
    stop)
        echo "🛑 Stopping services..."
        docker-compose down
        ;;
    restart)
        echo "🔄 Restarting services..."
        docker-compose restart
        ;;
    logs)
        echo "📋 Showing logs..."
        docker-compose logs -f ${2:-}
        ;;
    status)
        echo "📊 Service status..."
        docker-compose ps
        echo ""
        echo "🔍 Cluster status..."
        docker-compose exec ejabberd1 ejabberdctl cluster_info
        ;;
    backup)
        echo "💾 Creating backup..."
        mkdir -p backup/$(date +%Y%m%d)
        docker-compose exec postgres pg_dump -U ejabberd ejabberd > backup/$(date +%Y%m%d)/postgres_backup.sql
        docker-compose exec ejabberd1 ejabberdctl backup backup/$(date +%Y%m%d)/ejabberd_backup.backup
        echo "✅ Backup completed in backup/$(date +%Y%m%d)/"
        ;;
    update)
        echo "📦 Updating services..."
        docker-compose pull
        docker-compose up -d
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|logs|status|backup|update}"
        echo ""
        echo "Examples:"
        echo "  $0 start          # Start all services"
        echo "  $0 logs ejabberd1 # Show logs for ejabberd1"
        echo "  $0 status         # Show service and cluster status"
        echo "  $0 backup         # Create backup"
        exit 1
        ;;
esac
EOF

chmod +x manage.sh

echo ""
echo "✅ Application deployment setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file and update Supabase credentials:"
echo "   nano .env"
echo ""
echo "2. Deploy the application:"
echo "   ./deploy.sh"
echo ""
echo "3. Monitor the deployment:"
echo "   ./manage.sh status"
echo "   ./manage.sh logs"
echo ""
echo "📁 Files created:"
echo "- docker-compose.yml (main deployment)"
echo "- .env (configuration - UPDATE SUPABASE CREDENTIALS!)"
echo "- deploy.sh (deployment script)"
echo "- manage.sh (management script)"
echo ""
echo "⚠️  IMPORTANT: Update Supabase credentials in .env before deploying!"
echo ""