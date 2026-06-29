import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { CheckCircle2, Star, Target, Zap } from 'lucide-react';
import meetpariImg from "./img/pari1.jpeg";

const timeline = [
  { year: "2025", title: "Head Girl Candidate", desc: "Ready to represent and elevate student voices.", icon: <Target className="w-5 h-5" /> },
];

export function MeetPari() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="meet-pari" ref={containerRef} className="py-32 bg-accent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4">The Core Mission</h3>
          <h2 className="text-4xl md:text-6xl font-black text-royal mb-6 tracking-tighter">Meet Pari</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto italic font-light">
            "A passionate advocate for student wellbeing, an experienced leader, and someone who believes in <span className="font-semibold text-royal">action</span> over words."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Portrait & Fun Facts */}
          <motion.div style={{ y }} className="space-y-8">
            <div className="relative group rounded-[2rem] overflow-hidden aspect-[4/3] bg-white shadow-xl shadow-royal/5">
              <img 
                src={meetpariImg} 
                alt="Pari at an event" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="text-royal font-bold text-xl mb-2">3+ Years</h4>
                <p className="text-gray-500 text-sm">Leadership Experience</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="text-gold-dark font-bold text-xl mb-2">50+</h4>
                <p className="text-gray-500 text-sm">Events Organized</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline & Achievements */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-8">My Journey</h3>
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="flex gap-6 relative"
                  >
                    {/* Line */}
                    {i !== timeline.length - 1 && (
                      <div className="absolute left-[1.125rem] top-10 bottom-[-2rem] w-px bg-royal/20" />
                    )}
                    <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white border border-royal/20 flex items-center justify-center text-royal">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-royal tracking-widest uppercase">{item.year}</span>
                      <h4 className="text-xl font-bold text-gray-900 mt-1 mb-2">{item.title}</h4>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-royal text-white rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <h3 className="text-2xl font-display font-bold mb-4">Core Values</h3>
              <ul className="space-y-3">
                {['Empathy first', 'Action over words', 'Inclusivity in everything'].map((val, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-gold" />
                    {val}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
