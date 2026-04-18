/**
 * WORK PROCESS PAGE COMPONENT
 * Dedicated page for showcasing work methodology and process
 * 
 * DEVELOPER NOTE: This page details the professional workflow
 * and methodology used for client projects
 */

import React from 'react';
import { WorkProcess } from "../../components/WorkProcess";
import { PageType } from "../../App";

interface WorkProcessPageProps {
  onNavigate: (page: PageType) => void;
}

export function WorkProcessPage({ onNavigate }: WorkProcessPageProps) {
  return <WorkProcess onNavigate={onNavigate} />;
}