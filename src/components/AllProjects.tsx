/**
 * ALL PROJECTS PAGE COMPONENT
 * Complete portfolio showcase with detailed project information
 * 
 * CUSTOMIZATION NOTES:
 * - Replace project images with your actual project screenshots
 * - Update project details, technologies, and links
 * - Modify project categories and filters
 * - Add or remove projects as needed
 * - Update GitHub and live demo links
 */

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LiveProjectViewer } from "./LiveProjectViewer";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Star, Eye, Play } from "lucide-react";
import { PageType } from "../App";

interface AllProjectsProps {
  onNavigate: (page: PageType) => void;
}

export function AllProjects({ onNavigate }: AllProjectsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  /**
   * PROJECT CATEGORIES
   * CUSTOMIZATION: Add or modify categories based on your work
   */
  const categories = [
    { id: 'all', name: 'All Projects', count: 6 },
    { id: 'web-dev', name: 'Web Development', count: 3 },
    { id: 'web-app', name: 'Web Applications', count: 3 }
  ];

  /**
   * ALL PROJECTS DATA WITH LIVE VIEW SUPPORT
   * CUSTOMIZATION: Replace with your actual projects
   * Update project names, descriptions, images, technologies, and links
   * Add screenshots arrays for better project showcase
   * Set isInteractive to true for projects with interactive demos
   */
  const allProjects = [
    {
      id: 1,
      category: 'web-dev',
      title: "Prime E-Commerce Platform",
      subtitle: "Full-Stack E-commerce Solution",
      description: "A modern, scalable e-commerce platform built with React and Supabase. Features include inventory management, real-time updates, and an integrated admin dashboard.",
      image: "https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc1ODY0MDU2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["React", "Supabase", "Tailwind CSS", "Auth"],
      duration: "3 months",
      client: "Personal Project",
      featured: true,
      githubUrl: "https://github.com/Daddy-prim/ecommerce-platform",
      liveUrl: "https://vercel.com",
      completedDate: "2024-01-15",
      screenshots: [
        "https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc1ODY0MDU2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGNhcnQlMjB3ZWJ8ZW58MXx8fHwxNzU4NjQ0NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ],
      demoType: "web" as const,
      isInteractive: true
    },
    {
      id: 2,
      category: 'web-app',
      title: "SaaS Analytics Dashboard",
      subtitle: "Data Visualization Platform",
      description: "A comprehensive administrative dashboard for SaaS businesses, featuring real-time data visualization with Recharts and Supabase state management.",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjB3ZWIlMjBhcHBsaWNhdGlvbnxlbnwxfHx8fDE3NTg2NjgyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["React", "Tailwind CSS", "Recharts", "Supabase"],
      duration: "2.5 months",
      client: "Internal Tool",
      featured: true,
      githubUrl: "https://github.com/Daddy-prim/saas-dashboard",
      liveUrl: "https://vercel.com",
      completedDate: "2024-02-28",
      demoType: "web" as const,
      isInteractive: true
    },
    {
      id: 3,
      category: 'web-dev',
      title: "Prime Portfolio Website",
      subtitle: "Personal Portfolio & Brand",
      description: "This very website! A modern portfolio showcasing my Frontend Engineering skills, built with React, Tailwind CSS, and optimized for performance.",
      image: "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc1ODU1NTQyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["React", "Tailwind CSS", "Vite", "Lucide Icons"],
      duration: "1 month",
      client: "Personal Project",
      featured: false,
      githubUrl: "https://github.com/Daddy-prim/portfolio",
      liveUrl: "https://vercel.com",
      completedDate: "2024-04-01",
      demoType: "web" as const,
      isInteractive: true
    },
    {
      id: 4,
      category: 'web-app',
      title: "TaskPulse Task Manager",
      subtitle: "Team Collaboration Web App",
      description: "A web-based task management tool designed for teams, focusing on real-time task updates and collaboration using Supabase Realtime.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NTg2NjgyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["React", "Supabase Realtime", "Tailwind CSS"],
      duration: "2 months",
      client: "Open Source",
      featured: false,
      githubUrl: "https://github.com/Daddy-prim/taskpulse",
      liveUrl: "https://vercel.com",
      completedDate: "2024-03-10",
      demoType: "web" as const,
      isInteractive: true
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = selectedFilter === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedFilter);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        {/* PAGE HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my complete portfolio of modern web development and scalable web applications
          </p>
        </div>

        {/* PROJECT FILTERS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedFilter === category.id ? "default" : "outline"}
              onClick={() => setSelectedFilter(category.id)}
              className="flex items-center gap-2"
            >
              {category.name}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* PROJECTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              {/* PROJECT IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* PROJECT BADGES */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {categories.find(c => c.id === project.category)?.name.split(' ')[0]}
                  </Badge>
                  {project.featured && (
                    <Badge className="bg-primary flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Featured
                    </Badge>
                  )}
                </div>

                {/* PROJECT HOVER ACTIONS */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                  <LiveProjectViewer project={project}>
                    <Button
                      size="sm"
                      className="bg-primary/90 hover:bg-primary"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </LiveProjectViewer>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* PROJECT CONTENT */}
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <p className="text-sm text-primary font-medium">{project.subtitle}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>

                {/* PROJECT META INFO */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {project.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {project.client}
                  </div>
                </div>

                {/* TECHNOLOGIES */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies && Array.isArray(project.technologies) ? (
                    <>
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      No technologies listed
                    </Badge>
                  )}
                </div>

                {/* PROJECT LINKS WITH LIVE VIEWER */}
                <div className="flex gap-2 pt-2">
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  )}
                  
                  {/* Live Preview Button */}
                  <LiveProjectViewer project={project}>
                    <Button
                      size="sm"
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Live Preview
                    </Button>
                  </LiveProjectViewer>
                  
                  {/* Quick External Link */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="px-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CALL TO ACTION */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Like What You See?</h3>
              <p className="text-muted-foreground mb-6">
                Ready to start your own project? Let's discuss how I can help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => window.open('https://calendly.com/adewale-samuel', '_blank')}
                >
                  Schedule a Call
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('mailto:adelekesam10@gmail.com', '_blank')}
                >
                  Email Me Directly
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate('home')}
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}