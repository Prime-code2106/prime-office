/**
 * MAIN APPLICATION COMPONENT (organized structure)
 * This is the root component of Adewale Samuel (Prime) Portfolio Website
 * It handles routing between different pages and renders the main layout
 * 
 * DEVELOPER NOTE: This component uses React state for simple routing
 * To modify navigation, update the currentPage state and add new page cases
 */

import React, { useState } from 'react';
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { Portfolio } from "../components/Portfolio";
import { Resume } from "../components/Resume";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { WorkProcess } from "../components/WorkProcess";
import { Skills } from "../components/Skills";
import { AllProjects } from "../components/AllProjects";
import { ResumeViewer } from "../components/ResumeViewer";

// Define available pages for navigation
export const PageTypes = {
  HOME: 'home',
  SKILLS: 'skills', 
  PROJECTS: 'projects',
  RESUME_VIEW: 'resume-view',
  WORK_PROCESS: 'work-process'
};

export default function App() {
  // State to manage current page - change this to navigate between pages
  const [currentPage, setCurrentPage] = useState(PageTypes.HOME);

  /**
   * NAVIGATION HANDLER
   * This function handles page navigation throughout the app
   * Called by buttons and navigation links
   */
  const handleNavigate = (page) => {
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
      {/* HERO SECTION - Main introduction with background image */}
      <Hero onNavigate={handleNavigate} />
      
      {/* ABOUT SECTION - Brief introduction */}
      <About />
      
      {/* SERVICES SECTION - What I offer */}
      <Services />
      
      {/* PORTFOLIO SECTION - Featured projects */}
      <Portfolio onNavigate={handleNavigate} />
      
      {/* WORK PROCESS SECTION - How I work */}
      <WorkProcess />
      
      {/* RESUME SECTION - Resume preview and download */}
      <Resume onNavigate={handleNavigate} />
      
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
      case PageTypes.HOME:
        return renderHomePage();
      case PageTypes.SKILLS:
        return <Skills onNavigate={handleNavigate} />;
      case PageTypes.PROJECTS:
        return <AllProjects onNavigate={handleNavigate} />;
      case PageTypes.RESUME_VIEW:
        return <ResumeViewer onNavigate={handleNavigate} />;
      case PageTypes.WORK_PROCESS:
        return <WorkProcess onNavigate={handleNavigate} />;
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER NAVIGATION - Fixed top navigation */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      {/* MAIN CONTENT AREA */}
      <main>
        {renderPageContent()}
      </main>
      
      {/* FOOTER - Copyright and social links */}
      <Footer />
    </div>
  );
}