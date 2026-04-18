/**
 * RESUME SECTION COMPONENT
 * Resume preview and download section on home page
 * 
 * CUSTOMIZATION NOTES:
 * - Update resume file path and download URL
 * - Modify resume content description
 * - "View Online" button navigates to dedicated resume viewer page
 * - "Download PDF" button downloads the actual resume file
 */

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Download, Eye, FileText, Calendar } from "lucide-react";
import { PageType } from "../App";
import { PDFResumeGenerator } from "./PDFResumeGenerator";
import { resumeData } from "../data/resumeData";

interface ResumeProps {
  onNavigate: (page: PageType) => void;
}

export function Resume({ onNavigate }: ResumeProps) {
  /**
   * VIEW RESUME ONLINE HANDLER
   * Navigates to the dedicated resume viewer page
   */
  const handleViewResume = () => {
    onNavigate('resume-view');
  };

  /**
   * DOWNLOAD RESUME HANDLER
   * Downloads the PDF resume file with improved error handling
   * CUSTOMIZATION: Replace with your actual resume PDF path
   */
  const handleDownloadResume = async () => {
    try {
      // First, try to fetch the PDF to check if it exists
      const response = await fetch('/resume/Adewale_Samuel_Prime_Resume.pdf');
      
      if (!response.ok) {
        console.error('PDF file not found');
        alert('Resume PDF is currently not available. Please contact me directly for my resume.');
        return;
      }

      // Create blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Adewale_Samuel_Prime_Resume.pdf';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('Resume downloaded successfully');
    } catch (error) {
      console.error('Error downloading resume:', error);
      
      // Fallback to direct link method
      try {
        const link = document.createElement('a');
        link.href = '/resume/Adewale_Samuel_Prime_Resume.pdf';
        link.target = '_blank';
        link.download = 'Adewale_Samuel_Prime_Resume.pdf';
        link.click();
      } catch (fallbackError) {
        alert('Unable to download resume. Please contact me directly at primesameade@gmail.com');
      }
    }
  };

  /**
   * SCHEDULE CALL HANDLER
   * Opens scheduling tool for potential employers/clients
   */
  const handleScheduleCall = () => {
    window.open('https://calendly.com/adewale-samuel', '_blank');
  };

  return (
    <section id="resume" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* SECTION HEADER */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Professional Resume</h2>
            <p className="text-lg text-muted-foreground">
              Get a comprehensive overview of my experience, skills, and achievements. 
              Available for download or view online.
            </p>
          </div>
          
          {/* RESUME CARD */}
          <Card className="text-left shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Adewale Samuel (Prime)</CardTitle>
              <p className="text-muted-foreground">Frontend Engineer | IT Student | Supabase Specialist</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* RESUME DESCRIPTION */}
              <div className="text-center text-muted-foreground">
                <p>
                  Explore my latest resume to see how I combine Frontend expertise with 
                  AI integration to build powerful, scalable Web Applications.
                </p>
              </div>
              
              {/* ACTION BUTTONS */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* View Online Button - Active navigation to resume viewer */}
                <Button 
                  onClick={handleViewResume}
                  className="w-full"
                  variant="outline"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Online
                </Button>
                
                {/* Dynamic PDF Generation Button */}
                <div className="w-full">
                  <PDFResumeGenerator 
                    personalInfo={resumeData.personalInfo}
                    workExperience={resumeData.workExperience}
                    education={resumeData.education}
                    skills={resumeData.skills}
                    certifications={resumeData.certifications}
                  />
                </div>
                
                {/* Static PDF Download Button */}
                <Button 
                  onClick={handleDownloadResume}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                
                {/* Schedule Call Button - Active scheduling */}
                <Button 
                  onClick={handleScheduleCall}
                  className="w-full"
                  variant="secondary"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Call
                </Button>
              </div>
              
              {/* ADDITIONAL PDF OPTIONS */}
              <div className="flex justify-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Having trouble with the PDF? Try the 
                  <Button 
                    variant="link" 
                    className="p-0 ml-1 h-auto"
                    onClick={handleViewResume}
                  >
                    online version
                  </Button>
                  or contact me directly.
                </p>
              </div>
              
              {/* RESUME HIGHLIGHTS */}
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3 text-center">Resume Highlights:</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      Frontend Specialist (React & Tailwind)
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      Scalable Web Application Development
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      Supabase Real-time Integration
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      Generative AI (Gemini/ChatGPT) API
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      AI-Driven Dev Workflow Optimization
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      Prompt Engineering Specialist
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      Academic Excellence (IT at FUTA)
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      Full-stack Capable with BaaS
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* CONTACT FOR OPPORTUNITIES */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  Open to new opportunities and exciting projects
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('mailto:primesameade@gmail.com?subject=Job Opportunity', '_blank')}
                >
                  Contact for Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}