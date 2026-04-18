#!/bin/bash
# Step 1: Server Setup Script for Ejabberd Deployment
# Run this on each of your 3 servers

set -e

echo "🚀 Starting Ejabberd Server Setup..."
echo "Server: $(hostname)"
echo "Date: $(date)"

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential packages
echo "🔧 Installing essential packages..."
sudo apt install -y \
    curl \
    wget \
    git \
    htop \
    iotop \
    net-tools \
    ufw \
    fail2ban \
    jq \
    certbot \
    nginx

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    echo "Docker already installed"
fi

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose already installed"
fi

# Create directories
echo "📁 Creating directories..."
sudo mkdir -p /opt/daddy-messaging
sudo mkdir -p /opt/daddy-messaging/config
sudo mkdir -p /opt/daddy-messaging/certs
sudo mkdir -p /opt/daddy-messaging/logs
sudo mkdir -p /opt/daddy-messaging/backup
sudo mkdir -p /var/log/daddy

# Set permissions
sudo chown -R $USER:$USER /opt/daddy-messaging
sudo chown -R $USER:$USER /var/log/daddy

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (adjust port if needed)
sudo ufw allow 22/tcp comment 'SSH'

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# Allow XMPP ports
sudo ufw allow 5222/tcp comment 'XMPP Client'
sudo ufw allow 5269/tcp comment 'XMPP Server'
sudo ufw allow 5443/tcp comment 'XMPP WebSocket'

# Allow monitoring ports (restrict to internal network in production)
sudo ufw allow 9090/tcp comment 'Prometheus'
sudo ufw allow 3001/tcp comment 'Grafana'
sudo ufw allow 8080/tcp comment 'HAProxy Stats'

# Allow cluster communication (adjust IP range for your network)
sudo ufw allow from 10.0.0.0/8 to any port 4369 comment 'Erlang Port Mapper'
sudo ufw allow from 10.0.0.0/8 to any port 9100:9200 comment 'Erlang Distribution'

sudo ufw --force enable

# Configure fail2ban
echo "🛡️ Configuring fail2ban..."
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# System optimization
echo "⚡ Applying system optimizations..."

# Increase file descriptor limits
echo "* soft nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "root soft nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "root hard nofile 65536" | sudo tee -a /etc/security/limits.conf

# Network optimizations
sudo tee -a /etc/sysctl.conf << EOF

# Network optimizations for high-load messaging
net.core.somaxconn = 65536
net.core.netdev_max_backlog = 5000
net.core.rmem_default = 262144
net.core.rmem_max = 16777216
net.core.wmem_default = 262144
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 65536 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.ipv4.tcp_max_syn_backlog = 8192
net.ipv4.tcp_slow_start_after_idle = 0
net.ipv4.tcp_tw_reuse = 1
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_max_tw_buckets = 400000
net.ipv4.tcp_no_metrics_save = 1
net.ipv4.tcp_congestion_control = bbr
vm.swappiness = 10
vm.dirty_ratio = 15
vm.dirty_background_ratio = 5
EOF

# Apply sysctl changes
sudo sysctl -p

# Configure Docker daemon
echo "🐳 Configuring Docker daemon..."
sudo tee /etc/docker/daemon.json << EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 65536,
      "Soft": 65536
    }
  },
  "max-concurrent-downloads": 10,
  "max-concurrent-uploads": 5
}
EOF

sudo systemctl restart docker

# Create swap file (if not exists and RAM < 32GB)
TOTAL_RAM=$(free -g | awk '/^Mem:/{print $2}')
if [ "$TOTAL_RAM" -lt 32 ] && [ ! -f /swapfile ]; then
    echo "💾 Creating swap file..."
    sudo fallocate -l 4G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

# Install monitoring tools
echo "📊 Installing monitoring tools..."
# Node Exporter for Prometheus
if ! systemctl is-active --quiet node_exporter; then
    wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
    tar xvfz node_exporter-1.6.1.linux-amd64.tar.gz
    sudo mv node_exporter-1.6.1.linux-amd64/node_exporter /usr/local/bin/
    rm -rf node_exporter-1.6.1.linux-amd64*
    
    # Create systemd service
    sudo tee /etc/systemd/system/node_exporter.service << EOF
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=nobody
Group=nogroup
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable node_exporter
    sudo systemctl start node_exporter
fi

echo "✅ Server setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Reboot the server: sudo reboot"
echo "2. Run this script on all 3 servers"
echo "3. Proceed to SSL certificate setup"
echo ""
echo "🔍 Verify installation:"
echo "- Docker: docker --version"
echo "- Docker Compose: docker-compose --version"
echo "- Node Exporter: curl localhost:9100/metrics"
echo ""