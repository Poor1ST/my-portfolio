'use client';

import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { NAV_LINKS } from '@/lib/data';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import InteractiveLab from './InteractiveLab';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';

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
        <SkillsSection />
        <InteractiveLab />
        <ProjectsSection />
        <ContactSection />
      </main>

      <FooterSection />
    </div>
  );
}
