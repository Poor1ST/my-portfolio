'use client';

import dynamic from 'next/dynamic';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { NAV_LINKS } from '@/lib/constants';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

const InteractiveLab = dynamic(() => import('./InteractiveLab'), {
  ssr: false,
  loading: () => (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center text-slate-600">
        Loading simulation...
      </div>
    </section>
  ),
});

export default function PortfolioClient() {
  const { activeSection, isScrolled, scrollTo } = useScrollSpy(NAV_LINKS);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-white font-sans">
      <Navbar
        activeSection={activeSection}
        isScrolled={isScrolled}
        scrollTo={scrollTo}
        navLinks={NAV_LINKS}
      />

      <main className="relative z-20 w-full">
        <HeroSection scrollTo={scrollTo} />
        <InteractiveLab />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
