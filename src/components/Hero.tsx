/**
 * HERO SECTION COMPONENT
 * Main landing section with background image and introduction
 * 
 * CUSTOMIZATION NOTES:
 * - Background image can be changed by updating the backgroundImage URL below
 * - Personal photo can be replaced in the right column image
 * - Call-to-action buttons can be modified
 * - Availability status badge can be updated
 */

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import personalImage from "../image/Gemini_Generated_Image_5xu7i15xu7i15xu7.png";

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  /**
   * BACKGROUND IMAGE URL
   * CUSTOMIZATION: Replace this URL with your preferred background image
   * Current: Professional workspace background
   */
  const backgroundImageUrl = "https://images.unsplash.com/photo-1634836023845-eddbfe9937da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBiYWNrZ3JvdW5kJTIwZGFya3xlbnwxfHx8fDE3NTg2NTk0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  /**
   * PERSONAL/PROFESSIONAL IMAGE URL
   * CUSTOMIZATION: Replace this with your professional headshot or workspace image
   */
  const personalImageUrl = personalImage;

  /**
   * SCROLL TO SECTION HANDLER
   * Smooth scrolls to specific sections on the page
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * SCHEDULE CALL HANDLER
   * Opens scheduling tool for client meetings
   * CUSTOMIZATION: Replace with your actual Calendly link
   */
  const handleScheduleCall = () => {
    window.open('https://calendly.com/adewale-samuel', '_blank');
  };

  return (
    <section 
      className="relative pt-24 pb-16 px-4 min-h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* BACKGROUND OVERLAY for better text readability */}
      <div className="absolute inset-0 bg-background/20" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT COLUMN - Main introduction content */}
          <div className="space-y-6 text-white">
            <div className="space-y-2">
              {/* AVAILABILITY STATUS - Update this badge as needed */}
              <Badge variant="secondary" className="mb-4 bg-primary text-primary-foreground">
                🌍 Available for Remote Work
              </Badge>
              
              {/* MAIN HEADING - Your name and title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Hello, I'm{" "}
                <span className="text-yellow-400">Adewale Samuel</span>
              </h1>
              <p className="text-xl text-gray-200">
                Nickname: <span className="text-yellow-400 font-semibold">Prime</span>
              </p>
            </div>
            
            {/* DESCRIPTION - Brief introduction */}
            <p className="text-lg text-gray-200 leading-relaxed">
              Frontend Engineer specializing in building modern, user-centered web applications 
              with React, Tailwind CSS, and Supabase. Information Technology student at FUTA.
            </p>
            
            {/* SKILL BADGES - Main expertise areas */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-white/10 text-white border-white/30">Frontend Development</Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/30">Web Applications</Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/30">Supabase Integration</Badge>
            </div>
            
            {/* CALL-TO-ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* View Portfolio Button */}
              <Button 
                size="lg"
                onClick={() => scrollToSection('portfolio')}
                className="bg-primary hover:bg-primary/90"
              >
                View My Work
              </Button>
              
              {/* Try Live Demos Button - NEW FEATURE */}
              <Button 
                size="lg"
                onClick={() => onNavigate('live-demos')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
              >
                🚀 Try Live Demos
              </Button>
              
              {/* Schedule Call Button - Active with external link */}
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleScheduleCall}
                className="border-white text-white hover:bg-white/10 hover:border-white/80 transition-colors"
              >
                Schedule a Call
              </Button>
              
              {/* Contact Button */}
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="border-white text-white hover:bg-white/10 hover:border-white/80 transition-colors"
              >
                Get in Touch
              </Button>
            </div>
          </div>
          
          {/* RIGHT COLUMN - Professional image */}
          <div className="relative">
            <div className="relative">
              {/* PROFESSIONAL IMAGE - Replace with your photo */}
              <ImageWithFallback
                src={personalImageUrl}
                alt="Adewale Samuel - Professional Developer"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              {/* Image overlay for visual effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl" />
              
              {/* FLOATING ELEMENTS for visual interest */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary rounded-full opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}