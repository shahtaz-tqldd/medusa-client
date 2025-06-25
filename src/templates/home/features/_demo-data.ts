import { Brain, Code, Code2, HardDrive, Laptop } from "lucide-react";

export const features = [ 
  {
    id: 1,
    icon: Code,
    title: "Frontend Development",
    text: `<p>Crafting user-first, visually engaging, and highly responsive web interfaces is where my journey began — and where my passion still lives. I specialize in modern JavaScript frameworks like <b>React</b> and <b>Next.js</b>, building everything from lightweight static sites to complex SPAs. </p><p>My design implementation is pixel-accurate, guided by real-world design systems like Figma and refined using Tailwind CSS and SCSS. With a deep understanding of UI/UX patterns, accessibility standards, and performance optimization techniques (like lazy loading, SSR, and code splitting), I ensure that every product I work on doesn't just look great — it feels intuitive and performs consistently across devices. </p><p>I've also worked with Framer Motion for animations and Three.js for 3D web visuals, allowing me to push the visual envelope when the product demands it. Whether it's crafting reusable component libraries, setting up global design tokens, or handling client-side routing and state management (using Redux or TanStack Query), my goal is always to bridge creativity with clarity — to deliver interfaces that leave lasting impressions.</p>`,
  },
  {
    id: 2,
    icon: Laptop,
    title: "Backend Development",
    text: `<p>Every seamless frontend experience needs a powerful engine behind the scenes. I design and build robust, scalable, and maintainable backend systems that power real-world applications. </p><p>My primary tools include Node.js with Express for REST APIs and Django for complex, monolithic applications or rapid prototyping. I'm proficient in structuring secure authentication flows (JWT, OAuth), implementing role-based access controls, and building database schemas that scale with usage.</p><p> I've worked with both SQL (PostgreSQL, SQLite) and NoSQL (MongoDB) databases, choosing what's best based on the problem — not habit. I prioritize writing clean, testable code, often integrating testing libraries like Jest or Pytest depending on the stack. My API designs follow RESTful principles and I’ve also built GraphQL APIs using Apollo Server for projects that demand granular querying. </p><p>Whether handling business logic, real-time data via WebSockets, or third-party service integrations (like payment gateways, file storage, or AI APIs), my backend code is always focused on performance, reliability, and clarity.</p>`,
  },
  {
    id: 3,
    icon: HardDrive,
    title: "Full-Stack Development",
    text: `<p>With a foot in both frontend and backend worlds, full-stack development is where I bring everything together — translating product goals into complete, functional, and deployable web applications. </p><p>I’ve architected systems that include frontend logic with React or Next.js, backend APIs with Node.js, Express or Django, and databases using PostgreSQL or MongoDB. I handle authentication, state management, data flow, performance, and even edge cases like network failures or progressive fallback.</p><p> For deployment, I work with platforms like Vercel, Netlify, and DigitalOcean, and containerized environments using Docker. I’ve set up CI/CD pipelines (GitHub Actions, Railway), managed environment configurations, and ensured smooth rollouts. I also emphasize DevOps practices like logging, monitoring, and basic infrastructure security to make sure applications remain stable post-deployment.</p><p>In full-stack work, I take ownership of both the user journey and the server logic behind it — optimizing how the data moves, how the UI responds, and how the system scales. This bird’s-eye view allows me to think not just like a developer, but like a product owner — making full-stack development my most complete and fulfilling role.</p>`,
  },
  {
    id: 4,
    icon: Brain,
    title: "Development Consultancy",
    text: `<p>Sometimes the hardest part isn’t writing code — it’s knowing what to build and how to start. I help individuals, startups, and small teams turn their vague product ideas into concrete technical blueprints.</p><p> Whether you're launching an MVP, scaling an existing application, or deciding between frameworks, I bring a blend of technical clarity and product-focused thinking to the table.</p> <p>My consultancy includes defining the tech stack based on your needs, mapping out system architecture, recommending design systems, and helping structure sprints with realistic timelines. I also conduct code reviews, guide refactoring processes, and support hiring decisions when building a dev team. For founders, I translate product language into actionable development tasks — bridging the gap between business goals and technical execution. </p><p>If you're at a crossroads — unsure whether to go with Django or Node, REST or GraphQL, PostgreSQL or Firebase — I help you make informed decisions based on scalability, cost, and your team’s skillset. My goal is to empower teams to build smart, avoid costly missteps, and stay focused on solving the right problems.</p>`,
  },
];

export const skills = [
  {
    name: "React",
    icon: Code2,
    startDate: "2021-08-01",
    description:
      "React has been my go-to frontend library. I've built dashboards, SaaS UIs, and complex forms — leveraging hooks, context, and custom components. Used in most of my client and personal projects including A/B testing dashboards and design systems.",
    progress: "90%",
  },
  {
    name: "Next JS",
    icon: Code2,
    startDate: "2021-12-01",
    description:
      "Used extensively for building production-grade full-stack apps with SSR, dynamic routing, and API routes. Powering portfolio sites, landing pages, and an AI-based chatbot SaaS platform. Integrated with Tailwind and deployed via Vercel.",
    progress: "85%",
  },
  {
    name: "JavaScript",
    icon: Code2,
    startDate: "2021-05-01",
    description:
      "JavaScript is the foundation of everything I build — from interactive UIs to backend APIs. I’ve used vanilla JS for dynamic widgets, DOM manipulation, and to deeply understand framework internals.",
    progress: "85%",
  },
  {
    name: "Node JS",
    icon: Code2,
    startDate: "2021-10-01",
    description:
      "Used Node.js with Express to build REST APIs, process background jobs, and handle file uploads. Built services like visual test automation and real-time updates with WebSocket using Node backends.",
    progress: "80%",
  },
  {
    name: "TypeScript",
    icon: Code2,
    startDate: "2022-01-01",
    description:
      "TypeScript improved code reliability in my React and Node projects. I use it to build scalable, typed APIs and frontend components — ensuring long-term maintainability. It’s a must-have in all recent projects.",
    progress: "80%",
  },
  {
    name: "Redux",
    icon: Code2,
    startDate: "2022-02-01",
    description:
      "Managed global state using Redux Toolkit and RTK Query in apps requiring complex state flows. Used in e-commerce carts, dashboards, and data-heavy UIs. Also integrated caching and async logic handling.",
    progress: "80%",
  },
  {
    name: "Tailwind CSS",
    icon: Code2,
    startDate: "2021-11-01",
    description:
      "Tailwind is my styling engine for modern UIs. From landing pages to custom components, I use utility classes for rapid prototyping and consistent theming. Styled every major project with it.",
    progress: "85%",
  },
  {
    name: "Python & Django",
    icon: Code2,
    startDate: "2022-03-01",
    description:
      "Built backends and admin panels using Django for chatbot SaaS and OpenCV automation. Integrated APIs, custom user models, and managed data with PostgreSQL. Ideal for projects needing rapid development and scalability.",
    progress: "75%",
  },
  {
    name: "Express",
    icon: Code2,
    startDate: "2021-10-01",
    description:
      "Built multiple REST APIs using Express, including authentication, file uploads, and socket-based communication. Used in courier management tools and automation backends.",
    progress: "75%",
  },
  {
    name: "MongoDB",
    icon: Code2,
    startDate: "2021-10-01",
    description:
      "Used MongoDB in MERN stack projects to manage dynamic data like user profiles, delivery logs, and JSON-structured forms. Integrated with Mongoose for schema validation.",
    progress: "75%",
  },
  {
    name: "PostgreSQL",
    icon: Code2,
    startDate: "2022-05-01",
    description:
      "PostgreSQL powers the relational data side of my Django apps. I’ve designed normalized schemas, used full-text search, and optimized queries for performance in production.",
    progress: "70%",
  },
  {
    name: "Socket.io",
    icon: Code2,
    startDate: "2022-07-01",
    description:
      "Implemented real-time updates using Socket.io in courier tracking and automation systems. Enabled live dashboard metrics and UI sync without polling.",
    progress: "70%",
  },
  {
    name: "Firebase",
    icon: Code2,
    startDate: "2022-01-01",
    description:
      "Used Firebase for auth and Firestore in MVP builds and prototyping phases — especially where backend time was limited. Handy for rapid deployment.",
    progress: "65%",
  },
  {
    name: "Docker",
    icon: Code2,
    startDate: "2022-11-01",
    description:
      "Containerized backends and automation scripts using Docker. Helpful in testing and deploying Node and Python apps with consistent environments across dev and prod.",
    progress: "65%",
  },
  {
    name: "Playwright",
    icon: Code2,
    startDate: "2023-02-01",
    description:
      "Used Playwright for UI automation in a visual testing project. Took pixel-perfect screenshots, ran regression checks, and integrated into CI pipelines.",
    progress: "60%",
  },
  {
    name: "Angular",
    icon: Code2,
    startDate: "2023-05-01",
    description:
      "Explored Angular for comparison and minor freelance tasks. Built a couple of component-based UIs and experimented with routing, forms, and services.",
    progress: "50%",
  },
  {
    name: "Bootstrap",
    icon: Code2,
    startDate: "2021-07-01",
    description:
      "Initially used Bootstrap for responsive layouting and form styling. Now rarely used since switching to Tailwind and custom UI components.",
    progress: "45%",
  },
];
