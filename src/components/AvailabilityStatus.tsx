/**
 * AVAILABILITY STATUS COMPONENT
 * Shows current availability for new projects
 * 
 * FEATURES:
 * - Real-time availability indicator
 * - Next available date
 * - Project capacity tracker
 * - Response time estimate
 * - Direct booking buttons
 * - Animated pulse effect
 * 
 * CUSTOMIZATION:
 * - Lines 34-41: Update availability config
 * - Lines 138-145: Update header badge config (keep in sync!)
 */

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Calendar, Clock, Briefcase, MessageSquare, CheckCircle2 } from "lucide-react";

interface AvailabilityConfig {
  status: 'available' | 'limited' | 'booked';
  nextAvailable: string;
  currentProjects: number;
  maxProjects: number;
  responseTime: string;
  message: string;
}

export function AvailabilityStatus() {
  /**
   * AVAILABILITY CONFIGURATION
   * 👉 UPDATE THIS WITH YOUR CURRENT AVAILABILITY!
   */
  const availability: AvailabilityConfig = {
    status: 'available',                    // 'available' | 'limited' | 'booked'
    nextAvailable: 'Immediately',           // e.g., 'Immediately' or 'March 2025'
    currentProjects: 2,                     // How many projects you're working on
    maxProjects: 4,                         // Max projects you can handle
    responseTime: '24 hours',               // Your typical response time
    message: 'Currently accepting new projects and collaborations'
  };

  /**
   * STATUS CONFIGURATION
   * Visual settings for different availability states
   */
  const statusConfig = {
    available: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: '🟢',
      label: 'Available for Work',
      description: 'Open to new projects'
    },
    limited: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      icon: '🟡',
      label: 'Limited Availability',
      description: '1-2 spots remaining'
    },
    booked: {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      icon: '🔴',
      label: 'Fully Booked',
      description: 'Join waitlist'
    }
  };

  const currentStatus = statusConfig[availability.status];
  const capacityPercentage = (availability.currentProjects / availability.maxProjects) * 100;

  return (
    <Card className={`h-full ${currentStatus.borderColor} border-2`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="relative">
            <CheckCircle2 className={`h-5 w-5 ${currentStatus.color}`} />
            {availability.status === 'available' && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-ping" />
            )}
          </div>
          Availability Status
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* STATUS BADGE */}
        <div className={`p-4 rounded-lg ${currentStatus.bgColor} border ${currentStatus.borderColor}`}>
          <div className="text-center">
            <div className="text-2xl mb-2">{currentStatus.icon}</div>
            <div className={`font-semibold ${currentStatus.color}`}>
              {currentStatus.label}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {currentStatus.description}
            </div>
          </div>
        </div>

        {/* STATUS MESSAGE */}
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-sm">{availability.message}</p>
        </div>

        {/* AVAILABILITY DETAILS */}
        <div className="grid grid-cols-2 gap-3">
          {/* Next Available */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold">Next Available</span>
            </div>
            <div className="text-sm">{availability.nextAvailable}</div>
          </div>

          {/* Response Time */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold">Response Time</span>
            </div>
            <div className="text-sm">{availability.responseTime}</div>
          </div>

          {/* Active Projects */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold">Active Projects</span>
            </div>
            <div className="text-sm font-semibold">
              {availability.currentProjects} / {availability.maxProjects}
            </div>
          </div>

          {/* Capacity */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold">Capacity</span>
            </div>
            <div className="text-sm font-semibold">
              {availability.status === 'available' ? '🟢' : availability.status === 'limited' ? '🟡' : '🔴'} {100 - capacityPercentage}%
            </div>
          </div>
        </div>

        {/* CAPACITY PROGRESS BAR */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Project Capacity</span>
            <span className="font-semibold">{Math.round(capacityPercentage)}%</span>
          </div>
          <Progress value={capacityPercentage} className="h-2" />
        </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-2 pt-2">
          <Button
            className="w-full"
            onClick={() => window.open('https://calendly.com/adewale-samuel', '_blank')}
            disabled={availability.status === 'booked'}
          >
            <Calendar className="h-4 w-4 mr-2" />
            {availability.status === 'booked' ? 'Join Waitlist' : 'Schedule Consultation'}
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open('mailto:adelekesam10@gmail.com?subject=Project Inquiry', '_blank')}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Project Inquiry
          </Button>
        </div>

        {/* QUICK INFO */}
        <div className="pt-3 border-t text-center">
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span>⚡ Quick Response</span>
            <span>🌍 Remote Work</span>
            <span>💬 Clear Communication</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * AVAILABILITY BADGE (for header)
 * Compact version for navigation bar
 */
export function AvailabilityBadge() {
  /**
   * BADGE CONFIGURATION
   * 👉 KEEP THIS IN SYNC WITH THE MAIN COMPONENT ABOVE!
   */
  const availability: AvailabilityConfig = {
    status: 'available',                    // 👈 UPDATE THIS!
    nextAvailable: 'Immediately',
    currentProjects: 2,
    maxProjects: 4,
    responseTime: '24 hours',
    message: 'Currently accepting new projects'
  };

  const statusConfig = {
    available: { color: 'bg-green-500', text: 'Available for Work' },
    limited: { color: 'bg-yellow-500', text: 'Limited Spots' },
    booked: { color: 'bg-red-500', text: 'Fully Booked' }
  };

  const currentStatus = statusConfig[availability.status];

  return (
    <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
      <span className={`h-2 w-2 rounded-full ${currentStatus.color} animate-pulse`} />
      <span className="text-xs">{currentStatus.text}</span>
    </Badge>
  );
}
