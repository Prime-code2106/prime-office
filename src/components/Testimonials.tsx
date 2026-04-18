/**
 * TESTIMONIALS CAROUSEL COMPONENT
 * Auto-scrolling client testimonials and reviews section
 * 
 * FEATURES:
 * - Auto-scrolling carousel with infinite loop
 * - Pause on hover
 * - Manual navigation controls
 * - Star ratings display
 * - Client photos and information
 * - Smooth transitions
 * 
 * CUSTOMIZATION NOTES:
 * - Replace with your actual client testimonials
 * - Add real client photos
 * - Update project names to match your portfolio
 * - Adjust autoScrollSpeed for faster/slower scrolling (currently 5 seconds)
 */

import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
  project: string;
  date: string;
}

export function Testimonials() {
  /**
   * CAROUSEL STATE MANAGEMENT
   * Manual navigation only - no auto-play
   */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * TESTIMONIALS DATA
   * CUSTOMIZATION: Replace with your actual client testimonials
   */
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechCorp Solutions",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      text: "Adewale delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise transformed our vision into reality. The project was completed ahead of schedule with outstanding quality.",
      rating: 5,
      project: "Prime E-Commerce Platform",
      date: "January 2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "Productivity Inc",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      text: "Working with Prime was a game-changer for our web platform development. His expertise in React and Supabase helped us build a robust, scalable solution. Highly professional and communicative throughout the entire process.",
      rating: 5,
      project: "TaskMaster Web Pro",
      date: "February 2024"
    },
    {
      id: 3,
      name: "Lisa Anderson",
      role: "Marketing Director",
      company: "Restaurant Chain",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
      text: "The web ordering system has revolutionized our customer experience. Adewale's attention to UI/UX details and seamless Supabase integration made the transition smooth. Our orders increased by 40% in the first month!",
      rating: 5,
      project: "FoodieOrder Web",
      date: "March 2024"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Head of Customer Support",
      company: "SupportHub Inc",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      text: "The customer support system Adewale developed has been a game-changer for our business. The intuitive interface and powerful features made our team's workflow significantly more efficient. Outstanding technical skills and great communication!",
      rating: 5,
      project: "Customer Support Dashboard",
      date: "February 2024"
    }
  ];

  /**
   * NAVIGATION HANDLERS
   * Manual navigation only
   */
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  /**
   * GET VISIBLE TESTIMONIALS
   * Shows 3 testimonials at once on desktop (current + next 2)
   */
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  /**
   * RENDER STAR RATING
   * Helper function to display star ratings
   */
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array(rating).fill(0).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-16 px-4">
      <div className="container mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Quote className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Client Testimonials</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it - hear from clients who have experienced the quality 
            of my work firsthand
          </p>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div className="relative max-w-7xl mx-auto">
          {/* DESKTOP: Show 3 testimonials */}
          <div className="hidden md:block overflow-hidden">
            <div className="grid grid-cols-3 gap-8">
              {getVisibleTestimonials().map((testimonial, idx) => (
                <div
                  key={`${testimonial.id}-${idx}`}
                  className="transition-all duration-700 ease-in-out"
                  style={{
                    opacity: idx === 0 ? 1 : 0.7,
                    transform: idx === 0 ? 'scale(1)' : 'scale(0.95)'
                  }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <CardHeader>
                      {/* CLIENT INFO */}
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback className="bg-primary/10">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          <p className="text-xs text-muted-foreground font-medium">{testimonial.company}</p>
                        </div>
                      </div>

                      {/* RATING */}
                      <div className="flex items-center justify-between mb-3">
                        {renderStars(testimonial.rating)}
                        <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* TESTIMONIAL TEXT */}
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
                        <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                          {testimonial.text}
                        </p>
                      </div>

                      {/* PROJECT BADGE */}
                      <div className="pt-3 border-t">
                        <Badge variant="outline" className="text-xs">
                          Project: {testimonial.project}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE: Show single testimonial */}
          <div className="md:hidden">
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
                    <AvatarFallback className="bg-primary/10">
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                    <p className="text-xs text-muted-foreground font-medium">{testimonials[currentIndex].company}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  {renderStars(testimonials[currentIndex].rating)}
                  <span className="text-xs text-muted-foreground">{testimonials[currentIndex].date}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                    {testimonials[currentIndex].text}
                  </p>
                </div>
                <div className="pt-3 border-t">
                  <Badge variant="outline" className="text-xs">
                    Project: {testimonials[currentIndex].project}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NAVIGATION CONTROLS */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to start your project and become my next success story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="inline-block">
              <Button size="lg">
                Get Started Today
              </Button>
            </a>
            <a href="https://calendly.com/adewale-samuel" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Schedule a Call
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}