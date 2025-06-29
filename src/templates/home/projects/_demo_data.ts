export const projectTabs = [
  {
    title: "All Projects",
    value: "all-projects",
  },
  {
    title: "Web App",
    value: "Web App",
  },
  {
    title: "Software",
    value: "Software",
  },
];

export const projects = [
  {
    id: "1",
    name: "B2B Custom Supplement Manufacturer Website",
    description:
      "A responsive and conversion-focused business website built for Dzul Nutra, a B2B custom supplement manufacturing company. The site is designed to present their services, operational process, and capture leads via a dynamic quote request form. It leverages React for component-based architecture, Tailwind CSS for fast UI development, and integrates Google Maps and EmailJS for enhanced user interaction.",
    tags: ["Landing Page", "Business Website", "Lead Generation"],
    images: {
      main: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751174771/dzul_yf26le.jpg",
      primary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1730828424/projects-screen/dcuz2ymcymrtwjsyocge.png",
      secondary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1730828424/projects-screen/nbdr6sohjxehocm58puz.png",
      accent: null,
    },
    type: "Web App",
    created_at: "2024-12-10",
    status: "completed",
    tech_stacks: [
      "React JS",
      "Tailwind CSS",
      "JavaScript",
      "Chakra UI",
      "React Slick",
      "EmailJS",
      "Google Maps API",
    ],
    live_link: "https://dzulnutra.com/",
    features: [
      "Responsive single-page architecture using React.js and Tailwind CSS",
      "Interactive 'Get a Quote' form integrated with EmailJS for direct email submissions without a backend",
      "Service and operations sections to highlight B2B capabilities",
      "Embedded Google Map with customized marker to display physical service location",
      "Smooth scrolling and accessible navigation",
      "SEO-friendly content structure and semantic HTML elements",
    ],
  },
  {
    id: "2",
    name: "Complete E-commerce Platform with CMS & CRM Integration",
    description:
      "GenoMart is a full-featured e-commerce platform integrated with a custom CMS and CRM system to manage products, orders, customers, and sales analytics. It features dynamic product filtering, role-based access, real-time visualizations, and a responsive, mobile-first UI. Built using React.js, Redux Toolkit, and Node.js, it provides seamless frontend–backend communication and secure authentication via Firebase.",
    images: {
      main: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751174770/genomart_eqbpan.jpg",
      primary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1730839676/projects-screen/sppjeunqulmg7qyzfziq.png",
      secondary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1730839676/projects-screen/ziyc5hng8sw4pxeedesh.png",
      accent:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1730839677/projects-screen/a3cnk1hknxhdhwazulad.png",
    },
    tags: ["E-commerce Platform", "CMS Dashboard", "Admin Panel"],
    type: "Software",
    created_at: "2024-12-10",
    status: "completed",
    tech_stacks: [
      "React JS",
      "Tailwind CSS",
      "Material UI",
      "Redux",
      "Redux Toolkit",
      "Swiper",
      "Firebase Auth",
      "Node JS",
      "Express",
      "MongoDB",
    ],
    live_link: "https://genomart.vercel.app/",
    github_link: "https://genomart.vercel.app/",
    features: [
      "Dynamic product catalog with filtering, sorting, and category-based views",
      "Custom CMS for product, user, and order management with role-based access",
      "Firebase authentication with protected routes for admin and customers",
      "Real-time data visualization with interactive charts and graphs",
      "Integrated CRM-style dashboard for managing customer inquiries and orders",
      "Email notification system for order confirmation and admin alerts",
      "Mobile-friendly UI with component-based design using Material UI and Tailwind",
      "Tested components and API endpoints ensuring high performance and responsiveness",
      "Swiper integration for responsive carousels and product sliders",
    ],
  },

  {
    id: "3",
    name: "Broaker Management Platform for Forex Trading",
    description:
      "Restro FX is a robust broker management platform tailored for prop firms in the forex trading space. It streamlines account creation and integration with major trading platforms like TradeLocker and MetaTrader. The application supports real-time updates, affiliate tracking, and personalized trading journals. It also includes advanced features such as 2FA authentication, coupon systems, and real-time analytics powered by chart visualizations.",
    images: {
      main: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751174776/restro_ek9ssg.jpg",
      primary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1751177172/restro-min_z4w5lq.png",
      secondary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1751177170/restro2-min_lpoyhs.png",
      accent:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1751177171/restro3-min_unk0da.png",
    },
    tags: ["Broker Platform", "Forex Trading", "Prop Firm"],
    type: "Software",
    created_at: "2024-12-10",
    status: "completed",
    tech_stacks: [
      "React.js",
      "Tailwind CSS",
      "ShadCN UI",
      "Redux Toolkit",
      "React Hook Form",
      "Recharts",
      "Socket.IO",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    live_link: "https://restrofx.example.com/",
    github_link: "https://github.com/yourusername/restrofx",
    features: [
      "Trading account creation and integration with TradeLocker and MetaTrader",
      "Affiliate referral system with real-time commission tracking",
      "Personalized trading journal with performance summaries and trade logs",
      "Real-time notifications for account updates, trading events, and system alerts using WebSockets",
      "Interactive analytics dashboard with charts and KPIs using Recharts",
      "Secure login and Two-Factor Authentication (2FA)",
      "Custom coupon system for user discounts and promotional campaigns",
      "Admin panel for managing users, affiliates, and trading metrics",
      "Form handling with validation using React Hook Form",
      "Fully responsive UI built with ShadCN components and Tailwind CSS",
      "Deposit and Withdraw Management with Bonus and Credit Management System",
      "Integrated Cryptochill for Crypto Transfer into dedicated wallet",
      "Implemented KYC verification using verrif",
    ],
  },

  {
    id: "4",
    name: "CMS Platform for Courier Service & Payroll Management",
    description:
      "AMC Courier is a custom SaaS solution designed for courier companies to manage service operations, employee deliveries, and automated payroll tracking. The platform includes a robust CMS, role-based dashboards, and real-time data visualization to monitor delivery performance and payment analytics. Built with React, TypeScript, and Node.js, the system ensures scalability, performance, and maintainability.",
    tags: ["Courier Management", "Payroll Automation", "Employee Tracking"],
    images: {
      main: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751174770/amc_ije1tp.jpg",
      primary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842177/projects-screen/mptxvzto0ax2ybcudrza.png",
      secondary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842185/projects-screen/evuw1yjq1bipbqcw88s6.png",
      accent:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842177/projects-screen/pt3lrlre54irv2fbyrlf.png",
    },
    type: "Software",
    created_at: "2024-12-10",
    status: "completed",
    tech_stacks: [
      "React JS",
      "TypeScript",
      "ShadCN UI",
      "Tailwind CSS",
      "Node JS",
      "Express",
      "MongoDB",
    ],
    features: [
      "Courier task assignment and delivery tracking module",
      "Automated payroll calculation based on delivery performance",
      "Real-time data visualization with charts and KPIs",
      "Secure login system with role-based authorization (admin, employee)",
      "Admin dashboard for service management and employee insights",
      "Responsive and mobile-friendly UI using Tailwind CSS and ShadCN components",
      "Scalable backend built with Node.js and Express, connected to MongoDB",
      "Modular codebase with TypeScript for type safety and maintainability",
    ],
  },
  {
    id: "5",
    name: "Protfolio website for a Web Development Agency",
    description:
      "Algostar is a professional portfolio website for a web development agency focused on building CRM, ERP, and SaaS platforms. The site showcases the agency’s expertise, service offerings, and previous work with smooth animations, responsive design, and modern UI components. Built with Next.js and Framer Motion, it offers a dynamic user experience optimized for conversions and client engagement.",
    tags: ["Agency Website", "Portfolio", "Landing Page"],
    images: {
      main: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751174770/algostar_da8kct.jpg",
      primary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1730840953/projects-screen/czzpftigmcans3dl6rj7.png",
      secondary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1730840953/projects-screen/um1fpzibv29njbey5uvw.png",
      accent: null,
    },
    type: "Web App",
    created_at: "2024-12-10",
    status: "completed",
    tech_stacks: [
      "Next.js",
      "TypeScript",
      "ShadCN UI",
      "Framer Motion",
      "Tailwind CSS",
      "Magic UI",
    ],
    live_link: "https://algostar.dev/",
    features: [
      "Fully responsive landing page with mobile-first design",
      "Dynamic and animated sections using Framer Motion",
      "Interactive service listing and client showcase",
      "Modern component-based design with ShadCN and Magic UI",
      "Smooth scroll and section-based navigation",
      "SEO-optimized structure for agency visibility",
      "Contact form integration for lead generation",
      "Clean code structure and Figma-based design conversion",
    ],
  },

  {
    id: "6",
    name: "Apartment Rental Listing Website for Real Estate",
    description:
      "Tuplespot is a modern real estate rental platform built to showcase available apartments with detailed descriptions, visual media, and integrated location views. It offers a smooth browsing experience using Swiper sliders and animated transitions powered by GSAP. The site includes a blog section for SEO and engagement, making it suitable for rental agencies or independent landlords.",
    tags: ["Real Estate", "Property Rental", "Landing Page"],
    images: {
      main: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751174777/tuplespot_rsby4h.jpg",
      primary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1751178767/tuple-min_mu9bym.png",
      secondary:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1751178768/tuple2-min_u5lgs8.png",
      accent:
        "https://res.cloudinary.com/dqyv780cz/image/upload/v1751178767/tuple1-min_epnodu.png",
    },
    type: "Web App",
    created_at: "2024-12-10",
    status: "completed",
    tech_stacks: ["Next.js", "GSAP", "Swiper", "Tailwind CSS"],
    live_link: "https://tuplespot.vercel.app/",
    github_link: "https://github.com/shahtaz-tqldd/tuple-client",
    features: [
      "Dynamic apartment listings with media-rich detail pages",
      "Smooth scroll-based animations using GSAP",
      "Interactive image sliders using Swiper.js",
      "SEO-friendly blog section for real estate content and tips",
      "Responsive layout optimized for mobile and desktop viewing",
      "Clean, conversion-focused landing page",
      "Modern UI built with Tailwind CSS and Next.js",
      "Static site generation and optimized routing via App Router",
    ],
  },
];
