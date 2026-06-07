'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  isScrolled: boolean;
  scrollTo: (id: string) => void;
  navLinks: string[];
}

export default function Navbar({ activeSection, isScrolled, scrollTo, navLinks }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tight" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}
        >
          Nur Aziz<span className="text-indigo-400">.</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <motion.button
              key={link}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleNav(link.toLowerCase())}
              className={`text-sm tracking-widest uppercase transition-colors relative ${activeSection === link ? 'text-white' : 'text-slate-400 hover:text-white'}`} style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}
            >
              {link}
              {activeSection === link && (
                <motion.div layoutId="nav-indicator" className="absolute -bottom-2 left-0 w-full h-[2px] bg-indigo-400" />
              )}
            </motion.button>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm uppercase tracking-wider font-semibold bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-2 hover:bg-white/20 text-slate-100 transition-all duration-300 shadow-md" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}
          >
            Connect
          </motion.a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="flex flex-col gap-1 px-4 sm:px-6 pb-6 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNav(link.toLowerCase())}
                  className={`text-left px-4 py-3 rounded-xl text-sm tracking-widest uppercase transition-colors ${
                    activeSection === link
                      ? 'text-white bg-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => handleNav('contact')}
                className="mt-2 w-full text-center text-sm uppercase tracking-wider font-semibold bg-white/10 border border-white/20 rounded-xl px-5 py-3 hover:bg-white/20 text-slate-100 transition-all"
              >
                Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
