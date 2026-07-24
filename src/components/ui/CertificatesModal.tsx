"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, CheckCircle, ExternalLink, X, Search } from "lucide-react";
import { Certification } from "@/data/content";

interface CertificatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  certifications: Certification[];
}

export function CertificatesModal({ isOpen, onClose, certifications }: CertificatesModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredCerts = certifications.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-brand-card/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 glass"
          >
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <Award size={26} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    Certifications & Achievements
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                      {certifications.length} Total
                    </span>
                  </h3>
                  <p className="text-xs md:text-sm text-brand-text-muted mt-0.5">
                    Verified credentials, licenses, and professional qualifications
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 md:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted" size={16} />
                  <input
                    type="text"
                    placeholder="Search certificates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-text-muted focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-brand-text-muted hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[60vh] space-y-6">
              {filteredCerts.length === 0 ? (
                <div className="text-center py-12">
                  <Award size={48} className="mx-auto text-brand-text-muted/40 mb-3" />
                  <p className="text-sm text-brand-text-muted">No certificates found matching &quot;{searchTerm}&quot;</p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-3 text-xs font-semibold text-white hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCerts.map((cert, idx) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="bg-white/[0.03] border border-white/10 hover:border-white/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-white/5 group"
                    >
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          {cert.logo && (
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                              <img
                                src={cert.logo}
                                alt={`${cert.issuer} logo`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="text-base font-bold text-white group-hover:text-zinc-300 transition-colors line-clamp-2">
                                {cert.title}
                              </h4>
                            </div>
                            <div className="flex items-center justify-between mt-1.5">
                              <p className="text-sm font-semibold text-white/70">
                                {cert.issuer}
                              </p>
                              <span className="inline-flex items-center gap-1 text-xs text-brand-text-muted whitespace-nowrap shrink-0">
                                <Calendar size={12} />
                                {cert.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        {cert.description && cert.description.length > 0 && (
                          <ul className="space-y-2 text-brand-text-muted text-sm mt-3 pt-3 border-t border-white/5">
                            {cert.description.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2">
                                <CheckCircle size={14} className="text-zinc-400 mt-1 shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {cert.credentialUrl && (
                        <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-zinc-300 transition-colors"
                          >
                            Verify Credential
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 md:px-8 border-t border-white/10 bg-white/[0.02] flex justify-between items-center text-xs text-brand-text-muted">
              <span>Showing {filteredCerts.length} of {certifications.length} certificates</span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
