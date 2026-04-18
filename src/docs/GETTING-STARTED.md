# Getting Started Guide

Complete beginner-friendly guide to using your portfolio.

---

## 👋 Welcome!

This guide will help you:
1. Understand what you have
2. Run the portfolio locally
3. Make your first customizations
4. Deploy to the internet

**No prior experience needed!** We'll explain everything step by step.

---

## 📋 What You Have

### A Complete Portfolio Website

This is a professional portfolio website built with modern web technologies. It includes:

- **Homepage** with all your professional information
- **Projects page** to showcase your web applications
- **Skills page** with your technical abilities
- **Resume page** with AI-integrated resume viewer
- **Contact form** for professional inquiries
- **Dark mode design** for a premium feel
- **Supabase ready** for data and authentication

### Fully Documented

Every file is explained with comments. You have over 4,000 lines of documentation to help you.

---

## 🎯 Quick Overview

### What's Already Done ✅

- ✅ All code written and working
- ✅ Design complete (dark mode)
- ✅ All features implemented
- ✅ Personal info updated (Adewale Samuel)
- ✅ Everything commented and documented
- ✅ Ready to customize and deploy

### What You Need to Do

1. **Run it locally** (see it on your computer)
2. **Customize it** (add your info)
3. **Deploy it** (put it on the internet)

That's it! Let's start.

---

## 💻 Prerequisites

### What You Need Installed

#### 1. Node.js
**What it is:** Software that runs JavaScript on your computer.

**Check if you have it:**
```bash
node --version
```

If you see a version number (like `v18.0.0`), you have it! ✅  
If you see an error, you need to install it.

**Install Node.js:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download "LTS" version (recommended)
3. Run installer
4. Restart your terminal/command prompt

#### 2. Text Editor
**What it is:** Software to edit code files.

**Recommended:** [VS Code](https://code.visualstudio.com)
- Free and professional
- Great for React development
- Built-in terminal

**Alternatives:**
- Sublime Text
- Atom
- WebStorm

#### 3. Git (Optional but Recommended)
**What it is:** Version control - tracks your code changes.

**Check if you have it:**
```bash
git --version
```

**Install Git:**
1. Go to [git-scm.com](https://git-scm.com)
2. Download for your system
3. Run installer
4. Restart terminal

---

## 🚀 Running the Portfolio

### Step 1: Open Terminal

**On Windows:**
- Press `Win + R`
- Type `cmd`
- Press Enter

**On Mac:**
- Press `Cmd + Space`
- Type `terminal`
- Press Enter

**In VS Code:**
- Menu: View → Terminal
- Or press `` Ctrl + ` ``

### Step 2: Navigate to Project

```bash
# Go to your project folder
cd path/to/your/portfolio

# Example:
cd Desktop/portfolio
# or
cd Documents/portfolio
```

**Tip:** You can drag the folder into terminal to get the path!

### Step 3: Install Dependencies

```bash
npm install
```

**What this does:**
- Downloads all required packages
- Creates `node_modules` folder
- Takes 1-5 minutes depending on internet speed

**You only need to do this once!**

### Step 4: Start Development Server

```bash
npm start
```

**What happens:**
- Builds the website
- Opens in your browser automatically
- Usually at `http://localhost:3000`
- Shows any errors in terminal

**Success!** 🎉 You should see your portfolio in the browser!

---

## 🎨 Making Your First Changes

### Change 1: Update Text in Hero Section

Let's change the welcome message!

#### 1. Open the Hero File

In VS Code:
- Open `components/Hero.tsx`
- Or press `Ctrl+P` and type `Hero.tsx`

#### 2. Find the Text

Look for:
```typescript
<h1>
  Hi, I'm <span>Adewale Samuel</span>
</h1>
<p>
  Frontend Engineer | IT Student @ FUTA
</p>
```

#### 3. Change It

Replace with your name:
```typescript
<h1>
  Hi, I'm <span>Your Name</span>
</h1>
```

#### 4. Save

- Press `Ctrl+S` (Windows) or `Cmd+S` (Mac)
- Browser should auto-refresh!
- See your change immediately!

**Congratulations!** 🎉 You just made your first edit!

---

### Change 2: Update GitHub Username

Important for showing your GitHub stats.

#### 1. Open GitHubActivity File

```
components/features/GitHubActivity.tsx
```

#### 2. Find This Line (around line 20)

```typescript
const username = "YOUR_GITHUB_USERNAME_HERE";
```

#### 3. Replace with Your GitHub Username

```typescript
const username = "your-actual-username";
```

#### 4. Save and Check

Your GitHub stats will now load (if you have a GitHub account).

---

### Change 3: Set Your Availability

Let people know if you're available for work.

#### 1. Open AvailabilityStatus File

```
components/features/AvailabilityStatus.tsx
```

#### 2. Find This Line

```typescript
const [status, setStatus] = useState<Status>("available");
```

#### 3. Choose Your Status

```typescript
// Option 1: Available (green)
const [status, setStatus] = useState<Status>("available");

// Option 2: Busy (yellow)
const [status, setStatus] = useState<Status>("busy");

// Option 3: Unavailable (red)
const [status, setStatus] = useState<Status>("unavailable");
```

#### 4. Save

The status indicator will update immediately!

---

## 📖 Understanding the Structure

### Main Files You'll Edit

```
portfolio/
├── components/
│   ├── sections/          # Homepage sections
│   │   ├── Hero.tsx       # Landing section
│   │   ├── About.tsx      # About you
│   │   ├── Services.tsx   # What you offer
│   │   └── Contact.tsx    # Contact form
│   │
│   ├── pages/             # Full pages
│   │   ├── Skills.tsx     # Your skills
│   │   └── AllProjects.tsx # All projects
│   │
│   └── features/          # Special features
│       ├── GitHubActivity.tsx
│       └── AvailabilityStatus.tsx
│
├── data/
│   └── resumeData.ts      # Your resume info
│
└── App.tsx               # Main file (routing)
```

### Files You Won't Edit

```
components/ui/            # Pre-built UI components
components/figma/         # Special components (protected)
styles/                   # CSS (unless changing colors)
public/                   # Static files
```

---

## 🛠️ Common Tasks

### Task: Add a New Project

#### 1. Open AllProjects.tsx

```
components/pages/AllProjects.tsx
```

#### 2. Find the Projects Array

Look for:
```typescript
const allProjects = [
  // Projects listed here
];
```

#### 3. Add Your Project

```typescript
const allProjects = [
  // Existing projects...
  
  // Your new project
  {
    id: 10, // Use next available number
    title: "My Awesome Project",
    description: "Brief description of what it does",
    image: "https://images.unsplash.com/photo-...",
    category: "Web Development",
    tags: ["React", "TypeScript"],
    demoUrl: "https://your-demo.com",
    githubUrl: "https://github.com/you/project",
  },
];
```

#### 4. Save and Check

Your new project appears on the projects page!

---

### Task: Update Your Email

#### Files to Update

1. **Contact.tsx** - Contact form
2. **Footer.tsx** - Footer section
3. **resumeData.ts** - Resume

#### Search and Replace

1. Press `Ctrl+Shift+F` (or `Cmd+Shift+F`)
2. Search for: `adelekesam10@gmail.com`
3. Replace with: `your@email.com`
4. Click "Replace All"

Done! Email updated everywhere.

---

1. Press `Ctrl+Shift+F`
2. Search for: `+234 903 411 042`
3. Replace with: `your-phone-number`
4. Click "Replace All"

---

### Task: Update Education

1. Press `Ctrl+Shift+F`
2. Search for: `Information Technology`
3. Verify it says `FUTA Information Technology (2023–Present)`

---

## 🐛 Troubleshooting

### Problem: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

---

### Problem: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000 (Windows)
taskkill /F /IM node.exe

# Or use different port
PORT=3001 npm start
```

---

### Problem: Changes not showing

**Solutions:**
1. **Hard refresh:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Restart server:**
   - Stop: `Ctrl+C` in terminal
   - Start: `npm start`
3. **Clear cache:** Empty browser cache

---

### Problem: Syntax error after editing

**Common mistakes:**
- Missing closing bracket `}`
- Missing semicolon `;`
- Typo in variable name
- Missing quote mark `"` or `'`

**Solution:**
- Read error message carefully
- Check the line number mentioned
- Look for red squiggly lines in VS Code
- Undo your last change if needed

---

## 🚀 Ready to Deploy?

When you're happy with your changes, it's time to put it online!

### Quick Deploy (Easiest)

#### Deploy to Vercel (Free)

1. **Sign up at [vercel.com](https://vercel.com)**
   - Use your GitHub account

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Login**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

5. **Done!** Your site is live! 🎉

Vercel gives you a URL like: `your-portfolio.vercel.app`

### Detailed Deployment

For more deployment options, see:
**[DEPLOYMENT-GUIDE.md](/docs/DEPLOYMENT-GUIDE.md)**

Includes:
- Netlify
- GitHub Pages
- Firebase
- Custom domain setup

---

## 📚 Next Steps

### 1. Learn More

**Read Documentation:**
- [PROJECT-OVERVIEW.md](/docs/PROJECT-OVERVIEW.md) - Understand the project
- [CUSTOMIZATION-GUIDE.md](/docs/CUSTOMIZATION-GUIDE.md) - Detailed customization
- [REACT-DEVELOPMENT-GUIDE.md](/docs/REACT-DEVELOPMENT-GUIDE.md) - Learn React

### 2. Customize Everything

Follow the complete customization guide:
- Update all personal information
- Add all your projects
- Update skills and education
- Add client testimonials
- Configure contact form

### 3. Deploy to Production

Follow deployment guide:
- Choose hosting platform
- Configure custom domain
- Set up analytics
- Monitor performance

---

## 💡 Tips for Beginners

### 1. Make Small Changes

Don't change everything at once:
- Change one thing
- Save and check
- If it works, move to next change
- If it breaks, undo (Ctrl+Z)

### 2. Read Error Messages

Errors are helpful:
- They tell you what's wrong
- Show you which line
- Usually suggest a fix

### 3. Use Git

Save your progress:
```bash
# Save your changes
git add .
git commit -m "Updated hero section"

# Create a backup
git push
```

### 4. Don't Be Afraid to Experiment

You can always:
- Undo changes (Ctrl+Z)
- Restore from git
- Re-download if needed

### 5. Ask for Help

If stuck:
- Read the error message
- Google the error
- Check documentation
- Email: adelekesam10@gmail.com

---

## 🎓 Learning Resources

### React Basics

- [React Official Tutorial](https://react.dev/learn) - Interactive
- [React in 5 Minutes](https://www.youtube.com/watch?v=MRIMT0xPXFI) - Video
- This project's [REACT-DEVELOPMENT-GUIDE.md](/docs/REACT-DEVELOPMENT-GUIDE.md)

### TypeScript

- [TypeScript in 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [TypeScript for React](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind Tutorial](https://www.youtube.com/watch?v=UBOj6rqRUME) - Video

---

## ✅ Beginner Checklist

Complete these steps in order:

### Getting Set Up
- [ ] Install Node.js
- [ ] Install VS Code
- [ ] Install Git (optional)
- [ ] Open project in VS Code
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] See portfolio in browser

### First Changes
- [ ] Change hero text to your name
- [ ] Update GitHub username
- [ ] Set availability status
- [ ] Change email address
- [ ] Change phone number

### Understanding
- [ ] Explore all pages on the site
- [ ] Open and read Hero.tsx
- [ ] Open and read About.tsx
- [ ] Understand folder structure
- [ ] Read PROJECT-OVERVIEW.md

### Customizing
- [ ] Add one project
- [ ] Update About section
- [ ] Update Services section
- [ ] Add your skills
- [ ] Update resume data

### Ready to Deploy
- [ ] All customizations complete
- [ ] Tested on mobile (Chrome DevTools)
- [ ] No errors in console
- [ ] Read DEPLOYMENT-GUIDE.md
- [ ] Choose hosting platform
- [ ] Deploy!

---

## 🎯 Your First Hour

Suggested activities for your first hour:

### 0-15 minutes: Setup
- Install prerequisites
- Open project
- Run `npm install`
- Start development server
- Explore the site

### 15-30 minutes: First Changes
- Update hero section text
- Change GitHub username
- Set availability status
- See your changes live

### 30-45 minutes: Explore
- Open different component files
- Read the comments
- Understand the structure
- Try small text changes

### 45-60 minutes: Plan
- List what you want to customize
- Read CUSTOMIZATION-GUIDE.md
- Plan your next steps
- Start customizing!

---

## 🆘 Common Questions

### Q: Do I need to know React?

**A:** No! You can:
- Make simple changes without React knowledge
- Learn as you go
- Read our React guide
- Start with just changing text and images

### Q: Can I break anything?

**A:** Don't worry!
- You can always undo (Ctrl+Z)
- Git saves your work
- You can re-download if needed
- Errors won't harm your computer

### Q: How long does customization take?

**A:** Depends on changes:
- Basic info: 30 minutes
- Add projects: 1-2 hours
- Full customization: 3-5 hours
- Learning included: 5-10 hours

### Q: Is this free?

**A:** Yes!
- All code is yours
- Run locally for free
- Deploy free on Vercel/Netlify
- Optional: Buy custom domain ($10-15/year)

### Q: Can I sell this?

**A:** This is a personal portfolio, but:
- Use for yourself: ✅ Yes
- Customize for yourself: ✅ Yes
- Use as learning resource: ✅ Yes
- Sell as-is to others: ❌ No
- Use as template for clients: ⚠️ Ask first

---

## 📞 Get Help

### When You're Stuck

1. **Read Error Message**
   - Often tells you what's wrong
   - Shows which file and line

2. **Check Documentation**
   - Search relevant guide
   - Look for similar examples
   - Read code comments

3. **Google the Error**
   - Copy error message
   - Search on Google
   - Check Stack Overflow

4. **Ask for Help**
   - Email: adelekesam10@gmail.com
   - Include:
     - What you were trying to do
     - What happened instead
     - Error message (if any)
     - Screenshot (if helpful)

---

## 🎉 You're Ready!

You now know:
- ✅ What you have (a complete portfolio)
- ✅ How to run it (npm start)
- ✅ How to make changes (edit files)
- ✅ How to deploy it (Vercel)
- ✅ Where to get help (docs + email)

**Start customizing and make it yours!**

---

## 🚀 Quick Commands Reference

```bash
# Install dependencies (once)
npm install

# Start development server
npm start

# Build for production
npm run build

# Test production build
npx serve -s build

# Deploy to Vercel
vercel --prod
```

---

**Welcome to web development! You've got this! 💪**

---

**Last Updated:** October 16, 2025  
**Author:** Adewale Samuel (Prime)  
**Contact:** adelekesam10@gmail.com
