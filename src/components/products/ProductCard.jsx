import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export default function ProductCard({ product, onClick }) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer card-hover group flex flex-col h-full"
      onClick={() => onClick(product)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(product)}
      aria-label={`View details for ${product.name}`}
    >
      {/* Seed Packet Image Container */}
      <div className="relative h-52 bg-gradient-to-br from-green-50/60 via-cream to-amber-50/40 p-4 flex items-center justify-center overflow-hidden border-b border-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {product.badge && (
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white shadow-sm"
              style={{ backgroundColor: product.badge === 'Bestseller' ? '#D4873B' : product.badge === 'New' ? '#2E7D48' : '#225D36' }}
            >
              {product.badge}
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 z-10">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90 shadow-xs border border-gray-200/60 text-gray-700">
            {product.subCategory}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-bold text-gray-900 text-base mb-1 group-hover:text-green-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{product.tagline}</p>
        </div>

        <div>
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <Clock size={12} style={{ color: '#225D36' }} />
              <span>{product.maturityDays} days</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} style={{ color: '#D4873B' }} />
              <span>{product.season}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold" style={{ color: '#225D36' }}>
            <span>View Specifications</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
