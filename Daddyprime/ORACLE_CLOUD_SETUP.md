# 🌐 Oracle Cloud Setup (5 minutes)

## **Why Oracle Cloud?**
- 🆓 **100% FREE forever** (not a trial!)
- 💪 **4 ARM CPUs + 24GB RAM** (handles 10K+ users)
- 💾 **200GB storage + 10TB bandwidth**
- 🚫 **No credit card required** after signup

---

## **Step 1: Create Oracle Account**

### **1.1 Go to Oracle Cloud**
👉 Visit: https://cloud.oracle.com

### **1.2 Click "Start for free"**
👉 Big orange button on the homepage

### **1.3 Fill Registration Form**
```
Country/Territory: Nigeria 🇳🇬
Email: your-email@example.com
First Name: Your Name
Last Name: Your Surname
Company: (optional - can put "Individual")
```

### **1.4 Verify Your Account**
- Check your email for verification link
- Click the link to verify
- You may need to verify your phone number too

### **1.5 Complete Profile**
- Add your address (Nigerian address)
- Phone number: +234XXXXXXXXXX
- You might need to upload ID for verification

---

## **Step 2: Create Compute Instance**

### **2.1 Access Compute Dashboard**
👉 Go to: **Compute > Instances** in the Oracle Cloud menu

### **2.2 Click "Create Instance"**
👉 Big blue button

### **2.3 Configure Instance Settings**

**Basic Information:**
```
Name: daddy-messaging-server
Compartment: (root) - leave default
```

**Image and Shape:**
```
Image: Ubuntu 22.04 (Always Free Eligible) ✅
Shape: VM.Standard.A1.Flex (Always Free) ✅
```

**Shape Configuration:**
```
Number of CPUs: 4 (maximum for free tier)
Amount of memory (GB): 24 (maximum for free tier)
```

**Networking:**
```
Virtual cloud network: (leave default)
Subnet: (leave default)
Assign a public IPv4 address: ✅ YES (checked)
```

**Boot Volume:**
```
Boot volume size (GB): 200 (maximum for free tier)
```

### **2.4 Add SSH Keys**
👉 **Generate SSH key pair** (recommended)
👉 **Download both keys** (public and private)
👉 **Save them safely** - you'll need the private key to connect

### **2.5 Create Instance**
👉 Click **"Create"** button
👉 Wait 2-3 minutes for provisioning

---

## **Step 3: Configure Security**

### **3.1 Get Your Instance IP**
👉 Copy the **Public IP address** from your instance details
👉 Example: `123.456.789.0`

### **3.2 Configure Firewall**
👉 Go to **Networking > Virtual Cloud Networks**
👉 Click your VCN name
👉 Click **Security Lists**
👉 Click **Default Security List**
👉 Click **Add Ingress Rules**

**Add these rules:**
```
Rule 1:
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port Range: 80

Rule 2:
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port Range: 443

Rule 3:
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port Range: 5222

Rule 4:
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port Range: 5443

Rule 5:
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port Range: 9090
```

---

## **Step 4: Connect to Your Server**

### **Option A: Using SSH (Windows)**
If you have Windows 10/11 with WSL or Git Bash:
```bash
ssh -i path/to/your-private-key ubuntu@YOUR_SERVER_IP
```

### **Option B: Using PuTTY (Windows)**
1. Download PuTTY from: https://putty.org/
2. Convert your private key using PuTTYgen
3. Connect using PuTTY with your converted key

### **Option C: Using Oracle Cloud Shell**
👉 Click **"Cloud Shell"** icon in Oracle dashboard
👉 Upload your private key
👉 Connect: `ssh -i your-key ubuntu@YOUR_SERVER_IP`

---

## **Step 5: Test Connection**

Once connected, you should see:
```bash
ubuntu@daddy-messaging-server:~$
```

Run this test command:
```bash
echo "✅ Connected to Oracle Cloud!"
uname -a
free -h
df -h
```

You should see:
- Ubuntu system info
- 24GB RAM available
- 200GB storage available

---

## **🎉 Oracle Cloud Setup Complete!**

You now have:
- ✅ **Free Oracle Cloud account**
- ✅ **Powerful server** (4 CPUs, 24GB RAM)
- ✅ **SSH access** to your server
- ✅ **Firewall configured** for messaging platform
- ✅ **Public IP address** for deployment

**Your Server Details:**
```
IP Address: YOUR_SERVER_IP
Username: ubuntu
SSH Key: your-downloaded-private-key
Resources: 4 CPUs, 24GB RAM, 200GB storage
Cost: $0/month forever! 🆓
```

---

## **🚀 Next Step: Deploy Everything!**

👉 Continue to: **DEPLOY_PLATFORM.md**

**What's Next:**
1. Connect to your server via SSH
2. Run one deployment command
3. Your messaging platform will be live!
4. Test with 10K+ users capacity

**Time Remaining:** ~10 minutes for full deployment!