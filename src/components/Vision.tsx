import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Users, Calendar, Trophy, Palette, Globe, Leaf } from 'lucide-react';

const visions = [
  { id: 'comm', title: 'Better Communication', icon: <MessageSquare className="w-6 h-6" />, desc: 'An anonymous feedback system where every student can safely voice their concerns directly to the council.', color: 'bg-blue-100 text-blue-600' },
  { id: 'voice', title: 'Student Voice', icon: <Users className="w-6 h-6" />, desc: 'No filters. Direct conversations about what matters most to our student body.', color: 'bg-purple-100 text-purple-600' },
  { id: 'events', title: 'School Events', icon: <Calendar className="w-6 h-6" />, desc: 'Revamping the annual fest and introducing mini-events like cultural days, etc.', color: 'bg-pink-100 text-pink-600' },
  { id: 'sports', title: 'Sports', icon: <Trophy className="w-6 h-6" />, desc: 'More inter-house tournaments and better funding allocation for our athletic teams.', color: 'bg-orange-100 text-orange-600' },
  { id: 'creative', title: 'Creativity', icon: <Palette className="w-6 h-6" />, desc: 'Establishing a dedicated creative group for student artists, musicians, and performers.', color: 'bg-rose-100 text-rose-600' },
  { id: 'campus', title: 'Clean Campus', icon: <Leaf className="w-6 h-6" />, desc: 'A sustainability initiative focusing on recycling, reducing plastic, and greening our spaces.', color: 'bg-green-100 text-green-600' },
];

export function Vision() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="vision" className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">The Vision</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Click on the bubbles to explore my concrete plans for making our school a better place for everyone.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {visions.map((vision) => {
            const isActive = activeId === vision.id;
            return (
              <motion.div
                key={vision.id}
                layout
                onClick={() => setActiveId(isActive ? null : vision.id)}
                className={`interactive cursor-none rounded-3xl overflow-hidden transition-all duration-300 ${isActive ? 'shadow-xl w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)]' : 'shadow-sm hover:border-gold w-auto'}`}
                style={{
                  backgroundColor: isActive ? 'var(--color-royal)' : 'white',
                  border: isActive ? '1px solid transparent' : '1px solid #F3F4F6',
                  color: isActive ? 'white' : 'inherit'
                }}
              >
                <motion.div layout className={`p-6 flex ${isActive ? 'flex-col items-start' : 'items-center gap-4'}`}>
                  <motion.div layout className={`flex items-center justify-center rounded-full p-4 ${isActive ? 'bg-white/10 text-gold' : vision.color}`}>
                    {vision.icon}
                  </motion.div>
                  <motion.h4 layout className={`font-bold uppercase tracking-wider ${isActive ? 'mt-4 text-sm text-gold' : 'text-xs text-gray-900'}`}>
                    {vision.title}
                  </motion.h4>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-white/80 mt-3 text-sm leading-relaxed"
                      >
                        {vision.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
