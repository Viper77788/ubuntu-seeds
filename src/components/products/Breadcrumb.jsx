import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export default function Breadcrumb({ category, categorySlug, cropType, onBackCategory }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200/80">
      {/* Breadcrumb Links */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500 flex-wrap" aria-label="Breadcrumb">
        <Link to="/products" className="hover:text-green-800 transition-colors font-semibold text-gray-700">
          Products
        </Link>
        {category && (
          <>
            <ChevronRight size={14} className="text-gray-400 shrink-0" />
            <Link
              to={`/products/${categorySlug}`}
              className={`hover:text-green-800 transition-colors ${cropType ? 'text-gray-700 font-semibold' : 'text-green-800 font-bold'}`}
            >
              {category}
            </Link>
          </>
        )}
        {cropType && (
          <>
            <ChevronRight size={14} className="text-gray-400 shrink-0" />
            <span className="text-green-800 font-bold">{cropType}</span>
          </>
        )}
      </nav>

      {/* Back Button */}
      {category && (
        <button
          onClick={onBackCategory}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 hover:bg-green-50 hover:border-green-300 text-green-800 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
        >
          <ArrowLeft size={14} /> Back to {category}
        </button>
      )}
    </div>
  );
}
