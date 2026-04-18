/**
 * WORK PROCESS COMPONENT
 * Shows the step-by-step process of how I work on projects
 * 
 * CUSTOMIZATION NOTES:
 * - Update process steps based on your actual workflow
 * - Modify timelines and deliverables
 * - Add or remove steps as needed
 * - Update icons and descriptions
 */

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Search, 
  FileText, 
  Palette, 
  Code, 
  TestTube, 
  Rocket, 
  HeadphonesIcon,
  ArrowRight 
} from "lucide-react";
import { PageType } from "../App";

interface WorkProcessProps {
  onNavigate?: (page: PageType) => void;
}

export function WorkProcess({ onNavigate }: WorkProcessProps) {
  /**
   * WORK PROCESS STEPS
   * CUSTOMIZATION: Update these steps to match your actual workflow
   * Each step includes icon, title, description, duration, and deliverables
   */
  const processSteps = [
    {
      step: 1,
      icon: <Search className="h-8 w-8" />,
      title: "Research & Discovery",
      description: "Deep dive into your business, target audience, and project requirements. Understanding your goals is crucial for success.",
      duration: "1-2 weeks",
      deliverables: [
        "Project requirements document",
        "User personas & journey maps",
        "Competitive analysis report",
        "Technical architecture plan"
      ],
      color: "bg-blue-500"
    },
    {
      step: 2,
      icon: <FileText className="h-8 w-8" />,
      title: "Planning & Strategy",
      description: "Create detailed project roadmap, define milestones, and establish clear timelines with regular check-ins.",
      duration: "3-5 days",
      deliverables: [
        "Project timeline & milestones",
        "Technical specifications",
        "Resource allocation plan",
        "Communication schedule"
      ],
      color: "bg-green-500"
    },
    {
      step: 3,
      icon: <Palette className="h-8 w-8" />,
      title: "Design & Prototyping",
      description: "Transform ideas into visual concepts. Create wireframes, mockups, and interactive prototypes for user testing.",
      duration: "1-3 weeks",
      deliverables: [
        "Wireframes & user flows",
        "High-fidelity mockups",
        "Interactive prototypes",
        "Design system & style guide"
      ],
      color: "bg-purple-500"
    },
    {
      step: 4,
      icon: <Code className="h-8 w-8" />,
      title: "Development & Implementation",
      description: "Bring designs to life with clean, scalable code. Regular updates and version control ensure transparency.",
      duration: "2-8 weeks",
      deliverables: [
        "Frontend development",
        "Supabase integration & setup",
        "Database schema design",
        "Third-party API integrations"
      ],
      color: "bg-orange-500"
    },
    {
      step: 5,
      icon: <TestTube className="h-8 w-8" />,
      title: "Testing & Quality Assurance",
      description: "Rigorous testing across devices and browsers. Performance optimization and security audits ensure reliability.",
      duration: "1-2 weeks",
      deliverables: [
        "Cross-browser testing",
        "Mobile responsiveness testing",
        "Performance optimization",
        "Security audit & fixes"
      ],
      color: "bg-red-500"
    },
    {
      step: 6,
      icon: <Rocket className="h-8 w-8" />,
      title: "Launch & Deployment",
      description: "Smooth deployment to production with monitoring setup. Includes training and documentation handover.",
      duration: "3-5 days",
      deliverables: [
        "Production deployment",
        "Monitoring & analytics setup",
        "User documentation",
        "Admin training sessions"
      ],
      color: "bg-indigo-500"
    },
    {
      step: 7,
      icon: <HeadphonesIcon className="h-8 w-8" />,
      title: "Support & Maintenance",
      description: "Ongoing support, updates, and improvements. Regular check-ins ensure your project continues to perform optimally.",
      duration: "Ongoing",
      deliverables: [
        "Bug fixes & updates",
        "Performance monitoring",
        "Security updates",
        "Feature enhancements"
      ],
      color: "bg-teal-500"
    }
  ];

  /**
   * PROJECT PHASES OVERVIEW
   * High-level project phases with timelines
   */
  const projectPhases = [
    {
      phase: "Discovery Phase",
      duration: "Week 1-2",
      focus: "Understanding & Planning",
      activities: ["Requirements gathering", "Research", "Strategy development"]
    },
    {
      phase: "Design Phase",
      duration: "Week 3-5",
      focus: "Visual Concepts & Prototypes",
      activities: ["Wireframing", "UI design", "Prototyping", "User testing"]
    },
    {
      phase: "Development Phase",
      duration: "Week 6-13",
      focus: "Building & Implementation",
      activities: ["Frontend development", "Supabase integration", "Data migration", "Testing"]
    },
    {
      phase: "Launch Phase",
      duration: "Week 14-15",
      focus: "Deployment & Go-live",
      activities: ["Final testing", "Deployment", "Training", "Documentation"]
    }
  ];

  return (
    <section id="work-process" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Work Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven 7-step methodology that ensures project success from initial concept to ongoing support
          </p>
        </div>

        {/* PROJECT PHASES OVERVIEW */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Project Timeline Overview</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectPhases.map((phase, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <CardTitle className="text-lg">{phase.phase}</CardTitle>
                  <Badge variant="secondary">{phase.duration}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-primary mb-2">{phase.focus}</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {phase.activities.map((activity, i) => (
                      <li key={i}>• {activity}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* DETAILED PROCESS STEPS */}
        <div className="space-y-8">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line between steps */}
              {index < processSteps.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-16 bg-border hidden md:block" />
              )}
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-12 gap-6 items-start">
                    {/* Step number and icon */}
                    <div className="md:col-span-2 flex flex-col items-center md:items-start">
                      <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white mb-4`}>
                        {step.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Step {step.step}
                      </Badge>
                    </div>
                    
                    {/* Step content */}
                    <div className="md:col-span-6">
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Duration: {step.duration}</Badge>
                      </div>
                    </div>
                    
                    {/* Deliverables */}
                    <div className="md:col-span-4">
                      <h4 className="font-semibold mb-3">Key Deliverables:</h4>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <ArrowRight className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* COLLABORATION APPROACH */}
        <div className="mt-16">
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Collaboration & Communication</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Throughout every project, I maintain transparent communication and regular updates
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">24/7</span>
                  </div>
                  <h4 className="font-semibold mb-2">Quick Response</h4>
                  <p className="text-sm text-muted-foreground">
                    Fast response to messages and queries, typically within 2-4 hours
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">📊</span>
                  </div>
                  <h4 className="font-semibold mb-2">Regular Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Weekly progress reports with demos and milestone reviews
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">🤝</span>
                  </div>
                  <h4 className="font-semibold mb-2">Flexible Approach</h4>
                  <p className="text-sm text-muted-foreground">
                    Adaptive to your preferred communication style and project needs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CALL TO ACTION */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Let's discuss your project requirements and how this proven process can bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => window.open('https://calendly.com/adewale-samuel', '_blank')}
            >
              Schedule Discovery Call
            </Button>
            {onNavigate && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate('home')}
              >
                View Portfolio
              </Button>
            )}
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('mailto:adelekesam10@gmail.com', '_blank')}
            >
              Email Me Directly
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}