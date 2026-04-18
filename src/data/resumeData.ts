/**
 * RESUME DATA CONFIGURATION
 * Centralized resume data for consistent use across components
 * 
 * CUSTOMIZATION NOTES:
 * - Update all personal information with your actual details
 * - Modify work experience, education, and skills
 * - Replace contact information and social links
 * - Update certifications and achievements
 */

export const resumeData = {
  /**
   * PERSONAL INFORMATION
   * CUSTOMIZATION: Update with your actual details
   */
  personalInfo: {
    name: "Adewale Samuel",
    nickname: "Prime",
    title: "Frontend Engineer | Web Application Developer | Supabase Specialist",
    location: "Akure, Ondo State, Nigeria (Available Worldwide)",
    email: "primesameade@gmail.com",
    phone: "+234 903 411 042",
    website: "https://adewale-samuel.vercel.app",
    linkedin: "https://www.linkedin.com/in/adewale-samuel-b8915b395?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/Daddy-prim",
    summary: "Dynamic Information Technology student at FUTA and a specialized Frontend Engineer with a proven track record in building scalable, high-performance Web Applications. Expert in the React ecosystem, Tailwind CSS, and Supabase, with a deep focus on integrating Generative AI (Gemini, ChatGPT) to create intuitive, next-generation user experiences. Passionate about leveraging AI-driven development to solve complex problems and deliver premium digital products."
  },

  /**
   * WORK EXPERIENCE
   * CUSTOMIZATION: Replace with your actual work history
   */
  workExperience: [
    {
      position: "Frontend Engineer (Contract)",
      company: "Various Tech Solutions",
      location: "Remote",
      duration: "2023 - Present",
      responsibilities: [
        "Architected and deployed high-performance React web applications with a focus on seamless user experiences",
        "Integrated AI APIs (Gemini, OpenAI) to build smart features like automated content generation and chat assistants",
        "Leveraged Supabase for real-time data synchronization, secure authentication, and complex relational data management",
        "Pioneered the use of AI-driven development tools to accelerate project delivery while maintaining high code quality",
        "Optimized frontend performance metrics, achieving significantly faster load times and improved Lighthouse scores"
      ]
    },
    {
      position: "Web Application Developer",
      company: "Freelance Portfolio Projects",
      location: "Remote",
      duration: "2022 - 2023",
      responsibilities: [
        "Identified client needs and developed custom Web Applications using the React/Tailwind ecosystem",
        "Implemented robust state management solutions and optimized data fetching for complex web apps",
        "Focused on accessibility (A11y) and responsive design, ensuring cross-device compatibility",
        "Built interactive dashboards and data-driven tools for small to medium-scale digital products",
        "Managed the full software development lifecycle from initial concept to Vercel/Netlify deployment"
      ]
    }
  ],

  /**
   * EDUCATION
   * CUSTOMIZATION: Update with your actual education
   */
  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "Federal University of Technology Akure (FUTA)",
      location: "Akure, Ondo State, Nigeria",
      duration: "2023 - Present",
      honors: "In Progress",
      achievements: [
        "Specializing in Web Technology & Frontend Systems",
        "Dean's List for Academic Performance",
        "Active member of the FUTA Tech Community",
        "Contributing to Open Source Web Projects"
      ]
    }
  ],

  /**
   * SKILLS CATEGORIES
   * CUSTOMIZATION: Update skills based on your expertise
   */
  skills: {
    frontend: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Redux/Context API", "Responsive Web Design"],
    backend: ["Supabase (BaaS)", "PostgreSQL", "Firebase/Firestore", "Node.js (Basics)", "Auth & Security"],
    ai: ["Generative AI Integration", "Prompt Engineering", "AI Story Writing", "Gemini & ChatGPT API", "Midjourney/DALL-E"],
    tools: ["Git/GitHub", "Vite", "VS Code", "Vercel Deployment", "Figma to Code", "Postman API Development"],
    soft: ["Problem Solving", "Agile Collaboration", "Technical Communication", "Product Design Thinking"]
  },

  /**
   * CERTIFICATIONS
   * CUSTOMIZATION: Add your actual certifications
   */
  certifications: [
    {
      name: "Full Stack Web Development",
      issuer: "FreeCodeCamp",
      date: "2023",
      id: "FCC-FSWD-2023"
    },
    {
      name: "AI Prompt Engineering Specialist",
      issuer: "Emerging Tech Academy",
      date: "2024",
      id: "AI-PES-2024"
    }
  ]
};