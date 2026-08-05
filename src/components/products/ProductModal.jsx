import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone } from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          {/* Header image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-12">
              <span className="text-xs font-medium px-2 py-1 rounded-full text-white mb-2 inline-block" style={{ backgroundColor: '#D4873B' }}>
                {product.subCategory}
              </span>
              <h2 className="text-2xl font-display font-bold text-white">{product.name}</h2>
              <p className="text-green-200 text-sm">{product.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6">
            {/* Info chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                🌱 {product.category}
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
                📅 {product.season}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                ⏱ {product.maturityDays} days
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Specs table */}
            {product.specs && product.specs.length > 0 && (
              <div className="mb-6">
                <h3 className="font-display font-semibold text-gray-800 mb-3">Technical Specifications</h3>
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  {product.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex py-2.5 px-4 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <span className="text-sm text-gray-500 w-44 shrink-0 font-medium">{spec.label}</span>
                      <span className="text-sm text-gray-800 font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/917778983555?text=Hello%20Ubuntu%20Seeds%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}.%20Please%20provide%20more%20details.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-6 rounded-xl font-semibold text-white text-center transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#25D366' }}
              >
                <span>💬</span> Enquire on WhatsApp
              </a>
              <a
                href="tel:+917778983555"
                className="flex-1 py-3 px-6 rounded-xl font-semibold text-white text-center transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#225D36' }}
              >
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
