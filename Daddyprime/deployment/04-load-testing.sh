#!/bin/bash
# Step 4: Load Testing Script
# Tests the deployed system with simulated users

set -e

echo "🧪 Starting Load Testing for Daddy Messaging..."

# Configuration
DOMAIN="chat.daddy.com"  # Change to your domain
TARGET_USERS=1000        # Start with 1K users, increase gradually
TEST_DURATION=300        # 5 minutes

echo "Target: $DOMAIN"
echo "Users: $TARGET_USERS"
echo "Duration: ${TEST_DURATION}s"

# Install Artillery if not present
if ! command -v artillery &> /dev/null; then
    echo "📦 Installing Artillery.js..."
    npm install -g artillery@latest
fi

# Create load test configuration
echo "📝 Creating load test configuration..."

tee load-test-websocket.yml << EOF
config:
  target: 'wss://$DOMAIN:5443'
  phases:
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    - duration: 120
      arrivalRate: 20
      name: "Ramp up"
    - duration: $TEST_DURATION
      arrivalRate: 50
      name: "Sustained load"
    - duration: 60
      arrivalRate: 10
      name: "Cool down"
  ws:
    subprotocol: "xmpp"
  processor: "./test-functions.js"

scenarios:
  - name: "XMPP WebSocket Connection Test"
    weight: 80
    engine: ws
    flow:
      - connect:
          url: "/ws"
      - function: "generateUser"
      - send:
          data: |
            <stream:stream xmlns='jabber:client' 
                          xmlns:stream='http://etherx.jabber.org/streams' 
                          to='$DOMAIN' version='1.0'>
      - think: 1
      - send:
          data: |
            <auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='PLAIN'>{{ authString }}</auth>
      - think: 2
      - loop:
        - send:
            data: |
              <message to='{{ targetUser }}@$DOMAIN' type='chat' id='{{ messageId }}'>
                <body>Load test message {{ \$randomString() }} from {{ username }}</body>
              </message>
        - think: 5
        count: 10

  - name: "HTTP API Test"
    weight: 20
    engine: http
    flow:
      - get:
          url: "/api/status"
      - think: 1
      - post:
          url: "/api/messages"
          json:
            to: "test@$DOMAIN"
            body: "HTTP API test message"
EOF

# Create test functions
tee test-functions.js << 'EOF'
const crypto = require('crypto');

function generateUser(context, events, done) {
  // Generate random user credentials
  const userId = `testuser${Math.floor(Math.random() * 10000)}`;
  const password = crypto.randomBytes(16).toString('hex');
  
  // Create PLAIN auth string (base64 encoded)
  const authPlain = `\0${userId}\0${password}`;
  const authString = Buffer.from(authPlain).toString('base64');
  
  // Set variables for use in scenario
  context.vars.username = userId;
  context.vars.password = password;
  context.vars.authString = authString;
  context.vars.targetUser = `testuser${Math.floor(Math.random() * 1000)}`;
  context.vars.messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return done();
}

module.exports = {
  generateUser
};
EOF

# Create XMPP client load test
tee load-test-xmpp.yml << EOF
config:
  target: '$DOMAIN:5222'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "XMPP Connection Test"
  processor: "./xmpp-functions.js"

scenarios:
  - name: "XMPP TCP Connection"
    engine: tcp
    flow:
      - connect: {}
      - send:
          data: |
            <?xml version='1.0'?>
            <stream:stream xmlns='jabber:client' 
                          xmlns:stream='http://etherx.jabber.org/streams' 
                          to='$DOMAIN' version='1.0'>
      - think: 2
      - send:
          data: |
            <starttls xmlns='urn:ietf:params:xml:ns:xmpp-tls'/>
      - think: 1
EOF

# Create monitoring script
tee monitor-test.sh << 'EOF'
#!/bin/bash
# Real-time monitoring during load test

echo "📊 Starting real-time monitoring..."

# Function to get metrics
get_metrics() {
    echo "=== $(date) ==="
    
    # Docker stats
    echo "🐳 Container Resources:"
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" | head -10
    
    echo ""
    
    # Ejabberd connections
    echo "🔗 XMPP Connections:"
    docker-compose exec -T ejabberd1 ejabberdctl connected_users_number 2>/dev/null || echo "N/A"
    
    echo ""
    
    # System resources
    echo "💻 System Resources:"
    echo "CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)%"
    echo "Memory: $(free | grep Mem | awk '{printf("%.1f%%", $3/$2 * 100.0)}')"
    echo "Load: $(uptime | awk -F'load average:' '{print $2}')"
    
    echo ""
    
    # Network connections
    echo "🌐 Network Connections:"
    echo "TCP: $(ss -t | wc -l)"
    echo "WebSocket (5443): $(ss -tlnp | grep :5443 | wc -l)"
    echo "XMPP (5222): $(ss -tlnp | grep :5222 | wc -l)"
    
    echo "================================"
    echo ""
}

# Monitor every 10 seconds
while true; do
    get_metrics
    sleep 10
done
EOF

chmod +x monitor-test.sh

# Create performance analysis script
tee analyze-results.sh << 'EOF'
#!/bin/bash
# Analyze load test results

echo "📈 Analyzing Load Test Results..."

if [ ! -f "artillery-report.json" ]; then
    echo "❌ No test results found. Run load test first."
    exit 1
fi

# Extract key metrics
echo "📊 Performance Summary:"
echo "======================"

# Response times
echo "Response Times:"
jq -r '.aggregate.latency | "  Min: \(.min)ms\n  Max: \(.max)ms\n  Median: \(.median)ms\n  P95: \(.p95)ms\n  P99: \(.p99)ms"' artillery-report.json

echo ""

# Request rates
echo "Request Rates:"
jq -r '.aggregate.rps | "  Mean: \(.mean) req/sec\n  Count: \(.count) total requests"' artillery-report.json

echo ""

# Error rates
echo "Error Analysis:"
jq -r '.aggregate | "  Scenarios: \(.scenariosCompleted) completed, \(.scenariosFailed) failed\n  Codes: \(.codes // {})"' artillery-report.json

echo ""

# Connection metrics
echo "Connection Metrics:"
jq -r '.aggregate | "  Connections: \(.scenariosCreated) created\n  Duration: \(.scenarioDuration // {}) ms"' artillery-report.json

echo ""
echo "📋 Recommendations:"

# Performance recommendations based on results
P95=$(jq -r '.aggregate.latency.p95' artillery-report.json)
ERROR_RATE=$(jq -r '.aggregate.scenariosFailed // 0' artillery-report.json)

if (( $(echo "$P95 > 1000" | bc -l) )); then
    echo "⚠️  High latency detected (P95: ${P95}ms)"
    echo "   - Consider adding more Ejabberd nodes"
    echo "   - Check database performance"
    echo "   - Optimize network configuration"
fi

if (( ERROR_RATE > 0 )); then
    echo "❌ Errors detected ($ERROR_RATE failed scenarios)"
    echo "   - Check Ejabberd logs: docker-compose logs ejabberd1"
    echo "   - Verify SSL certificate configuration"
    echo "   - Check firewall settings"
fi

echo ""
echo "✅ Analysis complete. Check artillery-report.json for detailed metrics."
EOF

chmod +x analyze-results.sh

# Create comprehensive test suite
tee run-full-test.sh << EOF
#!/bin/bash
# Comprehensive load testing suite

set -e

echo "🚀 Starting Comprehensive Load Test Suite..."

# Test configuration
DOMAIN="$DOMAIN"
RESULTS_DIR="test-results-\$(date +%Y%m%d_%H%M%S)"

mkdir -p "\$RESULTS_DIR"
cd "\$RESULTS_DIR"

echo "📁 Results will be saved to: \$RESULTS_DIR"

# Test 1: Basic connectivity
echo "🔍 Test 1: Basic Connectivity..."
curl -I "https://\$DOMAIN" > connectivity-test.log 2>&1 || echo "HTTPS test failed" >> connectivity-test.log
curl -I "http://\$DOMAIN:8080/haproxy-stats" > haproxy-test.log 2>&1 || echo "HAProxy test failed" >> haproxy-test.log

# Test 2: WebSocket load test
echo "🌐 Test 2: WebSocket Load Test..."
artillery run ../load-test-websocket.yml --output websocket-results.json > websocket-test.log 2>&1

# Test 3: HTTP API load test  
echo "🔗 Test 3: HTTP API Test..."
artillery quick --count 100 --num 10 "https://\$DOMAIN/api/status" --output api-results.json > api-test.log 2>&1

# Test 4: Concurrent connections test
echo "👥 Test 4: Concurrent Connections..."
for i in {1..10}; do
    (
        echo "Connection \$i starting..."
        timeout 30 wscat -c "wss://\$DOMAIN:5443/ws" > "connection-\$i.log" 2>&1 &
    ) &
done
wait

# Test 5: Database performance
echo "🗄️ Test 5: Database Performance..."
docker-compose exec -T postgres psql -U ejabberd -d ejabberd -c "
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    correlation
FROM pg_stats 
WHERE schemaname = 'public' 
ORDER BY n_distinct DESC NULLS LAST 
LIMIT 10;" > db-stats.log 2>&1

# Generate summary report
echo "📊 Generating Summary Report..."
cat > test-summary.md << EOL
# Load Test Summary - \$(date)

## Test Configuration
- Domain: \$DOMAIN
- Target Users: $TARGET_USERS
- Duration: ${TEST_DURATION}s
- Test Suite: Comprehensive

## Test Results

### 1. Connectivity Test
\`\`\`
\$(cat connectivity-test.log)
\`\`\`

### 2. WebSocket Performance
\`\`\`
\$(tail -20 websocket-test.log)
\`\`\`

### 3. API Performance  
\`\`\`
\$(tail -20 api-test.log)
\`\`\`

### 4. Database Stats
\`\`\`
\$(cat db-stats.log)
\`\`\`

## Recommendations
- Monitor response times < 100ms
- Keep error rate < 1%
- Scale horizontally if CPU > 70%
- Add database replicas if needed

Generated: \$(date)
EOL

echo ""
echo "✅ Comprehensive load test completed!"
echo "📁 Results saved to: \$RESULTS_DIR"
echo "📊 View summary: cat \$RESULTS_DIR/test-summary.md"
echo ""
echo "📋 Next steps:"
echo "1. Review test results"
echo "2. Optimize based on findings"  
echo "3. Repeat tests with higher load"
echo "4. Monitor production metrics"
EOF

chmod +x run-full-test.sh

echo ""
echo "✅ Load testing setup completed!"
echo ""
echo "📋 Available test scripts:"
echo "1. ./run-full-test.sh     # Comprehensive test suite"
echo "2. ./monitor-test.sh      # Real-time monitoring"
echo "3. ./analyze-results.sh   # Performance analysis"
echo ""
echo "🧪 Quick tests:"
echo "- Basic: artillery quick --count 100 --num 10 https://$DOMAIN"
echo "- WebSocket: artillery run load-test-websocket.yml"
echo ""
echo "📊 Monitoring during tests:"
echo "- Grafana: http://$(hostname -I | awk '{print $1}'):3001"
echo "- HAProxy: http://$(hostname -I | awk '{print $1}'):8080/haproxy-stats"
echo ""
echo "🎯 Performance targets:"
echo "- Response time: < 100ms (P95)"
echo "- Error rate: < 1%"
echo "- Concurrent users: 10,000+"
echo "- Messages/sec: 10,000+"
echo ""