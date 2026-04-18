/**
 * SKILLS PAGE COMPONENT
 * Dedicated page for showcasing skills and education details
 * 
 * DEVELOPER NOTE: This is a separate page that provides detailed view
 * of skills, education, and professional qualifications
 */

import React from 'react';
import { Skills } from "../../components/Skills";
import { PageType } from "../../App";

interface SkillsPageProps {
  onNavigate: (page: PageType) => void;
}

export function SkillsPage({ onNavigate }: SkillsPageProps) {
  return <Skills onNavigate={onNavigate} />;
}