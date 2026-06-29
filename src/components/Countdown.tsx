import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// Set election date to 14 days from now for demo purposes
const ELECTION_DATE = new Date(2026, 5, 20, 0, 0, 0);
// Months are 0-indexed: 5 = June

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = ELECTION_DATE.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-royal relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-royal-light/40 via-royal to-royal-dark" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass rounded-[3rem] p-10 md:p-16 border border-white/20 shadow-2xl shadow-royal-dark/50 text-center text-white"
        >
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-12 tracking-tight">
            Election Day Approaches
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <motion.div 
                  key={unit.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-mono font-bold mb-2 text-gold drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.div>
                <span className="text-sm tracking-widest uppercase text-white/70 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
