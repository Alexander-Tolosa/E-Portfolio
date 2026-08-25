"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { content } from "@/data/content";
import { X, Shield, FileText, Check } from "lucide-react";

// Social Media Icons
const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.07v8.37h2.78z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
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
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subscribeMsg, setSubscribeMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setSubscribeStatus("error");
      setSubscribeMsg("Please enter a valid email address.");
      return;
    }

    setSubscribeStatus("loading");
    setSubscribeMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setSubscribeStatus("success");
        setSubscribeMsg(data.message || "Subscribed! Welcome email sent 🎉");
        setEmail("");
        setTimeout(() => {
          setSubscribeStatus("idle");
          setSubscribeMsg("");
        }, 5000);
      } else {
        setSubscribeStatus("error");
        setSubscribeMsg(data.message || "Failed to subscribe. Please try again.");
        setTimeout(() => {
          setSubscribeStatus("idle");
          setSubscribeMsg("");
        }, 4000);
      }
    } catch (err) {
      console.error("Newsletter submission error:", err);
      setSubscribeStatus("error");
      setSubscribeMsg("Network error. Please try again later.");
      setTimeout(() => {
        setSubscribeStatus("idle");
        setSubscribeMsg("");
      }, 4000);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === "/") {
      e.preventDefault();
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        const offset = 90;
        const absoluteTop = window.scrollY + element.getBoundingClientRect().top;
        window.scrollTo({
          top: Math.max(0, absoluteTop - offset),
          behavior: "smooth",
        });
      }
    } else {
      e.preventDefault();
      router.push(`/#${id}`);
    }
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Project", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <footer className="border-t border-brand-border bg-[#030712] text-neutral-300 pt-16 pb-12 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-14 items-start">

            {/* Left: Brand Profile, Bio & Socials */}
            <div className="flex flex-col justify-between max-w-sm">
              <div>
                {/* Avatar + Brand Name */}
                <Link
                  href="/#hero"
                  onClick={(e) => handleNavClick(e, "hero")}
                  className="inline-flex items-center gap-3 group mb-5 cursor-pointer select-none"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-neutral-900 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <img
                      src={content.personalInfo.avatarUrl || "/icon.png"}
                      alt={content.personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xl font-bold text-white tracking-tight group-hover:text-white/90 transition-colors">
                    Alexander Tolosa
                  </span>
                </Link>

                {/* Brand Pitch / Description */}
                <p className="text-sm leading-relaxed text-neutral-400 mb-6 font-normal">
                  Building AI-powered applications, learning backend automation, web & mobile applications, working under CDG solutions, and deep learning about Front-End Design. Open for tech projects collaboration.
                </p>
              </div>

              {/* Social Icon Buttons Row (Facebook, LinkedIn, Instagram, GitHub) */}
              <div className="flex items-center flex-wrap gap-2.5 pt-1">
                {/* Facebook */}
                <a
                  href={content.personalInfo.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <FacebookIcon size={16} />
                </a>

                {/* LinkedIn */}
                <a
                  href={content.personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <LinkedinIcon size={16} />
                </a>

                {/* Instagram */}
                <a
                  href={content.personalInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <InstagramIcon size={16} />
                </a>

                {/* GitHub */}
                <a
                  href={content.personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <GithubIcon size={16} />
                </a>
              </div>
            </div>

            {/* Center: Navigation Links */}
            <div className="flex justify-start md:justify-center">
              <ul className="space-y-3.5 text-left">
                {navLinks.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={`/#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className="text-sm font-medium text-white hover:text-white/75 transition-colors duration-150 inline-block hover:translate-x-0.5 transform"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Newsletter Signup */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider mb-2">
                Newsletter
              </h3>
              <p className="text-sm text-neutral-400 mb-4 leading-normal">
                Get updates on new proposed projects and articles.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  disabled={subscribeStatus === "loading"}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-[#0b0f19]/90 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={subscribeStatus === "loading"}
                  style={{ backgroundColor: "#5b52f9" }}
                  className="w-full py-3 px-5 rounded-xl font-semibold text-sm text-white shadow-[0_4px_20px_rgba(91,82,249,0.35)] hover:shadow-[0_4px_28px_rgba(91,82,249,0.55)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
                >
                  {subscribeStatus === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : subscribeStatus === "success" ? (
                    <>
                      <Check size={16} className="text-emerald-300" />
                      <span>Subscribed! 🎉</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>

                {subscribeMsg && (
                  <p
                    className={`text-xs mt-2 transition-all ${subscribeStatus === "success"
                        ? "text-emerald-400"
                        : "text-rose-400"
                      }`}
                  >
                    {subscribeMsg}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Bottom Divider & Copyright Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p className="text-center sm:text-left">
              &copy; {currentYear} Alexander Tolosa. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setModalType("privacy")}
                className="hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setModalType("terms")}
                className="hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy & Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0b0f19] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl text-neutral-200 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                {modalType === "privacy" ? (
                  <Shield size={20} className="text-[#5b52f9]" />
                ) : (
                  <FileText size={20} className="text-[#5b52f9]" />
                )}
                <h3 className="text-lg font-bold text-white">
                  {modalType === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
                </h3>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="text-sm text-neutral-400 space-y-3 leading-relaxed">
              {modalType === "privacy" ? (
                <>
                  <p>
                    Thank you for visiting Alexander Tolosa&apos;s portfolio. Your privacy
                    is respected and valued.
                  </p>
                  <p>
                    <strong>Information Collection:</strong> Any contact information you
                    submit (e.g. your name or email) is solely used for direct
                    communication and relevant project inquiries.
                  </p>
                  <p>
                    <strong>No Third-Party Sharing:</strong> Your personal data is never sold,
                    leased, or shared with third parties for marketing purposes.
                  </p>
                  <p>
                    If you have questions regarding this policy, feel free to reach out via
                    the contact form or directly at <span className="text-white">alexandertolosa45@gmail.com</span>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Welcome to the portfolio website of Alexander Tolosa. By accessing this
                    site, you agree to comply with and be bound by the following terms.
                  </p>
                  <p>
                    <strong>Intellectual Property:</strong> All project showcases, code
                    samples, designs, and content presented on this site are the
                    intellectual property of Alexander Tolosa or credited clients/partners.
                  </p>
                  <p>
                    <strong>Permitted Use:</strong> You may explore and share references for
                    personal or evaluation purposes with appropriate attribution.
                  </p>
                </>
              )}
            </div>

            {/* Close Button */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


