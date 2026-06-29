import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export function SupportCounter() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. Fetch initial count from our new MongoDB API
    fetch('/api/votes')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.count === 'number') {
          setCount(data.count);
        }
      })
      .catch(console.error);

    // 2. Check local state to prevent multiple votes from same browser
    const voted = localStorage.getItem('pari_voted');
    if (voted) {
      setHasVoted(true);
    }
  }, []);

  const handleVote = async () => {
    if (hasVoted) return;
    
    // Confetti!
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#002366', '#D4AF37', '#FFFFFF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#002366', '#D4AF37', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Optimistically update UI
    setCount(prev => prev + 1);
    setHasVoted(true);
    localStorage.setItem('pari_voted', 'true');
    
    // Post to MongoDB API
    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data && typeof data.count === 'number') {
        setCount(data.count); // Sync exact number with database
      }
    } catch (e) {
      console.error("Failed to post vote to database", e);
    }

    setTimeout(() => setIsOpen(false), 3000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="interactive absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-6 pt-4">
                <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className={`w-10 h-10 ${hasVoted ? 'fill-current' : ''}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900">
                  {hasVoted ? "Thank you!" : "Support Pari?"}
                </h3>
                
                <p className="text-gray-500">
                  {hasVoted 
                    ? "You've already supported Pari ❤️" 
                    : "Show your support and join the movement for a better school experience."}
                </p>

                {!hasVoted && (
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="interactive flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleVote}
                      className="interactive flex-1 px-4 py-3 rounded-xl bg-royal text-white font-medium shadow-lg shadow-royal/20 hover:bg-royal-dark transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4 fill-current" /> Vote
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-10 right-10 z-[55] flex items-center space-x-4"
      >
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-gray-700">
            {count.toLocaleString()} <span className="font-normal opacity-60 uppercase">STUDENTS SUPPORTING</span>
          </span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="interactive w-16 h-16 bg-royal rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform border-4 border-white active:scale-95 group cursor-none"
        >
          <span className="text-2xl group-hover:animate-bounce">❤️</span>
        </button>
      </motion.div>
    </>
  );
}
