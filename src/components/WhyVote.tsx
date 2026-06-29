import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

const stars = [
  { id: 1, label: "Leadership", desc: "Leading by example.", top: "20%", left: "50%" },
  { id: 2, label: "Empathy", desc: "Understanding every perspective.", top: "40%", left: "20%" },
  { id: 3, label: "Responsibility", desc: "Owning outcomes.", top: "70%", left: "30%" },
  { id: 4, label: "Creativity", desc: "Thinking outside the box.", top: "30%", left: "80%" },
  { id: 5, label: "Teamwork", desc: "Stronger together.", top: "60%", left: "70%" },
  { id: 6, label: "Discipline", desc: "Consistent execution.", top: "80%", left: "55%" },
];

export function WhyVote() {
  const [activeStar, setActiveStar] = useState<number | null>(null);

  return (
    <section className="py-32 bg-gray-900 relative overflow-hidden text-white min-h-[800px] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-royal-dark/40 via-gray-900 to-gray-900" />
      
      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight">Why Vote For Me</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">Explore the qualities that define my leadership.</p>
        </motion.div>

        <div className="relative flex-grow min-h-[500px] w-full max-w-4xl mx-auto">
          {/* Constellation Lines (Simplified visually using SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <line x1="50%" y1="20%" x2="20%" y2="40%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50%" y1="20%" x2="80%" y2="30%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="20%" y1="40%" x2="30%" y2="70%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="80%" y1="30%" x2="70%" y2="60%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="30%" y1="70%" x2="55%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="70%" y1="60%" x2="55%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="20%" y1="40%" x2="70%" y2="60%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
          </svg>

          {stars.map((star) => {
            const isActive = activeStar === star.id;
            return (
              <motion.div
                key={star.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ top: star.top, left: star.left }}
                onHoverStart={() => setActiveStar(star.id)}
                onHoverEnd={() => setActiveStar(null)}
              >
                <motion.div
                  className={`interactive relative w-4 h-4 rounded-full cursor-none transition-colors duration-300 ${isActive ? 'bg-gold shadow-[0_0_30px_rgba(251,191,36,0.8)]' : 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]'}`}
                  whileHover={{ scale: 1.5 }}
                />
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  className="absolute top-8 w-48 text-center pointer-events-none"
                >
                  <h4 className="text-gold font-bold text-lg mb-1 drop-shadow-md">{star.label}</h4>
                  <p className="text-sm text-gray-300 glass-dark px-3 py-2 rounded-lg">{star.desc}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
