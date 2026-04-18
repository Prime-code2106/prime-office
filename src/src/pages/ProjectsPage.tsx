/**
 * PROJECTS PAGE COMPONENT
 * Dedicated page for showcasing all projects in detail
 * 
 * DEVELOPER NOTE: This page displays comprehensive project portfolio
 * with detailed descriptions, technologies used, and live links
 */

import React from 'react';
import { AllProjects } from "../../components/AllProjects";
import { PageType } from "../../App";

interface ProjectsPageProps {
  onNavigate: (page: PageType) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  return <AllProjects onNavigate={onNavigate} />;
}