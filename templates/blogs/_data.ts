export const BLOGS = [
  {
    title: "Debouncing in JavaScript: Consider this before making API calls",
    img: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751188162/debounce_qgpzux.jpg",
    tags: ["JavaScript", "Optimization", "API Calls"],
    body: "In modern web development, performance matters—especially when building features like dynamic search or real-time filtering. One essential technique that can help is debouncing.",
    published: "Jan 24, 2023",
    topic: "JavaScript",
    read_mins: 5,
    content: [
      {
        type: "text_content",
        value:
          "In modern web development, performance matters—especially when building features like dynamic search or real-time filtering. One essential technique that can help is debouncing.",
      },
      { type: "heading_content", value: "What Is Debouncing?" },
      {
        type: "text_content",
        value:
          "Debouncing is a programming concept used to control how often a function gets executed. It ensures that rapid, successive calls to a function are ignored unless there's a pause between them. In simpler terms, debouncing delays a function's execution until after a certain amount of time has passed since it was last called.",
      },
      { type: "heading_content", value: "Real-Life Example" },
      {
        type: "text_content",
        value:
          "Let’s say you’re building a search bar that triggers an API call every time the user types. Without debouncing, the app might:",
      },
      {
        type: "list_content",
        value: [
          "Send a request on every keystroke.",
          "Overload the server with too many rapid API calls.",
          "Waste resources and cause performance lags.",
        ],
      },
      { type: "heading_content", value: "The Fix is to Debounce the Function" },
      {
        type: "text_content",
        value:
          "Debouncing introduces a delay. If the user continues typing within that delay, the timer resets. Only after the typing stops for a specified time (say 300ms), does the function actually run. This means only the final input triggers the API call, resulting in cleaner, more efficient execution.",
      },
      {
        type: "image_content",
        value:
          "https://res.cloudinary.com/dqyv780cz/image/upload/v1751188720/debounce_img_fsj20e.jpg",
      },
      { type: "heading_content", value: "Example function of using debounce" },
      {
        type: "code_content",
        value: `// Function to create a debounced version of any function
function debounceFn(fn, t) {
  let id;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), t);
  };
}

// Usage example
const debounce = debounceFn(console.log, 100);
debounce('Hello world!');`,
      },
      {
        type: "text_content",
        value:
          "This will delay the console.log by 100 milliseconds. If the function is triggered again before the delay expires, the previous call is canceled.",
      },
      {
        type: "text_content",
        value:
          "Debouncing is a small but powerful technique that keeps your applications smooth and resource-efficient. Whether you’re building live search, input validation, or scroll events, debouncing helps you do more with less. In short it reduces server load, boosts performance and responsiveness, and avoids unnecessary computation",
      },
    ],
  },
  {
    title: "A really really brief intro into the world of HTTP Protocols",
    img: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751192523/http_protocols-min_wkeqpy.jpg",
    tags: ["HTTP", "Protocols", "Networking"],
    body: "Let's dive into the world of protocols. In the context of computing and networking, a protocol is essentially a set of rules that govern how data is transmitted and received between devices or systems. Think of them as a shared language and set of procedures that allow different devices to understand each other.",
    published: "Aug 22, 2024",
    topic: "Networking",
    read_mins: 6,
    content: [
      {
        type: "text_content",
        value:
          "Let's dive into the world of protocols. In the context of computing and networking, a protocol is essentially a set of rules that govern how data is transmitted and received between devices or systems. Think of them as a shared language and set of procedures that allow different devices to understand each other.",
      },
      { type: "heading_content", value: "Why are protocols relevant?" },
      {
        type: "text_content",
        value:
          "Protocols are absolutely fundamental to modern computing and communication for several key reasons: They enable different devices and systems (even those made by different manufacturers) to communicate effectively. Without agreed-upon protocols, a computer from one company wouldn't be able to exchange data with a computer from another. Protocols provide a standardized way of doing things, ensuring consistency and predictability. This makes it easier to develop software and hardware that can work seamlessly together. Many protocols include mechanisms for error detection and correction, ensuring that data is transmitted reliably and accurately. Protocols can optimize data transmission by specifying how data should be formatted, compressed, and routed. Protocols can incorporate security measures like encryption and authentication to protect data from unauthorized access.",
      },
      { type: "heading_content", value: "Key aspects of a protocol" },
      {
        type: "list_content",
        value: [
          "Syntax: The format of the data being exchanged (e.g., the structure of messages, data types, encoding).",
          "Semantics: The meaning of the data and the actions to be taken based on that data.",
          "Timing: The order in which data is transmitted and received, as well as the timing of events.",
        ],
      },
      {
        type: "heading_content",
        value: "Here are a few examples of widely used protocols:",
      },
      {
        type: "list_content",
        value: [
          "TCP/IP (Transmission Control Protocol/Internet Protocol): The foundation of the internet. TCP handles reliable data transmission, while IP handles addressing and routing.",
          "HTTP (Hypertext Transfer Protocol): Used for transferring web pages and other content over the internet.",
          "HTTPS (HTTP Secure): A secure version of HTTP that uses encryption.",
          "SMTP (Simple Mail Transfer Protocol): Used for sending email.",
          "FTP (File Transfer Protocol): Used for transferring files between computers.",
          "WebSockets: Provides persistent, bidirectional communication channels over TCP.",
          "WebRTC (Web Real-Time Communication): Enables real-time peer-to-peer communication for audio, video, and data.",
        ],
      },
      {
        type: "heading_content",
        value: "Protocol Layers",
      },
      {
        type: "text_content",
        value:
          "To manage the complexity of networking, protocols are often organized into layers. Each layer handles a specific set of tasks, and they work together to provide a complete communication system. A common model is the TCP/IP model, which has four layers:",
      },
      {
        type: "text_content",
        value:
          "1. Application Layer: Provides network services to applications (e.g., HTTP, SMTP)",
      },
      {
        type: "text_content",
        value:
          "2. Transport Layer: Provides reliable or unreliable data transmission (e.g., TCP, UDP)",
      },
      {
        type: "text_content",
        value:
          "3. Network Layer: Handles addressing and routing of data packets (e.g., IP)",
      },
      {
        type: "text_content",
        value:
          "4. Link Layer: Handles physical transmission of data over the network medium (e.g., Ethernet, Wi-Fi)",
      },

      {
        type: "image_content",
        value:
          "https://res.cloudinary.com/dqyv780cz/image/upload/v1751193938/http_protocols_layers-min_dl4b4i.jpg",
      },
      {
        type: "text_content",
        value:
          "Protocols are essential for enabling communication between different devices and systems. They provide a standardized way of exchanging data, ensuring interoperability, reliability, efficiency, and security. Understanding the basics of protocols is crucial for anyone working with computers, networks, or the internet.",
      },
    ],
  },
  {
    title: "A Practical Introduction to Mutation Observer in JavaScript",
    img: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751194594/mockup_1-min_1_vmuenl.jpg",
    tags: ["JavaScript", "DOM", "MutationObserver", "Web APIs"],
    body: "Mutation Observer is a powerful browser API that lets you watch for changes in the DOM and respond in real time. It's ideal for building dynamic interfaces where elements are added, removed, or updated without a full page reload.",
    published: "June 29, 2025",
    topic: "Web Development",
    read_mins: 4,
    content: [
      {
        type: "text_content",
        value:
          "Mutation Observer is a valuable tool for web developers who need to track and respond to changes in the DOM (Document Object Model). It allows you to observe additions, removals, or modifications of nodes in a web page without constantly polling the DOM.",
      },
      {
        type: "heading_content",
        value: "Why Use Mutation Observer?",
      },
      {
        type: "list_content",
        value: [
          "Efficiently tracks changes to the DOM tree.",
          "Eliminates the need for resource-heavy `setInterval` or manual checks.",
          "Helps create dynamic components that respond to real-time updates.",
          "Useful for third-party script detection, UI monitoring, or lazy loading content.",
        ],
      },
      {
        type: "heading_content",
        value: "Basic Syntax",
      },
      {
        type: "code_content",
        value: `const observer = new MutationObserver(callback);
observer.observe(targetNode, config);`,
      },
      {
        type: "text_content",
        value:
          "`callback` is the function that runs when a mutation is detected. `targetNode` is the DOM element to observe. `config` specifies what types of changes to monitor (e.g., child list, attributes, etc.).",
      },
      {
        type: "heading_content",
        value: "Example: Observing DOM Changes",
      },
      {
        type: "code_content",
        value: `const target = document.getElementById('content');

const config = {
  childList: true,
  subtree: true
};

const callback = function(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(target, config);`,
      },
      {
        type: "text_content",
        value:
          "In this example, we observe a container element with ID `content`. Whenever nodes are added or removed inside it (even in nested elements due to `subtree: true`), a message is logged to the console.",
      },
      {
        type: "heading_content",
        value: "What Can You Observe?",
      },
      {
        type: "list_content",
        value: [
          "`childList` – Detects additions or removals of child elements.",
          "`attributes` – Monitors changes to attributes.",
          "`characterData` – Tracks changes to text nodes.",
          "`subtree` – Extends observation to all descendant nodes.",
        ],
      },
      {
        type: "heading_content",
        value: "When to Disconnect",
      },
      {
        type: "text_content",
        value:
          "Always remember to disconnect your observer when it's no longer needed. This avoids memory leaks and improves performance.",
      },
      {
        type: "code_content",
        value: `observer.disconnect();`,
      },
      {
        type: "heading_content",
        value: "Use Cases",
      },
      {
        type: "list_content",
        value: [
          "Auto-initialize newly added UI components.",
          "Track changes from third-party scripts (ads, widgets, etc.).",
          "React to form field injections or auto-fill.",
          "Monitor chat messages, comment sections, or user-generated content.",
        ],
      },
      {
        type: "heading_content",
        value: "Conclusion",
      },
      {
        type: "text_content",
        value:
          "Mutation Observer is a powerful yet underused API that allows your applications to react to real-time DOM changes. Whether you're enhancing user experience or tracking dynamic content, understanding how to use this API effectively can give your frontend code a significant boost.",
      },
    ],
  },
  {
    title:
      "Dockerize your Node.js Project: A Complete Guide with Best Practices",
    img: "https://res.cloudinary.com/dqyv780cz/image/upload/v1751195319/mockup_1_1_-min_p8nwyg.jpg",
    tags: ["Docker", "Node.js", "DevOps"],
    body: "Master Docker containerization for Node.js applications with this comprehensive guide. Learn step-by-step instructions, best practices, optimization techniques, and troubleshooting tips to ensure consistent deployment across all environments.",
    published: "February 7, 2025",
    topic: "DevOps",
    read_mins: 8,
    content: [
      {
        type: "text_content",
        value:
          "When developing modern applications, managing dependencies and ensuring consistent environments across different machines becomes increasingly complex. The development landscape is dynamic and constantly evolving, with each library and package undergoing continuous development and frequent updates. As time progresses, the versions of technologies originally used in your application may become outdated, leading to the infamous 'it works on my machine' problem.",
      },
      {
        type: "text_content",
        value:
          "This is where Docker becomes invaluable. Docker provides a robust solution by packaging your application along with its specific development environment, including the exact versions of all dependencies and runtime requirements. When you containerize an app with Docker, it creates an isolated, portable environment that encapsulates everything needed to run the application consistently across any platform.",
      },

      {
        type: "heading_content",
        value: "Why Dockerize Node.js Applications?",
      },
      {
        type: "list_content",
        value: [
          "Environment Consistency: Eliminates 'works on my machine' issues by ensuring identical environments across development, testing, and production",
          "Simplified Deployment: Deploy anywhere Docker runs - from local machines to cloud platforms",
          "Dependency Management: Lock in specific versions of Node.js, npm packages, and system dependencies",
          "Scalability: Easy horizontal scaling with container orchestration tools like Kubernetes",
          "Development Efficiency: New team members can spin up the entire application stack with a single command",
        ],
      },
      {
        type: "heading_content",
        value: "Prerequisites",
      },
      {
        type: "list_content",
        value: [
          "Docker Engine and CLI installed on your system",
          "Existing Node.js project (Express server, API, or web application)",
          "Basic understanding of command line operations",
          "Docker Hub account (optional, for sharing images)",
        ],
      },
      {
        type: "heading_content",
        value: "Step 1: Prepare Your Project Structure",
      },
      {
        type: "text_content",
        value:
          "Before creating the Dockerfile, ensure your project has a proper structure. Your Node.js project should have a package.json file and a main entry point (usually server.js, app.js, or index.js).",
      },
      {
        type: "code_content",
        value:
          "project-root/\n├── package.json\n├── package-lock.json\n├── server.js\n├── src/\n│   ├── routes/\n│   └── controllers/\n├── public/\n└── node_modules/",
      },
      {
        type: "heading_content",
        value: "Step 2: Create a .dockerignore File",
      },
      {
        type: "text_content",
        value:
          "Create a .dockerignore file to exclude unnecessary files from your Docker image, reducing build time and image size:",
      },
      {
        type: "code_content",
        value:
          "node_modules\nnpm-debug.log\n.git\n.gitignore\nREADME.md\n.env\n.nyc_output\ncoverage\n.nyc_output\n.DS_Store\n*.log",
      },
      {
        type: "heading_content",
        value: "Step 3: Create an Optimized Dockerfile",
      },
      {
        type: "text_content",
        value:
          "Create a Dockerfile in your project root with the following optimized configuration:",
      },
      {
        type: "code_content",
        value:
          '# Use official Node.js runtime as base image\nFROM node:18-alpine\n\n# Set working directory inside container\nWORKDIR /usr/src/app\n\n# Copy package files first for better caching\nCOPY package*.json ./\n\n# Install dependencies\nRUN npm ci --only=production && npm cache clean --force\n\n# Copy application source code\nCOPY . .\n\n# Create non-root user for security\nRUN addgroup -g 1001 -S nodejs\nRUN adduser -S nextjs -u 1001\nUSER nextjs\n\n# Expose the port your app runs on\nEXPOSE 3000\n\n# Define the command to run your application\nCMD ["node", "server.js"]',
      },
      {
        type: "text_content",
        value:
          "This optimized Dockerfile uses Alpine Linux for a smaller footprint, implements Docker layer caching by copying package files first, includes security best practices with a non-root user, and cleans up unnecessary files to minimize image size.",
      },

      {
        type: "heading_content",
        value: "Step 4: Build the Docker Image",
      },
      {
        type: "text_content",
        value:
          "Navigate to your project root directory and build the Docker image:",
      },
      {
        type: "code_content",
        value:
          "# Build the image with a meaningful tag\ndocker build -t your-username/node-app:latest .\n\n# View your built images\ndocker images",
      },
      {
        type: "text_content",
        value:
          "The build process will execute each instruction in your Dockerfile, creating layers that can be cached for faster subsequent builds.",
      },
      {
        type: "heading_content",
        value: "Step 5: Run and Test Your Container",
      },
      {
        type: "text_content",
        value: "Start your containerized application and test it locally:",
      },
      {
        type: "code_content",
        value:
          "# Run container with port mapping\ndocker run --name node-container -p 3000:3000 -d your-username/node-app:latest\n\n# Check if container is running\ndocker ps\n\n# View container logs\ndocker logs node-container\n\n# Stop the container\ndocker stop node-container",
      },
      {
        type: "heading_content",
        value: "Step 6: Environment Variables and Configuration",
      },
      {
        type: "text_content",
        value:
          "For production deployments, you'll often need to pass environment variables. Here's how to handle configuration:",
      },
      {
        type: "code_content",
        value:
          "# Run with environment variables\ndocker run --name node-container \\\n  -p 3000:3000 \\\n  -e NODE_ENV=production \\\n  -e DB_HOST=your-database-host \\\n  -e API_KEY=your-api-key \\\n  -d your-username/node-app:latest\n\n# Or use an environment file\ndocker run --name node-container \\\n  -p 3000:3000 \\\n  --env-file .env.production \\\n  -d your-username/node-app:latest",
      },
      {
        type: "heading_content",
        value: "Step 7: Multi-stage Builds for Production",
      },
      {
        type: "text_content",
        value:
          "For production applications, consider using multi-stage builds to further optimize your image:",
      },

      {
        type: "heading_content",
        value: "Step 8: Share via Docker Hub",
      },
      {
        type: "text_content",
        value:
          "Deploy your image to Docker Hub for easy sharing and deployment:",
      },
      {
        type: "code_content",
        value:
          "# Login to Docker Hub\ndocker login\n\n# Tag your image (if not already tagged)\ndocker tag your-username/node-app:latest your-username/node-app:v1.0.0\n\n# Push to Docker Hub\ndocker push your-username/node-app:latest\ndocker push your-username/node-app:v1.0.0",
      },
      {
        type: "text_content",
        value: "Others can now pull and run your application:",
      },
      {
        type: "code_content",
        value:
          "# Pull and run from Docker Hub\ndocker pull your-username/node-app:latest\ndocker run -p 3000:3000 your-username/node-app:latest",
      },

      {
        type: "heading_content",
        value: "Docker Compose for Development",
      },
      {
        type: "text_content",
        value:
          "For complex applications with databases and other services, use Docker Compose:",
      },
      {
        type: "code_content",
        value:
          '# docker-compose.yml\nversion: \'3.8\'\nservices:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=development\n      - DB_HOST=db\n    depends_on:\n      - db\n    volumes:\n      - .:/usr/src/app\n      - /usr/src/app/node_modules\n  \n  db:\n    image: postgres:13\n    environment:\n      - POSTGRES_DB=myapp\n      - POSTGRES_USER=user\n      - POSTGRES_PASSWORD=password\n    ports:\n      - "5432:5432"',
      },
      {
        type: "code_content",
        value:
          "# Start the entire stack\ndocker-compose up -d\n\n# Stop the stack\ndocker-compose down",
      },
      {
        type: "heading_content",
        value: "Performance Optimization Tips",
      },
      {
        type: "list_content",
        value: [
          "Use Alpine Images: Choose `node:18-alpine` over `node:18` for smaller image sizes",
          "Layer Caching: Copy `package*.json` before copying source code to leverage Docker's layer caching",
          "Multi-stage Builds: Separate build and runtime stages to exclude development dependencies",
          "Minimize Layers: Combine RUN commands where possible to reduce image layers",
          "Use .dockerignore: Exclude unnecessary files to speed up builds and reduce context size",
          "Clean Package Managers: Use `npm ci` instead of `npm install` and clean cache afterward",
        ],
      },
      {
        type: "heading_content",
        value: "Security Best Practices",
      },
      {
        type: "list_content",
        value: [
          "Non-root User: Run your application as a non-privileged user inside the container",
          "Pin Versions: Always use specific version tags for base images (e.g., `node:18.19.0-alpine`)",
          "Scan Images: Regularly scan your images for vulnerabilities using `docker scan`",
          "Secrets Management: Never embed secrets in Dockerfiles; use environment variables or secret managers",
          "Minimal Base Images: Use distroless or Alpine images to reduce attack surface",
        ],
      },

      {
        type: "heading_content",
        value: "Troubleshooting Common Issues",
      },
      {
        type: "text_content",
        value:
          "Container Won't Start: Check logs with `docker logs container-name` and verify your CMD instruction points to the correct entry file.",
      },
      {
        type: "text_content",
        value:
          "Port Issues: Ensure the EXPOSE port in Dockerfile matches your application port and the `-p` flag maps correctly (host:container).",
      },
      {
        type: "text_content",
        value:
          "Large Image Size: Review your .dockerignore file, use multi-stage builds, and choose minimal base images.",
      },
      {
        type: "text_content",
        value:
          "Build Failures: Clear Docker build cache with `docker builder prune` and ensure all dependencies are properly declared in package.json.",
      },
      {
        type: "heading_content",
        value: "Production Deployment Strategies",
      },
      {
        type: "text_content",
        value: "When deploying to production, consider these strategies:",
      },
      {
        type: "list_content",
        value: [
          "Health Checks: Implement health check endpoints and configure Docker health checks",
          "Resource Limits: Set memory and CPU limits to prevent containers from consuming excessive resources",
          "Logging: Configure proper logging drivers and centralized log management",
          "Monitoring: Implement application and container monitoring with tools like Prometheus",
          "Rolling Updates: Use orchestration tools for zero-downtime deployments",
        ],
      },
      {
        type: "code_content",
        value:
          '# Example with resource limits and health check\ndocker run --name node-container \\\n  -p 3000:3000 \\\n  --memory="512m" \\\n  --cpus="0.5" \\\n  --health-cmd="curl -f http://localhost:3000/health || exit 1" \\\n  --health-interval=30s \\\n  --health-timeout=10s \\\n  --health-retries=3 \\\n  -d your-username/node-app:latest',
      },
      {
        type: "text_content",
        value:
          "Dockerizing your Node.js application is a crucial step toward modern, reliable software deployment. It ensures consistency across environments, simplifies the deployment process, and provides a foundation for scaling your applications. By following these best practices and optimization techniques, you'll create efficient, secure, and maintainable containerized applications.",
      },
      {
        type: "text_content",
        value:
          "Remember that Docker is just the beginning of your containerization journey. As your applications grow, consider exploring container orchestration with Kubernetes, implementing CI/CD pipelines with automated testing and deployment, and adopting microservices architecture patterns for even greater scalability and maintainability.",
      },
    ],
  },
];
