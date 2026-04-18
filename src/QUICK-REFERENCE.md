# Quick Reference Card

Your portfolio at a glance.

---

## ⚡ Quick Start

```bash
npm install    # First time only
npm start      # Run portfolio
npm run build  # Build for production
```

---

## 🔧 Your Configuration

| Setting | Value | File |
|---------|-------|------|
| **GitHub Username** | `Prime-code2106` | `/components/GitHubActivity.tsx` (Line 29) |
| **Availability** | Available (Green) | `/components/AvailabilityStatus.tsx` (Line 39) |
| **Name** | Adewale Samuel (Prime) | Multiple files |
| **Email** | adelekesam10@gmail.com | Multiple files |
| **Phone** | +234 903 411 042 | Multiple files |
| **Education** | FUTA Information Technology | Multiple files |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `/App.tsx` | Main app routing |
| `/components/GitHubActivity.tsx` | GitHub stats widget |
| `/components/AvailabilityStatus.tsx` | Availability indicator |
| `/components/Hero.tsx` | Landing section |
| `/components/pages/AllProjects.tsx` | Projects page |
| `/components/pages/Skills.tsx` | Skills page |
| `/data/resumeData.ts` | Resume information |

---

## 📚 Documentation

| Guide | When to Read |
|-------|-------------|
| [GETTING-STARTED.md](/docs/GETTING-STARTED.md) | New to web dev ⭐ |
| [PROJECT-OVERVIEW.md](/docs/PROJECT-OVERVIEW.md) | Want overview |
| [CUSTOMIZATION-GUIDE.md](/docs/CUSTOMIZATION-GUIDE.md) | Ready to customize |
| [DEPLOYMENT-GUIDE.md](/docs/DEPLOYMENT-GUIDE.md) | Ready to deploy |
| [COMPONENT-DOCUMENTATION.md](/docs/COMPONENT-DOCUMENTATION.md) | Need component reference |

---

## 🎯 Common Tasks

### Update Availability Status

**File:** `/components/AvailabilityStatus.tsx`  
**Line:** 39

```typescript
status: 'available'    // Green
status: 'limited'      // Yellow
status: 'booked'       // Red
```

### Add a Project

**File:** `/components/pages/AllProjects.tsx`  
**Add to:** `allProjects` array

```typescript
{
  id: 10,
  title: "Project Name",
  description: "Description",
  image: "image-url",
  tags: ["React", "Supabase", "Tailwind"],
  demoType: "web",
  demoUrl: "https://...",
  githubUrl: "https://github.com/..."
}
```

### Update Skills

**File:** `/components/pages/Skills.tsx`  
**Edit:** Skills arrays

---

## 🚀 Deploy Commands

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
npm run deploy
```

---

## 🌐 URLs

| What | Where |
|------|-------|
| **Local Dev** | http://localhost:3000 |
| **GitHub Profile** | https://github.com/Prime-code2106 |
| **Documentation** | `/docs/` folder |

---

## 💡 Quick Tips

- ✅ All code is commented
- ✅ Search for "CUSTOMIZATION" to find what to change
- ✅ Use `Ctrl+F` to find specific content
- ✅ Check console for errors
- ✅ Hard refresh: `Ctrl+Shift+R`

---

## 🆘 Quick Help

**Won't start?**
```bash
rm -rf node_modules
npm install
npm start
```

**Changes not showing?**
- Hard refresh: `Ctrl+Shift+R`
- Restart server: Stop (Ctrl+C), then `npm start`

**Need more help?**
- Check `/docs/` folder
- Email: adelekesam10@gmail.com

---

## ✅ Status

- ✅ GitHub: **Prime-code2106**
- ✅ Availability: **Available**
- ✅ Documentation: **Complete**
- ✅ Ready to: **Deploy**

---

**Last Updated:** October 16, 2025
