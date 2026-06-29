import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

export function EasterEggs() {
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    // Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          triggerCelebration();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerCelebration = () => {
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FBBF24']
      });
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#1D4ED8']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    setShowQuote(true);
    setTimeout(() => setShowQuote(false), 8000);
  };

  return (
    <AnimatePresence>
      {showQuote && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div className="glass-dark text-white px-8 py-4 rounded-full shadow-2xl text-center">
            <p className="font-display font-medium text-lg text-gold">"Leadership is not about being in charge. It is about taking care of those in your charge."</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
