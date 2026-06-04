'use client';

import { motion } from 'motion/react';
import { SKILLS } from '@/lib/data';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-24 relative border-t border-white/10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h3 className="font-mono text-indigo-400 text-sm uppercase tracking-[0.2em] mb-4">01 // My Arsenal</h3>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Tools of the trade</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10px' }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 sm:p-8 pb-10 sm:pb-12 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-3xl group shadow-2xl"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                <skillGroup.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-6 tracking-tight text-slate-100">{skillGroup.category}</h4>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-medium border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5" />
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
