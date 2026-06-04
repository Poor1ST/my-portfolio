'use client';

import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Hero3D from './Hero3D';
import TypingText from './TypingText';

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <section id="about" className="min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Hero3D />
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-8 relative">
          <div className="absolute -inset-4 md:-inset-8 bg-[radial-gradient(ellipse_at_center,_rgba(2,6,23,0.85)_0%,_transparent_70%)] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h2 className="font-mono text-indigo-400 text-sm sm:text-base md:text-xl uppercase tracking-[0.2em] mb-3 md:mb-4 text-shadow-[0.5px_0.5px_0_#000,-0.5px_-0.5px_0_#000,0.5px_-0.5px_0_#000,-0.5px_0.5px_0_#000,1px_1px_0_#000,2px_2px_0_#000,3px_3px_0_#000,4px_4px_0_#000]">Hello, I am</h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-none font-black tracking-tighter uppercase mb-4 md:mb-6 drop-shadow-2xl text-white">
              Nur Aziz<span className="text-indigo-400">.</span>
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8 text-slate-300 leading-tight">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                <TypingText words={['Intelligent', 'Automated', 'Scalable', 'Creative', 'Cutting-Edge']} />
              </span> <br className="hidden md:block" />
              & Useful Solutions.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl font-light leading-relaxed mb-8 md:mb-10">
              AI Developer & Creative Front-End Engineer. Handcrafting machine learning models and immersive web experiences.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button onClick={() => scrollTo('projects')} className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-slate-100 font-semibold px-6 sm:px-8 py-4 rounded-xl uppercase tracking-wider text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2 group shadow-xl">
                Explore My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-3 sm:gap-4 justify-center sm:px-4">
                <a href="https://github.com/Poor1ST" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/nur-aziz-tri-indrawan/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="md:col-span-4 flex justify-center md:justify-end"
        >
          <div className="relative group">
            <div className="relative w-48 h-60 sm:w-64 sm:h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden border border-white/20 bg-slate-900 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] group-hover:border-indigo-500/50">
              <Image
                src="/project_photo/profile.JPG"
                alt="Nur Aziz"
                fill
                sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 288px"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-400/50 shadow-[0_0_15px_#818cf8] animate-[scan_2s_linear_infinite]"></div>
                <div className="absolute inset-0 bg-indigo-500/5 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => scrollTo('about')}
      >
        <span className="text-xs uppercase font-mono tracking-widest text-indigo-400">Scroll</span>
        <ChevronDown className="w-4 h-4 text-indigo-400" />
      </motion.div>
    </section>
  );
}
