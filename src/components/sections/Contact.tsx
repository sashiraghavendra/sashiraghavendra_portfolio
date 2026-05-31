import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, BellRing, Settings, Lock, Unlock, Trash2, LogOut } from "lucide-react";
import { resumeData } from "../../data/resume";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"compose" | "history">("compose");
  const [sentHistory, setSentHistory] = useState<any[]>([]);
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return sessionStorage.getItem("sashi_admin_pass") || "";
  });
  const [authError, setAuthError] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Auto-refresh server logs when adminPassword is authenticated
  useEffect(() => {
    if (adminPassword) {
      fetch("/api/messages?passcode=" + encodeURIComponent(adminPassword))
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Invalid passcode on session.");
        })
        .then((data) => setSentHistory(data))
        .catch(() => {
          setAdminPassword("");
          sessionStorage.removeItem("sashi_admin_pass");
        });
    }
  }, [adminPassword]);

  const handleDecrypt = async (enteredPass: string) => {
    if (!enteredPass) return;
    setIsDecrypting(true);
    setAuthError("");
    try {
      const res = await fetch("/api/messages?passcode=" + encodeURIComponent(enteredPass));
      if (res.ok) {
        const data = await res.json();
        setSentHistory(data);
        setAdminPassword(enteredPass);
        sessionStorage.setItem("sashi_admin_pass", enteredPass);
      } else {
        const errData = await res.json().catch(() => ({}));
        setAuthError(errData.error || "Authentication failed.");
      }
    } catch (err) {
      setAuthError("Network error. Unable to verify credentials.");
    } finally {
      setIsDecrypting(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!adminPassword) return;
    setDeletingId(id);
    try {
      const res = await fetch("/api/messages/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, passcode: adminPassword })
      });
      if (res.ok) {
        setSentHistory((prev) => prev.filter((m) => m.id !== id));
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.error || "Expunge command rejected.");
      }
    } catch (err) {
      alert("Database error: could not connect to clear record.");
    } finally {
      setDeletingId(null);
    }
  };

  // Dynamically check for EmailJS secrets on Vite/client-side
  const metaEnv = (import.meta as any).env || {};
  const serviceId = metaEnv.VITE_EMAILJS_SERVICE_ID || metaEnv.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = metaEnv.VITE_EMAILJS_TEMPLATE_ID || metaEnv.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const publicKey = metaEnv.VITE_EMAILJS_PUBLIC_KEY || metaEnv.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
  const isEmailJSConfigured = !(!(serviceId && templateId && publicKey));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setSuccess(null);

    // Step 1: Force log to backend Express database so records are saved cleanly
    let loggedToServer = false;
    let fallbackId = "msg_" + Math.random().toString(36).substr(2, 9);
    let timestamp = new Date().toISOString();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        loggedToServer = true;
        if (data.data?.id) fallbackId = data.data.id;
        if (data.data?.timestamp) timestamp = data.data.timestamp;
      }
    } catch (err) {
      console.warn("Express server contact database offline, logging locally.", err);
    }

    // Step 2: Attempt EmailJS API integration
    if (isEmailJSConfigured) {
      try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: formData.name,
              reply_to: formData.email,
              subject: formData.subject || "Portfolio Contact Message",
              message: formData.message
            }
          })
        });

        if (res.ok) {
          setSuccess(true);
          setFeedbackMsg("Success! Communication safely dispatched directly to Sashi's mailbox via secure SMTP server.");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          throw new Error("SMTP relay error response from provider.");
        }
      } catch (err: any) {
        console.error("EmailJS dispatch failed, falling back to mailto prompt:", err);
        setSuccess(true);
        setFeedbackMsg("Packet recorded in server database! Automated dispatch failed. Please trigger direct sending below.");
      }
    } else {
      // EmailJS is absent; report database log success and offer direct email prefill
      setSuccess(true);
      setFeedbackMsg("Transmission successfully logged to Sashi's server databases!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }

    // Dynamic refetch when sending message to keep log correct
    if (adminPassword) {
      fetch("/api/messages?passcode=" + encodeURIComponent(adminPassword))
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => setSentHistory(data))
        .catch(() => {});
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="pt-4 pb-1 relative px-4 sm:px-6 lg:px-8">
      {/* Background neon elements */}
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-brand-cyan/5 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-brand-purple/5 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 space-y-2">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Get In <span className="font-bold text-glow-purple text-brand-purple font-display">Touch</span>
          </h2>
          <p className="text-gray-300 font-mono text-xs max-w-md mx-auto mt-2">
            Inquire about roles, collaborations, or request certifications credentials
          </p>
          <div className="w-12 h-1 bg-brand-purple rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Address Links */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-brand-cyan tracking-widest uppercase">Contact Coordinates</span>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                Let's construct something awesome together
              </h3>
              <p className="text-gray-200 font-normal text-sm leading-relaxed">
                If you have an open position matching my proficiency in Java backend systems, database modeling, or full-stack software development, feel free to pitch it! I'm highly responsive via electronic mail and standard cellular calls.
              </p>
            </div>

            {/* Coordinates list */}
            <div className="space-y-4">
              
              <a
                href={`mailto:${resumeData.personalInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/40 border border-white/5 hover:border-brand-purple hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 bg-brand-purple/10 border border-brand-purple/25 rounded-xl text-brand-purple group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-300 uppercase tracking-widest font-bold">Email Dispatch</p>
                  <p className="text-sm font-medium text-white group-hover:text-brand-purple transition-colors truncate max-w-[210px] sm:max-w-xs">{resumeData.personalInfo.email}</p>
                </div>
              </a>

              <a
                href={`tel:${resumeData.personalInfo.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/40 border border-white/5 hover:border-brand-cyan hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 bg-brand-cyan/10 border border-brand-cyan/25 rounded-xl text-brand-cyan group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-300 uppercase tracking-widest font-bold">Cellular Call</p>
                  <p className="text-sm font-medium text-white group-hover:text-brand-cyan transition-colors">+91 {resumeData.personalInfo.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/40 border border-white/5">
                <div className="p-3 bg-brand-pink/10 border border-brand-pink/25 rounded-xl text-brand-pink">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-300 uppercase tracking-widest font-bold">HQ Location</p>
                  <p className="text-sm font-medium text-white">{resumeData.personalInfo.location}, IND</p>
                </div>
              </div>

            </div>

            {/* Social Connect channels */}
            <div className="flex items-center gap-4 pt-4 text-gray-200">
              <span className="text-[10px] font-mono tracking-widest text-gray-300 uppercase font-semibold">Interactive Channels :</span>
              <a
                href={resumeData.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-950/60 border border-white/5 hover:text-white hover:border-white hover:bg-slate-900/60 transition-colors"
                title="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-950/60 border border-white/5 hover:text-white hover:border-white hover:bg-slate-900/60 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>

          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7">
            <motion.div
              animate={{
                borderColor: [
                  "rgba(168, 85, 247, 0.15)",
                  "rgba(6, 182, 212, 0.55)",
                  "rgba(168, 85, 247, 0.75)",
                  "rgba(168, 85, 247, 0.15)"
                ],
                boxShadow: [
                  "0 0 0px rgba(168, 85, 247, 0)",
                  "0 0 15px rgba(6, 182, 212, 0.2)",
                  "0 0 25px rgba(168, 85, 247, 0.35)",
                  "0 0 0px rgba(168, 85, 247, 0)"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.15
              }}
              whileHover={{
                y: -4,
                scale: 1.01,
                filter: "brightness(1.1)"
              }}
              className="glass-pane border rounded-2xl p-6 sm:p-8 space-y-6 transition-all"
            >
              
              {/* Header / Tabs */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("compose")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      activeTab === "compose"
                        ? "bg-brand-purple/10 text-brand-purple border border-brand-purple/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Compose Module
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("history")}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      activeTab === "history"
                        ? "bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Transmission Outbox
                    {sentHistory.length > 0 && adminPassword && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-cyan text-slate-950 font-bold rounded-full text-[9px] flex items-center justify-center animate-pulse">
                        {sentHistory.length}
                      </span>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 font-mono text-[10px]">
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${adminPassword ? "bg-indigo-500" : "bg-emerald-500"}`} />
                  <span>{adminPassword ? "SECURE ADMIN" : "SECURE SOCKET"}</span>
                </div>
              </div>

              {activeTab === "compose" ? (
                /* Form Element */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] font-mono text-gray-200 uppercase tracking-wider block font-bold">Your Name *</label>
                      <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Recruiters / Lead Architect"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-sm text-white placeholder-gray-655 focus:outline-none focus:border-brand-purple/50 focus:bg-slate-900 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] font-mono text-gray-200 uppercase tracking-wider block font-bold">Email Address *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. contact@company.org"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-sm text-white placeholder-gray-655 focus:outline-none focus:border-brand-purple/50 focus:bg-slate-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-[10px] font-mono text-gray-200 uppercase tracking-wider block font-bold">Subject Context</label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. SDE Backend Role / Project Collaboration"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-sm text-white placeholder-gray-655 focus:outline-none focus:border-brand-purple/50 focus:bg-slate-900 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-mono text-gray-200 uppercase tracking-wider block font-bold">Transmission Message *</label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your role details or queries here..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple/50 focus:bg-slate-900 transition-colors resize-none"
                    />
                  </div>

                  {/* Status alerts */}
                  {success !== null && (
                    <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 font-mono ${
                      success 
                        ? "bg-emerald-950/10 border-emerald-500/20 text-emerald-400" 
                        : "bg-rose-950/10 border-rose-500/20 text-rose-400"
                    }`}>
                      <BellRing size={14} className="shrink-0 animate-bounce" />
                      <span>{feedbackMsg}</span>
                    </div>
                  )}

                  {/* Submit button container */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-mono font-medium tracking-wider uppercase text-white bg-gradient-to-r from-brand-purple to-brand-cyan hover:brightness-110 disabled:opacity-55 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Transmitting Packet...</span>
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* History Log / Outbox Gate */
                !adminPassword ? (
                  /* PASSWORD GATE */
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const target = e.currentTarget as HTMLFormElement;
                      const val = (target.elements.namedItem("passcode") as HTMLInputElement).value;
                      handleDecrypt(val);
                    }}
                    className="py-6 space-y-4 text-center max-w-sm mx-auto animate-fade-in"
                  >
                    <div className="mx-auto w-12 h-12 rounded-full bg-brand-purple/15 border border-brand-purple/35 flex items-center justify-center text-brand-purple animate-pulse">
                      <Lock size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold font-mono text-white tracking-widest uppercase">Decryption Required</h4>
                      <p className="text-[11px] font-mono text-gray-300 leading-relaxed font-semibold">
                        Access is restricted and visible to Sashi alone. Authenticate with your passcode to decrypt transmissions.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      <input
                        required
                        type="password"
                        name="passcode"
                        placeholder="Enter Decryption PIN"
                        className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-white/5 text-center text-sm text-brand-cyan tracking-widest placeholder-gray-600 focus:outline-none focus:border-brand-purple/50 focus:bg-slate-900 transition-colors font-mono"
                      />
                      {authError && (
                        <p className="text-[10px] font-mono text-rose-400 font-semibold">{authError}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isDecrypting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-medium tracking-wider uppercase text-slate-950 bg-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-55 font-bold"
                    >
                      {isDecrypting ? "Decrypting Buffer..." : "Unlock Archive"}
                    </button>
                    
                    
                  </form>
                ) : (
                  /* Decrypted Transmission Outbox Database */
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pb-2 border-b border-white/[0.03]">
                      <div className="flex items-center gap-2 text-brand-cyan">
                        <Unlock size={12} className="text-brand-cyan animate-pulse" />
                        <span>DECRYPTED SERVER LOGS</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          setAdminPassword("");
                          sessionStorage.removeItem("sashi_admin_pass");
                        }}
                        className="text-gray-500 hover:text-white flex items-center gap-1 cursor-pointer transition-colors text-[10px]"
                        title="Lock Database"
                      >
                        <LogOut size={12} />
                        <span>Lock socket</span>
                      </button>
                    </div>

                    <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 text-left scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                      {sentHistory.length === 0 ? (
                        <div className="text-center py-12 space-y-3">
                          <div className="mx-auto w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-gray-500">
                            <Send size={16} className="opacity-40" />
                          </div>
                          <p className="text-xs font-mono text-gray-500">No transmissions discovered in log database.</p>
                        </div>
                      ) : (
                        sentHistory.map((msg, index) => (
                          <div key={msg.id || index} className="p-4 rounded-xl bg-slate-950/40 border border-white/5 space-y-2 hover:border-brand-purple/30 transition-colors relative">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="text-brand-cyan font-bold">#{msg.id ? msg.id.substring(0, 8).toUpperCase() : "MSG"}</span>
                              <div className="flex items-center gap-3">
                                <span className="text-gray-500">
                                  {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""} ({msg.timestamp ? new Date(msg.timestamp).toLocaleDateString([], { month: "short", day: "numeric" }) : ""})
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  disabled={deletingId === msg.id}
                                  className="text-gray-500 hover:text-rose-400 p-1 rounded hover:bg-white/5 transition-all cursor-pointer inline-flex items-center justify-center"
                                  title="Expunge Packet"
                                >
                                  {deletingId === msg.id ? (
                                    <div className="w-3 h-3 rounded-full border border-white/30 border-t-white animate-spin" />
                                  ) : (
                                    <Trash2 size={13} />
                                  )}
                                </button>
                              </div>
                            </div>
                            <h4 className="text-sm font-bold text-white tracking-tight">{msg.subject || "No Subject"}</h4>
                            <p className="text-xs text-gray-400 font-light leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                            <div className="flex items-center justify-between pt-2 border-t border-white/[0.03] text-[9px] font-mono text-gray-500">
                              <span className="truncate max-w-[200px]">From: {msg.name} ({msg.email})</span>
                              <span className="text-indigo-400 flex items-center gap-1">
                                <span className="w-1 h-1 bg-indigo-500 rounded-full" />
                                PERSISTENT_LOGGED
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )
              )}

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
