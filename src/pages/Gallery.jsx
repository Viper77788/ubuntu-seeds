import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import SEOHead from '../components/shared/SEOHead';

const galleryItems = [
  { id: 1, src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', alt: 'Farmers in Cotton Field', category: 'Field Days' },
  { id: 2, src: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=800&q=80', alt: 'Cotton Crop Close-up', category: 'Field Crops' },
  { id: 3, src: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80', alt: 'Hybrid Corn / Maize Field', category: 'Field Crops' },
  { id: 4, src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80', alt: 'Wheat Crop Field Day', category: 'Field Days' },
  { id: 5, src: 'https://images.unsplash.com/photo-1621955964441-c173e01c135b?w=800&q=80', alt: 'Fresh Okra Harvest', category: 'Vegetables' },
  { id: 6, src: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80', alt: 'Crispy Cucumber Field', category: 'Vegetables' },
  { id: 7, src: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&q=80', alt: 'Tomato King Harvest', category: 'Vegetables' },
  { id: 8, src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80', alt: 'Cumin & Spice Crop Trial', category: 'Spice Crops' },
  { id: 9, src: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&q=80', alt: 'Hot Chilli Pepper Plot', category: 'Vegetables' },
  { id: 10, src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80', alt: 'Green Gram Moong Harvest', category: 'Pulses' },
  { id: 11, src: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&q=80', alt: 'Pumpkin & Gourd Crop', category: 'Vegetables' },
  { id: 12, src: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80', alt: 'Carrot Farm Harvest', category: 'Vegetables' },
];

const CATS = ['All', ...new Set(galleryItems.map((g) => g.category))];

export default function Gallery() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => { document.title = 'Gallery — Ubuntu Seeds'; }, []);

  const filtered = galleryItems.filter((g) => selectedCat === 'All' || g.category === selectedCat);

  return (
    <>
      <SEOHead
        title="Gallery — Field Days & Crop Trials"
        description="Explore Ubuntu Seeds gallery — field days, crop trials, farmer meets, and high-yielding hybrid crops across Gujarat and India."
        path="/gallery"
      />

      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A4728 0%, #225D36 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 text-amber-200 border border-amber-400/30" style={{ backgroundColor: 'rgba(212,135,59,0.2)' }}>
              📸 Field Photo Gallery
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white mb-3">
              Our <span style={{ color: '#D4873B' }}>Gallery</span>
            </h1>
            <p className="text-green-200 text-sm sm:text-lg max-w-xl mx-auto">
              Field days, variety trials, and successful harvests from farmers across India.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FDF8F0' }} className="py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  selectedCat === cat
                    ? 'text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:text-green-800'
                }`}
                style={selectedCat === cat ? { backgroundColor: '#225D36', borderColor: '#225D36' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Clean Grid Layout — Eliminates whitespace gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer card-hover flex flex-col"
                onClick={() => setLightbox(item)}
              >
                <div className="relative h-56 sm:h-64 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback box if image load fails */}
                  <div className="hidden absolute inset-0 bg-green-50 flex-col items-center justify-center p-4 text-center">
                    <ImageIcon size={32} className="text-green-600 mb-2" />
                    <span className="text-xs font-semibold text-gray-700">{item.alt}</span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={20} />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/50 backdrop-blur-md text-white">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{item.alt}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setLightbox(null)} />
            <motion.div
              className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <img src={lightbox.src} alt={lightbox.alt} className="w-full max-h-[80vh] object-contain" />
              <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">{lightbox.alt}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-800 text-green-200">{lightbox.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
