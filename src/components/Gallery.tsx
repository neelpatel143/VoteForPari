import { motion } from 'motion/react';
import { useState } from 'react';

const images = [
  { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", alt: "Team discussion" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop", alt: "Presentation" },
  { src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop", alt: "Group photo" },
  { src: "https://images.unsplash.com/photo-1515161318750-781d6122e367?q=80&w=800&auto=format&fit=crop", alt: "Planning session" },
  { src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=800&auto=format&fit=crop", alt: "Speech" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop", alt: "Graduation" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-royal mb-6 tracking-tighter">In Action</h2>
          <p className="text-gray-500 text-xl">A glimpse into the journey so far.</p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="break-inside-avoid"
            >
              <div 
                className="interactive relative group overflow-hidden rounded-[2rem] cursor-none shadow-sm hover:shadow-xl hover:shadow-royal/20 transition-all duration-500 transform hover:-translate-y-2"
                onClick={() => setSelectedImage(img.src)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-royal/0 group-hover:bg-royal/20 transition-colors duration-500 mix-blend-overlay" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="interactive fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm p-6 cursor-none"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
          />
          <div className="absolute top-8 right-8 text-white text-sm tracking-widest uppercase opacity-50">
            Click anywhere to close
          </div>
        </div>
      )}
    </section>
  );
}
