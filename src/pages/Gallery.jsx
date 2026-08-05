import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const galleryItems = [
  { id: 1, src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', alt: 'Farmers in cotton field', category: 'Field Days' },
  { id: 2, src: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=800&q=80', alt: 'Cotton crop close-up', category: 'Field Crops' },
  { id: 3, src: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80', alt: 'Corn / Maize field', category: 'Field Crops' },
  { id: 4, src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80', alt: 'Wheat crop at sunrise', category: 'Field Crops' },
  { id: 5, src: 'https://images.unsplash.com/photo-1621955964441-c173e01c135b?w=800&q=80', alt: 'Fresh okra harvest', category: 'Vegetables' },
  { id: 6, src: 'https://images.unsplash.com/photo-1449300079323-02847b1bb09f?w=800&q=80', alt: 'Cucumber crop', category: 'Vegetables' },
  { id: 7, src: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&q=80', alt: 'Tomato harvest', category: 'Vegetables' },
  { id: 8, src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80', alt: 'Spice crops', category: 'Spice Crops' },
  { id: 9, src: 'https://images.unsplash.com/photo-1518887668165-a27c4a6f21a0?w=800&q=80', alt: 'Chilli pepper', category: 'Vegetables' },
  { id: 10, src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80', alt: 'Pulse crops', category: 'Pulses' },
  { id: 11, src: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&q=80', alt: 'Pumpkin field', category: 'Vegetables' },
  { id: 12, src: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80', alt: 'Carrot harvest', category: 'Vegetables' },
];

const CATS = ['All', ...new Set(galleryItems.map((g) => g.category))];

export default function Gallery() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => { document.title = 'Gallery — Ubuntu Seeds'; }, []);

  const filtered = galleryItems.filter((g) => selectedCat === 'All' || g.category === selectedCat);

  return (
    <>
      <section className="pt-24 pb-12" style={{ background: 'linear-gradient(135deg, #1A4728 0%, #225D36 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Our <span style={{ color: '#D4873B' }}>Gallery</span>
            </h1>
            <p className="text-green-200 text-lg max-w-xl mx-auto">Field days, crop trials, farmer meets — moments from our growing community.</p>
          </motion.div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FDF8F0' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  selectedCat === cat ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                }`}
                style={selectedCat === cat ? { backgroundColor: '#225D36', borderColor: '#225D36' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm"
                onClick={() => setLightbox(item)}
              >
                <img src={item.src} alt={item.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={28} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium">{item.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/90" onClick={() => setLightbox(null)} />
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <img src={lightbox.src} alt={lightbox.alt} className="w-full rounded-2xl max-h-[85vh] object-contain" />
              <p className="text-white text-center mt-3 text-sm">{lightbox.alt}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-100"
                aria-label="Close lightbox"
              >
                <X size={20} className="text-gray-700" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
