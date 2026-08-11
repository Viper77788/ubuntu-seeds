import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useProducts } from '../../hooks/useData';

// Category name to URL slug mapping
const CATEGORY_SLUGS = {
  'Field Crops': 'field-crops',
  'Vegetable Crops': 'vegetable-crops',
  'Pulse Crops': 'pulse-crops',
  'Spice Crops': 'spice-crops',
};

// Helper slug generator
function toSlug(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Emoji icon lookup helper
function getCropEmoji(name = '') {
  const n = name.toLowerCase();
  if (n.includes('tomato')) return '🍅';
  if (n.includes('cotton')) return '🌾';
  if (n.includes('corn') || n.includes('maize')) return '🌽';
  if (n.includes('bajra') || n.includes('millet')) return '🌾';
  if (n.includes('okra')) return '🫛';
  if (n.includes('pepper') || n.includes('chilli')) return '🌶️';
  if (n.includes('cucumber')) return '🥒';
  if (n.includes('cumin') || n.includes('jeera')) return '🌿';
  if (n.includes('mustard') || n.includes('rai')) return '🌼';
  if (n.includes('moong') || n.includes('gram') || n.includes('pulse')) return '🫘';
  if (n.includes('cabbage')) return '🥬';
  if (n.includes('carrot')) return '🥕';
  if (n.includes('gourd') || n.includes('karela') || n.includes('lauki')) return '🥒';
  if (n.includes('wheat')) return '🌾';
  if (n.includes('sesamum') || n.includes('til')) return '🌱';
  return '🌱';
}

export default function CropMarquee() {
  const { products, loading } = useProducts();

  // Dynamically extract unique crop types directly from Supabase products
  const dynamicCropItems = useMemo(() => {
    if (!products || products.length === 0) return [];

    const cropMap = new Map();

    products.forEach((p) => {
      const cropName = p.subCategory || p.crop_type || p.name;
      const categoryName = p.category || 'Vegetable Crops';

      if (!cropMap.has(cropName)) {
        cropMap.set(cropName, {
          name: cropName,
          icon: getCropEmoji(cropName),
          categorySlug: CATEGORY_SLUGS[categoryName] || toSlug(categoryName),
          cropSlug: toSlug(cropName),
          count: 1,
          badge: p.badge || 'Hybrid',
        });
      } else {
        const existing = cropMap.get(cropName);
        existing.count += 1;
      }
    });

    return Array.from(cropMap.values());
  }, [products]);

  // If loading or no products in database yet
  if (loading || dynamicCropItems.length === 0) {
    return null;
  }

  // Duplicate list for smooth continuous infinite marquee loop
  const marqueeList = [...dynamicCropItems, ...dynamicCropItems];

  return (
    <div className="w-full py-2 relative overflow-hidden bg-transparent">
      {/* Header pill */}
      <div className="text-center mb-2.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/10 text-emerald-200 border border-white/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Click Any Crop to View Varieties
        </span>
      </div>

      {/* Ticker marquee strip */}
      <div className="flex overflow-hidden select-none group w-full">
        <div className="animate-marquee-scroll flex items-center gap-4 sm:gap-5 py-1">
          {marqueeList.map((crop, idx) => (
            <Link
              key={`${crop.cropSlug}-${idx}`}
              to={`/products/${crop.categorySlug}/${crop.cropSlug}`}
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 hover:border-amber-400/60 backdrop-blur-md shadow-lg transition-all duration-300 transform hover:-translate-y-1 shrink-0 group/card cursor-pointer"
            >
              <span className="text-2xl sm:text-3xl filter drop-shadow group-hover/card:scale-110 transition-transform">
                {crop.icon}
              </span>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm sm:text-base text-white group-hover/card:text-amber-300 transition-colors">
                    {crop.name}
                  </span>
                  <ArrowUpRight size={14} className="text-amber-400 opacity-70 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {crop.badge}
                  </span>
                  <span className="text-[11px] text-green-200/90 hidden sm:inline font-medium">
                    {crop.count} {crop.count === 1 ? 'Variety' : 'Varieties'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
