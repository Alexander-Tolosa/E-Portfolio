export interface Project {
  id: string;
  title: string;
  category: string;
  domain?: string;
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
  secondaryImage?: string;
  images?: string[];
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
  logo?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string[];
  logo?: string;
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

export interface Affiliation {
  id: string;
  name: string;
  role: string;
  category: string;
  logo: string;
  url?: string;
  period?: string;
  location?: string;
}

export interface PortfolioContent {
  personalInfo: {
    name: string;
    title: string;
    subTitle: string;
    bio: string;
    avatarUrl: string;
    animeAvatarUrl?: string;
    formalAvatarUrl?: string;
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
  affiliations: Affiliation[];
}

export const content: PortfolioContent = {
  personalInfo: {
    name: "Alexander Tolosa",
    title: "Front-End Developer",
    subTitle: "Crafting Premium Digital Experiences & Robust Backends",
    bio: "A highly dedicated and detail-oriented Software Engineer specializing in building full-stack web applications. I turn complex logic and requirements into clean, elegant, and performant code, with an emphasis on fluid animations and responsive layout design.",
    avatarUrl: "/assets/images/formal_avatar.png",
    animeAvatarUrl: "/assets/images/anime_avatar.png",
    formalAvatarUrl: "/assets/images/formal_avatar.png",
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
        { name: "React", level: 100, icon: "" },
        { name: "TypeScript", level: 100, icon: "" },
        { name: "Next.js", level: 100, icon: "" },
        { name: "Tailwind CSS", level: 100, icon: "" },
        { name: "HTML5", level: 100, icon: "" },
        { name: "CSS3", level: 100, icon: "" },
        { name: "Shadcn UI", level: 100, icon: "" },
        { name: "JavaScript", level: 100, icon: "" },
        { name: "Framer Motion", level: 100, icon: "" },
        { name: "GSAP", level: 100, icon: "" },
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
        { name: "VS Code", level: 100, icon: "" },
        { name: "Supabase", level: 100, icon: "" },
        { name: "Vercel", level: 100, icon: "" },
        { name: "Canva", level: 100, icon: "" },
        { name: "Antigravity", level: 100, icon: "" },
        { name: "Discord", level: 100, icon: "" },
        { name: "Teams", level: 100, icon: "" },
        { name: "Viber", level: 100, icon: "" },
      ],
    },
  ],
  projects: [
    {
      id: "pharmatrack",
      title: "PharmaTrack",
      domain: "pharmatrack.app",
      category: "Attendance Monitoring System",
      shortDescription: "A QR-based attendance tracking and management system for the University of San Agustin College of Pharmacy. Gives facilitators real-time scan metrics.",
      description: "PharmaTrack is a high-performance attendance monitoring and management system designed for the College of Pharmacy. It features QR-based student check-in, automatic presence status derivation based on customizable event time windows, and robust administrative dashboards for facilitators to view and export analytics.",
      role: "Front-End Developer & UI/UX Designer",
      timeline: "2026",
      client: "University of San Agustin, Pharmacy Department",
      techStack: ["Next.js", "Supabase", "TypeScript", "Zod", "Vitest", "Nodemailer", "Redis", "Tailwind CSS", "IndexedDB"],
      challenges: "Ensuring scanning facilitators can record student check-ins at venues with poor network connectivity without losing original scan timestamps or producing double check-in states.",
      solutions: "Implemented an offline-first scanning mechanism that queues scan data in IndexedDB when the server is unreachable and auto-syncs on reconnect, retaining actual check-in timestamps. Designed a responsive dashboard for managing event rules.",
      results: "Eliminated manual roll-call overhead, automated email alerts for absence, and generated accurate Excel/PDF reports, successfully serving the department's student body.",
      image: "/assets/images/pharmatrack_dashboard.jpg",
      images: [
        "/assets/images/pharmatrack_dashboard.jpg",
        "/assets/images/pharmatrack_landing.png"
      ],
      githubUrl: "https://github.com/JustineSalinas/pharmatrack",
    },
    {
      id: "silim-cafe",
      title: "Silim Café",
      domain: "silimcafe.com",
      category: "E-Commerce",
      shortDescription: "A comprehensive digital ecosystem for a specialty coffee shop with interactive signature menu showcase, localized map routing, and delivery integrations.",
      description: "Silim Café is a web application designed as a virtual storefront for a local specialty coffee shop with an interactive signature menu showcase, localized map routing, and authentic customer testimonials. It seamlessly bridges user engagement with utility by offering direct social media integration and a dedicated checkout funnel via its official Foodpanda delivery partnership.",
      role: "Front-End Dev & Design",
      timeline: "2026",
      client: "Silim Cafe Co.",
      techStack: ["Next.js", "React", "JavaScript", "Tailwind CSS"],
      challenges: "Integrating a conversational chatbot helper that updates users dynamically on open and close hours, store location, menu items and third party app.",
      solutions: "I Created this app to ensure the customers able to find out their business and a API connected to enable third party app directly into a foodapp delivery.",
      results: "Because the café is located at the end of a quiet street away from high foot traffic, the website acts as its digital storefront.",
      image: "/assets/images/silim_cafe_menu.png",
      images: [
        "/assets/images/silim_cafe_menu.png",
        "/assets/images/silim_cafe_hero.png",
        "/assets/images/silim_cafe_releases.png"
      ],
      githubUrl: "https://github.com/Alexander-Tolosa/Silim-Cafe",
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
      logo: "/assets/images/cdg_emblem.png",
      description: [
        "IT solutions startup delivering web development, database architecture, and technical consulting to clients across the Visayas, collaborating with a team across the full business lifecycle from scoping to deployment.",
        "Designed and built clean, modular front-end architectures using React, Next.js, and TypeScript, delivering accessible and high-performance web interfaces."
      ],
    },
    {
      id: "exp-2",
      role: "Front-End Developer & UI/UX Design",
      company: "PharmaTrack — University of San Agustin",
      location: "Iloilo City, Philippines",
      period: "2026",
      logo: "/assets/images/usa_logo.png",
      description: [
        "Designed the user experience from scratch, mapping out intuitive dashboard layouts, and translated those high-fidelity designs into a responsive frontend for pharmacy student attendance monitoring.",
        "Focused on state management and building clean, accessible UI components with offline-first check-in capabilities."
      ],
    },
    {
      id: "exp-itsa",
      role: "Front-End Developer",
      company: "Information Technology Student Association (ITSA)",
      location: "Iloilo City, Philippines",
      period: "2026 – 2027",
      logo: "/assets/images/itsa_emblem.png",
      description: [
        "The official academic association cultivates technical excellence, software craft, and a vibrant student developer network ready to lead."
      ],
    },
    {
      id: "exp-ads",
      role: "Developer",
      company: "Augustinian Developers Society (ADS)",
      location: "Iloilo City, Philippines",
      period: "2026 – 2027",
      logo: "/assets/images/ads_emblem.png",
      description: [
        "Founded in 2021 as a Google Developer Student Club, we have evolved into an independent, award-winning movement. The Augustinian Developer Society unites diverse minds to build real-world solutions, drive grassroots tech outreach, and create technology that truly matter."
      ],
    },
    {
      id: "exp-3",
      role: "Graphic Designer",
      company: "CAS (College of Arts & Sciences Organization)",
      location: "Iloilo City, Philippines",
      period: "2024 – Present",
      logo: "/assets/images/usa_logo.png",
      description: [
        "Designed promotional graphic media, digital branding, and organizational layouts for student activities and departmental announcements."
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
      logo: "/assets/images/usa_logo.png",
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
      logo: "/assets/images/usa_logo.png",
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
      logo: "/assets/images/usa_logo.png",
      description: [
        "Grade 8 - Grade 10"
      ],
    }
  ],
  certifications: [
    {
      id: "cert-8",
      title: "Getting Started with Cisco Packet Tracer",
      issuer: "Cisco Networking Academy",
      date: "Aug 2026",
      credentialUrl: "https://www.netacad.com/certificates/?issuanceId=3d36bbef-1d4f-422f-941b-b394427715b6",
      logo: "/assets/images/cisco_logo.png",
      description: []
    },
    {
      id: "cert-7",
      title: "Developing Designs for User Experience",
      issuer: "e-TESDA (Technical Education & Skills Development Authority)",
      date: "Aug 2026",
      credentialUrl: "https://e-tesda.gov.ph/mod/customcert/view.php?id=63484&downloadown=1",
      logo: "/assets/images/tesda_seal.png",
      description: []
    },
    {
      id: "cert-6",
      title: "Developing Designs for User Interface",
      issuer: "e-TESDA (Technical Education & Skills Development Authority)",
      date: "Jul 2026",
      credentialUrl: "https://e-tesda.gov.ph/mod/customcert/view.php?id=63485&downloadown=1",
      logo: "/assets/images/tesda_seal.png",
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
    },
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
      id: "cert-5",
      title: "Certificate of Completion: AI Capabilities and Limitations",
      issuer: "Anthropic",
      date: "Jul 2026",
      credentialUrl: "https://verify.skilljar.com/c/9wzioy8w7xjs",
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
      id: "cert-2",
      title: "Certificate of Completion: AI Fluency for Students",
      issuer: "Anthropic",
      date: "Jun 2026",
      credentialUrl: "https://verify.skilljar.com/c/7nc4w3u543cx",
      logo: "/assets/images/anthropic_logo.png",
      description: []
    }
  ],
  affiliations: [
    {
      id: "cdg",
      name: "Cascade Development Group (CDG)",
      role: "Front-End Developer",
      category: "IT solutions startup",
      period: "2026 – Present",
      location: "Iloilo City, Philippines",
      logo: "/assets/images/cdg_emblem.png",
      url: "https://cdg-official.vercel.app",
    },
    {
      id: "itsa",
      name: "ITSA",
      role: "Member & Web Developer",
      category: "IT School Organization, University of San Agustin",
      period: "2024 – Present",
      location: "Iloilo City, Philippines",
      logo: "/assets/images/itsa_emblem.png",
      url: "https://itsa-website-psi.vercel.app",
    },
    {
      id: "ads",
      name: "Augustinian Developer Society (ADS)",
      role: "Developer",
      category: "University-wide school organization, University of San Agustin",
      period: "2024 – Present",
      location: "Iloilo City, Philippines",
      logo: "/assets/images/ads_emblem.png",
      url: "/affiliations",
    },
  ],
};
