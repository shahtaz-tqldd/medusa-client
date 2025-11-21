import { Brain, Code, Laptop } from "lucide-react";

export const features = [
  {
    id: 1,
    icon: Laptop,
    title: "Frontend Development",
    text: `<p>Crafting user-first, visually engaging, and highly responsive web interfaces is where my journey began — and where my passion still lives. I specialize in modern JavaScript frameworks like <b>React</b> and <b>Next.js</b>, building everything from lightweight static sites to complex SPAs. </p><p>My design implementation is pixel-accurate, guided by real-world design systems like Figma and refined using Tailwind CSS and SCSS. With a deep understanding of UI/UX patterns, accessibility standards, and performance optimization techniques (like lazy loading, SSR, and code splitting), I ensure that every product I work on doesn't just look great — it feels intuitive and performs consistently across devices. </p><p>I've also worked with Framer Motion for animations and Three.js for 3D web visuals, allowing me to push the visual envelope when the product demands it. Whether it's crafting reusable component libraries, setting up global design tokens, or handling client-side routing and state management (using Redux or TanStack Query), my goal is always to bridge creativity with clarity — to deliver interfaces that leave lasting impressions.</p>`,
  },
  {
    id: 2,
    icon: Brain,
    title: "Backend Development",
    text: `<p>Every seamless frontend experience needs a powerful engine behind the scenes. I design and build robust, scalable, and maintainable backend systems that power real-world applications. </p><p>My primary tools include Node.js with Express for REST APIs and Django for complex, monolithic applications or rapid prototyping. I'm proficient in structuring secure authentication flows (JWT, OAuth), implementing role-based access controls, and building database schemas that scale with usage.</p><p> I've worked with both SQL (PostgreSQL, SQLite) and NoSQL (MongoDB) databases, choosing what's best based on the problem — not habit. I prioritize writing clean, testable code, often integrating testing libraries like Jest or Pytest depending on the stack. My API designs follow RESTful principles and I’ve also built GraphQL APIs using Apollo Server for projects that demand granular querying. </p><p>Whether handling business logic, real-time data via WebSockets, or third-party service integrations (like payment gateways, file storage, or AI APIs), my backend code is always focused on performance, reliability, and clarity.</p>`,
  },
  {
    id: 3,
    icon: Code,
    title: "Full-Stack Development",
    text: `<p>With a foot in both frontend and backend worlds, full-stack development is where I bring everything together — translating product goals into complete, functional, and deployable web applications. </p><p>I’ve architected systems that include frontend logic with React or Next.js, backend APIs with Node.js, Express or Django, and databases using PostgreSQL or MongoDB. I handle authentication, state management, data flow, performance, and even edge cases like network failures or progressive fallback.</p><p> For deployment, I work with platforms like Vercel, Netlify, and DigitalOcean, and containerized environments using Docker. I’ve set up CI/CD pipelines (GitHub Actions, Railway), managed environment configurations, and ensured smooth rollouts. I also emphasize DevOps practices like logging, monitoring, and basic infrastructure security to make sure applications remain stable post-deployment.</p><p>In full-stack work, I take ownership of both the user journey and the server logic behind it — optimizing how the data moves, how the UI responds, and how the system scales. This bird’s-eye view allows me to think not just like a developer, but like a product owner — making full-stack development my most complete and fulfilling role.</p>`,
  },
];

export const skillGroups = {
  language: [
    {
      name: "JavaScript",
      startDate: "2021-05-01",
      projects: 20,
    },
    {
      name: "TypeScript",
      startDate: "2022-01-01",
      projects: 8,
    },
    {
      name: "Python",
      startDate: "2022-01-01",
      projects: 8,
    },
    {
      name: "C++",
      startDate: "2022-01-01",
      projects: 8,
    },
  ],
  frontend: [
    {
      name: "React",
      startDate: "2021-08-01",
      projects: 12,
    },
    {
      name: "Next JS",
      startDate: "2021-12-01",
      projects: 10,
    },
    {
      name: "Tailwind CSS",
      startDate: "2021-11-01",
      projects: 15,
    },
    {
      name: "Redux",
      startDate: "2022-02-01",
      projects: 6,
    },
    {
      name: "RTK Query",
      startDate: "2022-02-01",
      projects: 6,
    },
    {
      name: "Material UI",
      startDate: "2021-07-01",
      projects: 4,
    },
    {
      name: "Vue JS",
      startDate: "2023-05-01",
      projects: 2,
    },
  ],

  backend: [
    {
      name: "Node JS",
      startDate: "2021-10-01",
      projects: 8,
    },
    {
      name: "Express",
      startDate: "2021-10-01",
      projects: 7,
    },
    {
      name: "Python & Django",
      startDate: "2022-03-01",
      projects: 5,
    },
    {
      name: "FastAPI",
      startDate: "2022-03-01",
      projects: 5,
    },
    {
      name: "MongoDB",
      startDate: "2021-10-01",
      projects: 6,
    },
    {
      name: "PostgreSQL",
      startDate: "2022-05-01",
      projects: 4,
    },
    {
      name: "Firebase",
      startDate: "2022-01-01",
      projects: 3,
    },
  ],

  "tools and extentions": [
    {
      name: "Docker",
      startDate: "2022-11-01",
      projects: 4,
    },
    {
      name: "GraphQL",
      startDate: "2022-11-01",
      projects: 4,
    },
    {
      name: "Socket.io",
      startDate: "2022-07-01",
      projects: 3,
    },
    {
      name: "Git",
      startDate: "2022-11-01",
      projects: 4,
    },
    {
      name: "Playwright",
      startDate: "2023-02-01",
      projects: 2,
    },
  ],
};
