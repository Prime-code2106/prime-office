/**
 * CONTACT SECTION COMPONENT
 * Contact form and information section with social links
 * 
 * CUSTOMIZATION NOTES:
 * - Update email address (currently set to adelekesam10@gmail.com)
 * - Update phone number and location details
 * - Modify social media links with your actual profiles
 * - Update availability status badge
 * - Form submission can be connected to email service or backend
 */

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

export function Contact() {
  /**
   * FORM SUBMISSION HANDLER
   * Currently shows alert - replace with actual form submission logic
   * Can integrate with EmailJS, Formspree, or your backend API
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Extract form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    // TODO: Replace with actual form submission
    // Example: submit to EmailJS, Formspree, or your backend
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Clear form after submission
    (e.target as HTMLFormElement).reset();
  };

  /**
   * GET IN TOUCH DIRECT EMAIL HANDLER
   * Opens default email client with pre-filled email
   * CUSTOMIZATION: Email is set to adelekesam10@gmail.com as requested
   */
  const handleDirectEmail = () => {
    window.location.href = 'mailto:primesameade@gmail.com?subject=Project Inquiry&body=Hi Adewale, I would like to discuss a project with you.';
  };

  /**
   * SOCIAL MEDIA LINKS
   * CUSTOMIZATION: Replace URLs with your actual social media profiles
   */
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/adewale-samuel-b8915b395?utm_source=share_via&utm_content=profile&utm_medium=member_android", // ACTUAL LINKEDIN
      handle: "/adewale-samuel-b8915b395"
    },
    {
      name: "GitHub", 
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/Daddy-prim", // TODO: Replace with actual GitHub
      handle: "/Daddy-prim"
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: "https://twitter.com/prime_dev", // TODO: Replace with actual Twitter
      handle: "@prime_dev"
    }
  ];

  /**
   * CONTACT INFORMATION
   * CUSTOMIZATION: Update with your actual contact details
   */
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "primesameade@gmail.com", // ACTUAL EMAIL ADDRESS
      href: "mailto:primesameade@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+234 903 411 042", // ACTUAL PHONE NUMBER
      href: "tel:+2349034110942"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "🌍 Available for Remote Work Worldwide", // Shows remote work capability
      href: null
    }
  ];

  return (
    <section id="contact" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* SECTION HEADER */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your vision to life? I'd love to collaborate on your next project. 
              Whether you need web development, mobile apps, AI solutions, or consulting services.
            </p>
            {/* AVAILABILITY STATUS - Update as needed */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-sm bg-green-100 text-green-800">
                🟢 Available for new projects
              </Badge>
              <Badge variant="outline" className="text-sm">
                🌍 Remote work worldwide
              </Badge>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* CONTACT FORM SECTION */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Me a Message</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below and I'll get back to you within 24 hours
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* NAME AND EMAIL ROW */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input id="name" name="name" required placeholder="Your full name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input id="email" name="email" type="email" required placeholder="your@email.com" />
                      </div>
                    </div>
                    
                    {/* SUBJECT FIELD */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input id="subject" name="subject" required placeholder="Project inquiry, collaboration, etc." />
                    </div>
                    
                    {/* MESSAGE FIELD */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea 
                        id="message" 
                        name="message"
                        required 
                        placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                        rows={5}
                      />
                    </div>
                    
                    {/* SUBMIT BUTTONS */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button type="submit" className="flex-1">
                        Send Message
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleDirectEmail}
                        className="flex-1"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email Directly
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* CONTACT INFO & SOCIAL SECTION */}
            <div className="space-y-6">
              {/* CONTACT INFORMATION CARD */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Get in touch through any of these channels
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="text-sm font-medium hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* SOCIAL MEDIA LINKS CARD */}
              <Card>
                <CardHeader>
                  <CardTitle>Connect With Me</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Follow my work and connect on social media
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="text-primary">
                        {social.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{social.name}</p>
                        <p className="text-xs text-muted-foreground">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* QUICK ACTIONS CARD */}
              <Card className="bg-primary/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => window.open('https://calendly.com/adewale-samuel', '_blank')}
                    >
                      📅 Schedule a Call
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => window.open('https://wa.me/2349043809970', '_blank')}
                    >
                      💬 WhatsApp Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}