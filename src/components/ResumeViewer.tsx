/**
 * RESUME VIEWER COMPONENT
 * Online resume viewer with download functionality
 * 
 * CUSTOMIZATION NOTES:
 * - Update all personal information and contact details
 * - Modify work experience, education, and skills
 * - Replace with your actual resume content
 * - Update download links and file paths
 */

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ArrowLeft, Download, Mail, Phone, MapPin, Globe, Linkedin, Github, Eye } from "lucide-react";
import { PageType } from "../App";
import { PDFResumeGenerator } from "./PDFResumeGenerator";
import { resumeData } from "../data/resumeData";

interface ResumeViewerProps {
  onNavigate: (page: PageType) => void;
}

export function ResumeViewer({ onNavigate }: ResumeViewerProps) {
  /**
   * DOWNLOAD RESUME HANDLER
   * Downloads the PDF resume file with improved error handling
   * CUSTOMIZATION: Replace with your actual resume PDF URL
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

  // Use centralized resume data
  const { personalInfo, workExperience, education, skills, certifications } = resumeData;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={() => window.open('https://prime-office.netlify.app/resume/', '_blank')}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Eye className="h-4 w-4" />
              View PDF
            </Button>
            <PDFResumeGenerator
              personalInfo={personalInfo}
              workExperience={workExperience}
              education={education}
              skills={skills}
              certifications={certifications}
            />
          </div>
        </div>

        {/* RESUME CONTENT */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* HEADER SECTION */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
              <p className="text-xl text-muted-foreground mb-1">"{personalInfo.nickname}"</p>
              <p className="text-lg text-primary font-semibold mb-4">{personalInfo.title}</p>
              
              {/* CONTACT INFORMATION */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {personalInfo.location}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-primary">
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {personalInfo.phone}
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    Portfolio
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" />
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    LinkedIn
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <Separator className="mb-8" />

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
              <p className="text-muted-foreground leading-relaxed">
              <p className="text-muted-foreground leading-relaxed">
                {resumeData.personalInfo.summary}
              </p>
              </p>
            </section>

            <Separator className="mb-8" />

            {/* WORK EXPERIENCE */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
              {workExperience.map((job, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{job.position}</h3>
                      <p className="text-primary font-medium">{job.company}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{job.duration}</p>
                      <p>{job.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    {job.responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                  {index < workExperience.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </section>

            <Separator className="mb-8" />

            {/* EDUCATION */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-primary font-medium">{edu.institution}</p>
                      <Badge variant="secondary" className="mt-1">{edu.honors}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{edu.duration}</p>
                      <p>{edu.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <Separator className="mb-8" />

            {/* TECHNICAL SKILLS */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Frontend Development</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.frontend.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                  
                  <h3 className="font-semibold mb-3">Backend Development</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.backend.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">AI & Machine Learning</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.ai.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                  
                  <h3 className="font-semibold mb-3">Tools & Platforms</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.tools.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold mb-3">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </section>

            <Separator className="mb-8" />

            {/* CERTIFICATIONS */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Certifications</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-primary text-sm">{cert.issuer}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline">{cert.date}</Badge>
                        <span className="text-xs text-muted-foreground">ID: {cert.id}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator className="mb-8" />

            {/* CALL TO ACTION */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Ready to Work Together?</h3>
              <p className="text-muted-foreground mb-6">
                I'm always excited to take on new challenges and collaborate on innovative projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.open('https://calendly.com/adewale-samuel', '_blank')}
                  size="lg"
                >
                  Schedule a Call
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('mailto:primesameade@gmail.com', '_blank')}
                  size="lg"
                >
                  Email Me
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}