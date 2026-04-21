/**
 * SKILLS & EDUCATION PAGE COMPONENT
 * Comprehensive page showing technical skills, education, and AI capabilities
 * 
 * CUSTOMIZATION NOTES:
 * - Update education details in the education array
 * - Modify skill levels in the skills arrays
 * - Add or remove AI capabilities as needed
 * - Update languages and frameworks you're proficient in
 */

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GitHubActivity } from "./GitHubActivity";
import { AvailabilityStatus } from "./AvailabilityStatus";
import { ArrowLeft, GraduationCap, Code, Brain, Globe, Award } from "lucide-react";
import { PageType } from "../App";

interface SkillsProps {
  onNavigate: (page: PageType) => void;
}

export function Skills({ onNavigate }: SkillsProps) {
  /**
   * EDUCATION DATA
   * CUSTOMIZATION: Update with your actual education details
   */
  const education = [
    {
      degree: "Bachelor of Technology in Information Technology",
      institution: "Federal University of Technology Akure (FUTA)",
      year: "2023-Present",
      description: "Focusing on Software Development, Data Management, and Information Systems",
      achievements: ["Active Member of Tech Communities", "Focus on Modern Web Architectures"]
    },
    {
      degree: "Full Stack Web Development Certification",
      institution: "FreeCodeCamp",
      year: "2023",
      description: "Comprehensive certification covering modern web technologies",
      achievements: ["React", "Supabase", "Tailwind CSS", "API Integration"]
    }
  ];

  /**
   * FRONTEND TECHNOLOGIES
   * CUSTOMIZATION: Update skill levels (0-100) based on your proficiency
   */
  const frontendSkills = [
    { name: "React.js", level: 95, description: "Advanced component development, hooks, context API" },
    { name: "JavaScript", level: 95, description: "ES6+, async/await, DOM manipulation" },
    { name: "HTML5 & CSS3", level: 98, description: "Semantic markup, flexbox, grid, animations" },
    { name: "Tailwind CSS", level: 94, description: "Utility-first design and custom layouts" }
  ];

  /**
   * BACKEND TECHNOLOGIES
   * CUSTOMIZATION: Add or remove technologies based on your expertise
   */
  const backendSkills = [
    { name: "Supabase", level: 92, description: "Auth, Real-time DB, Edge Functions, Storage" },
    { name: "PostgreSQL", level: 88, description: "Relational database design and queries" },
    { name: "REST APIs", level: 90, description: "Designing and consuming clean web APIs" }
  ];

  /**
   * AI CAPABILITIES & TOOLS
   * CUSTOMIZATION: Update with your specific AI experience and tools
   */
  const aiCapabilities = [
    {
      name: "AI Prompt Engineering",
      level: 95,
      description: "Optimizing LLM interactions for higher quality outputs and complex reasoning",
      tools: ["Gemini", "ChatGPT", "Claude", "LangChain"]
    },
    {
      name: "AI Image Generation",
      level: 90,
      description: "Creating professional visual assets and conceptual art using AI-powered tools",
      tools: ["Midjourney", "DALL-E 3", "Stable Diffusion", "Leonardo.ai"]
    },
    {
      name: "AI Story Writing & Content",
      level: 92,
      description: "Generating creative narratives, technical documentation, and marketing copy",
      tools: ["ChatGPT", "Gemini", "Jasper", "WriteSonic"]
    }
  ];

  /**
   * LANGUAGES I SPEAK
   * CUSTOMIZATION: Update with languages you speak
   */
  const spokenLanguages = [
    { name: "English", level: "Native", flag: "🇺🇸" },
    { name: "Yoruba", level: "Native", flag: "🇳🇬" },
    { name: "French", level: "Intermediate", flag: "🇫🇷" },
    { name: "Spanish", level: "Basic", flag: "🇪🇸" }
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

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Skills & Education</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive overview of my technical expertise, educational background, and AI capabilities
          </p>
        </div>

        {/* EDUCATION SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{edu.degree}</CardTitle>
                  <p className="text-primary font-semibold">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{edu.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {edu.achievements.map((achievement, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FRONTEND SKILLS SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Code className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Frontend Technologies</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {frontendSkills.map((skill, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{skill.name}</h3>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="mb-2" />
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* BACKEND SKILLS SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Globe className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Backend Technologies</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {backendSkills.map((skill, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{skill.name}</h3>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="mb-2" />
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AI CAPABILITIES SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">AI Capabilities & Tools</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {aiCapabilities.map((ai, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{ai.name}</h3>
                    <span className="text-sm text-muted-foreground">{ai.level}%</span>
                  </div>
                  <Progress value={ai.level} className="mb-3" />
                  <p className="text-sm text-muted-foreground mb-3">{ai.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {ai.tools.map((tool, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SPOKEN LANGUAGES SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Languages I Speak</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spokenLanguages.map((lang, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">{lang.flag}</div>
                  <h3 className="font-semibold text-lg">{lang.name}</h3>
                  <Badge variant="secondary">{lang.level}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* GITHUB ACTIVITY & AVAILABILITY SECTION */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* GITHUB ACTIVITY - Takes 2 columns */}
            <div className="lg:col-span-2">
              <GitHubActivity />
            </div>
            
            {/* AVAILABILITY STATUS - Takes 1 column */}
            <div>
              <AvailabilityStatus />
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
              <p className="text-muted-foreground mb-6">
                With this comprehensive skill set, I'm ready to tackle your next project. 
                Let's discuss how I can help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => onNavigate('home')}
                  size="lg"
                >
                  View My Portfolio
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://calendar.app.google/s8HyT2Z4k7gFbaFL8', '_blank')}
                  size="lg"
                >
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}