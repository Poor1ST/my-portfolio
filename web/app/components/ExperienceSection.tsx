'use client';

import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { EXPERIENCES } from '@/lib/data';

const typeLabel = { internship: 'Internship', apprenticeship: 'Apprenticeship', organization: 'Organization' };

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/10 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h3 className="font-mono text-indigo-400 text-sm uppercase tracking-[0.2em] mb-4">02 // Career Path</h3>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Where I&apos;ve worked</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] sm:left-[22px] top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-10">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.organization}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-2 sm:left-[10px] top-1 w-8 h-8 sm:w-[26px] sm:h-[26px] rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center -translate-x-1/2">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-100">{exp.organization}</h3>
                      <span className="text-xs font-mono text-indigo-400/80 uppercase tracking-wider">{typeLabel[exp.type]}</span>
                      <p className="text-xs text-slate-500 mt-0.5">{exp.location}</p>
                    </div>
                  </div>

                  {/* Roles */}
                  <div className="space-y-2 mb-4">
                    {exp.roles.map((role) => (
                      <div key={role.title} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="text-sm font-semibold text-slate-200">{role.title}</span>
                        <span className="text-xs font-mono text-slate-500 sm:ml-auto whitespace-nowrap">{role.period}</span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-5">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-slate-300 font-light leading-relaxed flex gap-2">
                        <span className="text-indigo-400 mt-1.5 flex-shrink-0">
                          <svg className="w-1.5 h-1.5 fill-current" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-white/5 rounded-lg text-[11px] font-medium border border-white/10 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
