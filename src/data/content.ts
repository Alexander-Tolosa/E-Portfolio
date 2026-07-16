export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  role: string;
  timeline: string;
  client: string;
  techStack: string[];
  challenges: string;
  solutions: string;
  results: string;
  image: string; // URL or placeholder path
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; icon: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface PortfolioContent {
  personalInfo: {
    name: string;
    title: string;
    subTitle: string;
    bio: string;
    resumeUrl: string;
    socials: {
      github: string;
      linkedin: string;
      email: string;
    };
  };
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
}

export const content: PortfolioContent = {
  personalInfo: {
    name: "Alexander Tolosa",
    title: "Full-Stack Software Engineer",
    subTitle: "Crafting Premium Digital Experiences & Robust Backends",
    bio: "A highly dedicated and detail-oriented Software Engineer specializing in building full-stack web applications. I turn complex logic and requirements into clean, elegant, and performant code, with an emphasis on fluid animations and responsive layout design.",
    resumeUrl: "/resume.pdf",
    socials: {
      github: "https://github.com/Alexander-Tolosa",
      linkedin: "https://linkedin.com/in/alexander-tolosa",
      email: "mailto:alexandertolosa.dev@gmail.com",
    },
  },
  skills: [
    {
      name: "Frontend",
      skills: [
        { name: "JavaScript", level: 100, icon: "" },
        { name: "TypeScript", level: 100, icon: "" },
        { name: "React", level: 100, icon: "" },
        { name: "Framer Motion", level: 100, icon: "" },
        { name: "Next.js", level: 100, icon: "" },
        { name: "Tailwind CSS", level: 100, icon: "" },
        { name: "Vite", level: 100, icon: "" },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Python", level: 100, icon: "" },
        { name: "Java", level: 100, icon: "" },
        { name: "Spring Boot", level: 100, icon: "" },
        { name: "PostgreSQL", level: 100, icon: "" },
        { name: "MySQL", level: 100, icon: "" },
      ],
    },
    {
      name: "Devops & Cloud",
      skills: [
        { name: "GitHub Actions", level: 100, icon: "" },
      ],
    },
    {
      name: "AI & Machine Learning",
      skills: [
        { name: "Anthropic", level: 100, icon: "" },
      ],
    },
    {
      name: "Security & Identity",
      skills: [],
    },
    {
      name: "CMS & No-Code",
      skills: [
        { name: "WordPress", level: 100, icon: "" },

      ],
    },
    {
      name: "Developer Tools",
      skills: [
        { name: "Git", level: 100, icon: "" },
        { name: "GitHub", level: 100, icon: "" },
        { name: "Discord", level: 100, icon: "" },
        { name: "Teams", level: 100, icon: "" },
        { name: "Viber", level: 100, icon: "" },
        { name: "Antigravity", level: 100, icon: "" },
        { name: "VS Code", level: 100, icon: "" },
        { name: "Supabase", level: 100, icon: "" },
        { name: "Vercel", level: 100, icon: "" },
        { name: "Canva", level: 100, icon: "" },
      ],
    },
  ],
  projects: [
    {
      id: "silim-cafe",
      title: "Silim Café",
      category: "Full-Stack Web App",
      shortDescription: "A comprehensive digital ecosystem for a premium cafe including table reservations, online ordering, and AI chatbot support.",
      description: "Silim Caf is a bespoke full-stack ecommerce and utility platform designed to solve operational bottlenecks for modern coffee shops. The system integrates seamless online table booking, an interactive digital menu with dynamic ordering, checkout pipelines, and an automated customer outreach chatbot.",
      role: "Lead Full-Stack Architect",
      timeline: "3 Months (2026)",
      client: "Silim Cafe Co.",
      techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Express", "MongoDB", "Framer Motion", "Socket.io"],
      challenges: "Managing real-time seat availability to prevent double-bookings during peak hours, and integrating a conversational chatbot helper that updates users dynamically on menu items and order details.",
      solutions: "Created a reservation scheduler with optimistic UI states and a Redis-backed locking mechanism to secure table coordinates. Built the chatbot widget leveraging React state-management and asynchronous message queues to answer queries instantly.",
      results: "Reduces manual table booking errors to 0% and improved customer digital interactions by 45%. The project serves as an active showcase of highly polished UI animations and robust database integrity.",
      image: "/assets/images/silim_cafe_mockup.jpg",
      githubUrl: "https://github.com/Alexander-Tolosa/Silim-Cafe",
      liveUrl: "#",
    },
    {
      id: "apex-analytics",
      title: "Apex Dashboard",
      category: "Data Visualization",
      shortDescription: "A gorgeous real-time analytical dashboard monitoring server APIs, performance metrics, and application health indicators.",
      description: "Apex Analytics provides organizations with clear, near-zero-latency insights into their API infrastructure. It translates millions of raw server logs into rich visual panels tracking latency distribution, HTTP status counts, and custom alerts.",
      role: "Frontend Engineer & UX Designer",
      timeline: "2 Months (2025)",
      client: "Apex Analytics Inc.",
      techStack: ["React", "TypeScript", "D3.js", "Tailwind CSS", "Go (Golang)", "PostgreSQL", "TimescaleDB"],
      challenges: "Rendering and updating high-density charts containing over 10,000 data points in real time without dropping below 60fps.",
      solutions: "Implemented canvas-based graphing for raw points while overlaying SVG grids for interactions. Configured virtualized lists to handle extensive log tables, keeping the DOM footprint minimal.",
      results: "Improved page responsiveness by 60% compared to legacy charting tools. Handled continuous streams of 500+ messages per second comfortably.",
      image: "/assets/images/apex_dashboard_mockup.jpg",
      githubUrl: "https://github.com/Alexander-Tolosa/apex-analytics",
      liveUrl: "#",
    },
    {
      id: "helix-task-workspace",
      title: "Helix Workspace",
      category: "Productivity Tool",
      shortDescription: "A keyboard-first team collaboration workspace with Kanban columns, document editors, and real-time updates.",
      description: "Helix Workspace is a supercharged project management canvas for fast-moving software teams. It emphasizes rapid task adjustments through comprehensive keyboard shortcut binds, markdown documentation, and dynamic workspace cards.",
      role: "Full-Stack Developer",
      timeline: "4 Months (2025)",
      client: "Personal Project",
      techStack: ["Next.js", "NestJS", "GraphQL", "Prisma", "PostgreSQL", "Tailwind CSS", "Zustand"],
      challenges: "Keeping document states and board positions in sync across multiple concurrent users with proper conflict resolution.",
      solutions: "Leveraged GraphQL subscriptions for real-time board updates and designed a CRDT-based light syncing layer to merge concurrent text modifications in the workspace docs.",
      results: "Created a highly responsive, keyboard-driven productivity app with average task-update latencies below 80ms globally.",
      image: "/assets/images/helix_workspace_mockup.jpg",
      githubUrl: "https://github.com/Alexander-Tolosa/helix-workspace",
      liveUrl: "#",
    },
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Senior Full-Stack Developer",
      company: "Innovate Tech Labs",
      location: "Manila, Philippines",
      period: "2024 - Present",
      description: [
        "Architected and deployed scalable Next.js client portals, boosting customer retention by 15%.",
        "Lead a team of 4 frontend engineers, defining development standards, UI design systems, and CI/CD pipelines.",
        "Optimized slow backend database query layouts, cutting API response times by up to 250ms."
      ],
    },
    {
      id: "exp-2",
      role: "Software Engineer",
      company: "CoreSolutions Inc.",
      location: "Manila, Philippines",
      period: "2022 - 2024",
      description: [
        "Implemented RESTful web APIs and microservices using Node.js and Express, integrated with MongoDB.",
        "Developed responsive user-interfaces using React, Redux, and Tailwind CSS following pixel-perfect design comps.",
        "Created unit test suites covering 80%+ of core business logics, reducing deployment rollbacks."
      ],
    }
  ],
};
