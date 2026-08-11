import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { CATEGORIES, SEASONS } from '../data/products';
import { useProducts } from '../hooks/useData';
import ProductCard from '../components/products/ProductCard';
import ProductModal from '../components/products/ProductModal';
import CropTypeGrid from '../components/products/CropTypeGrid';
import Breadcrumb from '../components/products/Breadcrumb';
import SEOHead from '../components/shared/SEOHead';

// Helper for URL slug normalization
export function toSlug(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function Products() {
  const { categorySlug, cropTypeSlug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const allCategories = Object.values(CATEGORIES);
  const allSeasons = Object.values(SEASONS);

  // Map categorySlug back to exact category name
  const activeCategoryName = useMemo(() => {
    if (!categorySlug) return searchParams.get('cat') || '';
    return allCategories.find((c) => toSlug(c) === categorySlug) || '';
  }, [categorySlug, searchParams, allCategories]);

  // Map cropTypeSlug back to exact crop type name
  const activeCropTypeName = useMemo(() => {
    if (!cropTypeSlug || !activeCategoryName) return '';
    const catProducts = products.filter((p) => p.category === activeCategoryName);
    const matched = catProducts.find((p) => toSlug(p.subCategory) === cropTypeSlug);
    return matched ? matched.subCategory : cropTypeSlug.replace(/-/g, ' ');
  }, [cropTypeSlug, activeCategoryName, products]);

  useEffect(() => {
    if (activeCropTypeName) {
      document.title = `${activeCropTypeName} Varieties — Ubuntu Seeds`;
    } else if (activeCategoryName) {
      document.title = `${activeCategoryName} — Ubuntu Seeds`;
    } else {
      document.title = 'Our Products — Ubuntu Seeds';
    }
  }, [activeCategoryName, activeCropTypeName]);

  // Group products by crop_type for Level 2
  const cropTypeGroups = useMemo(() => {
    if (!activeCategoryName) return [];

    const catProducts = products.filter((p) => p.category === activeCategoryName);
    const groupsMap = new Map();

    catProducts.forEach((p) => {
      const rawCropType = p.subCategory || 'Other';
      const slug = toSlug(rawCropType);

      if (!groupsMap.has(slug)) {
        groupsMap.set(slug, {
          cropType: rawCropType,
          cropTypeSlug: slug,
          products: [],
          representativeImage: p.image,
          varietyCount: 0,
        });
      }

      const group = groupsMap.get(slug);
      group.products.push(p);
      group.varietyCount += 1;
      if (p.featured) {
        group.representativeImage = p.image;
      }
    });

    return Array.from(groupsMap.values());
  }, [products, activeCategoryName]);

  // Filtered varieties for Level 3 or flat search view
  const filteredVarieties = useMemo(() => {
    return products.filter((p) => {
      // 1. Search Query override
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(search.toLowerCase())) ||
        (p.tagline && p.tagline.toLowerCase().includes(search.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(search.toLowerCase()));

      // 2. Category Match
      const matchesCat = !activeCategoryName || p.category === activeCategoryName;

      // 3. Crop Type Match (Level 3)
      const matchesCropType = !cropTypeSlug || toSlug(p.subCategory) === cropTypeSlug;

      // 4. Season Filter
      const matchesSeason = !selectedSeason || p.season === selectedSeason;

      return matchesSearch && matchesCat && matchesCropType && matchesSeason;
    });
  }, [products, search, activeCategoryName, cropTypeSlug, selectedSeason]);

  // Navigation handlers
  const handleSelectCategory = (catName) => {
    setSearch('');
    if (!catName) {
      navigate('/products');
    } else {
      navigate(`/products/${toSlug(catName)}`);
    }
  };

  const handleSelectCropType = (cSlug) => {
    if (activeCategoryName) {
      navigate(`/products/${toSlug(activeCategoryName)}/${cSlug}`);
    }
  };

  const handleBackCategory = () => {
    if (activeCategoryName) {
      navigate(`/products/${toSlug(activeCategoryName)}`);
    } else {
      navigate('/products');
    }
  };

  const isSearchActive = search.trim().length > 0;
  const isLevel3 = Boolean(cropTypeSlug) && !isSearchActive;
  const isLevel2 = Boolean(categorySlug) && !cropTypeSlug && !isSearchActive;

  return (
    <>
      <SEOHead
        title={activeCropTypeName ? `${activeCropTypeName} Seeds` : activeCategoryName || 'Our Seed Catalog'}
        description="Browse Ubuntu Seeds research-backed hybrid seed catalog — Field crops, vegetables, pulses, and spices."
        path={categorySlug ? `/products/${categorySlug}` : '/products'}
      />

      {/* Hero Header */}
      <section className="pt-24 pb-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A4728 0%, #225D36 60%, #2E7D48 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white mb-3" style={{ backgroundColor: 'rgba(212,135,59,0.3)', border: '1px solid rgba(212,135,59,0.5)' }}>
              Our Seed Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white mb-3">
              {activeCropTypeName ? (
                <>{activeCropTypeName} <span style={{ color: '#D4873B' }}>Varieties</span></>
              ) : activeCategoryName ? (
                <>{activeCategoryName} <span style={{ color: '#D4873B' }}>Catalog</span></>
              ) : (
                <>Research-Backed <span style={{ color: '#D4873B' }}>Hybrid Seeds</span></>
              )}
            </h1>
            <p className="text-green-200 text-sm sm:text-base max-w-2xl mx-auto">
              Browse our complete catalog of field crops, vegetables, pulses, and spice seeds — each variety developed through rigorous research and field trials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content & Drill-Down Section */}
      <section style={{ backgroundColor: '#FDF8F0' }} className="py-8 sm:py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Controls Bar: Search, Category Pills, Season Dropdown */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="flex-1 min-w-48 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search by variety name, crop type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                aria-label="Search products"
              />
            </div>

            {/* Level 1 Category Filter Pills */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleSelectCategory('')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  !activeCategoryName ? 'text-white border-transparent shadow-xs' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-300'
                }`}
                style={!activeCategoryName ? { backgroundColor: '#225D36', borderColor: '#225D36' } : {}}
              >
                All Categories
              </button>
              {allCategories.map((cat) => {
                const isActive = activeCategoryName === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(isActive ? '' : cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                      isActive ? 'text-white border-transparent shadow-xs' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-300'
                    }`}
                    style={isActive ? { backgroundColor: '#225D36', borderColor: '#225D36' } : {}}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Season Dropdown */}
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-600 focus:outline-none focus:border-green-400 bg-gray-50 font-medium"
              aria-label="Filter by season"
            >
              <option value="">All Seasons</option>
              {allSeasons.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Breadcrumb Header */}
          {(activeCategoryName || activeCropTypeName) && !isSearchActive && (
            <Breadcrumb
              category={activeCategoryName}
              categorySlug={toSlug(activeCategoryName)}
              cropType={activeCropTypeName}
              onBackCategory={handleBackCategory}
            />
          )}

          {/* VIEW SWITCHER LOGIC */}
          <AnimatePresence mode="wait">
            {isSearchActive ? (
              /* VIEW 1: SEARCH RESULTS FLAT GRID */
              <motion.div key="search-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">
                    Search results for "<strong>{search}</strong>" ({filteredVarieties.length} varieties found)
                  </p>
                  <button onClick={() => setSearch('')} className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1">
                    <X size={14} /> Clear Search
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredVarieties.map((product, i) => (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                      <ProductCard product={product} onClick={setSelectedProduct} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            ) : isLevel3 ? (
              /* VIEW 2: LEVEL 3 — VARIETY GRID FOR CROP TYPE */
              <motion.div key="level3-view" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 font-display">
                    {activeCropTypeName} Hybrid Varieties ({filteredVarieties.length})
                  </h2>
                </div>

                {filteredVarieties.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredVarieties.map((product, i) => (
                      <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <ProductCard product={product} onClick={setSelectedProduct} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 shadow-xs">
                    <div className="text-5xl mb-3">🌾</div>
                    <h3 className="text-lg font-bold text-gray-800">No varieties match the selected season filter</h3>
                    <p className="text-xs text-gray-500 mt-1">Try setting season filter to "All Seasons".</p>
                  </div>
                )}
              </motion.div>

            ) : isLevel2 ? (
              /* VIEW 3: LEVEL 2 — CROP TYPE TILES GRID */
              <motion.div key="level2-view" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 font-display">
                    Select a Crop Type in {activeCategoryName} ({cropTypeGroups.length} Crop Types)
                  </h2>
                </div>
                <CropTypeGrid
                  cropTypeGroups={cropTypeGroups}
                  onSelectCropType={handleSelectCropType}
                  onSelectSingleVariety={(prod) => setSelectedProduct(prod)}
                />
              </motion.div>

            ) : (
              /* VIEW 4: LEVEL 1 — ALL CATEGORIES FULL CATALOG VIEW */
              <motion.div key="level1-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-display">All Seed Varieties ({filteredVarieties.length})</h2>
                    <p className="text-xs text-gray-500">Select a category pill above to drill down by crop type</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredVarieties.map((product, i) => (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                      <ProductCard product={product} onClick={setSelectedProduct} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
