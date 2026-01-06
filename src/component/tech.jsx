

/**
 * TechStrip
 * - glassmorphism pills
 * - subtle icons (inline SVG) — replace with real icons if you want
 * - auto-scroll for overflow
 * - uses uploaded image as background preview
 */
export default function TechStrip({ items = defaultItems }) {
  return (
    <div className="hidden md:flex max-w-8xl mx-auto py-6 ">
      {/* container uses the uploaded image as a subtle texture */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-cyan-600 rounded-full"></div>
        <div className="w-1 h-20 bg-cyan-800 "></div>
        <div className="w-4 h-4 bg-cyan-600 rounded-full "></div>
      </div>
      <div
        className="relative overflow-hidden rounded-2xl p-2"
        style={{
          backgroundImage: `url("/mnt/data/Screenshot 2025-11-21 064316.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      >
        
        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3">
          <div
            className="hidden md:flex gap-3 overflow-x-auto no-scrollbar py-2 px-1"
            role="list"
            aria-label="Technologies"
          >
            {items.map((it) => (
              <div
                key={it.name}
                className="shrink-0 flex items-center gap-3 px-4 py-2 rounded-full bg-white/6 border border-white/10 shadow-sm hover:bg-white/10 hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-500"
                role="listitem"
                tabIndex={0}
              >
                <span
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-linear-to-br from-cyan-600 to-sky-500 text-white"
                  aria-hidden="true"
                >
                  {/* simple inline SVG icon placeholder */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>

                <div className="min-w-[90px]">
                  <div className="text-sm font-semibold text-white">{it.name}</div>
                  <div className="text-[11px] text-white/70">{it.level}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* subtle edge glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5"></div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-cyan-600 rounded-full"></div>
        <div className="w-1 h-20 bg-cyan-800 "></div>
        <div className="w-4 h-4 bg-cyan-600 rounded-full "></div>
      </div>
    </div>
    
    
  );
}

const defaultItems = [
  { name: "HTML5", level: "Expert" },
  { name: "CSS / Tailwind", level: "Advanced" },
  { name: "JavaScript", level: "Advanced" },
  { name: "React", level: "Advanced" },
  { name: "Node.js", level: "Intermediate" },
  { name: "Git", level: "Advanced" },
  { name: "Vite", level: "Intermediate" },
];

