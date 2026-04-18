/**
 * LIVE DEMOS PAGE COMPONENT
 * Dedicated page for interactive project demonstrations
 * 
 * FEATURES:
 * - Interactive demo showcase
 * - Live project previews
 * - Skills demonstration through working code
 * - Portfolio enhancement with real functionality
 * 
 * CUSTOMIZATION NOTES:
 * - Add more demos based on your specific projects
 * - Update the introduction text to match your skills
 * - Modify styling to match your design system
 * - Add analytics tracking for demo interactions
 */

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { InteractiveProjectDemos } from "./InteractiveProjectDemos";
import { ArrowLeft, Code, Play, Star, Zap, Users, Award } from "lucide-react";
import { PageType } from "../App";

interface LiveDemosPageProps {
  onNavigate: (page: PageType) => void;
}

export function LiveDemosPage({ onNavigate }: LiveDemosPageProps) {
  const skills = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Frontend Development",
      description: "React, TypeScript, Next.js, Tailwind CSS",
      color: "text-blue-500"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Interactive UI/UX",
      description: "State management, animations, responsive design",
      color: "text-yellow-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "API Integration",
      description: "REST APIs, data fetching, error handling",
      color: "text-green-500"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Problem Solving",
      description: "Algorithms, logic, clean code practices",
      color: "text-purple-500"
    }
  ];

  const demoFeatures = [
    "🧮 Working Calculator - JavaScript logic and state management",
    "✅ Todo Application - React hooks and component lifecycle",
    "🎨 Color Palette Generator - Algorithms and design systems",
    "🌐 API Integration - External data fetching and handling",
    "📱 Responsive Design - Mobile-first, adaptive layouts",
    "⚡ Real-time Updates - Dynamic content and user interactions"
  ];

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

        {/* HERO SECTION */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Play className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Live Interactive Demos</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience my development skills firsthand through these fully functional demos. 
            Each project showcases different aspects of modern web development, from React state management 
            to API integration and algorithmic thinking.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge className="text-sm px-3 py-1">⚡ Fully Interactive</Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">🔄 Supabase Integration</Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">🎨 Modern UI/UX</Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">🎯 Production Ready</Badge>
          </div>
        </div>

        {/* SKILLS SHOWCASE */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((skill, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`mx-auto mb-3 ${skill.color}`}>
                  {skill.icon}
                </div>
                <CardTitle className="text-lg">{skill.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* DEMO FEATURES */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              What You'll Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demoFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="text-sm">{feature}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* INTERACTIVE DEMOS */}
        <InteractiveProjectDemos />

        {/* CALL TO ACTION */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Impressed by What You See?</h3>
              <p className="text-muted-foreground mb-6">
                These demos represent just a small sample of what I can build. Let's discuss how I can bring 
                your project ideas to life with the same level of quality and attention to detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => window.open('https://calendly.com/adewale-samuel', '_blank')}
                >
                  Schedule a Consultation
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('projects')}
                >
                  View All Projects
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('mailto:adelekesam10@gmail.com', '_blank')}
                >
                  Get in Touch
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TECHNICAL NOTES */}
        <div className="mt-12 text-center">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Technical Implementation Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Frontend Technologies</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• React 18 with TypeScript</li>
                    <li>• Modern React Hooks (useState, useEffect)</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Responsive design principles</li>
                    <li>• Component composition patterns</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Features Demonstrated</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• State management and updates</li>
                    <li>• Event handling and user interaction</li>
                    <li>• API calls and error handling</li>
                    <li>• Mathematical calculations</li>
                    <li>• Color manipulation algorithms</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}