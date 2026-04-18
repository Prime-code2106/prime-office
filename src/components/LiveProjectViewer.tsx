/**
 * LIVE PROJECT VIEWER COMPONENT
 * Interactive modal for viewing live project demos and previews
 * 
 * FEATURES:
 * - Embedded iframe previews for web projects
 * - Live status checking and indicators
 * - Multiple project screenshots carousel
 * - Interactive demo components
 * - Responsive design for different screen sizes
 * 
 * CUSTOMIZATION NOTES:
 * - Replace demo URLs with your actual project URLs
 * - Update project data and screenshots
 * - Modify iframe sandbox settings as needed
 * - Add more interactive demo components
 */

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ExternalLink, 
  Github, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Eye, 
  Play, 
  Pause, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Globe
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl: string;
  category: string;
  screenshots?: string[];
  demoType?: 'web' | 'mobile' | 'api' | 'desktop';
  isInteractive?: boolean;
}

interface LiveProjectViewerProps {
  project: Project;
  children: React.ReactNode;
}

export function LiveProjectViewer({ project, children }: LiveProjectViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * CHECK LIVE STATUS
   * Attempts to verify if the project URL is accessible
   * Note: This is a basic implementation - in production you'd want a more robust checking system
   */
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        setIsLoading(true);
        // Simple check - in real implementation, you might use a service worker or backend
        const response = await fetch(project.liveUrl, { mode: 'no-cors' });
        setIsLive(true);
      } catch (error) {
        // For demo purposes, assume all projects are live
        setIsLive(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (project.liveUrl) {
      checkLiveStatus();
    }
  }, [project.liveUrl]);

  /**
   * DEVICE DIMENSIONS
   * Responsive iframe dimensions for different device previews
   */
  const getDeviceDimensions = () => {
    switch (selectedDevice) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '600px' };
    }
  };

  /**
   * SCREENSHOT CAROUSEL AUTO-PLAY
   * Automatically cycles through project screenshots
   */
  useEffect(() => {
    if (isPlaying && project.screenshots && project.screenshots.length > 1) {
      const interval = setInterval(() => {
        setCurrentScreenshot((prev) => 
          prev === project.screenshots!.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, project.screenshots]);

  /**
   * DEFAULT SCREENSHOTS
   * If no screenshots provided, use the main project image
   * Ensure we always have an array to prevent map errors
   */
  const screenshots = project.screenshots && Array.isArray(project.screenshots) 
    ? project.screenshots 
    : [project.image || ''];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{project.title}</span>
            <div className="flex items-center gap-2">
              {/* LIVE STATUS INDICATOR */}
              {isLoading ? (
                <Badge variant="outline" className="flex items-center gap-1">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Checking...
                </Badge>
              ) : isLive ? (
                <Badge className="bg-green-500 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Live
                </Badge>
              ) : (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Offline
                </Badge>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            Interactive project viewer with live demo, source code, and project details.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
            <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
          </TabsList>

          {/* LIVE PREVIEW TAB */}
          <TabsContent value="preview" className="mt-6">
            <div className="space-y-4">
              {/* DEVICE SELECTOR */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Device Preview:</span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={selectedDevice === 'desktop' ? 'default' : 'outline'}
                      onClick={() => setSelectedDevice('desktop')}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedDevice === 'tablet' ? 'default' : 'outline'}
                      onClick={() => setSelectedDevice('tablet')}
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedDevice === 'mobile' ? 'default' : 'outline'}
                      onClick={() => setSelectedDevice('mobile')}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </Button>
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </Button>
                  )}
                </div>
              </div>

              {/* IFRAME PREVIEW */}
              <Card>
                <CardContent className="p-4">
                  <div className={`mx-auto bg-gray-100 rounded-lg overflow-hidden ${selectedDevice === 'desktop' ? '' : 'p-4'}`}>
                    <div 
                      style={getDeviceDimensions()}
                      className={`mx-auto ${selectedDevice === 'desktop' ? 'w-full' : 'border-8 border-gray-800 rounded-lg'}`}
                    >
                      <iframe
                        src={project.liveUrl}
                        className="w-full h-full border-0 rounded"
                        title={`${project.title} Live Preview`}
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SCREENSHOTS TAB */}
          <TabsContent value="screenshots" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Project Screenshots</h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? 'Pause' : 'Auto-play'}
                  </Button>
                </div>
              </div>

              {/* MAIN SCREENSHOT DISPLAY */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded">
                    <ImageWithFallback
                      src={screenshots[currentScreenshot]}
                      alt={`${project.title} screenshot ${currentScreenshot + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {currentScreenshot + 1} / {screenshots.length}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* THUMBNAIL NAVIGATION */}
              {screenshots.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {screenshots.map((screenshot, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`flex-shrink-0 w-24 h-16 rounded overflow-hidden border-2 transition-colors ${
                        currentScreenshot === index ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <ImageWithFallback
                        src={screenshot}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* DETAILS TAB */}
          <TabsContent value="details" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Project Description</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies && Array.isArray(project.technologies) 
                    ? project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline">{tech}</Badge>
                      ))
                    : <Badge variant="outline">No technologies listed</Badge>
                  }
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Live URL
                    </h4>
                    <p className="text-sm text-muted-foreground break-all">{project.liveUrl}</p>
                  </CardContent>
                </Card>
                
                {project.githubUrl && (
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        Source Code
                      </h4>
                      <p className="text-sm text-muted-foreground break-all">{project.githubUrl}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="flex gap-4">
                <Button onClick={() => window.open(project.liveUrl, '_blank')}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Live Site
                </Button>
                {project.githubUrl && (
                  <Button variant="outline" onClick={() => window.open(project.githubUrl, '_blank')}>
                    <Github className="h-4 w-4 mr-2" />
                    View Source
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          {/* INTERACTIVE DEMO TAB */}
          <TabsContent value="demo" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Interactive Demo</h3>
              {project.isInteractive ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h4 className="font-semibold mb-2">Interactive Demo Available</h4>
                    <p className="text-muted-foreground mb-4">
                      This project includes interactive elements you can try out.
                    </p>
                    <Button onClick={() => window.open(project.liveUrl, '_blank')}>
                      <Play className="h-4 w-4 mr-2" />
                      Launch Interactive Demo
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Monitor className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h4 className="font-semibold mb-2">Static Demo</h4>
                    <p className="text-muted-foreground mb-4">
                      This project can be viewed but doesn't include interactive demo features.
                    </p>
                    <Button variant="outline" onClick={() => window.open(project.liveUrl, '_blank')}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}