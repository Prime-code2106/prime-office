#!/bin/bash
# Step 2: SSL Certificate Setup
# Run this on the primary server (ejabberd1)

set -e

echo "🔐 Setting up SSL certificates..."

# Configuration
DOMAIN="chat.daddy.com"  # Change this to your domain
EMAIL="admin@daddy.com"  # Change this to your email

echo "Domain: $DOMAIN"
echo "Email: $EMAIL"

# Stop any services using port 80
echo "🛑 Stopping services on port 80..."
sudo systemctl stop nginx 2>/dev/null || true
sudo docker stop $(sudo docker ps -q --filter "publish=80") 2>/dev/null || true

# Install Certbot if not already installed
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing Certbot..."
    sudo apt update
    sudo apt install -y certbot
fi

# Generate SSL certificate
echo "📜 Generating SSL certificate for $DOMAIN..."
sudo certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    -d "$DOMAIN"

# Verify certificate was created
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "❌ Certificate generation failed!"
    exit 1
fi

# Create certificate directory for Ejabberd
echo "📁 Setting up certificate directory..."
sudo mkdir -p /opt/daddy-messaging/certs

# Copy certificates to Ejabberd directory
echo "📋 Copying certificates..."
sudo cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "/opt/daddy-messaging/certs/daddy.pem"
sudo cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "/opt/daddy-messaging/certs/daddy.key"

# Set proper permissions
sudo chown -R 9000:9000 /opt/daddy-messaging/certs
sudo chmod 600 /opt/daddy-messaging/certs/daddy.key
sudo chmod 644 /opt/daddy-messaging/certs/daddy.pem

# Create certificate renewal script
echo "🔄 Setting up certificate renewal..."
sudo tee /usr/local/bin/renew-daddy-certs.sh << EOF
#!/bin/bash
# Certificate renewal script for Daddy messaging

set -e

echo "🔄 Renewing SSL certificates..."

# Stop services
docker-compose -f /opt/daddy-messaging/docker-compose.yml stop haproxy ejabberd1 ejabberd2 ejabberd3 2>/dev/null || true

# Renew certificate
certbot renew --standalone --quiet

# Copy renewed certificates
cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "/opt/daddy-messaging/certs/daddy.pem"
cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "/opt/daddy-messaging/certs/daddy.key"

# Set permissions
chown -R 9000:9000 /opt/daddy-messaging/certs
chmod 600 /opt/daddy-messaging/certs/daddy.key
chmod 644 /opt/daddy-messaging/certs/daddy.pem

# Restart services
cd /opt/daddy-messaging
docker-compose up -d

echo "✅ Certificate renewal completed!"
EOF

sudo chmod +x /usr/local/bin/renew-daddy-certs.sh

# Set up automatic renewal (runs twice daily)
echo "⏰ Setting up automatic renewal..."
(sudo crontab -l 2>/dev/null; echo "0 2,14 * * * /usr/local/bin/renew-daddy-certs.sh >> /var/log/daddy/cert-renewal.log 2>&1") | sudo crontab -

# Create HAProxy certificate (combines cert and key)
echo "🔗 Creating HAProxy certificate..."
sudo cat "/opt/daddy-messaging/certs/daddy.pem" "/opt/daddy-messaging/certs/daddy.key" > "/opt/daddy-messaging/certs/daddy-haproxy.pem"
sudo chown 9000:9000 "/opt/daddy-messaging/certs/daddy-haproxy.pem"
sudo chmod 600 "/opt/daddy-messaging/certs/daddy-haproxy.pem"

# Verify certificates
echo "🔍 Verifying certificates..."
echo "Certificate details:"
sudo openssl x509 -in "/opt/daddy-messaging/certs/daddy.pem" -text -noout | grep -E "(Subject:|DNS:|Not After)"

echo ""
echo "✅ SSL setup completed!"
echo ""
echo "📋 Certificate files created:"
echo "- /opt/daddy-messaging/certs/daddy.pem (certificate)"
echo "- /opt/daddy-messaging/certs/daddy.key (private key)"
echo "- /opt/daddy-messaging/certs/daddy-haproxy.pem (HAProxy format)"
echo ""
echo "🔄 Automatic renewal configured:"
echo "- Runs twice daily at 2 AM and 2 PM"
echo "- Logs to /var/log/daddy/cert-renewal.log"
echo ""
echo "📋 Next steps:"
echo "1. Update DNS records to point $DOMAIN to this server"
echo "2. Test certificate: curl -I https://$DOMAIN"
echo "3. Proceed to application deployment"
echo ""