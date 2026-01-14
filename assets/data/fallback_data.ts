import { Coffee, Cpu, Brain } from "lucide-react";
import {
  CodeChefIcon,
  CodeForcesIcon,
  JavaScriptIcon,
  PythonIcon,
} from "@/assets/icons/tech-stacks";



export const DEFAULT_SKILLS_DATA = {
  title:
    "Hey, this is Shahtaz. I am a software developer by passion, and a full-stack alchemist by choice!",
  expertise:
    "I’m a software developer with around 2.5 years of experience. I started my journey in frontend development, where I enjoyed turning UI designs into working prototypes that worked smoothly across different browsers and devices. Working on interfaces helped me understand user experience, consistency, and how small details in layout or behavior can make a big difference.\n\nAs I grew, I moved into backend development and found a real interest in solving problems behind the scenes. I focus on writing clean, readable code and building backend systems that are efficient, reliable, and easy to maintain. When I design a feature, I always think about performance, structure, and how the system will behave in real usage. I like working on projects where I can take ownership, understand the full flow, and build things that actually help users and teams.",
  my_story:
    "I’m a software developer with around 2.5 years of experience. I started my journey in frontend development, where I enjoyed turning UI designs into working prototypes that worked smoothly across different browsers and devices. Working on interfaces helped me understand user experience, consistency, and how small details in layout or behavior can make a big difference.\n\nAs I grew, I moved into backend development and found a real interest in solving problems behind the scenes. I focus on writing clean, readable code and building backend systems that are efficient, reliable, and easy to maintain. When I design a feature, I always think about performance, structure, and how the system will behave in real usage. I like working on projects where I can take ownership, understand the full flow, and build things that actually help users and teams.",
  key_focus_areas: ["React", "FastAPI", "Django", "Node JS"],
  language_and_frameworks: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  tools_and_database: ["Node.js", "FastAPI", "Django", "PostgreSQL"],
  other_competency: ["Git", "Docker", "AWS"],
};


export const EXPERTISE = [
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

export const WORK_EXPERIENCES = [
  {
    id: 1,
    timeline: "March 2024 - Present",
    position: "Software Engineer L2",
    company: "Echologyx Ltd.",
    companyColor: "!text-orange-500",
    bgColor:
      "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
    borderColor: "border-orange-200 dark:border-orange-800/30",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    status: "Current Position",
    start_date: "2024-03-01",
    type: "Full-time",
    location: "On-site",
    technologies: [
      "React.js",
      "Node.js",
      "JavaScript",
      "Socket.IO",
      "Playwright",
      "Python",
      "OpenCV",
      "Django",
      "postgreSQL",
      "FastAPI",
      "Docker",
      "Vector DB",
      "Google ADK",
      "AI Chatbot",
      "A/B Testing",
    ],
    achievements: [
      "Developed backend features for an AI-powered chatbot using Django, including subscription management, Stripe payment integration, and multi-platform order status handling.",
      "Built an AI chat agent using Google ADK and Vertex AI, implementing dense and sparse embedding search for accurate product recommendations.",
      "Implemented automated visual testing with Playwright and OpenCV to detect UI differences between live webpages and Figma designs."
    ],
    description: `<p>I began working with A/B testing after joining Echologyx, where I gained hands-on experience for around six months. Following that, I took on a solo project involving both frontend and backend development. This was an internal MVP for a visual testing automation tool designed to determine whether a live website's implementation matched its Figma design.</p>
<p>On the frontend, I used React along with Resemble.js to detect visual differences, and implemented a custom image mismatch mapping system using the HTML canvas. The backend was more complex, combining Node.js, Socket.IO, and Playwright for browser automation, along with Python and OpenCV for image comparison and processing. I also built a real-time browser control system that could open a webpage, scroll to specific sections, stream the view, and then capture targeted segments for visual comparison.</p>
<p>After completing that project, I shifted to another product development team where I joined in AI chatbot backend team. So I have started working with Python and Django. My work involved Django’s session management system, real-time communication with WebSockets, and containerization with Docker. Additionally, I explored vector databases for semantic search features, using Sentence Transformers, and experimented with Google ADK for building a product recommendation model.</p>`,
    highlights: [
      "A/B Testing Development",
      "AI Application Development",
      "Full-Stack Development",
    ],
  },
  {
    id: 2,
    timeline: "July 2023 - December 2023",
    position: "MERN Stack Developer",
    company: "Aykori Digital",
    companyColor: "!text-green-500",
    bgColor:
      "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
    borderColor: "border-green-200 dark:border-green-800/30",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    status: "Completed",
    type: "Internship",
    start_date: "2023-07-22",
    end_date: "2023-12-31",
    location: "On-site",
    technologies: [
      "React JS",
      "Next JS",
      "Node JS",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Redux",
      "Redux toolkit Query",
      "Material UI",
      "Google APIs"
    ],
    achievements: [
      "Contributed to an affiliate marketplace CMS, enabling dynamic product listings, campaign tracking, and admin analytics.",
      "Developed HRM modules for employee data management and real-time performance dashboards.",
      "Implemented secure REST APIs and reusable React components, improving development speed and maintainability.",
    ],
    description: `<p>I started my internship as a MERN stack developer at Aaykori, a fintech startup focused on affiliate and bonus systems for e-commerce platforms. In addition to the core product, the tech team also explored and developed several side projects.</p>
<p>During my time there, I initially contributed to an HRM (Human Resource Management) software, where I worked on converting the legacy UI into a modern design using frontend technologies. I also resolved backend bugs related to the leave management system, gaining hands-on experience with both client- and server-side debugging.</p>
<p>Later, I collaborated on the platform’s CMS system, particularly in the Affiliates and Campaigns sections, helping build dynamic interfaces and implementing logic for campaign tracking and user interactions. Toward the end of my internship, I worked on a Restaurant Management CMS, contributing to both the frontend and backend, which allowed me to strengthen my full-stack development skills in a production environment.</p>`,
    highlights: [
      "Full-Stack Development",
      "Fintech Industry Experience",
      "CMS & HRM Systems",
    ],
  },
];



export const ACHIEVEMENTS = [
  {
    type: "Certificate",
    title: "Python Basic from University of Michigan",
    subtitle: "Coursera",
    icon: PythonIcon,
    accentColor: "text-blue-600",
    link: "https://drive.google.com/file/d/1lTW7X4aa8AByjnUdIwGHcpsRcIZMbVP3/view",
  },
  {
    type: "Certificate",
    title: "JavaScript Algorithms and Data Structures",
    subtitle: "freeCodeCamp",
    icon: JavaScriptIcon,
    accentColor: "text-yellow-600",
    link: "https://www.freecodecamp.org/certification/shahtaz/javascript-algorithms-and-data-structures",
  },
  {
    type: "Competitive Programming",
    title: "CodeChef",
    rating: "1409",
    subtitle: "2★ Rating",
    icon: CodeChefIcon,
    accentColor: "text-orange-600",
    link: "https://www.codechef.com/users/shahtaz",
  },
  {
    type: "Competitive Programming",
    title: "Codeforces",
    rating: "785",
    icon: CodeForcesIcon,
    subtitle: "1★ Rating",
    accentColor: "text-green-600",
    link: "https://codeforces.com/profile/shahtaz1",
  },
];
