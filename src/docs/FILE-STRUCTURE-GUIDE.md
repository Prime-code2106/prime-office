# File Structure & Organization Guide

Complete guide to the portfolio's file organization and architecture.

---

## 📁 Current Directory Structure

```
portfolio/
│
├── 📂 docs/                                    # Documentation files
│   ├── PROJECT-OVERVIEW.md                     # Project introduction & overview
│   ├── COMPONENT-DOCUMENTATION.md              # Component API reference
│   ├── FILE-STRUCTURE-GUIDE.md                 # This file
│   ├── CUSTOMIZATION-GUIDE.md                  # How to customize
│   ├── DEPLOYMENT-GUIDE.md                     # Deployment instructions
│   └── API-INTEGRATION-GUIDE.md                # Backend integration guide
│
├── 📂 components/                              # React components
│   │
│   ├── 📂 layout/                              # Layout components
│   │   ├── Header.tsx                          # Main navigation header
│   │   └── Footer.tsx                          # Site footer
│   │
│   ├── 📂 sections/                            # Homepage sections
│   │   ├── Hero.tsx                            # Hero/landing section
│   │   ├── About.tsx                           # About me section
│   │   ├── Services.tsx                        # Services offered
│   │   ├── Portfolio.tsx                       # Portfolio preview
│   │   ├── Testimonials.tsx                    # Client testimonials
│   │   ├── Contact.tsx                         # Contact form
│   │   ├── Resume.tsx                          # Resume preview section
│   │   └── WorkProcess.tsx                     # Work process section
│   │
│   ├── 📂 pages/                               # Full page components
│   │   ├── Skills.tsx                          # Skills & education page
│   │   ├── AllProjects.tsx                     # All projects page
│   │   ├── ResumeViewer.tsx                    # Full resume page
│   │   └── LiveDemosPage.tsx                   # Live demos page
│   │
│   ├── 📂 features/                            # Feature components
│   │   ├── GitHubActivity.tsx                  # GitHub stats widget
│   │   ├── AvailabilityStatus.tsx              # Availability indicator
│   │   ├── PDFResumeGenerator.tsx              # PDF generation logic
│   │   ├── InteractiveProjectDemos.tsx         # Interactive demos
│   │   └── LiveProjectViewer.tsx               # Project viewer
│   │
│   ├── 📂 shared/                              # Shared/utility components
│   │   ├── SEOHead.tsx                         # SEO meta tags
│   │   ├── ScrollReveal.tsx                    # Scroll animations
│   │   └── ThemeProvider.tsx                   # Theme context
│   │
│   ├── 📂 ui/                                  # Shadcn UI components
│   │   ├── button.tsx                          # Button component
│   │   ├── card.tsx                            # Card component
│   │   ├── dialog.tsx                          # Dialog/modal
│   │   ├── input.tsx                           # Input field
│   │   ├── badge.tsx                           # Badge component
│   │   └── ... (40+ UI components)
│   │
│   └── 📂 figma/                               # Figma integration
│       └── ImageWithFallback.tsx               # Image component (protected)
│
├── 📂 data/                                    # Application data
│   └── resumeData.ts                           # Resume information
│
├── 📂 styles/                                  # Global styles
│   └── globals.css                             # Tailwind & custom CSS
│
├── 📂 public/                                  # Static assets
│   ├── index.html                              # HTML template
│   └── 📂 resume/                              # Resume files
│       ├── Adewale_Samuel_Prime_Resume.pdf
│       └── index.html
│
├── 📂 src/                                     # Legacy/deprecated files
│   └── DEPRECATED.md                           # Deprecation notice
│
├── App.tsx                                     # Main app component
├── index.tsx                                   # App entry point
├── package.json                                # Dependencies
├── tsconfig.json                               # TypeScript config
└── README.md                                   # Main readme
```

---

## 🎯 Folder Purposes

### `/docs/` - Documentation
**Purpose:** All project documentation in Markdown format  
**Contents:**
- Project overview and introduction
- Component API documentation
- Customization guides
- Deployment instructions
- Integration guides

**When to add files:**
- Creating new feature documentation
- Writing setup guides
- Adding troubleshooting docs

---

### `/components/` - React Components
**Purpose:** All React components organized by purpose

#### `/components/layout/`
**What:** Core layout components used across pages  
**Components:**
- `Header.tsx` - Navigation bar
- `Footer.tsx` - Site footer

**When to add:**
- Creating new layout wrappers
- Adding sidebars or navigation

#### `/components/sections/`
**What:** Homepage sections (used in main landing page)  
**Components:**
- `Hero.tsx` - Landing hero
- `About.tsx` - About section
- `Services.tsx` - Services section
- `Portfolio.tsx` - Portfolio preview
- `Testimonials.tsx` - Client reviews
- `Contact.tsx` - Contact form
- `Resume.tsx` - Resume preview
- `WorkProcess.tsx` - Process section

**When to add:**
- Adding new homepage sections
- Creating landing page features

#### `/components/pages/`
**What:** Full page components (standalone pages)  
**Components:**
- `Skills.tsx` - Skills & education page
- `AllProjects.tsx` - Complete projects showcase
- `ResumeViewer.tsx` - Full resume display
- `LiveDemosPage.tsx` - Interactive demos

**When to add:**
- Creating new standalone pages
- Adding multi-section page views

#### `/components/features/`
**What:** Specialized feature components  
**Components:**
- `GitHubActivity.tsx` - GitHub integration
- `AvailabilityStatus.tsx` - Status indicator
- `PDFResumeGenerator.tsx` - PDF generation
- `InteractiveProjectDemos.tsx` - Demo viewers
- `LiveProjectViewer.tsx` - Project previews

**When to add:**
- Building new features
- Creating interactive widgets
- Adding third-party integrations

#### `/components/shared/`
**What:** Reusable utility components  
**Components:**
- `SEOHead.tsx` - Meta tags
- `ScrollReveal.tsx` - Animations
- `ThemeProvider.tsx` - Theme management

**When to add:**
- Creating reusable utilities
- Building HOCs (Higher Order Components)
- Adding context providers

#### `/components/ui/`
**What:** Shadcn/ui component library  
**Note:** Pre-built, don't modify unless customizing  
**Contains:** 40+ UI components

**When to add:**
- Installing new Shadcn components
- DO NOT create custom components here

#### `/components/figma/`
**What:** Figma integration components  
**Note:** Protected - do not modify  
**Contains:** `ImageWithFallback.tsx`

---

### `/data/` - Application Data
**Purpose:** Centralized data storage  
**Contents:**
- `resumeData.ts` - Resume information

**When to add:**
- Creating data constants
- Adding configuration files
- Storing static content

**File naming:**
- `*Data.ts` for data files
- `*Config.ts` for configurations

---

### `/styles/` - Global Styles
**Purpose:** Global CSS and Tailwind configuration  
**Contents:**
- `globals.css` - Tailwind imports & custom CSS

**When to modify:**
- Changing color scheme
- Adding global styles
- Updating typography defaults

---

### `/public/` - Static Assets
**Purpose:** Static files served directly  
**Contents:**
- `index.html` - HTML template
- `/resume/` - Resume PDFs

**When to add:**
- Adding images (though prefer CDN)
- Static documents
- Favicon files
- robots.txt, sitemap.xml

---

### `/src/` - Deprecated
**Purpose:** Legacy code (not in use)  
**Note:** Can be safely deleted

---

## 📝 File Naming Conventions

### Components
```
PascalCase.tsx
Examples:
- Header.tsx
- GitHubActivity.tsx
- PDFResumeGenerator.tsx
```

### Data Files
```
camelCase.ts or kebab-case.ts
Examples:
- resumeData.ts
- project-data.ts
- site-config.ts
```

### Documentation
```
UPPERCASE-WITH-DASHES.md
Examples:
- PROJECT-OVERVIEW.md
- DEPLOYMENT-GUIDE.md
- API-REFERENCE.md
```

### Styles
```
kebab-case.css
Examples:
- globals.css
- custom-utilities.css
```

---

## 🔍 How to Find Components

### By Feature

**Navigation/Layout:**
- Header → `/components/layout/Header.tsx`
- Footer → `/components/layout/Footer.tsx`

**Homepage Sections:**
- All in `/components/sections/`

**Standalone Pages:**
- All in `/components/pages/`

**Special Features:**
- GitHub widget → `/components/features/GitHubActivity.tsx`
- Status badge → `/components/features/AvailabilityStatus.tsx`
- PDF generator → `/components/features/PDFResumeGenerator.tsx`

**Utilities:**
- SEO → `/components/shared/SEOHead.tsx`
- Animations → `/components/shared/ScrollReveal.tsx`
- Theme → `/components/shared/ThemeProvider.tsx`

**UI Elements:**
- All Shadcn components → `/components/ui/`

---

## 🚀 Adding New Files

### New Component Checklist

1. **Determine category:**
   - Layout? → `/components/layout/`
   - Section? → `/components/sections/`
   - Page? → `/components/pages/`
   - Feature? → `/components/features/`
   - Utility? → `/components/shared/`

2. **Create file:**
   ```bash
   touch components/[category]/ComponentName.tsx
   ```

3. **Add boilerplate:**
   ```typescript
   /**
    * COMPONENT_NAME
    * Brief description of purpose
    * 
    * @component
    */
   
   import React from 'react';
   
   interface ComponentNameProps {
     // Define props
   }
   
   export function ComponentName({ ...props }: ComponentNameProps) {
     return (
       <div>
         {/* Component JSX */}
       </div>
     );
   }
   ```

4. **Import in App.tsx:**
   ```typescript
   import { ComponentName } from "./components/[category]/ComponentName";
   ```

5. **Use in render:**
   ```typescript
   <ComponentName {...props} />
   ```

---

## 📦 Import Patterns

### Absolute vs Relative Imports

**From App.tsx (root):**
```typescript
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
```

**From components:**
```typescript
// UI components
import { Button } from "../ui/button";

// Same directory
import { Helper } from "./Helper";

// Parent directory
import { resumeData } from "../../data/resumeData";
```

### Import Organization

Always organize imports in this order:
```typescript
// 1. React & core libraries
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

// 3. UI components
import { Button } from '../ui/button';
import { Card } from '../ui/card';

// 4. Local components
import { Header } from './Header';

// 5. Data & utilities
import { resumeData } from '../data/resumeData';

// 6. Types
import type { PageType } from '../App';

// 7. Styles (if any)
import './styles.css';
```

---

## 🔧 Configuration Files

### Root Level Files

**`package.json`**
- Dependencies & scripts
- Project metadata

**`tsconfig.json`**
- TypeScript configuration
- Compiler options

**`tailwind.config.js`** (if created)
- Tailwind customization
- Currently using CSS-based config

**`craco.config.js`**
- Create React App override
- Custom webpack config

---

## 🗑️ Files to Delete (Cleanup)

### Safe to Delete:

```
/src/                           # Deprecated folder
/env/                           # Old environment files
/env-config/                    # Old config files
/gitignore/                     # Gitignore templates (unnecessary)
/temp_backup.md                 # Temporary backup
/debug-startup.js               # Debug file

Documentation (consolidate):
/ALL-DONE-SUMMARY.md
/COMPLETE-UPDATE-SUMMARY.md
/COMPONENTS-SHOWCASE.md
/DEPLOYMENT-CHECKLIST.md
/FINAL-SUMMARY.md
/GITHUB-STATS-SETUP.md
/IMPLEMENTATION-SUMMARY.md
/NEW-FEATURES.md
/PROFILE-UPDATES-COMPLETE.md
/PROJECT-STATUS.md
/QUICK-CUSTOMIZATION-GUIDE.md
/QUICK-FIX.md
/QUICK-START.md
/STARTUP-GUIDE.md
/Attributions.md
/BACKEND-SETUP-GUIDE.md
```

**Note:** All important info from these files has been consolidated into `/docs/`

### Protected Files (DO NOT DELETE):

```
/components/figma/ImageWithFallback.tsx
/components/ui/*                # All Shadcn components
/data/resumeData.ts
/styles/globals.css
/public/index.html
/App.tsx
/index.tsx
/package.json
/tsconfig.json
```

---

## 📊 Component Dependency Map

```
App.tsx
├── ThemeProvider
├── SEOHead
├── Header
│   ├── AvailabilityStatus
│   └── UI Components (Button, etc.)
├── Hero
│   ├── AvailabilityStatus
│   └── ScrollReveal
├── About
│   └── ScrollReveal
├── Services
│   └── ScrollReveal
├── Portfolio
│   ├── ScrollReveal
│   └── UI Components
├── Testimonials
│   └── ScrollReveal
├── WorkProcess
│   └── ScrollReveal
├── Resume
│   ├── PDFResumeGenerator
│   └── ScrollReveal
├── Contact
│   ├── ScrollReveal
│   └── UI Components (Form, Input, etc.)
└── Footer

Skills Page
├── GitHubActivity
└── ScrollReveal

Projects Page
├── ScrollReveal
└── UI Components

Resume Viewer
├── PDFResumeGenerator
└── resumeData

Live Demos Page
├── InteractiveProjectDemos
└── LiveProjectViewer
```

---

## 🎨 Styling Structure

### Tailwind Utilities (`/styles/globals.css`)

```css
/* Layer structure */
@tailwind base;      /* Reset & base styles */
@tailwind components; /* Component classes */
@tailwind utilities;  /* Utility classes */

/* Custom properties */
@layer base {
  :root {
    /* Color variables */
    /* Typography variables */
  }
}
```

### Component Styles

**Prefer:** Tailwind utility classes  
**Use inline styles for:** Dynamic values only

```tsx
// Good
<div className="p-4 bg-gray-900 rounded-lg">

// Only when necessary
<div style={{ height: `${dynamicHeight}px` }}>
```

---

## 🔐 Environment Variables

**Location:** Create `.env` file in root (not committed)

```env
# GitHub Integration
REACT_APP_GITHUB_TOKEN=your_token_here

# Analytics (if needed)
REACT_APP_GA_ID=your_ga_id

# API Keys (if needed)
REACT_APP_API_URL=your_api_url
```

**Usage:**
```typescript
const token = process.env.REACT_APP_GITHUB_TOKEN;
```

---

## 📝 Best Practices

### 1. One Component Per File
❌ Don't:
```typescript
// Header.tsx
export function Header() { ... }
export function HeaderNav() { ... }
export function HeaderLogo() { ... }
```

✅ Do:
```
/components/layout/
├── Header.tsx
├── HeaderNav.tsx
└── HeaderLogo.tsx
```

### 2. Logical Organization
Group related components together in folders

### 3. Clear Naming
File name should match component name exactly

### 4. Consistent Exports
Use named exports for components:
```typescript
export function ComponentName() { ... }
```

Exception: App.tsx uses default export

---

## 🚨 Common Issues

### Import Errors
**Problem:** Cannot find module  
**Solution:** Check relative path, ensure file exists

### Circular Dependencies
**Problem:** Component imports create loop  
**Solution:** Extract shared code to utilities

### Missing Dependencies
**Problem:** Module not found  
**Solution:** `npm install [package]`

---

## 📚 Quick Reference

### Creating New Component

```bash
# 1. Create file
touch components/[folder]/ComponentName.tsx

# 2. Add code with comments
# 3. Import in parent
# 4. Use component
```

### Moving Component

```bash
# 1. Move file to new location
mv components/old/Component.tsx components/new/

# 2. Update all imports
# Search: "./old/Component"
# Replace: "./new/Component"
```

### Deleting Component

```bash
# 1. Search for all usages
# 2. Remove imports
# 3. Delete file
rm components/folder/Component.tsx
```

---

**Last Updated:** October 16, 2025  
**Maintained by:** Adewale Samuel (Prime)
