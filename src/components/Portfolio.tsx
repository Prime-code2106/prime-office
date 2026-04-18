/**
 * PORTFOLIO SECTION COMPONENT
 * Featured projects showcase on the home page
 * 
 * CUSTOMIZATION NOTES:
 * - Replace project images with your actual project screenshots
 * - Update project titles, descriptions, and technologies
 * - Modify GitHub and live demo links
 * - Add or remove projects as needed
 * - "View All Projects" button navigates to dedicated projects page
 */

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LiveProjectViewer } from "./LiveProjectViewer";
import { ExternalLink, Github, Eye, Play } from "lucide-react";
import { PageType } from "../App";

interface PortfolioProps {
  onNavigate: (page: PageType) => void;
}

export function Portfolio({ onNavigate }: PortfolioProps) {
  /**
   * FEATURED PORTFOLIO ITEMS WITH LIVE VIEW SUPPORT
   * CUSTOMIZATION: Replace with your actual projects
   * - Update images with your project screenshots
   * - Add multiple screenshots to the screenshots array
   * - Modify project names (currently using demo names)
   * - Update descriptions and technologies
   * - Replace placeholder URLs with actual project links
   * - Set isInteractive to true for projects with interactive demos
   * - Add demoType for appropriate device previews
   */
  /**
   * PORTFOLIO DATA STRUCTURE
   * To add more projects: Simply add a new object to the appropriate category array below.
   * Categories: Web Development, Web Application, Interactive Projects
   */
  const portfolioItems = [
    // --- WEB DEVELOPMENT PROJECTS ---
    {
      id: 1,
      category: "Web Development",
      title: "Prime E-Commerce Platform",
      description: "A modern, responsive e-commerce platform integrated with Supabase for authentication and database management. Features real-time inventory and safe checkout.",
      image: "https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc1ODY0MDU2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      screenshots: [
        "https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc1ODY0MDU2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGNhcnQlMjB3ZWJ|ZW58MXx8fHwxNzU4NjQ0NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ],
      tags: ["React", "Tailwind", "Supabase", "Auth"],
      technologies: ["React", "Tailwind", "Supabase", "Auth"],
      featured: true,
      githubUrl: "https://github.com/Daddy-prim/ecommerce-platform",
      liveUrl: "https://vercel.com",
      demoType: "web" as const,
      isInteractive: true
    },
    // --- WEB APPLICATION PROJECTS ---
    {
      id: 2,
      category: "Web Application", 
      title: "SaaS Analytics Dashboard",
      description: "A comprehensive administrative dashboard for SaaS businesses, featuring real-time data visualization with Recharts and Supabase state management.",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjB3ZWIlMjBhcHBsaWNhdGlvbnxlbnwxfHx8fDE3NTg2NjgyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bbbda536339a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjB3ZWIlMjBhcHBsaWNhdGlvbnxlbnwxfHx8fDE3NTg2NjgyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ],
      tags: ["React", "Tailwind", "Recharts", "Supabase"],
      technologies: ["React", "Tailwind", "Recharts", "Supabase"],
      featured: true,
      githubUrl: "https://github.com/Daddy-prim/saas-dashboard",
      liveUrl: "https://vercel.com",
      demoType: "web" as const,
      isInteractive: true
    },
    // --- INTERACTIVE PROJECTS ---
    {
      id: 3,
      category: "Interative Projects", 
      title: "TaskPulse Task Manager",
      description: "A web-based task management tool designed for teams, focusing on real-time task updates and collaboration using Supabase Realtime.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NTg2NjgyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      screenshots: [
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NTg2NjgyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ],
      tags: ["React", "Supabase Realtime", "Tailwind CSS"],
      technologies: ["React", "Supabase Realtime", "Tailwind CSS"],
      featured: false,
      githubUrl: "https://github.com/Daddy-prim/taskpulse",
      liveUrl: "https://vercel.com",
      demoType: "web" as const,
      isInteractive: true
    }
  ];

  return (
    <section id="portfolio" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work in web development and scalable web applications
          </p>
        </div>
        
        {/* PORTFOLIO GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Card key={index} className={`overflow-hidden hover:shadow-lg transition-shadow group ${item.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              {/* PROJECT IMAGE WITH OVERLAY */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* CATEGORY BADGE */}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
                {/* FEATURED BADGE */}
                {item.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary">⭐ Featured</Badge>
                  </div>
                )}
                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* PROJECT CONTENT */}
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                
                {/* TECHNOLOGY TAGS */}
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex}
                      variant="outline"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* PROJECT ACTION BUTTONS WITH LIVE VIEWER */}
                <div className="flex gap-2 pt-2">
                  {/* GitHub Button - only show if GitHub URL exists */}
                  {item.githubUrl && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(item.githubUrl, '_blank')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  )}
                  
                  {/* Live Preview Button - Opens Live Viewer Modal */}
                  <LiveProjectViewer project={item}>
                    <Button 
                      size="sm" 
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Live Preview
                    </Button>
                  </LiveProjectViewer>
                  
                  {/* Quick Direct Link */}
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => window.open(item.liveUrl, '_blank')}
                    className="px-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* ACTION BUTTONS - Navigation to other portfolio pages */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('projects')}
              className="group"
            >
              View All Projects
              <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* Live Demos Button - NEW FEATURE */}
            <Button 
              size="lg"
              onClick={() => onNavigate('live-demos')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 group"
            >
              <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Try Interactive Demos
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Experience live, working demos of my development skills
          </p>
        </div>
      </div>
    </section>
  );
}