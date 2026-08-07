import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, ShieldCheck, Clock, Calendar } from 'lucide-react';

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
          className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-gray-100"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          {/* Header Card with Packet Image */}
          <div className="relative bg-gradient-to-r from-green-950 via-green-900 to-green-800 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Seed Packet Graphic */}
            <div className="w-36 h-48 sm:w-40 sm:h-52 bg-white rounded-2xl p-3 shadow-2xl flex items-center justify-center shrink-0 border-2 border-amber-300">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Title & Tagline */}
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-bold px-3 py-1 rounded-full text-white inline-block mb-2 shadow-sm" style={{ backgroundColor: '#D4873B' }}>
                {product.subCategory}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">{product.name}</h2>
              <p className="text-green-200 text-sm sm:text-base leading-relaxed mb-4">{product.tagline}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-green-100">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Clock size={14} className="text-amber-300" />
                  <span>Maturity: {product.maturityDays} days</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Calendar size={14} className="text-amber-300" />
                  <span>Season: {product.season}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Product Overview</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications */}
            {product.specs && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1">
                  <ShieldCheck size={16} style={{ color: '#225D36' }} /> Technical Agronomic Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 px-3.5 py-2.5 rounded-xl border border-gray-100 text-xs sm:text-sm">
                      <span className="text-gray-500 font-medium">{spec.label}</span>
                      <span className="font-semibold text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dealer CTA */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+917778983555"
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-white text-center text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-md"
                style={{ backgroundColor: '#225D36' }}
              >
                <Phone size={16} /> Order / Enquire Now: +91 777 89 83 555
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
