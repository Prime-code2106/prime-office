# Component Documentation

Complete reference for all React components in the portfolio.

---

## 📐 Component Architecture

### Component Categories

1. **Layout Components** - Header, Footer
2. **Section Components** - Hero, About, Services, etc.
3. **Page Components** - Full page views
4. **Feature Components** - Specialized functionality
5. **Shared Components** - Reusable utilities
6. **UI Components** - Shadcn/ui library

---

## 🎯 Layout Components

### Header Component
**Location:** `/components/layout/Header.tsx`  
**Purpose:** Main navigation bar with responsive menu

**Props:**
```typescript
interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}
```

**Features:**
- Sticky navigation
- Mobile hamburger menu
- Active page highlighting
- Smooth scroll behavior
- Dark mode optimized

**Usage:**
```tsx
<Header 
  currentPage={currentPage} 
  onNavigate={handleNavigate} 
/>
```

---

### Footer Component
**Location:** `/components/layout/Footer.tsx`  
**Purpose:** Site footer with social links and copyright

**Props:** None

**Features:**
- Social media links
- Contact information
- Copyright notice
- Responsive layout

**Usage:**
```tsx
<Footer />
```

---

## 🏠 Section Components

### Hero Component
**Location:** `/components/sections/Hero.tsx`  
**Purpose:** Landing page hero section

**Props:**
```typescript
interface HeroProps {
  onNavigate: (page: PageType) => void;
}
```

**Features:**
- Full-screen background
- Animated text introduction
- Call-to-action buttons
- Availability status widget
- Responsive design

**Customization:**
- Background image: Update Unsplash query
- Intro text: Modify component content
- CTA buttons: Update button actions

---

### About Component
**Location:** `/components/sections/About.tsx`  
**Purpose:** Personal introduction section

**Props:** None

**Features:**
- Profile image
- Bio text
- Key achievements
- Download resume button
- Scroll reveal animation

---

### Services Component
**Location:** `/components/sections/Services.tsx`  
**Purpose:** Display offered services

**Props:** None

**Features:**
- Service cards with icons
- Four main service categories:
  1. Web Development
  2. App Development
  3. AI Prompting Consultation
  4. Branding & Product Management
- Hover effects
- Icon animations

**Customization:**
- Edit service descriptions in component
- Update icons from lucide-react
- Modify service pricing/details

---

### Portfolio Component
**Location:** `/components/sections/Portfolio.tsx`  
**Purpose:** Featured project showcase

**Props:**
```typescript
interface PortfolioProps {
  onNavigate: (page: PageType) => void;
}
```

**Features:**
- Featured project cards
- Project filtering
- Category tags
- View all projects button
- Live demo links

**Customization:**
- Update project data in component
- Add project images
- Modify project categories

---

### Testimonials Component
**Location:** `/components/sections/Testimonials.tsx`  
**Purpose:** Client testimonials carousel

**Props:** None

**Features:**
- Manual navigation (no auto-play)
- 5-star rating system
- Client avatars
- Previous/Next buttons
- Responsive cards

**Customization:**
- Add/edit testimonials in component
- Update client information
- Modify testimonial content

---

### Contact Component
**Location:** `/components/sections/Contact.tsx`  
**Purpose:** Contact form and information

**Props:** None

**Features:**
- Contact form (frontend validation)
- Email: adelekesam10@gmail.com
- Phone: +234 903 411 042
- Social media links
- Form validation
- Success/error notifications

**Note:** Form submission is frontend-only. Backend integration needed for production.

---

### WorkProcess Component
**Location:** `/components/sections/WorkProcess.tsx`  
**Purpose:** Visual workflow representation

**Props:**
```typescript
interface WorkProcessProps {
  onNavigate?: (page: PageType) => void;
}
```

**Features:**
- Step-by-step process
- Interactive timeline
- Icon representations
- Detailed descriptions
- 5-step workflow

---

## 📄 Page Components

### Skills Component
**Location:** `/components/pages/Skills.tsx`  
**Purpose:** Complete skills and education page

**Props:**
```typescript
interface SkillsProps {
  onNavigate: (page: PageType) => void;
}
```

**Features:**
- Technical skills grid
- Skill proficiency bars
- Education timeline
- Certifications
- Tools & technologies

**Customization:**
- Update skills list
- Modify proficiency levels
- Add certifications

---

### AllProjects Component
**Location:** `/components/pages/AllProjects.tsx`  
**Purpose:** Complete project portfolio

**Props:**
```typescript
interface AllProjectsProps {
  onNavigate: (page: PageType) => void;
}
```

**Features:**
- Project grid layout
- Category filtering
- Search functionality
- Project details modal
- GitHub links

**Customization:**
- Add projects in component data
- Update project images
- Modify categories

---

### ResumeViewer Component
**Location:** `/components/pages/ResumeViewer.tsx`  
**Purpose:** Interactive resume display

**Props:**
```typescript
interface ResumeViewerProps {
  onNavigate: (page: PageType) => void;
}
```

**Features:**
- PDF download button
- Print functionality
- Responsive layout
- Timeline format
- Professional styling

**Data Source:** `/data/resumeData.ts`

---

### LiveDemosPage Component
**Location:** `/components/pages/LiveDemosPage.tsx`  
**Purpose:** Interactive project demos

**Props:**
```typescript
interface LiveDemosPageProps {
  onNavigate: (page: PageType) => void;
}
```

**Features:**
- Live project previews
- Interactive demonstrations
- Code snippets
- Technology tags

---

## 🔧 Feature Components

### GitHubActivity Component
**Location:** `/components/features/GitHubActivity.tsx`  
**Purpose:** Display GitHub contribution data

**Props:** None

**Configuration:**
```typescript
// Update this with your GitHub username
const username = "YOUR_GITHUB_USERNAME_HERE";
```

**Features:**
- Contribution graph
- Repository stats
- Recent activity
- Language breakdown

**Setup Required:**
1. Update username constant
2. Optionally configure GitHub token for higher API limits

---

### AvailabilityStatus Component
**Location:** `/components/features/AvailabilityStatus.tsx`  
**Purpose:** Real-time availability indicator

**Props:** None

**Configuration:**
```typescript
const [status, setStatus] = useState<Status>("available");
```

**Status Options:**
- `"available"` - Green indicator
- `"busy"` - Yellow indicator
- `"unavailable"` - Red indicator

**Features:**
- Color-coded status
- Custom message
- Responsive badge
- Real-time updates

---

### PDFResumeGenerator Component
**Location:** `/components/features/PDFResumeGenerator.tsx`  
**Purpose:** Generate and download PDF resume

**Props:** None

**Features:**
- Professional PDF layout
- Realistic timeline (2023-2025)
- Contact information
- Skills and experience
- Education details

**Dependencies:**
- jspdf library
- Data from `/data/resumeData.ts`

---

### InteractiveProjectDemos Component
**Location:** `/components/features/InteractiveProjectDemos.tsx`  
**Purpose:** Interactive project demonstrations

**Props:**
```typescript
interface InteractiveProjectDemosProps {
  projectId?: string;
}
```

**Features:**
- Live code editors
- Preview panes
- Multiple demo types
- Technology showcases

---

## 🔄 Shared Components

### SEOHead Component
**Location:** `/components/shared/SEOHead.tsx`  
**Purpose:** Dynamic SEO meta tags

**Props:**
```typescript
interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
}
```

**Presets Available:**
- `SEOPresets.home`
- `SEOPresets.skills`
- `SEOPresets.projects`
- `SEOPresets.resume`
- `SEOPresets.liveDemos`

**Usage:**
```tsx
<SEOHead {...SEOPresets.home} />
```

---

### ScrollReveal Component
**Location:** `/components/shared/ScrollReveal.tsx`  
**Purpose:** Scroll-triggered animations

**Props:**
```typescript
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}
```

**Features:**
- Smooth entrance animations
- Configurable direction
- Delay options
- IntersectionObserver API

**Usage:**
```tsx
<ScrollReveal direction="up" delay={0.2}>
  <YourComponent />
</ScrollReveal>
```

---

### ThemeProvider Component
**Location:** `/components/shared/ThemeProvider.tsx`  
**Purpose:** Theme context provider

**Props:**
```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "dark" | "light" | "system";
}
```

**Features:**
- Dark mode only (forced)
- Theme persistence
- CSS variable management

**Note:** Currently configured for dark mode only. Light mode infrastructure exists but is not used.

---

## 🎨 UI Components (Shadcn/ui)

Located in `/components/ui/`

### Available Components:

| Component | Purpose | File |
|-----------|---------|------|
| Button | Action buttons | button.tsx |
| Card | Content containers | card.tsx |
| Dialog | Modal dialogs | dialog.tsx |
| Input | Form inputs | input.tsx |
| Textarea | Multi-line input | textarea.tsx |
| Badge | Status badges | badge.tsx |
| Avatar | User avatars | avatar.tsx |
| Tabs | Tabbed content | tabs.tsx |
| Accordion | Collapsible content | accordion.tsx |
| Tooltip | Hover tooltips | tooltip.tsx |
| Progress | Progress bars | progress.tsx |
| Separator | Divider lines | separator.tsx |
| Sheet | Side panels | sheet.tsx |
| Alert | Notification alerts | alert.tsx |

**Usage Example:**
```tsx
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardContent } from "./components/ui/card";

<Button variant="default">Click Me</Button>
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

---

## 📊 Data Files

### Resume Data
**Location:** `/data/resumeData.ts`  
**Purpose:** Centralized resume information

**Structure:**
```typescript
export const resumeData = {
  personalInfo: { ... },
  summary: "...",
  experience: [ ... ],
  education: [ ... ],
  skills: { ... },
  certifications: [ ... ],
  projects: [ ... ]
}
```

**Usage:**
```typescript
import { resumeData } from '../data/resumeData';
```

---

## 🎯 Component Best Practices

### 1. Props Interface
Always define TypeScript interfaces for props:
```typescript
interface ComponentProps {
  title: string;
  onAction?: () => void;
}
```

### 2. JSDoc Comments
Document component purpose and usage:
```typescript
/**
 * ComponentName - Brief description
 * 
 * @param {string} title - The component title
 * @returns {JSX.Element} Rendered component
 */
```

### 3. Responsive Design
Use Tailwind breakpoints:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### 4. Accessibility
Include ARIA labels and semantic HTML:
```tsx
<button aria-label="Close dialog">
```

### 5. Performance
Memoize expensive operations:
```typescript
const memoizedValue = useMemo(() => expensiveOperation(), [deps]);
```

---

## 🔄 Component Communication

### Navigation Pattern
```typescript
// Parent (App.tsx)
const [currentPage, setCurrentPage] = useState<PageType>('home');

const handleNavigate = (page: PageType) => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Pass to children
<Component onNavigate={handleNavigate} />
```

### Event Handling
```typescript
// Child component
interface ComponentProps {
  onNavigate: (page: PageType) => void;
}

// Usage
<button onClick={() => onNavigate('projects')}>
  View Projects
</button>
```

---

## 🐛 Debugging Components

### React DevTools
- Install React DevTools browser extension
- Inspect component props and state
- Profile performance

### Common Issues

**Component not rendering:**
- Check import paths
- Verify props are passed correctly
- Check for TypeScript errors

**Styling not applying:**
- Ensure Tailwind classes are correct
- Check for conflicting styles
- Verify globals.css is imported

**State not updating:**
- Check if setState is called correctly
- Verify dependencies in useEffect
- Look for immutability issues

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

---

**Last Updated:** October 16, 2025
