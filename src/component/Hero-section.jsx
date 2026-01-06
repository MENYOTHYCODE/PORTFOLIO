import TechStrip from "./tech";
import logo from '../assets/Logo.png';

function Hero() {
  return (
    <section className='hero-section grid grid-cols-1 pt-[100px]  bg-[#121E28] items-center  max-w-8xl mx-auto'>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center p-2 bg-[#121E28]">
        <div className='md:col-span-1 flex flex-col justify-center p-4'>

          <div className="flex items-center gap-2 md:mb-4">
            <h1 className="text-4xl md:text-3xl font-extrabold text-white">Hello</h1>
            <span className="text-cyan-600 text-3xl font-extrabold">.</span>
          </div>

          <div className="flex items-end">
            <div className="w-[100px] h-0.5 bg-cyan-700 "></div>
            <p className="text-xl md:text-2xl font- text-white ml-3">I'm <i className='font-serif'>MENYO</i></p>
          </div>

          <div className=" gap-6 p-4 md:mt-4">
            <h3 className="text-white font-semibold font-mono text-3xl md:text-3xl ml-12">
              Fullstack Developer.
            </h3>
            <div className="flex items-center gap-6 ml-8">
              <div className="w-[150px] h-1.5 bg-cyan-700 rounded-2xl"></div>
              <div className="w-[180px] h-1.5 bg-cyan-700 rounded-2xl"></div>
            </div>
          </div>

          <div className="flex gap-4 md:mt-6">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-cyan-600 rounded-full"></div>
              <div className="w-1 h-10 bg-cyan-800 "></div>
              <div className="w-4 h-4 bg-cyan-600 rounded-full "></div>
            </div>
            <p className='text-gray-300 mt-2.5'>I’m becoming a force in the system—fixing bugs, breaking barriers, and building solutions with nothing but <i>thycode.</i></p>
          </div>


          <div className="mt-2 items-center ml-6 flex gap-4">
            <button
              onClick={() => {
                const element = document.getElementById('projects');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-6 py-3 bg-cyan-700 text-white font-medium rounded-lg hover:bg-cyan-800 transition"
            >
              Projects
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-cyan-700 transition"
            >
              Contact Me
            </button>
          </div>
        </div>
        
        {/* RIGHT COLUMN: circling circles with image overlapping bottom */}
        <div className=" md:flex md:col-span-1 pl-6 items-center justify-center ">
          <div className="relative w-64 h-64 overflow-visible">
            {/* outer circle - clockwise */}
            <div className="absolute inset-0 rounded-full border-18 border-cyan-500 spin-clockwise"></div>

            {/* inner circle - counter-clockwise */}
            <div className="absolute inset-6 rounded-full border-8 border-indigo-500 spin-counter" ></div>

            {/* image positioned so it 'falls out' at the bottom */}
            <img src={logo} alt="floating" className="absolute left-1/2 transform -translate-x-1/2 top-[2%] w-52 h-52 object-cover rounded-md shadow-lg" />
          </div>
        </div>
      </div>
      <TechStrip />
    </section>



  );
}

export default Hero;
