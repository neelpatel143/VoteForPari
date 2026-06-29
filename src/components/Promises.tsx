import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { BookOpen, Coffee, Megaphone, ShieldCheck } from 'lucide-react';

const promises = [
  { icon: <Megaphone />, title: "Open Council Meetings", desc: "Every first Friday of the month, the student council will hold an open forum for anyone to attend and speak." },
  { icon: <Coffee />, title: "Better Canteen Options", desc: "Collaborating with the administration to introduce healthier, more diverse, and affordable food choices." },
  { icon: <BookOpen />, title: "Peer Tutoring Network", desc: "Establishing a structured, recognized peer-to-peer mentoring system to help students excel academically." },
  { icon: <ShieldCheck />, title: "Mental Health Days", desc: "Pushing for recognized mental health awareness activities and 'no-homework' weekends once a term." },
];

export function Promises() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-32 bg-accent relative" ref={ref}>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-royal mb-6 tracking-tighter">Campaign Promises</h2>
          <p className="text-xl text-gray-500 font-light italic">Concrete steps, not just empty words.</p>
        </div>

        <div className="relative">
          {/* Animated Roadmap Line */}
          <div className="absolute left-[2rem] md:left-1/2 top-0 bottom-0 w-1 bg-royal/10 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-royal to-gold absolute top-0"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-24">
            {promises.map((promise, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 w-full text-left ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{promise.title}</h3>
                    <p className="text-gray-600 text-lg">{promise.desc}</p>
                  </div>
                  
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-accent shadow-lg flex items-center justify-center text-royal">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1], rotate: [0, 10, 0] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {promise.icon}
                    </motion.div>
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
