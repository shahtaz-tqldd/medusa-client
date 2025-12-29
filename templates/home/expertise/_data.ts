import { Coffee, Cpu, Brain } from "lucide-react";
import type { ExpertiseArea } from "./_types";

export const expertiseData: ExpertiseArea[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Coffee,
    img: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751174770/amc_ije1tp.jpg",
    description: "I build modern web interfaces where aesthetics meet performance and usability. My focus is not just on writing code, but creating interfaces that load fast, uses logical caching and scale gracefully as products grow. By combining modern frontend frameworks with thoughtful design practices, I turn complex visual into clean, interactive, and user-friendly digital products.",
    keyPoints: [
      "User-Centric desgin that supports responsiveness among cross platforms and devices",
      "Performance-Focused Development with seamless Data & state management",
      "Strong Component Architecture & Clean Code",

    ],
    projects: [
      {
        name: "E-Commerce Dashboard",
        description: "Built a comprehensive admin dashboard with real-time analytics, inventory management, and order tracking using React and Chart.js",
      },
      {
        name: "Portfolio Website Builder",
        description: "Developed a drag-and-drop portfolio builder with customizable themes, allowing users to create professional portfolios without coding",
      },
      {
        name: "Social Media Analytics Tool",
        description: "Created an interactive analytics platform with data visualization, user engagement metrics, and automated reporting features",
      }
    ],
    experience: "With 2+ years of frontend development experience, I've delivered multiple production-ready applications focusing on performance, accessibility, and user experience. My approach combines technical excellence with design sensibility to create applications that users love to interact with.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion",],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Cpu,
    img: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751174770/genomart_eqbpan.jpg",
    description: "I architect and build backend systems that are reliable, scalable, and designed to grow with the product. I care about data integrity, performance under load, and clean system design that stays maintainable as complexity increases. I turn business logic into well-structured services, designing APIs that feel intuitive to consume.",
    keyPoints: [
      "Ensure scalable and clean system architecture maintaining performance, security and reliability",
      "APIs that follow best practices and are easy for frontend teams to integrate with",
      "I write backend code with the next developer in mind. Clear abstractions, meaningful logging, and thoughtful documentation.",
    ],
    projects: [
      {
        name: "Task Management API",
        description: "Developed a RESTful API for a project management system with role - based access control, real - time notifications, and file upload capabilities",
      },
      {
        name: "Payment Gateway Integration",
        description: "Implemented secure payment processing with Stripe, handling webhooks, subscription management, and transaction logging",
      },
      {
        name: "Authentication Microservice",
        description: "Built a reusable authentication service with JWT tokens, refresh token rotation, and multi - factor authentication support",
      }
    ],
    experience: "Specialized in creating maintainable and scalable backend systems that handle complex business requirements.I prioritize code quality, security best practices, and thorough testing to ensure reliable production systems.",
    technologies: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: "ai - agents",
    title: "AI Agent",
    icon: Brain,
    img: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751174776/restro_ek9ssg.jpg",
    description: "I design and build intelligent AI agents that don't just respond but reason, adapt, and act with purpose. From decision-making logic to tool orchestration, I craft systems that bridge human intent with machine intelligence. ",
    keyPoints: [
      "Design agents that can break down complex goals into actionable steps, reason over context, and choose the right tools at the right time.",
      "Build agents that understand and retain relevant context, maintaining continuity across interactions while avoiding unnecessary noise.",
      "Integrate AI agents into real-world systems: APIs, dashboards, databases, and automation pipelines.",
    ],
    projects: [
      {
        name: "Customer Support AI Assistant",
        description: "Built an intelligent chatbot using Claude API that handles customer queries, accesses knowledge bases, and escalates complex issues to human agents",
      },
      {
        name: "Code Review Agent",
        description: "Developed an automated code review system that analyzes pull requests, suggests improvements, and ensures coding standards compliance",
      },
      {
        name: "Document Processing Pipeline",
        description: "Created an AI-powered document analysis tool that extracts information, summarizes content, and generates structured data from unstructured documents",
      }
    ],
    experience: "Passionate about leveraging AI to solve real-world problems and automate complex workflows. I focus on creating practical AI solutions that enhance productivity while maintaining reliability and user trust through thoughtful design and testing.",
    technologies: ["OpenAI API", "Claude API", "LangChain", "Vector Databases", "Python", "FastAPI",],
  }
]