"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { content } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please provide a valid email address";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message content is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          from_name: `${form.name} (Portfolio Contact Form)`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error("Web3Forms submission failed:", result);
        setStatus("error");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-brand-dark/20">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-indigo px-3 py-1 rounded-full bg-accent-indigo/10">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-accent-indigo mt-4 mx-auto md:mx-0 rounded" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact details (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {"Let's discuss your vision"}
              </h3>
              <p className="text-brand-text-muted leading-relaxed text-sm max-w-sm">
                Feel free to reach out for project proposals, collaboration discussions, or structural feedback. {"I'm"} always open to new connections.
              </p>
              
              <div className="space-y-4 pt-6">
                {/* Email Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-accent-blue shadow-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-xs text-brand-text-muted uppercase tracking-wider">Email Address</span>
                    <a
                      href={content.personalInfo.socials.email}
                      className="text-sm font-semibold text-white hover:text-accent-blue transition-colors"
                    >
                      {content.personalInfo.socials.email.replace("mailto:", "")}
                    </a>
                  </div>
                </div>

                {/* Location Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-accent-indigo shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-xs text-brand-text-muted uppercase tracking-wider">Location</span>
                    <span className="text-sm font-semibold text-white">
                      Iloilo, Philippines
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-white/20 border-t border-white/5 pt-6 hidden lg:block">
              Designed with deep precision.
            </div>
          </div>

          {/* Right Column: Contact form Card (7 Columns) */}
          <div className="lg:col-span-7">
            <Card animate={true} className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent-emerald/10 text-accent-emerald flex items-center justify-center mb-6">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h4>
                    <p className="text-sm text-brand-text-muted max-w-sm mx-auto mb-8">
                      Thank you for getting in touch. I have received your message and will respond as soon as possible.
                    </p>
                    <Button variant="secondary" onClick={() => setStatus("idle")}>
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {status === "error" && (
                      <div className="p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 animate-pulse-slow">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>Failed to send message. Please ensure your access key is set or try again later.</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name field */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-xs font-semibold text-white/80 uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                            errors.name
                              ? "border-red-500/50 focus:ring-red-500/20"
                              : "border-white/10 focus:border-accent-indigo focus:ring-accent-indigo/20"
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <span className="flex items-center gap-1 text-xs text-red-400 mt-1">
                            <AlertCircle size={12} />
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Email field */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs font-semibold text-white/80 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                            errors.email
                              ? "border-red-500/50 focus:ring-red-500/20"
                              : "border-white/10 focus:border-accent-indigo focus:ring-accent-indigo/20"
                          }`}
                          placeholder="johndoe@example.com"
                        />
                        {errors.email && (
                          <span className="flex items-center gap-1 text-xs text-red-400 mt-1">
                            <AlertCircle size={12} />
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                          errors.subject
                            ? "border-red-500/50 focus:ring-red-500/20"
                            : "border-white/10 focus:border-accent-indigo focus:ring-accent-indigo/20"
                        }`}
                        placeholder="Project Partnership / Job Opportunity"
                      />
                      {errors.subject && (
                        <span className="flex items-center gap-1 text-xs text-red-400 mt-1">
                          <AlertCircle size={12} />
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message field */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all resize-none ${
                          errors.message
                            ? "border-red-500/50 focus:ring-red-500/20"
                            : "border-white/10 focus:border-accent-indigo focus:ring-accent-indigo/20"
                        }`}
                        placeholder="Tell me more about your project idea..."
                      />
                      {errors.message && (
                        <span className="flex items-center gap-1 text-xs text-red-400 mt-1">
                          <AlertCircle size={12} />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit button */}
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      {status === "submitting" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
