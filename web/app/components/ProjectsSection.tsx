'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { PROJECTS } from '@/lib/content/projects';
import { CATEGORIES } from '@/lib/constants';
import { smoothSpring } from '@/lib/animation';
import ProjectOverview from './ProjectOverview';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'Date' | 'Title'>('Date');
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[number] | null>(null);

  const filteredAndSortedProjects = PROJECTS.filter(project => {
    if (selectedCategory === 'All') return true;
    return project.categories.includes(selectedCategory);
  }).sort((a, b) => {
    if (sortBy === 'Title') {
      return a.title.localeCompare(b.title);
    }
    return b.date.localeCompare(a.date);
  });

  const closeOverview = () => setSelectedProject(null);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header (Unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8"
        >
          <div>
            <h3 className="font-mono text-indigo-400 text-sm uppercase tracking-[0.2em] mb-4">03 // Selected Work</h3>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Featured <br className="hidden sm:block" /> Projects</h2>
          </div>
          <div className="text-slate-400 max-w-sm md:text-right font-light text-sm sm:text-base">
            A selection of AI models, expert systems, and immersive web experiences.
          </div>
        </motion.div>

        {/* Filters (Unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 md:mb-12 bg-white/5 backdrop-blur-xl border border-white/10 p-3 sm:p-4 rounded-2xl"
        >
          <div className="flex flex-wrap gap-2 flex-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'Date' | 'Title')}
              className="bg-white/5 border border-white/10 text-slate-200 text-sm rounded-xl px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none min-w-[100px] sm:min-w-[120px] cursor-pointer"
            >
              <option value="Date">Date (Newest)</option>
              <option value="Title">Title (A-Z)</option>
            </select>
          </div>
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProjects.map((project) => {
              const isSelected = selectedProject?.title === project.title;
              return (
                <motion.div
                  layout
                  layoutId={`project-container-${project.title}`}
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={smoothSpring}
                  onClick={() => setSelectedProject(project)}
                  className={`group block relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-colors duration-500 overflow-hidden shadow-2xl flex flex-col h-full cursor-pointer ${
                    isSelected ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/0 group-hover:bg-indigo-400/20 rounded-full blur-[80px] transition-all duration-700 pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

                  <div className="relative w-full rounded-2xl overflow-hidden mb-5 sm:mb-8 border border-white/10 bg-slate-800 flex items-center justify-center">
                    <Image
                      src={`/project_photo/${project.image}`}
                      alt={project.title}
                      width={0}
                      height={0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tighter group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h4>
                      {project.status === 'in-progress' && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-xl shrink-0">
                          In Development
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {project.roles.map(role => (
                        <span key={role} className="text-[10px] font-bold uppercase tracking-[0.2em] bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-3 py-1 rounded-xl">
                          {role}
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-300 font-light text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl leading-relaxed flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium border border-white/5 text-slate-400 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-slate-200 transition-all">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-auto items-center flex-wrap">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-sm font-semibold text-slate-100 border-b border-transparent pb-1 hover:text-indigo-400 hover:border-indigo-400 transition-colors"
                        >
                          Live URL <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-sm font-semibold text-slate-100 border-b border-transparent pb-1 hover:text-indigo-400 hover:border-indigo-400 transition-colors"
                        >
                          Source Code <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectOverview
        project={selectedProject}
        onClose={closeOverview}
      />
    </section>
  );
}