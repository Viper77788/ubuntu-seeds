import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export default function ProductCard({ product, onClick }) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer card-hover group"
      onClick={() => onClick(product)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(product)}
      aria-label={`View details for ${product.name}`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.badge && (
            <span
              className="text-xs font-bold px-2 py-1 rounded-full text-white"
              style={{ backgroundColor: product.badge === 'Bestseller' ? '#D4873B' : product.badge === 'New' ? '#2E7D48' : '#225D36' }}
            >
              {product.badge}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
            {product.subCategory}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-bold text-gray-900 text-base mb-1 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{product.tagline}</p>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} style={{ color: '#225D36' }} />
            <span>{product.maturityDays} days</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={12} style={{ color: '#D4873B' }} />
            <span>{product.season}</span>
          </div>
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-1 text-sm font-semibold transition-colors group-hover:gap-2"
          style={{ color: '#225D36' }}
        >
          View Details <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}
