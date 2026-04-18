/**
 * MAIN APPLICATION COMPONENT
 * This is the root component of Adewale Samuel (Prime) Portfolio Website
 * It handles routing between different pages and renders the main layout
 * 
 * DESIGN NOTE: This portfolio uses DARK MODE ONLY for a modern, professional aesthetic
 * 
 * DEVELOPER NOTE: This component uses React state for simple routing
 * To modify navigation, update the currentPage state and add new page cases
 */

import React, { useState } from 'react';
import { ThemeProvider } from "./components/ThemeProvider";
import { SEOHead, SEOPresets } from "./components/SEOHead";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Testimonials } from "./components/Testimonials";
import { Resume } from "./components/Resume";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WorkProcess } from "./components/WorkProcess";
import { Skills } from "./components/Skills";
import { AllProjects } from "./components/AllProjects";
import { ResumeViewer } from "./components/ResumeViewer";
import { LiveDemosPage } from "./components/LiveDemosPage";
import { TestimonialsPage } from "./components/TestimonialsPage";
import { ProcessTeaser } from "./components/ProcessTeaser";

// Define available pages for navigation
export type PageType = 'home' | 'skills' | 'projects' | 'resume-view' | 'work-process' | 'live-demos' | 'testimonials';

export default function App() {
  // State to manage current page - change this to navigate between pages
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  /**
   * NAVIGATION HANDLER
   * This function handles page navigation throughout the app
   * Called by buttons and navigation links
   */
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    // Scroll to top when navigating to new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * HOME PAGE RENDERER
   * Renders the main portfolio landing page with all sections
   */
  const renderHomePage = () => (
    <>
      {/* SEO - Home page meta tags */}
      <SEOHead {...SEOPresets.home} />
      
      {/* HERO SECTION - Main introduction with background image */}
      <Hero onNavigate={handleNavigate} />
      
      {/* ABOUT SECTION - Brief introduction */}
      <About />
      
      {/* PORTFOLIO SECTION - Featured projects */}
      <Portfolio onNavigate={handleNavigate} />
      
      {/* CONTACT SECTION - Get in touch form */}
      <Contact />
    </>
  );

  /**
   * PAGE CONTENT RENDERER
   * Switch between different pages based on currentPage state
   * ADD NEW PAGES HERE when creating additional pages
   */
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'skills':
        return (
          <>
            <SEOHead {...SEOPresets.skills} />
            <Skills onNavigate={handleNavigate} />
          </>
        );
      case 'projects':
        return (
          <>
            <SEOHead {...SEOPresets.projects} />
            <AllProjects onNavigate={handleNavigate} />
          </>
        );
      case 'resume-view':
        return (
          <>
            <SEOHead {...SEOPresets.resume} />
            <ResumeViewer onNavigate={handleNavigate} />
          </>
        );
      case 'work-process':
        return (
          <>
            <SEOHead title="Work Process - Adewale Samuel" />
            <WorkProcess onNavigate={handleNavigate} />
          </>
        );
      case 'live-demos':
        return (
          <>
            <SEOHead {...SEOPresets.liveDemos} />
            <LiveDemosPage onNavigate={handleNavigate} />
          </>
        );
      case 'testimonials':
        return (
          <>
            <SEOHead title="Client Testimonials - Adewale Samuel" />
            <TestimonialsPage onNavigate={handleNavigate} />
          </>
        );
      default:
        return renderHomePage();
    }
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* HEADER NAVIGATION - Fixed top navigation */}
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        
        {/* MAIN CONTENT AREA */}
        <main>
          {renderPageContent()}
        </main>
        
        {/* FOOTER - Copyright and social links */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}