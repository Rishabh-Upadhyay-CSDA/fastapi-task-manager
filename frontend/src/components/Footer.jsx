export default function Footer() {
  return (
    <footer className="bg-slate-900/60 border-t border-slate-800/80 py-8 mt-16 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        
        {/* Left Status Indicator */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-full text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            FastAPI + Neon PostgreSQL Connected
          </span>
          <span>&copy; {new Date().getFullYear()} TaskFlow Pro</span>
        </div>

        {/* Right Stack Tech Badges */}
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Built with React & Vite</span>
          <span>&bull;</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Deployed on Vercel & Render</span>
        </div>

      </div>
    </footer>
  );
}