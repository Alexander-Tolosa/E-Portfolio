import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck, Cpu, Code2, Milestone } from "lucide-react";
import { content } from "@/data/content";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = content.projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-4">Project Not Found</h1>
        <p className="text-brand-text-muted mb-8 max-w-sm">
          The case study you are looking for does not exist or has been relocated.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold shadow-md hover:opacity-95"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-24 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-1/4 w-[35rem] h-[35rem] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[35rem] h-[35rem] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Back Button */}
        <Link
          href="/#hero"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text-muted hover:text-white mb-10 transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Header Information */}
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-blue px-3 py-1 rounded-full bg-accent-blue/10">
            Case Study
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 mb-6">
            {project.title}
          </h1>
          
          <p className="text-lg text-brand-text-muted leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>
        </div>

        {/* Project Cover Image */}
        {project.image && (
          <div className="w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden border border-white/5 mb-16 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Project Metadata Grid Card */}
        <div className="glass rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border border-white/5">
          <div>
            <span className="block text-xs uppercase tracking-wider text-brand-text-muted mb-1.5">Role</span>
            <span className="text-sm font-semibold text-white">{project.role}</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-brand-text-muted mb-1.5">Timeline</span>
            <span className="text-sm font-semibold text-white">{project.timeline}</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-brand-text-muted mb-1.5">Client</span>
            <span className="text-sm font-semibold text-white">{project.client}</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-brand-text-muted mb-1.5">Category</span>
            <span className="text-sm font-semibold text-accent-blue">{project.category}</span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold hover:opacity-95 shadow-md shadow-accent-indigo/20 cursor-pointer"
            >
              <ExternalLink size={16} />
              Visit Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold transition-all cursor-pointer"
            >
              <GithubIcon size={16} />
              View Repository
            </a>
          )}
        </div>

        {/* Main Details Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Area: Descriptions & Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Milestone className="text-accent-blue" size={20} />
                Project Overview
              </h3>
              <p className="text-brand-text-muted text-sm leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Challenges */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Cpu className="text-accent-indigo" size={20} />
                The Challenge
              </h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                {project.challenges}
              </p>
            </div>

            {/* Solutions */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Code2 className="text-accent-cyan" size={20} />
                Our Solution
              </h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                {project.solutions}
              </p>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <ShieldCheck className="text-accent-emerald" size={20} />
                Key Deliverables & Results
              </h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                {project.results}
              </p>
            </div>
          </div>

          {/* Right Area: Sidebar Tech list (4 Columns) */}
          <div className="lg:col-span-4">
            <div className="glass rounded-2xl p-6 border border-white/5 sticky top-28">
              <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-white/5">
                Technologies Used
              </h3>
              
              <div className="flex flex-wrap lg:flex-col gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center text-xs font-semibold px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 text-white/80 lg:w-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mr-2" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
