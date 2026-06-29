import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import confetti from 'canvas-confetti';

export function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 100], [0, 12]);
  
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.1 }
        });
        return 0;
      }
      return newCount;
    });
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 transition-colors"
      style={{
        backgroundColor: useTransform(bgOpacity, v => `rgba(255, 255, 255, ${v})`),
        backdropFilter: useTransform(blur, v => `blur(${v}px)`),
        borderBottom: useTransform(bgOpacity, v => `1px solid rgba(243, 244, 246, ${v})`)
      }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          onClick={handleLogoClick}
          className="interactive text-xl font-semibold tracking-tighter text-royal flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-royal text-white rounded-full flex items-center justify-center font-bold text-xs">P</div>
          PARI.
        </button>

        <nav className="hidden md:flex gap-8">
          {[
            { id: 'meet-pari', label: 'Meet Pari' },
            { id: 'vision', label: 'Vision' },
          ].map(link => (
            <button 
              key={link.id}
              onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="interactive text-sm font-medium text-gray-500 hover:text-gold transition-colors uppercase tracking-widest"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
