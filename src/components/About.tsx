/**
 * ABOUT SECTION COMPONENT
 * Personal introduction and expertise overview
 * 
 * CUSTOMIZATION NOTES:
 * - Update the personal description and background
 * - Modify expertise areas and descriptions
 * - Add statistics or achievements if desired
 * - Update years of experience and project counts
 */

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { useTheme } from "./ThemeProvider";

export function About() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const streakUrl = isDark
    ? "https://github-readme-streak-stats.herokuapp.com/?user=Prime-code2106&theme=dark&hide_border=true&background=transparent&ring=3b82f6&fire=3b82f6&currStreakNum=ffffff&sideNums=ffffff&dates=aaaaaa&sideLabels=aaaaaa&currStreakLabel=aaaaaa"
    : "https://github-readme-streak-stats.herokuapp.com/?user=Prime-code2106&theme=default&hide_border=true&background=transparent&ring=3b82f6&fire=3b82f6&currStreakNum=1a1a1a&sideNums=1a1a1a&dates=555555&sideLabels=555555&currStreakLabel=555555";
  /**
   * ACHIEVEMENT STATISTICS
   * CUSTOMIZATION: Update these numbers with your actual achievements
   */
  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "15+" },
    { label: "Happy Clients", value: "12+" },
    { label: "Countries Served", value: "5+" }
  ];

  /**
   * CORE EXPERTISE AREAS
   * CUSTOMIZATION: Modify based on your actual skills and services
   */
  const expertiseAreas = [
    {
      title: "Frontend Development",
      description: "Modern, responsive web interfaces with a focus on UI/UX",
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"]
    },
    {
      title: "Web Application Architecture",
      description: "Building scalable web apps with robust state management",
      technologies: ["React Hooks", "Context API", "Supabase", "REST APIs"]
    },
    {
      title: "BaaS Integration",
      description: "Seamless backend integration with Supabase for auth and data",
      technologies: ["Supabase Auth", "Real-time Database", "PostgreSQL", "Storage"]
    }
  ];

  return (
    <section id="about" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* SECTION HEADER */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">About Adewale Samuel (Prime)</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Information Technology student passionate about crafting seamless web experiences
            </p>
          </div>
          
          {/* ACHIEVEMENT STATISTICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* MAIN ABOUT CONTENT */}
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
            <p>
              I'm <strong className="text-foreground">Adewale Samuel (Prime)</strong>, an Information Technology student at FUTA 
              specializing in frontend engineering and building modern web applications. 
              I focus on creating high-performance, user-centered solutions using React, Tailwind CSS, and Supabase.
            </p>
            
            <p>
              With experience in building everything from sleek personal platforms to dynamic SaaS dashboards, 
              I ensure every project is fast, secure, and delivers an exceptional user experience for clients worldwide.
            </p>
          </div>

          {/* GITHUB STREAK */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">My GitHub Activity</h3>
              <p className="text-muted-foreground mt-2">Daily open source contributions</p>
            </div>
            <div className="flex justify-center">
              <a href="https://github.com/Prime-code2106" target="_blank" rel="noreferrer" className="block w-full max-w-2xl hover:scale-[1.01] transition-transform duration-300">
                <img
                  src={streakUrl}
                  alt="GitHub Streak Stats"
                  className="w-full rounded-xl border object-contain bg-card shadow-sm"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}