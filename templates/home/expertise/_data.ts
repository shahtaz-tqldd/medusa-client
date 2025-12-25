import { Coffee, Cpu, Brain } from "lucide-react";
import type { ExpertiseArea } from "./_types";

export const expertiseData: ExpertiseArea[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Coffee,
    img: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751174770/amc_ije1tp.jpg",
    description: "Crafting responsive, user-centric web applications with modern frameworks and best practices. Specializing in creating seamless user experiences with clean, maintainable code and pixel-perfect designs.",
    keyPoints: [
      "React.js & Next.js ecosystem with TypeScript",
      "Responsive design with Tailwind CSS & modern CSS",
      "State management (Redux, Zustand, Context API)",
      "Performance optimization & Core Web Vitals",
      "Component-driven architecture & design systems",
      "RESTful API integration & real-time data handling"
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
    description: "Building robust, scalable server - side applications with focus on security, performance, and clean architecture.Experienced in designing RESTful APIs, database optimization, and implementing complex business logic.",
    keyPoints: [
      "Node.js & Express.js API development",
      "Database design(MongoDB, PostgreSQL, MySQL)",
      "RESTful & GraphQL API architecture",
      "Authentication & authorization(JWT, OAuth)",
      "Microservices architecture & Docker containerization",
      "Cloud deployment(AWS, Vercel, Railway)"
    ], projects: [
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
    description: "Developing intelligent automation solutions using modern AI technologies and LLMs. Creating agents that can understand context, make decisions, and interact naturally with users while integrating with various tools and APIs.",
    keyPoints: [
      "LLM integration (OpenAI, Anthropic Claude, Google Gemini)",
      "Prompt engineering & context optimization",
      "Multi-agent systems & workflow orchestration",
      "RAG (Retrieval Augmented Generation) implementation",
      "Tool calling & function execution",
      "Conversational AI & chatbot development"
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