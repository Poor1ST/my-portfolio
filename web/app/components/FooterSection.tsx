export default function FooterSection() {
  return (
    <footer className="py-8 px-2 bg-slate-950/50 backdrop-blur-md text-white/40 text-sm font-mono flex flex-col md:flex-row justify-between items-center text-center max-w-7xl mx-auto border-t border-white/10 gap-4 relative z-10">
      <div>
        &copy; {new Date().getFullYear()} Nur Aziz Tri Indrawan.
      </div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition-colors">GitHub</a>
        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
      </div>
      <div>
        Built with <span className="text-indigo-400">Next.js</span> & <span className="text-indigo-400">Motion</span>.
      </div>
    </footer>
  );
}
