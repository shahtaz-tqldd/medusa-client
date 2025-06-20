import boer from "@/assets/images/boer.jpg";

import ecom1 from "@/assets/images/ecom.webp";
import ecom2 from "@/assets/images/ecom2.jpg";
import ecom3 from "@/assets/images/ecom3.jpg";
import ecom4 from "@/assets/images/ecom4.png";

export const projectTabs = [
  {
    title: "All Projects",
    value: "all-projects",
  },
  {
    title: "Web App",
    value: "web-app",
  },
  {
    title: "Software",
    value: "software",
  },
];
export const project_demo_data = [
  {
    id: "1",
    name: "Custom Supplement Manufacturing Landing Page",
    description:
      "Dzul Nutra is a pharmaceutical manufacturer company, it manufactures quality customizable vitamins, supplements, and nutraceuticals for other brands.",
    tags: ["Landing Page", "Ecommerce", "Service Selling"],
    img: ecom1,
    type: "Web App",
    created_at: "2025-09-10",
    status:"completed",
    tech_stacks: [
      "React JS",
      "Tailwind CSS",
      "JavaScript",
      "Chakra UI",
      "React Slick",
    ],
    liveLink: "https://dzulnutra.com/",
    features: [
      "Responsive Design",
      "Email Integration",
      "Product Cataloge Showing and Filtering",
      "Figma to Code Conversion",
      "Unit testing and Faster Response",
      "Real time data visualization",
      "Chart and Graph Integration",
      "Authentication and Role based Authorization",
    ],
  },
  {
    id: "2",
    name: "A single vendor Ecommerce Platform for Selling Earphones",
    description:
      "GenoMart is a comprehensive e-commerce platform that integrates customer relationship management (CRM) to streamline both product sales and customer interactions.",
    tags: ["Ecommerce", "CRM", "Single Vendor"],
    img: ecom2,
    type: "Software",
    created_at: "2025-09-10",
    status:"completed",
    tech_stacks: [
      "React JS",
      "Tailwind CSS",
      "Material UI",
      "Redux",
      "Redux toolkit",
      "Swiper",
      "Firebase Auth",
      "Node JS",
      "Express",
      "Mongo DB",
    ],
    liveLink: "https://genomart.vercel.app/",
    features: [
      "Responsive Design",
      "Email Integration",
      "Product Cataloge Showing and Filtering",
      "Figma to Code Conversion",
      "Unit testing and Faster Response",
      "Real time data visualization",
      "Chart and Graph Integration",
      "Authentication and Role based Authorization",
    ],
  },
  {
    id: "3",
    name: "CRM & Financial Analytics Platform for Prop Trading Firms",
    description:
      "Boer Funding is a trading management platform that combines CRM capabilities with tools for financial tracking, analytics, and payment integration. ",
    tags: ["CRM Platform", "Financial Trading", "Analytics & Visualization"],
    img: boer,
    liveLink: "https://app.boerfunded.com/",
    credentials: {
      email: "shahtaz67@gmail.com",
      password: "tesT@1234",
    },
    type: "Software",
    created_at: "2025-09-10",
    status:"completed",
    tech_stacks: [
      "React JS",
      "Redux",
      "Redux toolkit",
      "Material UI",
      "Tailwind CSS",
      "Stripe",
      "Node JS",
      "Express",
      "MongoDB",
    ],
    features: [
      "Responsive Design",
      "Email Integration",
      "Product Cataloge Showing and Filtering",
      "Figma to Code Conversion",
      "Unit testing and Faster Response",
      "Real time data visualization",
      "Chart and Graph Integration",
      "Authentication and Role based Authorization",
    ],
  },
  {
    id: "4",
    name: "CMS Platform for Courier Service & Payroll Management",
    description:
      "AMC Courier is a SaaS platform designed specifically for courier companies to streamline service management and payroll operations.",
    tags: [
      "SaaS",
      "Courier Management",
      "Payroll Tracking",
      "Data Visualization",
    ],
    img: ecom4,
    type: "Software",
    created_at: "2025-09-10",
    status:"completed",
    tech_stacks: [
      "React JS",
      "TypeScript",
      "Shadcn",
      "Tailwind CSS",
      "Node JS",
      "Express",
      "MongoDB",
    ],
    features: [
      "Responsive Design",
      "Email Integration",
      "Product Cataloge Showing and Filtering",
      "Figma to Code Conversion",
      "Unit testing and Faster Response",
      "Real time data visualization",
      "Chart and Graph Integration",
      "Authentication and Role based Authorization",
    ],
  },
  {
    id: "5",
    name: "Web Agency Portfolio Website for CRM, ERP & SaaS Solutions",
    description:
      "Algostar is a web development agancey specialized in building CRM, ERP and SaaS. They provide you web design and development solutions.",
    tags: ["Landing Page", "Portfolio", "Company Website"],
    img: ecom3,
    type: "Web App",
    created_at: "2025-09-10",
    status:"completed",
    tech_stacks: [
      "Next JS",
      "TypeScript",
      "Shadcn",
      "Framer Motion",
      "Tailwind CSS",
      "Magic UI",
    ],
    liveLink: "https://algostar.tech/",
    features: [
      "Responsive Design",
      "Email Integration",
      "Product Cataloge Showing and Filtering",
      "Figma to Code Conversion",
      "Unit testing and Faster Response",
      "Real time data visualization",
      "Chart and Graph Integration",
      "Authentication and Role based Authorization",
    ],
  },
];
