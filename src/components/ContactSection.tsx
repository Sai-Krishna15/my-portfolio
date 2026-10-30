import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../data/portfolioData";
import { getMailtoUrl, getGmailWebUrl, openMailbox } from "../utils/mailHelper";
import { AnimatedHeading, ScrollReveal } from "./AnimatedText";
import { SectionParallaxWatermark } from "./SectionParallaxWatermark";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiMapPin,
  FiCopy,
  FiCheck,
  FiSend,
  FiArrowUpRight,
} from "react-icons/fi";

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);

    const subject = formData.subject || `Inquiry from ${formData.name} regarding Software Engineering Role`;
    const body = `Hi Sai Krishna,\n\n${formData.message}\n\n---\nSender Name: ${formData.name}\nSender Email: ${formData.email}`;

    // 1. Open Gmail Web Compose in new tab with pre-filled content
    const gmailUrl = getGmailWebUrl(personalInfo.email, subject, body);
    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    // 2. Also trigger native mailto
    openMailbox(personalInfo.email, subject, body);

    // 3. Clear form inputs immediately
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 8000);
    }, 400);
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="relative py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Background Parallax Outline Typography */}
      <SectionParallaxWatermark
        text="CONNECT"
        tag="START A CONVERSATION"
        direction="left-to-right"
        topOffset="top-4 sm:top-8"
      />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-slate-900/70 text-slate-300 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Get In Touch
          </div>
        </ScrollReveal>

        <AnimatedHeading
          className="text-3xl sm:text-4xl text-white max-w-2xl mb-2"
          highlightWords={["Engineering", "Goal"]}
          highlightColor="text-sky-400"
        >
          Let’s Discuss Your Next Engineering Goal
        </AnimatedHeading>

        <ScrollReveal delay={0.15}>
          <p className="text-slate-400 max-w-xl text-xs sm:text-sm leading-relaxed">
            I am actively seeking a full-time Software Engineer role. Open to remote, hybrid, or on-site opportunities.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Direct Contact Details & Links (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Direct Contact
              </span>
              <span className="text-[10px] font-mono text-sky-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Engineering Inquiries
              </span>
            </div>

            {/* Email item */}
            <div className="space-y-3 mb-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
                      <FiMail size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Direct Email</div>
                      <a
                        href={getMailtoUrl(personalInfo.email)}
                        onClick={(e) => {
                          e.preventDefault();
                          openMailbox(personalInfo.email);
                        }}
                        className="text-xs sm:text-sm font-mono text-white hover:text-sky-300 transition-colors font-medium truncate block cursor-pointer"
                        title="Click to open mailbox"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors shrink-0 ml-2 cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <FiCheck className="text-emerald-400" size={15} />
                    ) : (
                      <FiCopy size={15} />
                    )}
                  </button>
                </div>

                {/* Direct Mailbox Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => openMailbox(personalInfo.email)}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 text-sky-300 hover:text-white text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FiMail size={12} />
                    <span>Open Mail App</span>
                  </button>

                  <a
                    href={getGmailWebUrl(personalInfo.email)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Open in Gmail</span>
                    <FiArrowUpRight size={12} />
                  </a>
                </div>
              </div>

              {/* Location item */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                  <FiMapPin size={15} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Location</div>
                  <div className="text-xs sm:text-sm font-mono text-slate-200">
                    {personalInfo.location} · {personalInfo.hometown}
                  </div>
                </div>
              </div>
            </div>

            {/* Copy Feedback Toast */}
            {copiedEmail && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-mono text-emerald-400 mb-3 text-center bg-emerald-500/10 py-1 rounded-lg border border-emerald-500/20"
              >
                ✓ Email copied to clipboard!
              </motion.div>
            )}

            {/* Social Network Profiles */}
            <div className="pt-3 border-t border-white/10">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                Professional Networks
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/10 hover:border-sky-400/40 text-slate-200 hover:text-sky-300 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <FiLinkedin className="text-sky-400 text-sm" />
                    <span className="text-xs font-medium">LinkedIn</span>
                  </div>
                  <FiArrowUpRight className="text-slate-500 group-hover:text-sky-300 text-xs" />
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/10 hover:border-indigo-400/40 text-slate-200 hover:text-indigo-300 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <FiGithub className="text-indigo-400 text-sm" />
                    <span className="text-xs font-medium">GitHub</span>
                  </div>
                  <FiArrowUpRight className="text-slate-500 group-hover:text-indigo-300 text-xs" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  Send a Direct Message
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Deliver an inquiry directly to {personalInfo.email}.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                Direct Inbox
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-sky-400 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-sky-400 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Subject / Position
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Software Engineer Role / Project Opportunity"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-sky-400 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about the role, team, and tech stack..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-sky-400 transition-all resize-none font-mono"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      openMailbox(
                        personalInfo.email,
                        formData.subject || "Software Engineering Role",
                        formData.message
                      )
                    }
                    className="text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
                  >
                    Open Mail App ↗
                  </button>
                  <span className="text-slate-700">•</span>
                  <a
                    href={getGmailWebUrl(
                      personalInfo.email,
                      formData.subject || "Software Engineering Role",
                      formData.message
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors"
                  >
                    Open in Gmail Web ↗
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-display font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Opening Mailbox...
                    </>
                  ) : (
                    <>
                      Send via Email <FiSend size={13} />
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-200 text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3"
                  >
                    <div className="flex items-center gap-2">
                      <FiCheck size={16} className="text-sky-400 shrink-0" />
                      <span>
                        Draft opened addressed to <strong>{personalInfo.email}</strong>. Simply click Send!
                      </span>
                    </div>
                    <a
                      href={getGmailWebUrl(
                        personalInfo.email,
                        "Software Engineering Opportunity",
                        "Hi Sai Krishna,"
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-white text-[11px] font-mono shrink-0 transition-colors"
                    >
                      Open Gmail Web ↗
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
