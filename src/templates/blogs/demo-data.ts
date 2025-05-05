export const BLOGS = [
  {
    title: "How you can actually write optimized code in your React",
    img: "https://kinsta.com/wp-content/uploads/2023/04/react-must-be-in-scope-when-using-jsx.jpg",
    tags: ["React", "Optimization", "Web Development"],
    body: "Writing optimized code in React involves several best practices. Start by minimizing the number of renders with `React.memo` and `useCallback` to prevent unnecessary re-renders. Leverage `useMemo` to cache expensive calculations. Avoid anonymous functions and inline objects in the `render` method. Lazy load components with `React.lazy` and `Suspense` to split your code into manageable chunks. Lastly, consider using a state management library like Redux or React Context API to handle complex state, improving the performance of your application.",
    published: "Jan 24, 2023",
    topic: "React JS",
  },
  {
    title: "Learn this Simple steps to Dockerize Your Node.js Project",
    img: "https://miro.medium.com/v2/resize:fit:1400/0*GOvd9ZR-C482Z-hw.png",
    tags: ["Node.js", "Docker", "DevOps"],
    body: "Dockerizing your Node.js project can significantly streamline your development workflow. Start by creating a `Dockerfile` at the root of your project. Use a lightweight Node.js base image, copy your application code, and install dependencies. Define the working directory and set environment variables as needed. Ensure your application listens on a port and expose it in the Dockerfile. Finally, build the Docker image with `docker build` and run it using `docker run`. This encapsulates your application in a container, ensuring consistency across different environments.",
    published: "Aug 22, 2024",
    topic: "Docker",
  },
  {
    title: "How You Can Scrape Web with Your Node.js Application",
    img: "https://cdn.prod.website-files.com/5e42f62100b3495a91c730f1/664c76201fc5ab434ca8fcac_What%20is%20Puppeteer_.webp",
    tags: ["Node.js", "Web Scraping", "Automation"],
    body: "Web scraping with Node.js is a powerful technique to automate data extraction from websites. Start by selecting a web scraping library like `cheerio` or `puppeteer`. For simple HTML scraping, `cheerio` is lightweight and effective, mimicking jQuery syntax. For more complex tasks involving dynamic content or interactions, `puppeteer` provides a headless browser environment. Implement error handling and respect website terms of service to avoid IP bans. Always ensure compliance with legal requirements when scraping data from websites.",
    published: "Jul 17, 2024",
    topic: "Web Scrapping",
  },

  {
    title: "Starting bulding a project with Django and Python",
    img: "https://media.licdn.com/dms/image/D4D12AQGRQ5roso1N0w/article-cover_image-shrink_600_2000/0/1695649993087?e=2147483647&v=beta&t=LKWxGq69V3DJZpoTIygz-hkKWNO3aaKm0Auz8u2XoOA",
    tags: ["Node.js", "Web Scraping", "Automation"],
    body: "Web scraping with Node.js is a powerful technique to automate data extraction from websites. Start by selecting a web scraping library like `cheerio` or `puppeteer`. For simple HTML scraping, `cheerio` is lightweight and effective, mimicking jQuery syntax. For more complex tasks involving dynamic content or interactions, `puppeteer` provides a headless browser environment. Implement error handling and respect website terms of service to avoid IP bans. Always ensure compliance with legal requirements when scraping data from websites.",
    published: "Jul 17, 2024",
    topic: "Django",
  },
];
