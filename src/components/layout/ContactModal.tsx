"use client";

import React, { useState } from "react";
import { X, Mail, Send, Check, Copy } from "lucide-react";
import { content } from "@/data/content";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  if (!isOpen) return null;

  const emailAddress = "alexandertolosa45@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
          onClose();
        }, 2500);
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-brand-border bg-brand-card p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg text-brand-text-muted hover:text-foreground hover:bg-white/[0.04] transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-foreground/10 border border-brand-border flex items-center justify-center text-foreground">
            <Mail size={18} />
          </div>
          <h2 className="text-xl font-medium text-foreground">Get in touch</h2>
        </div>
        <p className="text-sm text-brand-text-muted mb-6">
          Have an opportunity, project collaboration, or just want to connect? Send a note directly.
        </p>

        {/* Quick Email Copy Bar */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-brand-border mb-6">
          <span className="text-sm font-mono text-foreground truncate pr-2">
            {emailAddress}
          </span>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground/10 hover:bg-foreground/20 text-xs font-medium text-foreground transition-colors shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-brand-text-muted mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-black/30 text-sm text-foreground placeholder:text-brand-text-muted/50 focus:outline-none focus:border-foreground/40 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-text-muted mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-black/30 text-sm text-foreground placeholder:text-brand-text-muted/50 focus:outline-none focus:border-foreground/40 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-text-muted mb-1.5">
              Message
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project, idea, or role..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-black/30 text-sm text-foreground placeholder:text-brand-text-muted/50 focus:outline-none focus:border-foreground/40 transition-colors resize-none"
            />
          </div>

          {statusMessage && (
            <p
              className={`text-xs ${
                status === "success" ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {statusMessage}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-sm font-medium text-brand-text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {status === "loading" ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
