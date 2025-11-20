import { useState } from "react";
import logo from '../assets/logo.png';

function Navbar() {
    const [open, setOpen] = useState(true);

    return (
        <nav className="p-2 shadow-md bg-cyan-700 flex items-center justify-between max-w-8xl mx-auto">
            <div className="flex items-center gap-4">
                <a href="/" className="flex items-center border-4 border-indigo-600 p- rounded-xl">
                    <img src={logo} alt="Logo" className="h-10 w-auto object-contain mr-2" />
                    <span className="text-slate-800 font-bold text-xl">MENYOTHYCODE</span>
                </a>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-4">
                <a href="#about" className="px-3 py-2 font-semibold text-slate-900 hover:text-indigo-600">About</a>
                <a href="#projects" className="px-3 py-2 font-semibold text-slate-900 hover:text-indigo-600">Projects</a>
                <a href="#blog" className="px-3 py-2 font-semibold text-slate-900 hover:text-indigo-600">Blog</a>
                <a href="/resume.pdf" className="px-3 py-2 font-semibold text-slate-900 hover:text-indigo-600">Resume</a>
                <a href="#contact" className="px-3 py-2 font-semibold text-slate-900 hover:text-indigo-600">Contact</a>

                <a
                    href="https://github.com/MENYOTHYCODE"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 hover:text-indigo-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .5C5.73.5.75 5.48.75 11.74c0 4.94 3.2 9.13 7.64 10.61.56.1.76-.24.76-.53 0-.26-.01-1.1-.02-2-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.72 2.65 1.22 3.3.94.1-.74.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.96 0 0 .95-.31 3.12 1.15.9-.25 1.86-.37 2.82-.38.96.01 1.92.13 2.82.38 2.17-1.46 3.12-1.15 3.12-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.77 1.16 2.99 0 4.29-2.62 5.23-5.11 5.51.4.35.76 1.03.76 2.08 0 1.5-.01 2.71-.01 3.08 0 .29.2.64.77.53C19.06 20.87 22.25 16.68 22.25 11.74 22.25 5.48 17.27.5 12 .5z" />
                    </svg>
                </a>

                <button aria-label="Toggle theme" className="p-2 hover:text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.64 13a9 9 0 11-9.64-9.64 7 7 0 109.64 9.64z" />
                    </svg>
                </button>

                <a href="/resume.pdf" className="ml-2 px-4 py-2 font-bold border-4 border-indigo-600 text-white rounded-2xl">Hire me</a>
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden flex items-center">
                <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2">
                    {open ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.17 13.41 3.88 19.71 2.47 18.29 8.76 12 2.47 5.71 3.88 4.29 10.17 10.59 16.46 4.29z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden mt-2 flex flex-col space-y-2 w-full">
                    <a href="#about" className="px-3 py-2 text-slate-900 hover:text-indigo-600">About</a>
                    <a href="#projects" className="px-3 py-2 text-slate-900 hover:text-indigo-600">Projects</a>
                    <a href="#blog" className="px-3 py-2 text-slate-900 hover:text-indigo-600">Blog</a>
                    <a href="/resume.pdf" className="px-3 py-2 text-slate-900 hover:text-indigo-600">Resume</a>
                    <a href="#contact" className="px-3 py-2 text-slate-900 hover:text-indigo-600">Contact</a>
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-slate-900 hover:text-indigo-600">GitHub</a>
                    <a href="/resume.pdf" className="mx-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-center">Hire me</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;