/**
 * RESUME PAGE COMPONENT
 * Dedicated page for viewing and downloading resume
 * 
 * DEVELOPER NOTE: This page provides detailed resume view
 * with download functionality and navigation options
 */

import React from 'react';
import { ResumeViewer } from "../../components/ResumeViewer";
import { PageType } from "../../App";

interface ResumePageProps {
  onNavigate: (page: PageType) => void;
}

export function ResumePage({ onNavigate }: ResumePageProps) {
  return <ResumeViewer onNavigate={onNavigate} />;
}