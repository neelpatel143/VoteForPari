import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Abstract Background Shapes */}
      <motion.div 
        className="absolute w-[60vw] h-[60vw] rounded-full bg-royal-light/5 blur-[120px] top-[-20%] left-[-10%]"
        animate={{ 
          x: mousePosition.x * -2, 
          y: mousePosition.y * -2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
      <motion.div 
        className="absolute w-[40vw] h-[40vw] rounded-full bg-gold-light/10 blur-[100px] bottom-[-10%] right-[-5%]"
        animate={{ 
          x: mousePosition.x * 3, 
          y: mousePosition.y * 3,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="flex flex-col items-start space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-gold mb-2"
          >
            Candidate for Head Girl
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring', damping: 20 }}
            className="text-6xl md:text-[110px] leading-[0.85] font-black tracking-tighter text-royal opacity-90"
          >
            VOTE <br/>
            FOR <span className="text-gold italic font-serif font-light">
              PARI.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-600 font-light italic max-w-lg leading-relaxed mt-4"
          >
            "Building a school environment where every voice is not just heard, but <span className="text-royal font-semibold">celebrated</span>."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-4"
          >
            <button 
              className="interactive group relative px-8 py-4 bg-royal text-white rounded-full overflow-hidden font-medium text-sm uppercase tracking-widest transition-transform hover:scale-105 active:scale-95"
              onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2">
                Discover My Vision
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-royal-dark to-royal-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </motion.div>

        {/* Portrait/Visual */}
        <motion.div 
          style={{ y: y2 }}
          className="relative hidden lg:flex justify-center items-center h-full w-full"
        >
          <div className="relative group w-full max-w-md">
            <div className="absolute -inset-4 bg-accent rounded-[40px] -z-10 transition-transform group-hover:scale-105"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.5, type: 'spring' }}
              className="relative w-full aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-gray-200"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-royal/60 to-transparent z-10" />
              <img 
                src="PARI KA PHOTO_______________________________________________________________.png" 
                alt="Pari Patel" 
                className="object-cover w-full h-full mix-blend-multiply opacity-90 relative z-0"
              />
              <div className="absolute bottom-8 left-8 text-white z-20">
                <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Candidate No. 01</p>
                <h2 className="text-3xl font-bold font-display">Pari Patel</h2>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400"
      >
        <span className="text-sm font-medium tracking-widest uppercase mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-royal" />
        </motion.div>
      </motion.div>
    </section>
  );
}
