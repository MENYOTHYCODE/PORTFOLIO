import { useState } from "react";
import logo from "../assets/Logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="p-2 fixed w-full z-1000 shadow-md bg-cyan-900 flex md:flex-row md:items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => scrollToSection('home')}
          className="flex items-center border-4 border-indigo-600 rounded-xl hover:bg-indigo-600/10 transition-colors"
        >
          <img src={logo} alt="Logo" className="hidden md:flex h-10 w-auto object-contain mr-2" />
          <span className="text-slate-800 font-bold text-lg md:text-xl md:p-2 p-2">MENYOTHYCODE</span>
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        <button 
          onClick={() => scrollToSection('about')}
          className="px-3 py-2 font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection('projects')}
          className="px-3 py-2 font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
        >
          Projects
        </button>
        <button 
          onClick={() => scrollToSection('blog')}
          className="px-3 py-2 font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
        >
          Blog
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          className="px-3 py-2 font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
        >
          Contact
        </button>

        <a
          href="https://github.com/MENYOTHYCODE"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-2 hover:text-indigo-600 transition-colors"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        <a href="/resume.pdf" className="ml-2 px-4 py-2 font-bold border-4 border-indigo-600 text-white rounded-2xl hover:bg-indigo-600 transition-colors">
          Hire me
        </a>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setOpen(!open)} className="p-2 text-slate-900 hover:text-indigo-600">
          {open ? (
            <svg width="24" height="24" fill="currentColor">
              <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.17 13.41 3.88 19.71 2.47 18.29 8.76 12 2.47 5.71 3.88 4.29 10.17 10.59 16.46 4.29z"/>
            </svg>
          ) : (
            <svg width="24" height="24" fill="currentColor">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cyan-900 shadow-lg border-t border-indigo-600/30">
          <div className="flex flex-col space-y-2 p-4">
            <button 
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 text-slate-900 hover:text-indigo-600 text-left transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-3 py-2 text-slate-900 hover:text-indigo-600 text-left transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="px-3 py-2 text-slate-900 hover:text-indigo-600 text-left transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-3 py-2 text-slate-900 hover:text-indigo-600 text-left transition-colors"
            >
              Contact
            </button>
            <a 
              href="https://github.com/MENYOTHYCODE" 
              className="px-3 py-2 text-slate-900 hover:text-indigo-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a 
              href="/resume.pdf" 
              className="mx-3 py-2 bg-indigo-900 text-white rounded-lg text-center hover:bg-indigo-800 transition-colors"
            >
              Hire me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
