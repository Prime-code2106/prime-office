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
    {
      id: 1,
      category: "Personal Branding",
      title: "Prime Office",
      description: "A personal portfolio and branding website showcasing projects, skills, and contact information with a modern, professional design.",
      image: "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc1ODU1NTQyMHww&ixlib=rb-4.1.0&q=80&w=1080",
      screenshots: [
        "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc1ODU1NTQyMHww&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      tags: ["React", "Tailwind CSS", "Vite"],
      technologies: ["React", "Tailwind CSS", "Vite"],
      featured: true,
      githubUrl: "https://github.com/Prime-code2106/prime-office.git",
      liveUrl: "https://prime-office-smoky.vercel.app",
      demoType: "web" as const,
      isInteractive: true
    },
    {
      id: 2,
      category: "Web Application",
      title: "Adefood",
      description: "A 24/7 food subscription service delivering healthy, organic meals with access to 5,000+ recipes, meal plans (vegetarian, vegan, keto), cooking instructions, and video tutorials.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      screenshots: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      ],
      tags: ["React", "Tailwind CSS", "Food API"],
      technologies: ["React", "Tailwind CSS", "Food API"],
      featured: true,
      githubUrl: "https://github.com/Prime-code2106/adefood.git",
      liveUrl: "https://adefood.netlify.app",
      demoType: "web" as const,
      isInteractive: true
    },
    {
      id: 3,
      category: "EdTech",
      title: "FUTA Campus LearnHub",
      description: "An online learning platform built for FUTA students, providing course materials, resources, and collaborative tools to enhance campus education.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      screenshots: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      ],
      tags: ["React", "Tailwind CSS", "Education"],
      technologies: ["React", "Tailwind CSS", "Education"],
      featured: false,
      githubUrl: "",
      liveUrl: "https://futacampuslearnhub.netlify.app",
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