# Deployment Guide

Complete guide to deploying your portfolio to various hosting platforms.

---

## 📋 Pre-Deployment Checklist

### ✅ Before You Deploy

- [ ] All customizations complete (see [CUSTOMIZATION-GUIDE.md](/docs/CUSTOMIZATION-GUIDE.md))
- [ ] GitHub username updated
- [ ] Personal information verified
- [ ] Projects updated with real data
- [ ] Contact form configured (if using backend)
- [ ] All links tested and working
- [ ] Tested on multiple devices
- [ ] No console errors
- [ ] Production build tested locally
- [ ] Environment variables configured (if needed)

---

## 🏗️ Building for Production

### Create Production Build

```bash
# Install dependencies (if not already)
npm install

# Create optimized production build
npm run build
```

This creates a `build/` folder with optimized static files.

### Test Production Build Locally

```bash
# Install serve globally (one time)
npm install -g serve

# Serve the build folder
serve -s build

# Open http://localhost:3000
```

Verify everything works correctly before deploying.

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Best for:** React apps, automatic deployments, custom domains

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

#### Alternative: Deploy via GitHub

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Click "Deploy"

#### Environment Variables (if needed)
```bash
# Add via CLI
vercel env add REACT_APP_GITHUB_TOKEN

# Or add in Vercel dashboard:
# Settings → Environment Variables
```

#### Custom Domain
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

---

### Option 2: Netlify

**Best for:** Static sites, form handling, serverless functions

#### Method 1: Drag & Drop

1. Build your project:
```bash
npm run build
```

2. Go to [netlify.com](https://netlify.com)
3. Drag the `build` folder to Netlify

#### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

#### Method 3: GitHub Integration

1. Push code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "New site from Git"
4. Connect to GitHub
5. Select repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
7. Click "Deploy site"

#### Netlify Contact Form Integration

Update `/components/sections/Contact.tsx`:

```typescript
<form 
  name="contact" 
  method="POST" 
  data-netlify="true"
  onSubmit={handleSubmit}
>
  <input type="hidden" name="form-name" value="contact" />
  {/* Your form fields */}
</form>
```

#### Environment Variables
```bash
# Via CLI
netlify env:set REACT_APP_GITHUB_TOKEN "your-token"

# Or in dashboard:
# Site settings → Environment variables
```

---

### Option 3: GitHub Pages

**Best for:** Free hosting, GitHub integration

#### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

#### Step 2: Update package.json

Add homepage and deploy scripts:

```json
{
  "name": "portfolio",
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

#### Step 3: Deploy

```bash
npm run deploy
```

This will:
1. Build the project
2. Create a `gh-pages` branch
3. Push the build to that branch
4. Your site will be live at the homepage URL

#### Custom Domain with GitHub Pages

1. Add a `CNAME` file to `public/`:
```
yourdomain.com
```

2. Configure DNS with your domain provider:
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

3. Enable HTTPS in repository settings

---

### Option 4: Firebase Hosting

**Best for:** Google Cloud integration, analytics

#### Step 1: Install Firebase Tools

```bash
npm install -g firebase-tools
```

#### Step 2: Login

```bash
firebase login
```

#### Step 3: Initialize

```bash
firebase init hosting
```

Select:
- Public directory: `build`
- Single-page app: `Yes`
- GitHub integration: `Optional`

#### Step 4: Build and Deploy

```bash
npm run build
firebase deploy
```

#### Custom Domain

```bash
firebase hosting:channel:deploy live --only hosting
```

Configure in Firebase Console → Hosting → Custom Domain

---

### Option 5: AWS S3 + CloudFront

**Best for:** Enterprise deployments, full AWS integration

#### Step 1: Create S3 Bucket

1. Go to AWS S3 Console
2. Create bucket with website hosting enabled
3. Set bucket policy for public access

#### Step 2: Build Project

```bash
npm run build
```

#### Step 3: Upload to S3

```bash
# Install AWS CLI
# Configure with: aws configure

# Sync build folder
aws s3 sync build/ s3://your-bucket-name --delete
```

#### Step 4: Create CloudFront Distribution

1. Go to CloudFront Console
2. Create distribution
3. Point to S3 bucket
4. Configure SSL certificate
5. Add custom domain

#### Automated Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

---

### Option 6: Render

**Best for:** Full-stack apps, databases

#### Deploy via Dashboard

1. Go to [render.com](https://render.com)
2. Create new "Static Site"
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `build`
5. Deploy

#### Deploy via render.yaml

Create `render.yaml` in root:

```yaml
services:
  - type: web
    name: portfolio
    env: static
    buildCommand: npm run build
    staticPublishPath: build
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

---

### Option 7: Surge

**Best for:** Quick deployments, simple static sites

#### Install Surge

```bash
npm install -g surge
```

#### Deploy

```bash
# Build first
npm run build

# Deploy
cd build
surge
```

Follow prompts to choose domain (e.g., `your-portfolio.surge.sh`)

---

## 🔧 Configuration for Different Platforms

### Environment Variables

Different platforms handle env variables differently:

#### Vercel
```bash
# CLI
vercel env add REACT_APP_API_KEY

# Or in dashboard
```

#### Netlify
```bash
# CLI
netlify env:set REACT_APP_API_KEY "value"

# Or in dashboard: Site settings → Environment variables
```

#### GitHub Pages
Create `.env.production`:
```
REACT_APP_API_KEY=your_key_here
```

**Note:** Never commit `.env` files with secrets!

---

## 🌐 Custom Domain Setup

### General Steps

1. **Buy a domain** (Namecheap, GoDaddy, Google Domains, etc.)

2. **Configure DNS records**:
```
Type: A
Name: @
Value: [Your hosting provider's IP]

Type: CNAME
Name: www
Value: [Your hosting URL]
```

3. **Enable HTTPS**
Most platforms auto-provision SSL certificates (Let's Encrypt)

### Platform-Specific Instructions

#### Vercel
1. Go to project settings → Domains
2. Add your domain
3. Update DNS as instructed
4. SSL auto-configured

#### Netlify
1. Go to Domain settings
2. Add custom domain
3. Update DNS
4. SSL auto-configured

#### GitHub Pages
1. Add `CNAME` file to `public/`
2. Update DNS A records
3. Enable HTTPS in repo settings

---

## 📊 Analytics Integration

### Google Analytics

1. **Create GA4 Property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create property
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Install React GA**
```bash
npm install react-ga4
```

3. **Initialize in index.tsx**
```typescript
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');

// Track page views
ReactGA.send({ hitType: "pageview", page: window.location.pathname });
```

4. **Add to components**
```typescript
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

function MyComponent() {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/my-page" });
  }, []);
}
```

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// In App.tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

---

## 🔒 Security Best Practices

### 1. Environment Variables

**Never commit:**
- API keys
- Secret tokens
- Database credentials

**Use .env files:**
```bash
# .env.local (not committed)
REACT_APP_API_KEY=secret_key_here
```

**Add to .gitignore:**
```
.env
.env.local
.env.production
```

### 2. Security Headers

Add to `public/_headers` (Netlify) or `vercel.json` (Vercel):

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 3. Content Security Policy

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

---

## ⚡ Performance Optimization

### Before Deployment

#### 1. Optimize Images

```bash
# Install image optimizer
npm install -g imagemin-cli

# Optimize images
imagemin public/images/* --out-dir=public/images
```

#### 2. Code Splitting

Already implemented with React.lazy:
```typescript
const Component = lazy(() => import('./Component'));
```

#### 3. Bundle Analysis

```bash
# Install analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

#### 4. Lighthouse Audit

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🐛 Common Deployment Issues

### Issue: Blank Page After Deployment

**Cause:** Routing issues, incorrect build path

**Solution:**
```json
// package.json
{
  "homepage": "."
}
```

### Issue: 404 on Page Refresh

**Cause:** SPA routing not configured

**Solution (Netlify):** Create `public/_redirects`:
```
/*    /index.html   200
```

**Solution (Vercel):** Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Issue: Environment Variables Not Working

**Cause:** Not prefixed with `REACT_APP_`

**Solution:** Rename variables:
```bash
# Wrong
API_KEY=xxx

# Correct
REACT_APP_API_KEY=xxx
```

### Issue: Build Fails

**Causes & Solutions:**

1. **TypeScript errors:**
```bash
npx tsc --noEmit
# Fix reported errors
```

2. **Missing dependencies:**
```bash
npm install
```

3. **Memory issues:**
```json
// package.json
{
  "scripts": {
    "build": "react-scripts --max_old_space_size=4096 build"
  }
}
```

---

## 🔄 CI/CD Setup

### GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test --passWithNoTests
      
      - name: Build project
        run: npm run build
        env:
          REACT_APP_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Secrets Setup

In GitHub repository:
1. Settings → Secrets and variables → Actions
2. Add secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - Any other `REACT_APP_*` variables

---

## 📈 Post-Deployment

### 1. Verify Deployment

- [ ] Visit deployed URL
- [ ] Test all pages
- [ ] Test on mobile
- [ ] Check console for errors
- [ ] Test all links
- [ ] Verify images load
- [ ] Test contact form
- [ ] Check performance (Lighthouse)

### 2. Setup Monitoring

- [ ] Add analytics
- [ ] Setup error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Setup alerts

### 3. SEO Setup

- [ ] Submit sitemap to Google Search Console
- [ ] Verify domain ownership
- [ ] Setup Google Analytics
- [ ] Add to Bing Webmaster Tools

### 4. Social Media

- [ ] Update LinkedIn with portfolio link
- [ ] Add to GitHub profile README
- [ ] Share on Twitter
- [ ] Add to resume

---

## 🎯 Quick Deploy Commands

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### GitHub Pages
```bash
npm run deploy
```

### Firebase
```bash
firebase deploy
```

### Surge
```bash
cd build && surge
```

---

## 🆘 Getting Help

### Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages Documentation](https://pages.github.com)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

### Support

If you encounter issues:
1. Check platform status pages
2. Review error logs
3. Search documentation
4. Contact platform support
5. Email: adelekesam10@gmail.com

---

## ✅ Deployment Complete!

### Next Steps

1. **Share your portfolio:**
   - Update resume
   - Add to LinkedIn
   - Share on social media

2. **Monitor performance:**
   - Check analytics weekly
   - Review error logs
   - Monitor uptime

3. **Keep updating:**
   - Add new projects
   - Update skills
   - Refresh testimonials
   - Update availability status

4. **Gather feedback:**
   - Ask peers to review
   - Test with real users
   - Iterate based on feedback

---

**Congratulations! Your portfolio is now live! 🎉**

---

**Last Updated:** October 16, 2025  
**Author:** Adewale Samuel (Prime)
