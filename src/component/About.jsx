import { Code, Smartphone, Server } from "lucide-react";

function About() {
  return (
    <section
      id="about"
      className="w-full py-16 px-6 md:px-12 lg:px-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="flex gap-6">
          {/* Timeline */} 
          <div className="flex flex-col items-center">
        <div className="w-2 h-2 mt-2 bg-cyan-600 rounded-full"></div>
        <div className="w-0.5 h-15.5 mt-1 mb-1 bg-cyan-500 "></div>
        <div className="w-2 h-2 bg-cyan-600 rounded-full "></div>
        <div className="w-0.5 h-15.5 mt-1 mb-1 bg-cyan-500 "></div>
        <div className="w-2 h-2 bg-cyan-600 rounded-full "></div>
      </div>

          {/* Services */} 
          <div className="flex flex-col gap-10 font-mono">
            <div className="flex gap-4 items-center">
              <Code className="text-white w-8 h-8" />
              <h3 className="text-white text-lg font-medium">Website Development</h3>
            </div>

            <div className="flex gap-4 items-center">
              <Smartphone className="text-white w-8 h-8" />
              <h3 className="text-white text-lg font-medium">App Development</h3>
            </div>

            <div className="flex gap-4 items-center">
              <Server className="text-white w-8 h-8" />
              <h3 className="text-white text-lg font-medium">Website Hosting</h3>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl text-slate-900 md:text-5xl font-extrabold tracking-tight">
          About Me
        </h2>
        <div className="mt-3 w-20 h-1.5 bg-cyan-600 mx-auto rounded-full"></div>
      </div>

      {/* TOP TEXT */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          I’m a fullstack developer driven by precision, creativity, and a deep
          commitment to solving real problems. I build systems that are stable,
          scalable, and crafted with deliberate engineering principles.
        </p>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-6">
          My work blends logic with originality—turning bugs into breakthroughs
          and ideas into seamless digital experiences. Every project is a chance
          to grow sharper, think deeper, and create solutions that stand out in
          quality and execution.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="max-w-5xl mx-auto mb-24 relative">
        {/* line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-cyan-700 rounded-full"></div>

        {/* ITEM 1 */}
        <div className="relative flex md:justify-start justify-center mb-16 ">
          <div className="w-full md:w-1/2 md:pr-10">
            <div className="bg-[#1E293B]  p-6 rounded-xl shadow-lg border border-cyan-900 hover:backdrop-blur-sm transition-backdrop hover:scale-105">
              <h3 className="text-2xl  font-bold mb-2">Getting Started</h3>
              <p className="text-gray-200">
                My journey began with passion for solving technical challenges
                and understanding how systems work from the ground up.
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-6 bg-cyan-600 rounded-full border-4 border-[#0F172A]"></div>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="relative flex md:justify-end justify-center mb-16">
          <div className="w-full md:w-1/2 md:pl-10">
            <div className="bg-[#1E293B] p-6 rounded-xl shadow-lg border-3 border-indigo-900 hover:backdrop-blur-sm transition-backdrop hover:scale-105">
              <h3 className="text-2xl font-bold mb-2">Fullstack Growth</h3>
              <p className="text-gray-300">
                I advanced into frontend + backend development, building
                scalable systems, reusable interfaces, and efficient workflows.
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-6 bg-indigo-600 rounded-full border-4 border-[#0F172A]"></div>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="relative flex md:justify-start justify-center">
          <div className="w-full md:w-1/2 md:pr-10">
            <div className="bg-[#1E293B] p-6 rounded-xl shadow-lg border border-cyan-900 hover:backdrop-blur-sm transition-backdrop hover:scale-105">
              <h3 className="text-2xl font-bold mb-2">Building Forward</h3>
              <p className="text-gray-300">
                I’m now focused on creating high-quality systems, refining 
                performance, and building impactful digital experiences.
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-6 bg-cyan-600 rounded-full border-4 border-[#0F172A]"></div>
          </div>
        </div>
      </div>

      {/* FLOATING CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* CARD 1 */}
        <div className="bg-[#1E293B]/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border-4 border-cyan-800 hover:border-indigo-800 hover:scale-105 transition-transform">
          <h4 className="text-2xl font-bold mb-3">Skills</h4>
          <p className="text-gray-300 leading-relaxed">
            JavaScript, React, Node.js, API design, Tailwind CSS,
             Git, debugging & optimization.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#1E293B]/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl border-4 hover:border-cyan-800 border-indigo-800 hover:scale-105 transition-transform">
          <h4 className="text-2xl font-bold mb-3">Tools</h4>
          <p className="text-gray-300 leading-relaxed">
            VS Code, Figma, GitHub, Chrome DevTools, Render,
            Netlify, Vercel.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-[#1E293B]/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border-4 border-cyan-800 hover:scale-105 transition-transform">
          <h4 className="text-2xl font-bold mb-3">Goals</h4>
          <p className="text-gray-300 leading-relaxed">
            Build advanced systems, master Fullstack architecture, contribute to
            impactful projects, and grow into a world-class engineer.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
