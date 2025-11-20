import logo from '../assets/Logo.png';
function Hero() {
  return (
    <section className="hero-section grid grid-cols-1 md:grid-cols-2 items-center p-2 bg-[#1C3738]">
  {/* LEFT SECTION */}
  <div className="md:col-span-1 flex flex-col justify-center">
    <div className="flex items-center gap-2 mb-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white">Hello</h1>
      <span className="text-cyan-600 text-5xl font-extrabold">.</span>
    </div>

    <div className="flex items-end mb-6">
      <div className="w-[100px] h-1 bg-cyan-700 rounded-full"></div>
      <p className="text-xl md:text-2xl font-bold text-white ml-3">I'm MENYO</p>
    </div>

    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-cyan-900 rounded-full"></div>
        <div className="w-1 h-32 bg-cyan-700 mt-1"></div>
      </div>

      <h3 className="text-white leading-relaxed text-lg md:text-xl">
        A web developer focused on building responsive, accessible, and visually engaging digital
        experiences using modern front-end technologies. I combine clean UI, smooth interaction,
        and functional precision to deliver creative, user-centered solutions.
      </h3>
    </div>

    <div className="mt-8 flex gap-4">
      <a
        href="#projects"
        className="px-6 py-3 bg-cyan-700 text-white font-medium rounded-lg hover:bg-cyan-800 transition"
      >
        Projects
      </a>
      <a
        href="#contact"
        className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-cyan-700 transition"
      >
        Contact Me
      </a>
    </div>
  </div>

  {/* RIGHT SECTION - HERO IMAGE */}
  <div className="flex justify-center md:justify-end">
    <img
      src={logo}
      alt="Web Developer Illustration"
      className="w-full max-w-[420px] md:max-w-[4   nbvAQWaz50px] object-contain"
    />
  </div>
</section>

  );
}

export default Hero;
