# Customization Guide

Complete guide to customizing your portfolio for deployment.

---

## 🎯 Before You Deploy - Checklist

### ✅ Essential Customizations

- [ ] Update GitHub username in GitHubActivity component
- [ ] Set availability status
- [ ] Review personal information (already set)
- [ ] Update project data
- [ ] Add project images
- [ ] Customize services offered
- [ ] Update testimonials
- [ ] Configure contact form backend (optional)
- [ ] Add your resume PDF
- [ ] Update social media links

---

## 1️⃣ GitHub Integration

### Location
`/components/features/GitHubActivity.tsx`

### What to Change
```typescript
// Find this line (around line 20)
const username = "YOUR_GITHUB_USERNAME_HERE";

// Replace with your GitHub username
const username = "your-actual-username";
```

### Example
```typescript
const username = "adewale-samuel"; // Your GitHub username
```

### Purpose
This displays your GitHub contribution graph and statistics.

### Optional: GitHub Token
For higher API rate limits, add a GitHub personal access token:

1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token with `public_repo` scope
3. Create `.env` file in root:
```env
REACT_APP_GITHUB_TOKEN=your_token_here
```

4. Update component to use token:
```typescript
const token = process.env.REACT_APP_GITHUB_TOKEN;
// Add token to API requests
```

---

## 2️⃣ Availability Status

### Location
`/components/features/AvailabilityStatus.tsx`

### What to Change
```typescript
// Find the status state (around line 15)
const [status, setStatus] = useState<Status>("available");

// Change to your current status
const [status, setStatus] = useState<Status>("busy");
```

### Status Options
```typescript
"available"    // Green - Available for new projects
"busy"         // Yellow - Busy but can discuss
"unavailable"  // Red - Not available currently
```

### Custom Messages
```typescript
// Update the message for each status
const statusConfig = {
  available: {
    label: "Available for Work",
    message: "Open to new opportunities",
    color: "bg-green-500"
  },
  busy: {
    label: "Busy",
    message: "Limited availability",
    color: "bg-yellow-500"
  },
  unavailable: {
    label: "Unavailable",
    message: "Not taking new projects",
    color: "bg-red-500"
  }
};
```

---

## 3️⃣ Personal Information

### Already Configured ✅

The following personal information is already set:
- ✅ Name: Adewale Samuel (Prime)
- ✅ Email: adelekesam10@gmail.com
- ✅ Phone: +234 903 411 042
- ✅ Education: Information Technology @ FUTA (2023–Present)
- ✅ Title: Frontend Engineer

### If You Need to Change Anything

#### Change Name
Search and replace across all files:
```
Find: Adewale Samuel
Replace: Your Name

Find: Prime
Replace: Your Nickname
```

#### Change Contact
Search and replace in:
- `/components/sections/Contact.tsx`
- `/components/sections/Hero.tsx`
- `/components/layout/Footer.tsx`
- `/data/resumeData.ts`

#### Change Title/Role
Update in:
- `/components/sections/Hero.tsx` - Main introduction
- `/components/sections/About.tsx` - About description
- `/data/resumeData.ts` - Resume data

---

## 4️⃣ Projects Customization

### Location
Projects are defined in multiple places:

1. `/components/sections/Portfolio.tsx` - Featured projects (homepage)
2. `/components/pages/AllProjects.tsx` - All projects page
3. `/components/pages/LiveDemosPage.tsx` - Live demos

### Adding a New Project

#### In Portfolio.tsx (Featured Projects)
```typescript
const projects = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Brief description of the project",
    image: "https://images.unsplash.com/photo-...", // Use Unsplash or your image
    category: "Web App", // "Web App", "Supabase", "UI/UX"
    tags: ["React", "TypeScript", "Tailwind"],
    demoUrl: "https://your-demo-url.com",
    githubUrl: "https://github.com/yourusername/project",
    featured: true
  },
  // ... more projects
];
```

#### In AllProjects.tsx (Complete Portfolio)
```typescript
const allProjects = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Detailed project description...",
    longDescription: "Even more detailed description for the modal...",
    image: "https://...",
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB"],
    technologies: [
      { name: "React", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" }
    ],
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ],
    challenges: "What challenges you overcame...",
    solution: "How you solved them...",
    results: "The outcome/impact...",
    demoUrl: "https://demo.com",
    githubUrl: "https://github.com/...",
    timeline: "2-3 months",
    role: "Full-Stack Developer"
  },
  // ... more projects
];
```

### Project Images

#### Option 1: Use Unsplash (Current Method)
```typescript
// Search for relevant images
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
```

#### Option 2: Use Your Own Images
1. Add images to `/public/images/projects/`
2. Reference them:
```typescript
image: "/images/projects/my-project.jpg"
```

#### Option 3: Use External CDN
```typescript
image: "https://cdn.example.com/my-project-image.jpg"
```

---

## 5️⃣ Services Customization

### Location
`/components/sections/Services.tsx`

### What to Change
```typescript
const services = [
  {
    icon: Code2, // Lucide icon
    title: "Your Service Name",
    description: "Description of what you offer in this service...",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ]
  },
  // ... more services
];
```

### Available Icons
Import from `lucide-react`:
```typescript
import { 
  Code2,        // Coding
  Smartphone,   // Mobile (Note: Focus is on Web, but icon available)
  Sparkles,     // AI/Magic
  Palette,      // Design
  Database,     // Backend
  Globe,        // Web
  Layout,       // UI/UX
  Zap           // Performance
} from "lucide-react";
```

Browse all icons: [lucide.dev](https://lucide.dev)

---

## 6️⃣ Testimonials Customization

### Location
`/components/sections/Testimonials.tsx`

### What to Change
```typescript
const testimonials = [
  {
    id: 1,
    name: "Client Name",
    role: "Their Position",
    company: "Their Company",
    content: "Their testimonial about working with you...",
    rating: 5, // 1-5 stars
    image: "https://..." // Client photo (optional)
  },
  // ... more testimonials
];
```

### Tips for Testimonials
- Use real client feedback when possible
- Keep testimonials concise (2-3 sentences)
- Include specific results when available
- Mix different types of projects
- Use placeholder images from Unsplash for avatars

---

## 7️⃣ Skills Customization

### Location
`/components/pages/Skills.tsx`

### What to Change

#### Technical Skills
```typescript
const technicalSkills = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      // Add your skills with proficiency level (0-100)
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Supabase", level: 85 },
      { name: "PostgreSQL", level: 80 },
    ]
  },
  // ... more categories
];
```

#### Education
```typescript
const education = [
  {
    degree: "Your Degree",
    institution: "Your University",
    year: "2023 - 2027",
    description: "Relevant coursework or achievements"
  },
  // ... more education entries
];
```

#### Certifications
```typescript
const certifications = [
  {
    name: "Certification Name",
    issuer: "Issuing Organization",
    date: "Month Year",
    url: "https://credential-url.com" // optional
  },
  // ... more certifications
];
```

---

## 8️⃣ Resume Customization

### Location
`/data/resumeData.ts`

### What to Change
This is a centralized file with ALL your resume information:

```typescript
export const resumeData = {
  // Personal Information
  personalInfo: {
    name: "Your Full Name",
    title: "Your Professional Title",
    email: "your.email@example.com",
    phone: "+234 xxx xxx xxxx",
    location: "Your Location",
    website: "https://your-portfolio.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername"
  },
  
  // Professional Summary
  summary: "Your professional summary in 2-3 sentences...",
  
  // Work Experience
  experience: [
    {
      title: "Your Job Title",
      company: "Company Name",
      location: "City, Country",
      startDate: "Jan 2024",
      endDate: "Present", // or "Dec 2024"
      current: true, // or false
      description: "What you do/did in this role...",
      achievements: [
        "Achievement 1 with metrics",
        "Achievement 2 with results"
      ],
      technologies: ["React", "Node.js", "AWS"]
    },
    // ... more experiences
  ],
  
  // Education
  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "Your University",
      location: "City, Country",
      startDate: "2023",
      endDate: "2027",
      gpa: "3.8/4.0", // optional
      achievements: [
        "Relevant achievement",
        "Another achievement"
      ]
    },
    // ... more education
  ],
  
  // Skills (for resume)
  skills: {
    technical: ["React", "TypeScript", "Node.js", "..."],
    tools: ["Git", "VS Code", "Figma", "..."],
    soft: ["Communication", "Problem Solving", "..."]
  },
  
  // Certifications
  certifications: [
    {
      name: "Certification Name",
      issuer: "Issuing Organization",
      date: "Month Year",
      credentialUrl: "https://..."
    },
    // ... more certifications
  ],
  
  // Projects (for resume)
  projects: [
    {
      name: "Project Name",
      description: "Brief description",
      technologies: ["React", "Node.js"],
      url: "https://...",
      github: "https://github.com/..."
    },
    // ... more projects
  ]
};
```

### Using Resume Data
The resume data is automatically used in:
- `/components/pages/ResumeViewer.tsx` - Interactive resume viewer
- `/components/features/PDFResumeGenerator.tsx` - PDF generation
- `/components/sections/Resume.tsx` - Resume preview section

---

## 9️⃣ Work Process Customization

### Location
`/components/sections/WorkProcess.tsx`

### What to Change
```typescript
const processSteps = [
  {
    number: 1,
    title: "Your Step Name",
    description: "Description of this step in your process",
    icon: Lightbulb, // Lucide icon
    details: [
      "Detail about this step",
      "Another detail"
    ]
  },
  // ... more steps (typically 4-6 steps)
];
```

### Customize for Your Workflow
Think about your actual process:
1. Discovery & Research
2. Planning & Strategy
3. Design & Development
4. Testing & Refinement
5. Launch & Support

---

## 🔟 About Section Customization

### Location
`/components/sections/About.tsx`

### What to Change

#### Profile Image
```typescript
// Update the Unsplash query or use your own image
<ImageWithFallback 
  src="YOUR_IMAGE_URL_HERE"
  alt="Adewale Samuel"
/>

// OR use Unsplash with your preferred query
<ImageWithFallback 
  src="https://images.unsplash.com/photo-..."
  alt="Your Name"
/>
```

#### About Text
Edit the bio/description:
```typescript
<p>
  Your personal introduction and background...
  What you do, your passions, your approach to work...
</p>
```

#### Stats/Achievements
```typescript
const stats = [
  { label: "Projects Completed", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Years Experience", value: "3+" },
  { label: "Technologies", value: "20+" }
];
```

---

## 1️⃣1️⃣ Hero Section Customization

### Location
`/components/sections/Hero.tsx`

### What to Change

#### Background Image
```typescript
// Update Unsplash query for background
const backgroundImage = "https://images.unsplash.com/photo-...";

// Or use your own image
const backgroundImage = "/images/hero-background.jpg";
```

#### Introduction Text
```typescript
<h1>
  Hi, I'm <span>Your Name</span>
</h1>
<p>
  Your professional title and brief introduction
</p>
```

#### Call-to-Action Buttons
```typescript
<Button onClick={handleAction}>
  Your CTA Text
</Button>
```

---

## 1️⃣2️⃣ Contact Form Backend

### Current State
The contact form is **frontend-only**. Messages are not sent anywhere.

### Option 1: Add Email Integration

#### Using EmailJS (Free)
1. Sign up at [EmailJS](https://www.emailjs.com)
2. Create email template
3. Install EmailJS:
```bash
npm install @emailjs/browser
```

4. Update Contact component:
```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_PUBLIC_KEY'
    );
    toast.success('Message sent!');
  } catch (error) {
    toast.error('Failed to send message');
  }
};
```

### Option 2: Add Backend API

Create a simple backend to handle form submissions:

```typescript
// In Contact.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('https://your-api.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      toast.success('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    }
  } catch (error) {
    toast.error('Failed to send message');
  }
};
```

### Option 3: Use Form Services

- [Formspree](https://formspree.io) - Easy form backend
- [Netlify Forms](https://www.netlify.com/products/forms/) - If deploying to Netlify
- [Getform](https://getform.io) - Form backend service

---

## 1️⃣3️⃣ Social Media Links

### Location
`/components/layout/Footer.tsx`

### What to Change
```typescript
const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/yourusername'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/yourusername'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/yourusername'
  },
  // Add more social links
];
```

---

## 1️⃣4️⃣ SEO Customization

### Location
`/components/shared/SEOHead.tsx`

### What to Change

#### Default SEO Values
```typescript
const defaultSEO = {
  title: "Your Name - Your Title",
  description: "Your professional description for search engines",
  keywords: ["your", "relevant", "keywords"],
  ogImage: "https://your-domain.com/og-image.jpg",
  author: "Your Name"
};
```

#### Page-Specific SEO
Update `SEOPresets` for each page:
```typescript
export const SEOPresets = {
  home: {
    title: "Your Name - Portfolio",
    description: "Your home page description",
    keywords: ["web developer", "your skills"]
  },
  // ... other pages
};
```

---

## 1️⃣5️⃣ Color Scheme (Advanced)

### Location
`/styles/globals.css`

### What to Change

#### Color Variables
```css
:root {
  /* Primary Colors */
  --primary: 220 90% 56%;
  --primary-foreground: 0 0% 100%;
  
  /* Accent Colors */
  --accent: 220 90% 95%;
  --accent-foreground: 220 90% 10%;
  
  /* Background */
  --background: 222 47% 11%;
  --foreground: 213 31% 91%;
  
  /* ... modify these HSL values to change colors */
}
```

#### Typography
```css
:root {
  /* Font sizes */
  --font-size-base: 16px;
  --font-size-lg: 18px;
  
  /* Font families */
  font-family: system-ui, -apple-system, sans-serif;
}
```

---

## ✅ Pre-Deployment Checklist

Use this checklist before deploying:

### Required
- [ ] Updated GitHub username
- [ ] Set availability status
- [ ] Reviewed all personal information
- [ ] Updated at least 3 projects with real data
- [ ] Tested all navigation links
- [ ] Verified all external links work
- [ ] Tested contact form (or removed it)
- [ ] Added your resume PDF to `/public/resume/`

### Recommended
- [ ] Added real client testimonials
- [ ] Updated service descriptions
- [ ] Added real project images
- [ ] Configured SEO for all pages
- [ ] Added social media links
- [ ] Tested on mobile devices
- [ ] Tested in different browsers
- [ ] Optimized images (size/quality)
- [ ] Removed any placeholder/demo content
- [ ] Added Google Analytics (optional)

### Optional
- [ ] Custom domain configured
- [ ] Contact form backend integrated
- [ ] Analytics configured
- [ ] Performance optimized
- [ ] Accessibility tested
- [ ] Security headers configured

---

## 🧪 Testing Your Customizations

### Before Deploying

1. **Run Development Server**
```bash
npm start
```

2. **Test All Pages**
- Home page loads correctly
- All navigation links work
- Projects display properly
- Skills page shows your data
- Resume displays correctly
- Contact form works (if backend configured)

3. **Test Responsiveness**
- Open DevTools
- Test mobile view (375px)
- Test tablet view (768px)
- Test desktop view (1920px)

4. **Test in Multiple Browsers**
- Chrome/Edge
- Firefox
- Safari (if on Mac)

5. **Build and Test Production**
```bash
npm run build
serve -s build
```

6. **Check Console**
- No errors in browser console
- No warnings (or acceptable ones)

---

## 💡 Tips for Customization

### 1. Start Small
Don't change everything at once. Start with essential items.

### 2. Keep Backups
Before making major changes:
```bash
git commit -m "Before customization"
```

### 3. Test Frequently
Test after each major change to catch issues early.

### 4. Use Real Data
Replace placeholder data with real information gradually.

### 5. Maintain Consistency
- Use consistent terminology
- Keep design patterns uniform
- Maintain similar image styles

### 6. Document Your Changes
Keep notes of what you customized for future reference.

---

## 🆘 Need Help?

If you encounter issues:

1. **Check Documentation**
   - Read relevant guide in `/docs`
   - Check component documentation

2. **Search for Errors**
   - Google the error message
   - Check React documentation
   - Check TypeScript errors

3. **Contact Developer**
   - Email: adelekesam10@gmail.com
   - Include error details
   - Describe what you were trying to do

---

## 📚 Next Steps

After customization:

1. Review [DEPLOYMENT-GUIDE.md](/docs/DEPLOYMENT-GUIDE.md)
2. Test thoroughly
3. Deploy to hosting platform
4. Monitor for issues
5. Gather feedback
6. Iterate and improve

---

**Last Updated:** October 16, 2025  
**Author:** Adewale Samuel (Prime)
