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

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  logo?: string;
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
  education: Education[];
  certifications: Certification[];
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
      linkedin: "https://www.linkedin.com/in/alexander-michael-tolosa-a598b93b3/",
      email: "mailto:alexandertolosa45@gmail.com",
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
      role: "Front-End Developer",
      company: "Cascade Development Group (CDG)",
      location: "Iloilo City, Philippines",
      period: "2026 – Present",
      description: [
        "IT solutions startup delivering web development, database architecture, and technical consulting to clients across the Visayas — collaborating with a team across the full business lifecycle from scoping to deployment."
      ],
    },
    {
      id: "exp-2",
      role: "Front-End Developer & UI/UX Design",
      company: "PharmaTrack — University of San Agustin, Pharmacy Department",
      location: "Iloilo City, Philippines",
      period: "2026",
      description: [
        "Designed some user experience from scratch, mapping out intuitive dashboard layouts, and translated those high-fidelity designs into a responsive frontend.",
        "Focused on state management and building clean, accessible UI components for fast-paced clinical environments."
      ],
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Information Technology",
      institution: "University of San Agustin",
      location: "Iloilo, Philippines",
      period: "2024 - Present",
      description: [
        "College - Third Year",
        "Graphic Designer — CAS (College of Arts & Sciences Organization)"
      ],
    },
    {
      id: "edu-2",
      degree: "Senior High School",
      institution: "University of San Agustin Main",
      location: "Iloilo, Philippines",
      period: "Sept 2023 - May 2024",
      description: [
        "SHS Grade 11 - Grade 12"
      ],
    },
    {
      id: "edu-3",
      degree: "Junior High School",
      institution: "BED University of San Agustin",
      location: "Iloilo, Philippines",
      period: "Sept 2019 - May 2022",
      description: [
        "Grade 8 - Grade 10"
      ],
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Certificate of Completion: AI Fluency Framework & Foundations",
      issuer: "Anthropic",
      date: "Jul 2026",
      credentialUrl: "https://verify.skilljar.com/c/xapqd4xsgmxf",
      logo: "/assets/images/anthropic_logo.png",
      description: []
    },
    {
      id: "cert-2",
      title: "Certificate of Completion: AI Fluency for Students",
      issuer: "Anthropic",
      date: "Jun 2026",
      credentialUrl: "https://verify.skilljar.com/c/7nc4w3u543cx",
      logo: "/assets/images/anthropic_logo.png",
      description: []
    },
    {
      id: "cert-3",
      title: "Certificate of Completion: Claude 101",
      issuer: "Anthropic",
      date: "Jun 2026",
      credentialUrl: "https://verify.skilljar.com/c/7i8zf7mmfpvb",
      logo: "/assets/images/anthropic_logo.png",
      description: []
    },
    {
      id: "cert-4",
      title: "AWS AI & ML Scholars - 2026 Challenge Completion",
      issuer: "Udacity",
      date: "Mar 2026",
      credentialUrl: "https://www.udacity.com/certificate/e/0d3421a6-2cb9-11f1-a14f-875e605f5b98",
      logo: "/assets/images/udacity_logo.png",
      description: []
    }
  ]
};
