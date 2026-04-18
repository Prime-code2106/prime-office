/**
 * HOME PAGE COMPONENT
 * Main landing page that displays all portfolio sections
 * 
 * DEVELOPER NOTE: This page combines all major sections of the portfolio
 * into a single scrollable homepage with navigation anchors
 */

import React from 'react';
import { Hero } from "../../components/Hero";
import { About } from "../../components/About";
import { Services } from "../../components/Services";
import { Portfolio } from "../../components/Portfolio";
import { WorkProcess } from "../../components/WorkProcess";
import { Resume } from "../../components/Resume";
import { Contact } from "../../components/Contact";
import { PageType } from "../../App";

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <>
      {/* HERO SECTION - Main introduction with background image */}
      <Hero onNavigate={onNavigate} />
      
      {/* ABOUT SECTION - Brief introduction */}
      <About />
      
      {/* SERVICES SECTION - What I offer */}
      <Services />
      
      {/* PORTFOLIO SECTION - Featured projects */}
      <Portfolio onNavigate={onNavigate} />
      
      {/* WORK PROCESS SECTION - How I work */}
      <WorkProcess />
      
      {/* RESUME SECTION - Resume preview and download */}
      <Resume onNavigate={onNavigate} />
      
      {/* CONTACT SECTION - Get in touch form */}
      <Contact />
    </>
  );
}