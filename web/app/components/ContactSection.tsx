'use client';

import { motion } from 'motion/react';
import { Mail, Linkedin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-indigo-600/20 backdrop-blur-xl border-t border-indigo-400/30 text-slate-100 relative z-10 shadow-[0_-20px_50px_rgba(79,70,229,0.1)]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8">
            Let&apos;s <br /> Connect
          </h2>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-12 opacity-80">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="mailto:contact@example.com"
              className="bg-indigo-600 border border-indigo-400 text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-indigo-500 transition-colors flex items-center justify-center gap-3 hover:-translate-y-1 transform duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              <Mail className="w-5 h-5" /> Drop an Email
            </a>
            <a
              href="https://www.linkedin.com/in/nuraziztriindrawan/"
              target="_blank" rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-3 hover:-translate-y-1 transform duration-300 shadow-xl"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
