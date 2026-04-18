# 🔑 Get Your Supabase Service Key (30 seconds)

## **Step-by-Step Instructions:**

### **1. Open Supabase Dashboard**
👉 Go to: https://supabase.com/dashboard

### **2. Select Your Project**
👉 Click on your project: **kreffkirwpqsgdqnbfnf**

### **3. Go to API Settings**
👉 Click **"Settings"** in the left sidebar
👉 Click **"API"** in the settings menu

### **4. Find Your Service Key**
You'll see several keys. Look for:
- ❌ **anon/public key** (you already have this)
- ✅ **service_role key** (this is what you need!)

### **5. Copy the Service Role Key**
👉 Click the **copy button** next to "service_role"
👉 The key should start with `eyJ...` and be very long

### **6. Update Your .env File**
Open your `.env` file and replace this line:
```
SUPABASE_SERVICE_KEY=your-service-key-here
```

With:
```
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-actual-key
```

## **⚠️ IMPORTANT SECURITY NOTE:**
- This key has **admin access** to your database
- **Never share it publicly** or commit it to GitHub
- **Keep it secret** - only use on your server

## **✅ Verification:**
Your `.env` file should now have:
```bash
VITE_SUPABASE_URL=https://kreffkirwpqsgdqnbfnf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_bb5QFzmTuCnalYozBlvOcw_a4lVZ6QM
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-actual-key
```

## **🚀 Next Step:**
Once you've updated your `.env` file, you're ready for Oracle Cloud setup!

👉 Continue to: **ORACLE_CLOUD_SETUP.md**