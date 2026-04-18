#!/bin/bash
# Quick script to help you get your Supabase service key

echo "🔑 Getting Your Supabase Service Key"
echo "===================================="
echo ""
echo "📋 Follow these steps:"
echo ""
echo "1. Open your browser and go to:"
echo "   👉 https://supabase.com/dashboard"
echo ""
echo "2. Select your project:"
echo "   👉 kreffkirwpqsgdqnbfnf (your current project)"
echo ""
echo "3. Click 'Settings' in the left sidebar"
echo ""
echo "4. Click 'API' in the settings menu"
echo ""
echo "5. Find the 'service_role' key (NOT the anon key)"
echo "   ⚠️  It should start with 'eyJ...' and be much longer than your anon key"
echo ""
echo "6. Copy the service_role key"
echo ""
echo "7. Come back here and paste it when prompted"
echo ""
echo "🔒 IMPORTANT: This key has admin access - keep it secret!"
echo ""

read -p "Press Enter when you have copied your service_role key..."

echo ""
echo "📝 Now paste your service_role key:"
read -p "Service Key: " SERVICE_KEY

if [ -z "$SERVICE_KEY" ]; then
    echo "❌ No key provided. Please run this script again."
    exit 1
fi

# Validate the key format (should start with eyJ)
if [[ ! "$SERVICE_KEY" =~ ^eyJ ]]; then
    echo "⚠️  Warning: This doesn't look like a valid service key."
    echo "   Service keys usually start with 'eyJ'"
    read -p "Continue anyway? (y/N): " CONTINUE
    if [[ ! "$CONTINUE" =~ ^[Yy]$ ]]; then
        echo "❌ Cancelled. Please get the correct service_role key."
        exit 1
    fi
fi

# Update the .env file
if [ -f ".env" ]; then
    # Replace the placeholder with the actual key
    sed -i "s/SUPABASE_SERVICE_KEY=your-service-key-here/SUPABASE_SERVICE_KEY=$SERVICE_KEY/" .env
    echo "✅ Updated .env file with your service key!"
else
    echo "❌ .env file not found. Please run this from your project directory."
    exit 1
fi

echo ""
echo "🎉 Supabase configuration complete!"
echo ""
echo "📋 Your .env file now contains:"
echo "   ✅ VITE_SUPABASE_URL (your project URL)"
echo "   ✅ VITE_SUPABASE_ANON_KEY (for frontend)"
echo "   ✅ SUPABASE_SERVICE_KEY (for backend)"
echo ""
echo "🚀 Next step: Set up Oracle Cloud and deploy!"
echo "   Run: cat COMPLETE_DEPLOYMENT_GUIDE.md"
echo ""