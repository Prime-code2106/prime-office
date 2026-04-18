import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { PageType } from "../App";
import { Testimonials } from "./Testimonials";
import { SEOHead } from "./SEOHead";

interface TestimonialsPageProps {
  onNavigate: (page: PageType) => void;
}

export function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What clients and collaborators say about working with me.
          </p>
        </div>

        {/* REUSE THE TESTIMONIALS COMPONENT */}
        <Testimonials />

        {/* CALL TO ACTION */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Be the Next Success Story?</h3>
          <Button 
            size="lg" 
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
}
