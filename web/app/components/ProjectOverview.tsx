'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/lib/types';
import { smoothSpring } from '@/lib/animation';

interface ProjectOverviewProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectOverview({ project, onClose }: ProjectOverviewProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, project]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      {project && (
        <motion.div
          key="overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        />
      )}

      {/* Modal Container */}
      {project && (
        <div className="fixed inset-0 z-50 flex items-start justify-center py-30 px-4 sm:px-6 md:px-10 pointer-events-none">
          <motion.div
            key={project.title}
            layoutId={`project-container-${project.title}`}
            transition={smoothSpring}
            className="w-full max-w-4xl max-h-[85vh] bg-slate-900 overflow-y-auto overflow-x-hidden border border-white/10 rounded-3xl shadow-2xl pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="p-6 sm:p-8 md:p-10">
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                className="relative w-full rounded-2xl overflow-hidden mb-8 border border-white/10 bg-slate-800"
              >
                <Image
                  src={`/project_photo/${project.image}`}
                  alt={project.title}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="w-full h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.35 }}
                className="flex flex-wrap gap-2 mb-4"
              >
                {project.roles.map(role => (
                  <span key={role} className="text-[10px] font-bold uppercase tracking-[0.2em] bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-3 py-1 rounded-xl">
                    {role}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className="flex items-center gap-3 mb-4"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
                  {project.title}
                </h2>
                {project.status === 'in-progress' && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-xl shrink-0">
                    In Development
                  </span>
                )}
              </motion.div>

              {/* Secondary modal content - Fades in gracefully */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="max-w-none"
              >
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium border border-white/5 text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-indigo-400 uppercase tracking-[0.15em] text-sm mb-3">Overview</h3>
                <p className="text-slate-300 font-light leading-relaxed mb-8">{project.overview}</p>

                <h3 className="text-lg font-bold text-indigo-400 uppercase tracking-[0.15em] text-sm mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs font-medium text-indigo-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.challenges && project.challenges.length > 0 && (
                  <>
                    <h3 className="text-lg font-bold text-indigo-400 uppercase tracking-[0.15em] text-sm mb-3">Challenges</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8 text-slate-300 font-light leading-relaxed">
                      {project.challenges.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </>
                )}

                {project.solutions && project.solutions.length > 0 && (
                  <>
                    <h3 className="text-lg font-bold text-indigo-400 uppercase tracking-[0.15em] text-sm mb-3">Solutions</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8 text-slate-300 font-light leading-relaxed">
                      {project.solutions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="flex gap-6 pt-6 border-t border-white/10 mt-8">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                      Live URL <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                      Source Code <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}