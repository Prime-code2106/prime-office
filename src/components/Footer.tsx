/**
 * FOOTER COMPONENT
 * Site footer with branding, copyright, and personal quote
 * 
 * CUSTOMIZATION NOTES:
 * - Update copyright year as needed
 * - Modify personal quote or mission statement
 * - Add social media links if desired
 * - Update branding logo/text
 */

import { Heart, Mail, Linkedin, Github } from "lucide-react";

export function Footer() {
  /**
   * CURRENT YEAR
   * Automatically updates the copyright year
   */
  const currentYear = new Date().getFullYear();

  /**
   * SOCIAL LINKS
   * CUSTOMIZATION: Update with your actual social media profiles
   */
  const socialLinks = [
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      url: "mailto:primesameade@gmail.com"
    },
    {
      name: "LinkedIn", 
      icon: <Linkedin className="h-4 w-4" />,
      url: "https://www.linkedin.com/in/adewale-samuel-b8915b395?utm_source=share_via&utm_content=profile&utm_medium=member_android"
    },
    {
      name: "GitHub",
      icon: <Github className="h-4 w-4" />,
      url: "https://github.com/Daddy-prim"
    }
  ];

  return (
    <footer className="py-8 px-4 border-t bg-background">
      <div className="container mx-auto">
        {/* MAIN FOOTER CONTENT */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* BRANDING SECTION */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">P</span>
            </div>
            <span className="font-semibold">Adewale Samuel (Prime)</span>
          </div>
          
          {/* TECH STACK CREDIT */}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <span>using React & Tailwind CSS</span>
          </div>
          
          {/* COPYRIGHT SECTION */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} All rights reserved
          </p>
        </div>
        
        {/* SOCIAL LINKS ROW */}
        <div className="mt-4 flex justify-center space-x-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        {/* MISSION STATEMENT / QUOTE */}
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            "My goal is simple: to use technology, creativity, and strategy to build digital experiences that leave a lasting impression."
          </p>
          
          {/* REMOTE WORK INDICATOR */}
          <div className="mt-4 flex justify-center items-center gap-2">
            <span className="text-xs text-muted-foreground">🌍 Available for remote work worldwide</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">💼 Open to new opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}