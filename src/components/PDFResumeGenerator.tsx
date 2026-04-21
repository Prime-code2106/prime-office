/**
 * PDF RESUME GENERATOR COMPONENT
 * Generates and downloads a PDF version of the resume
 * Uses HTML to PDF conversion for consistent formatting
 * 
 * CUSTOMIZATION NOTES:
 * - Update all personal information and content
 * - Modify styling and layout as needed
 * - Replace contact details with your own
 */

import React from 'react';
import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface PDFResumeGeneratorProps {
  personalInfo: {
    name: string;
    nickname: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  workExperience: Array<{
    position: string;
    company: string;
    location: string;
    duration: string;
    responsibilities: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    duration: string;
    honors: string;
    achievements: string[];
  }>;
  skills: {
    frontend: string[];
    backend: string[];
    ai: string[];
    tools: string[];
    soft: string[];
  };
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    id: string;
  }>;
}

export function PDFResumeGenerator({
  personalInfo,
  workExperience,
  education,
  skills,
  certifications
}: PDFResumeGeneratorProps) {

  /**
   * GENERATE PDF RESUME HANDLER
   * Creates a PDF version of the resume and triggers a direct download
   */
  const generatePDFResume = () => {
    // Create a temporary container to hold the resume HTML
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '-9999px';
    element.style.width = '800px'; // Standard width for PDF generation
    
    // Resume HTML content (same as before but optimized for html2pdf)
    element.innerHTML = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; padding: 40px; background: white;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
          <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 5px;">${personalInfo.name}</h1>
          <div style="font-size: 16px; color: #666; font-style: italic; margin-bottom: 8px;">"${personalInfo.nickname}"</div>
          <div style="font-size: 18px; color: #444; font-weight: 600; margin-bottom: 15px;">${personalInfo.title}</div>
          <div style="display: flex; justify-content: center; gap: 15px; font-size: 12px; flex-wrap: wrap;">
            <span>📍 ${personalInfo.location}</span>
            <span>✉️ ${personalInfo.email}</span>
            <span>📞 ${personalInfo.phone}</span>
            <span>🌐 Portfolio</span>
          </div>
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: bold; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px;">Professional Summary</h2>
          <div style="font-size: 13px; line-height: 1.6; color: #555; text-align: justify;">
            ${personalInfo.summary}
          </div>
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: bold; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px;">Work Experience</h2>
          ${workExperience.map(job => `
            <div style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <div>
                  <div style="font-weight: bold; font-size: 14px;">${job.position}</div>
                  <div style="color: #555; font-size: 13px;">${job.company}</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 12px; color: #666;">${job.duration}</div>
                  <div style="font-size: 12px; color: #666;">${job.location}</div>
                </div>
              </div>
              <ul style="list-style-type: disc; margin-left: 20px; font-size: 12px; color: #555;">
                ${job.responsibilities.map(resp => `<li style="margin-bottom: 3px;">${resp}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: bold; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px;">Education</h2>
          ${education.map(edu => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <div>
                  <div style="font-weight: bold; font-size: 14px;">${edu.degree}</div>
                  <div style="color: #555; font-size: 13px;">${edu.institution} - ${edu.honors}</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 12px; color: #666;">${edu.duration}</div>
                  <div style="font-size: 12px; color: #666;">${edu.location}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: bold; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px;">Technical Skills</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <div style="margin-bottom: 10px;">
                <h4 style="font-size: 13px; font-weight: bold; margin-bottom: 5px;">Frontend Development</h4>
                <div style="font-size: 11px; color: #555;">${skills.frontend.join(', ')}</div>
              </div>
              <div style="margin-bottom: 10px;">
                <h4 style="font-size: 13px; font-weight: bold; margin-bottom: 5px;">Backend & Auth</h4>
                <div style="font-size: 11px; color: #555;">${skills.backend.join(', ')}</div>
              </div>
            </div>
            <div>
              <div style="margin-bottom: 10px;">
                <h4 style="font-size: 13px; font-weight: bold; margin-bottom: 5px;">Generative AI</h4>
                <div style="font-size: 11px; color: #555;">${skills.ai.join(', ')}</div>
              </div>
              <div style="margin-bottom: 10px;">
                <h4 style="font-size: 13px; font-weight: bold; margin-bottom: 5px;">Tools</h4>
                <div style="font-size: 11px; color: #555;">${skills.tools.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 style="font-size: 18px; font-weight: bold; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px;">Certifications</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            ${certifications.map(cert => `
              <div style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; background: #f9f9f9;">
                <div style="font-weight: bold; font-size: 12px; margin-bottom: 3px;">${cert.name}</div>
                <div style="color: #555; font-size: 11px;">${cert.issuer}</div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: #666; margin-top: 5px;">
                  <span>${cert.date}</span>
                  <span>ID: ${cert.id}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(element);

    const opt = {
      margin:       0.5,
      filename:     `${personalInfo.name}_Resume.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf if available
    if ((window as any).html2pdf) {
      (window as any).html2pdf().set(opt).from(element).save().then(() => {
        document.body.removeChild(element);
      });
    } else {
      // Fallback if script didn't load
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(element.innerHTML);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          document.body.removeChild(element);
        }, 500);
      } else {
        alert('Unable to generate PDF. Please try again or allow popups.');
        document.body.removeChild(element);
      }
    }
  };

  return (
    <Button
      onClick={generatePDFResume}
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Download PDF
    </Button>
  );
}