/**
 * SEO HEAD COMPONENT
 * Manages all SEO meta tags, Open Graph, Twitter Cards, and structured data
 * 
 * FEATURES:
 * - Dynamic meta tag management
 * - Open Graph tags for social media (Facebook, LinkedIn)
 * - Twitter Card integration
 * - JSON-LD structured data (Schema.org)
 * - Page-specific SEO optimization
 * 
 * CUSTOMIZATION NOTES:
 * - Update siteUrl with your actual domain
 * - Change social media handles (@adewale_prime)
 * - Update social media profile URLs
 * - Modify default description and keywords
 */

import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  twitterHandle?: string;
}

export function SEOHead({
  title = "Adewale Samuel (Prime) - Frontend Engineer | Web Application Expert",
  description = "Experienced Frontend Engineer specializing in React, Tailwind CSS, and Supabase. Building clean, performant, and scalable web applications.",
  keywords = "Frontend Engineer, Web Developer, React Developer, Supabase Expert, Tailwind CSS, Lagos Nigeria, Remote Developer",
  image = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop",
  url = "https://adewale-samuel.vercel.app", // 👈 CHANGE TO YOUR DOMAIN
  type = "website",
  author = "Adewale Samuel",
  twitterHandle = "@adewale_prime" // 👈 CHANGE TO YOUR TWITTER
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.content = content;
    };

    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Open Graph Tags (Facebook, LinkedIn)
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Adewale Samuel Portfolio', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', twitterHandle); // 👈 CHANGE THIS
    updateMetaTag('twitter:site', twitterHandle); // 👈 CHANGE THIS

    // Additional Meta Tags
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;

    // JSON-LD Structured Data (Schema.org)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Adewale Samuel",
      "alternateName": "Prime",
      "jobTitle": "Frontend Engineer",
      "description": description,
      "url": url,
      "image": image,
      "sameAs": [
        "https://www.linkedin.com/in/adewale-samuel-b8915b395?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        "https://github.com/Daddy-prim"
      ],
      "knowsAbout": [
        "Frontend Engineering",
        "Web Application Development",
        "Supabase Integration",
        "UI/UX Design",
        "React",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "Nigeria"
      }
    };

    // Add or update JSON-LD script
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, type, author, twitterHandle]);

  // This component doesn't render anything visible
  return null;
}

/**
 * SEO PRESETS
 * Pre-configured SEO settings for different pages
 * CUSTOMIZATION: Update these for your actual pages
 */
export const SEOPresets = {
  home: {
    title: "Adewale Samuel (Prime) - Frontend Engineer | Web App Expert",
    description: "Experienced Frontend Engineer specializing in React, Tailwind CSS, and Supabase integration. Building modern, performant web experiences.",
    keywords: "Frontend Engineer, Web Developer, React Developer, Supabase, Tailwind CSS, Lagos Nigeria, Remote Developer",
    url: "https://adewale-samuel.vercel.app"
  },
  
  skills: {
    title: "Skills & Education - Adewale Samuel",
    description: "Overview of my technical skills in Frontend Engineering, Supabase integration, and Web Application development.",
    keywords: "Technical Skills, React, JavaScript, TypeScript, Supabase, Tailwind CSS, Web Development Skills",
    url: "https://adewale-samuel.vercel.app/skills"
  },
  
  projects: {
    title: "Projects Portfolio - Adewale Samuel",
    description: "Explore my portfolio of web applications and frontend projects. View live demos and technical implementations.",
    keywords: "Portfolio, Web Projects, React Apps, Supabase Projects, Frontend Engineer, Live Demos",
    url: "https://adewale-samuel.vercel.app/projects"
  },
  
  resume: {
    title: "Resume - Adewale Samuel (Prime)",
    description: "Download my professional resume showcasing 3+ years of experience in full-stack development, AI solutions, and brand consulting.",
    keywords: "Resume, CV, Developer Resume, Full-Stack Developer Resume, Download Resume",
    url: "https://adewale-samuel.vercel.app/resume"
  },
  
  liveDemos: {
    title: "Live Interactive Demos - Adewale Samuel",
    description: "Try fully functional demos showcasing my development skills. Interactive calculator, todo app, color tools, and API integrations.",
    keywords: "Live Demos, Interactive Demos, Code Samples, Working Demos, Developer Skills",
    url: "https://adewale-samuel.vercel.app/live-demos"
  }
};