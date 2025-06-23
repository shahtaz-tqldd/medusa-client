import boer from "@/assets/images/boer.jpg";
import ecom1 from "@/assets/images/ecom.webp";
import ecom2 from "@/assets/images/ecom2.jpg";
import ecom3 from "@/assets/images/ecom3.jpg";
import ecom4 from "@/assets/images/ecom4.png";

export const projectTabs = [
  {
    title: "All Projects",
    value: "all-projects"
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

export const projects = [
  {
    id: "1",
    name: "Custom Supplement Manufacturing Landing Page",
    description:
      "Dzul Nutra is a pharmaceutical manufacturer company, it manufactures quality customizable vitamins, supplements, and nutraceuticals for other brands.",
    tags: ["Landing Page", "Frontend", "Service Selling"],
    img: ecom1,
    projectType: "Web App",
    techs: [
      "React JS",
      "Tailwind CSS",
      "JavaScript",
      "Chakra UI",
      "React Slick",
    ],
    liveLink: "https://dzulnutra.com/",
    githubLink: "https://dzulnutra.com/",
    featureList: [
      "Responsive Design",
      "Email Integration",
      "Product Cataloge Showing and Filtering",
      "Figma to Code Conversion",
      "Unit testing and Faster Response",
      "Real time data visualization",
      "Chart and Graph Integration",
      "Authentication and Role based Authorization",
    ],
    screens: [
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730828424/projects-screen/dcuz2ymcymrtwjsyocge.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730828426/projects-screen/uihkuqrcsfd2ddodwblu.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730828424/projects-screen/nbdr6sohjxehocm58puz.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730828424/projects-screen/msfzurmheto1kl1q5ed3.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730828423/projects-screen/agbytsaszjq7kaje58qx.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730828423/projects-screen/bkxorjh2tzznpcnieopt.png",
    ],
  },
  {
    id: "2",
    name: "A single vendor Ecommerce Platform for Selling Earphones",
    description:
      "GenoMart is a comprehensive e-commerce platform that integrates customer relationship management (CRM) to streamline both product sales and customer interactions.",
    tags: ["Ecommerce", "CRM", "React JS"],
    img: ecom2,
    projectType: "Software",
    techs: [
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
    githubLink: "https://genomart.vercel.app/",
    featureList: [
      "Responsive Design",
      "Email Integration",
      "Product Cataloge Showing and Filtering",
      "Figma to Code Conversion",
      "Unit testing and Faster Response",
      "Real time data visualization",
      "Chart and Graph Integration",
      "Authentication and Role based Authorization",
    ],

    screens: [
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730839677/projects-screen/n2ci5odhdzvr6mywaoct.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730839676/projects-screen/ziyc5hng8sw4pxeedesh.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730839676/projects-screen/sppjeunqulmg7qyzfziq.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730839677/projects-screen/ujp6xjocopdoo65qw1uk.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730839677/projects-screen/a3cnk1hknxhdhwazulad.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730839677/projects-screen/sbeqz9x5r7fuu1symtq6.png",
    ],
  },
  {
    id: "3",
    name: "CRM & Financial Analytics Platform for Prop Trading Firms",
    description:
      "Boer Funding is a trading management platform that combines CRM capabilities with tools for financial tracking, analytics, and payment integration. ",
    tags: ["CRM", "Financial Trading", "Analytics & Visualization"],
    img: boer,
    liveLink: "https://app.boerfunded.com/",
    credentials: {
      email: "shahtaz67@gmail.com",
      password: "tesT@1234",
    },
    projectType: "Software",
    techs: [
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
    featureList: [
      "Responsive Design",
      "Email Integration",
      "Product Cataloge Showing and Filtering",
      "Figma to Code Conversion",
      "Unit testing and Faster Response",
      "Real time data visualization",
      "Chart and Graph Integration",
      "Authentication and Role based Authorization",
    ],

    screens: [
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842884/projects-screen/mx0hnjimdusgpwuohzy4.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842882/projects-screen/xzvmzgfj71utn9f0i08u.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842882/projects-screen/txneqe8gbh4jzkfuqu9p.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842882/projects-screen/aintouejk13pisgnr46w.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842882/projects-screen/kc0mvgcerldh4wp6hjcg.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842882/projects-screen/judzcohgshitpwhkgdfk.png",
    ],
  },
  {
    id: "4",
    name: "CMS Platform for Courier Service & Payroll Management",
    description:
      "AMC Courier is a SaaS platform designed specifically for courier companies to streamline service management and payroll operations.",
    tags: [
      "SaaS",
      "Payroll Tracking",
      "Data Visualization",
    ],
    img: ecom4,
    projectType: "Software",
    techs: [
      "React JS",
      "TypeScript",
      "Shadcn",
      "Tailwind CSS",
      "Node JS",
      "Express",
      "MongoDB",
    ],
    featureList: [
      "Responsive Design",
      "Email Integration",
      "Product Cataloge Showing and Filtering",
      "Figma to Code Conversion",
      "Unit testing and Faster Response",
      "Real time data visualization",
      "Chart and Graph Integration",
      "Authentication and Role based Authorization",
    ],

    screens: [
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842177/projects-screen/mptxvzto0ax2ybcudrza.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842185/projects-screen/evuw1yjq1bipbqcw88s6.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842177/projects-screen/pt3lrlre54irv2fbyrlf.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842177/projects-screen/qfol6vgbmc2pmio6svf0.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842182/projects-screen/nfifuo5csjjpj0jkhm0i.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730842187/projects-screen/kyjklxugj5anvklpqvfc.png",
    ],
  },
  {
    id: "5",
    name: "Web Agency Portfolio Website for CRM, ERP & SaaS Solutions",
    description:
      "Algostar is a web development agancey specialized in building CRM, ERP and SaaS. They provide you web design and development solutions.",
    tags: ["Landing Page", "Portfolio", "Next JS"],
    img: ecom3,
    projectType: "Web App",
    techs: [
      "Next JS",
      "TypeScript",
      "Shadcn",
      "Framer Motion",
      "Tailwind CSS",
      "Magic UI",
    ],
    liveLink: "https://algostar.tech/",
    featureList: [
      "Responsive Design",
      "Email Integration",
      "Product Cataloge Showing and Filtering",
      "Figma to Code Conversion",
      "Unit testing and Faster Response",
      "Real time data visualization",
      "Chart and Graph Integration",
      "Authentication and Role based Authorization",
    ],

    screens: [
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730840954/projects-screen/equasqicslgfa0chxhxs.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730840953/projects-screen/um1fpzibv29njbey5uvw.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730840953/projects-screen/aq4ditgiwm1lhlavl8px.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730840953/projects-screen/oy4omg3nwxkuc2ldesfo.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730840953/projects-screen/czzpftigmcans3dl6rj7.png",
      "https://res.cloudinary.com/dqyv780cz/image/upload/v1730840953/projects-screen/vuhczlwyvaf4adm6rk9w.png",
    ],
  },
];
