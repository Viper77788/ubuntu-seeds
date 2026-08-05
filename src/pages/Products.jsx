import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products, CATEGORIES, SEASONS } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import ProductModal from '../components/products/ProductModal';

const categoryColors = {
  [CATEGORIES.FIELD]: 'bg-green-100 text-green-800 border-green-200',
  [CATEGORIES.VEGETABLE]: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  [CATEGORIES.PULSE]: 'bg-amber-100 text-amber-800 border-amber-200',
  [CATEGORIES.SPICE]: 'bg-orange-100 text-orange-800 border-orange-200',
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || '');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    document.title = 'Our Products — Ubuntu Seeds';
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase());
      const matchesCat = !selectedCategory || p.category === selectedCategory;
      const matchesSeason = !selectedSeason || p.season === selectedSeason;
      return matchesSearch && matchesCat && matchesSeason;
    });
  }, [search, selectedCategory, selectedSeason]);

  const allCategories = Object.values(CATEGORIES);
  const allSeasons = Object.values(SEASONS);
  // Import SEASONS from products data
  const SEASONS_IMPORT = { KHARIF: 'Kharif', RABI: 'Rabi', ZAID: 'Zaid', ALL: 'All Season' };

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A4728 0%, #225D36 60%, #2E7D48 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white mb-4" style={{ backgroundColor: 'rgba(212,135,59,0.3)', border: '1px solid rgba(212,135,59,0.5)' }}>
              Our Seed Catalog
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Research-Backed <span style={{ color: '#D4873B' }}>Hybrid Seeds</span>
            </h1>
            <p className="text-green-200 text-lg max-w-2xl mx-auto">
              Browse our complete catalog of field crops, vegetables, pulses, and spice seeds — each variety developed through rigorous research and field trials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section style={{ backgroundColor: '#FDF8F0' }} className="py-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Search & Filters */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-48 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search seed varieties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                aria-label="Search products"
              />
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                  selectedCategory === '' ? 'text-white border-transparent' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-300'
                }`}
                style={selectedCategory === '' ? { backgroundColor: '#225D36', borderColor: '#225D36' } : {}}
              >
                All
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    selectedCategory === cat ? 'text-white border-transparent' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-300'
                  }`}
                  style={selectedCategory === cat ? { backgroundColor: '#225D36', borderColor: '#225D36' } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Season filter */}
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 focus:outline-none focus:border-green-400 bg-gray-50"
              aria-label="Filter by season"
            >
              <option value="">All Seasons</option>
              {Object.values(SEASONS_IMPORT).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing <strong className="text-gray-800">{filtered.length}</strong> varieties
              {selectedCategory && <> in <strong className="text-gray-800">{selectedCategory}</strong></>}
            </p>
            {(search || selectedCategory || selectedSeason) && (
              <button
                onClick={() => { setSearch(''); setSelectedCategory(''); setSelectedSeason(''); }}
                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
              >
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              layout
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <ProductCard product={product} onClick={setSelectedProduct} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-display font-semibold text-gray-700 mb-2">No varieties found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
