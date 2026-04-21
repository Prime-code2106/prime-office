/**
 * SERVICES SECTION COMPONENT
 * Showcases the main service offerings
 * 
 * CUSTOMIZATION NOTES:
 * - Replace service images with relevant screenshots or photos
 * - Update service descriptions and features
 * - Modify pricing or add pricing information if needed
 * - Add or remove services based on your offerings
 * - Update icons to match your service categories
 */

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Code, Smartphone, Brain, TrendingUp, ExternalLink, MessageCircle } from "lucide-react";

export function Services() {
  /**
   * SERVICES DATA
   * CUSTOMIZATION: Update with your actual services, descriptions, and images
   * - Replace images with your actual work examples or relevant stock photos
   * - Update descriptions to match your service offerings
   * - Modify features based on what you actually provide
   * - Add pricing tiers if desired
   */
  const services = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Web Development",
      description: "Professional websites that are modern, responsive, and aligned with business goals. From personal portfolios to full-scale e-commerce platforms.",
      // TODO: Replace with screenshot of your actual web development work
      image: "https://images.unsplash.com/photo-1634836023845-eddbfe9937da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBiYWNrZ3JvdW5kJTIwZGFya3xlbnwxfHx8fDE3NTg2NTk0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Responsive Design", "Fast & Secure", "SEO Optimized", "E-commerce Solutions"],
      priceRange: "$500 - $5,000",
      deliveryTime: "2-8 weeks"
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Web Application Development",
      description: "Advanced web applications featuring real-time data, complex state management, and seamless user experiences. Specializing in SaaS platforms and internal tools.",
      // TODO: Replace with screenshot of your actual web app work
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTg2NTk0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Single Page Applications", "Supabase Backend Integration", "Real-time Features", "Auth & Security"],
      priceRange: "$1,000 - $8,000",
      deliveryTime: "3-10 weeks"
    }
  ];

  /**
   * CONTACT HANDLER FOR SPECIFIC SERVICE
   * Opens email with pre-filled service inquiry
   */
  const handleServiceInquiry = (serviceName: string) => {
    const subject = `Inquiry about ${serviceName} Services`;
    const body = `Hi Adewale,\n\nI'm interested in your ${serviceName} services. Could we schedule a call to discuss my project requirements?\n\nBest regards,`;
    window.location.href = `mailto:adelekesam10@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="services" className="py-16 px-4">
      <div className="container mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Professional Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized web development solutions from responsive websites to complex, 
            Supabase-powered web applications.
          </p>
        </div>
        
        {/* SERVICES GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
              {/* SERVICE IMAGE WITH OVERLAY */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* SERVICE TITLE OVERLAY */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg">{service.title}</h3>
                </div>
                
                {/* HOVER OVERLAY WITH PRICING */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-white text-sm">
                    <p className="font-semibold">{service.priceRange}</p>
                    <p className="text-xs">{service.deliveryTime}</p>
                  </div>
                </div>
              </div>
              
              {/* CARD HEADER - Hidden but kept for accessibility */}
              <CardHeader>
                <CardTitle className="sr-only">{service.title}</CardTitle>
              </CardHeader>
              
              {/* SERVICE CONTENT */}
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                
                {/* SERVICE FEATURES */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <Badge 
                      key={featureIndex}
                      variant="secondary"
                      className="text-sm"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                {/* PRICING AND TIMELINE INFO */}
                <div className="flex justify-between items-center text-sm text-muted-foreground pt-2 border-t">
                  <span>💰 {service.priceRange}</span>
                  <span>⏱️ {service.deliveryTime}</span>
                </div>
                
                {/* SERVICE ACTION BUTTONS */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleServiceInquiry(service.title)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Get Quote
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open('https://calendar.app.google/s8HyT2Z4k7gFbaFL8', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CUSTOM SOLUTIONS CALL-TO-ACTION */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-3">Need Something Custom?</h3>
              <p className="text-muted-foreground mb-6">
                Don't see exactly what you're looking for? I specialize in creating custom solutions 
                tailored to your specific needs. Let's discuss your unique requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => handleServiceInquiry('Custom Solution')}
                  size="lg"
                >
                  Discuss Custom Project
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('mailto:adelekesam10@gmail.com', '_blank')}
                  size="lg"
                >
                  Send Direct Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}