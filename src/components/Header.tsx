/**
 * HEADER NAVIGATION COMPONENT
 * Fixed top navigation bar with responsive menu
 * 
 * CUSTOMIZATION NOTES:
 * - Update navigation items in the navItems array
 * - Modify logo/brand name
 * - Adjust styling and colors as needed
 * - Mobile menu behavior can be customized
 */

import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { PageType } from "../App";
import { AvailabilityBadge } from "./AvailabilityStatus";
import { useTheme } from "./ThemeProvider";

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  /**
   * NAVIGATION ITEMS
   * PRUNED for a lean, focused experience
   */
  const navItems = [
    { name: "Home", page: "home" as PageType },
    { name: "Projects", page: "projects" as PageType },
    { name: "Skills", page: "skills" as PageType },
    { name: "Resume", page: "resume-view" as PageType },
  ];

  /**
   * NAVIGATION HANDLER
   * Handles page navigation and closes mobile menu
   */
  const handleNavigation = (page: PageType) => {
    onNavigate(page);
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  /**
   * SCROLL TO CONTACT HANDLER
   * Special handler for contact section on home page
   */
  const handleContactClick = () => {
    if (currentPage !== 'home') {
      onNavigate('home');
      // Wait for navigation to complete, then scroll to contact
      setTimeout(() => {
        const element = document.getElementById('contact');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('contact');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LOGO/BRAND SECTION */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            {/* LOGO ICON - You can replace with actual logo image */}
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AS</span>
            </div>
            {/* BRAND NAME - CUSTOMIZATION: Update with your name/brand */}
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg">Adewale Samuel</h1>
              <p className="text-xs text-muted-foreground -mt-1">Prime Developer</p>
            </div>
          </div>

          {/* DESKTOP NAVIGATION MENU */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.page}
                variant={currentPage === item.page ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.page)}
                className="transition-colors"
              >
                {item.name}
              </Button>
            ))}
            {/* CONTACT BUTTON - Special handling since it's a section on home page */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleContactClick}
              className="ml-2"
            >
              Contact
            </Button>
            {/* THEME TOGGLE BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {/* AVAILABILITY STATUS BADGE */}
            <div className="ml-3 hidden lg:block">
              <AvailabilityBadge />
            </div>
          </nav>

          {/* MOBILE CONTROLS */}
          <div className="md:hidden flex items-center space-x-2">
            {/* MOBILE THEME TOGGLE */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {/* MOBILE MENU BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* MOBILE NAVIGATION MENU */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.page}
                  variant={currentPage === item.page ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => handleNavigation(item.page)}
                >
                  {item.name}
                </Button>
              ))}
              {/* MOBILE CONTACT BUTTON */}
              <Button
                variant="outline"
                className="justify-start"
                onClick={handleContactClick}
              >
                Contact
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}