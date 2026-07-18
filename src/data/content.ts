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
      instagram: string;
      facebook: string;
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
      instagram: "https://www.instagram.com/lex.zuhnder/",
      facebook: "https://www.facebook.com/alexandermichaelstolosa11",
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
      id: "pharmatrack",
      title: "PharmaTrack",
      category: "Attendance Monitoring System",
      shortDescription: "A QR-based offline-first attendance tracking system for the University of San Agustin College of Pharmacy.",
      description: "PharmaTrack is a high-performance attendance monitoring and management system designed for the College of Pharmacy. It features QR-based student check-in, automatic presence status derivation based on customizable event time windows, and robust administrative dashboards for facilitators to view and export analytics.",
      role: "Front-End Developer & UI/UX Designer",
      timeline: "2026",
      client: "University of San Agustin, Pharmacy Department",
      techStack: ["Next.js", "Supabase", "TypeScript", "Zod", "Vitest", "Nodemailer", "Redis", "Tailwind CSS", "IndexedDB"],
      challenges: "Ensuring scanning facilitators can record student check-ins at venues with poor network connectivity without losing original scan timestamps or producing double check-in states.",
      solutions: "Implemented an offline-first scanning mechanism that queues scan data in IndexedDB when the server is unreachable and auto-syncs on reconnect, retaining actual check-in timestamps. Designed a responsive dashboard for managing event rules.",
      results: "Eliminated manual roll-call overhead, automated email alerts for absence, and generated accurate Excel/PDF reports, successfully serving the department's student body.",
      image: "/assets/images/pharmatrack_mockup.png",
      githubUrl: "https://github.com/JustineSalinas/pharmatrack",
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
