import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, Search, Code, Rocket } from "lucide-react";
import { PageType } from "../App";

interface ProcessTeaserProps {
  onNavigate: (page: PageType) => void;
}

export function ProcessTeaser({ onNavigate }: ProcessTeaserProps) {
  const steps = [
    { icon: <Search className="h-5 w-5" />, title: "Research" },
    { icon: <Code className="h-5 w-5" />, title: "Development" },
    { icon: <Rocket className="h-5 w-5" />, title: "Launch" },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-3xl font-bold">How I Bring Your Vision to Life</h2>
                <p className="text-muted-foreground max-w-md">
                  I follow a proven 7-step methodology to ensure your project's success from initial concept to ongoing support.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium">
                      <div className="p-1.5 bg-primary/10 rounded-full text-primary">
                        {step.icon}
                      </div>
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={() => onNavigate('work-process')}
                className="group"
              >
                View Detailed Process
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
