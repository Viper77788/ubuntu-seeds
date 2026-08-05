import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { newsArticles, CATEGORIES } from '../data/news';
import CropWheel from '../components/crops/CropWheel';
import SEOHead from '../components/shared/SEOHead';

const tipArticles = [
  { icon: '🌧️', title: 'Monsoon Sowing Guide', summary: 'How to time your Kharif crop sowing based on first monsoon rainfall. Avoid early sowing pitfalls for cotton and bajra.' },
  { icon: '🐛', title: 'Pest & Disease Management', summary: 'Identify and manage bollworm, downy mildew, YVMV, and other common threats — integrated pest management approach.' },
  { icon: '💧', title: 'Irrigation Best Practices', summary: 'Drip vs. flood irrigation for cotton: water use efficiency, fertigation tips, and critical growth stages that must not face water stress.' },
  { icon: '🌱', title: 'Seed Treatment Before Sowing', summary: 'Step-by-step guide to seed treatment with fungicides and biostimulants for better germination and early plant health.' },
  { icon: '📊', title: 'Yield Optimisation Strategies', summary: 'Plant population, row spacing, and fertiliser schedules for maximum hybrid seed performance in Gujarat and Maharashtra conditions.' },
  { icon: '🏪', title: 'Post-Harvest & Market Linkage', summary: 'Storage practices, grading, and connecting to the right market — maximise returns on your produce after harvest.' },
];

export default function CropAdvisory() {
  const [selectedCat, setSelectedCat] = useState('');

  return (
    <>
      <SEOHead
        title="Crop Advisory & Seasonal Calendar"
        description="Expert crop advisory for Indian farmers — Kharif, Rabi, and Zaid seasonal sowing calendar, pest management guides, irrigation tips, and yield optimisation strategies from Ubuntu Seeds."
        path="/crop-advisory"
        keywords="crop advisory gujarat, kharif sowing guide, rabi crop calendar, seed treatment guide, cotton pest management"
      />

      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A4728 0%, #225D36 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-amber-200 mb-4 border border-amber-400/40" style={{ backgroundColor: 'rgba(212,135,59,0.2)' }}>
              🌾 Crop Advisory & Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Grow <span style={{ color: '#D4873B' }}>Smarter</span> Every Season
            </h1>
            <p className="text-green-200 text-lg max-w-2xl mx-auto">
              Expert sowing guides, crop calendars, pest management tips, and farmer success stories — everything you need to plan a profitable season.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Circular Crop Wheel ── */}
      <section className="py-16" style={{ backgroundColor: '#FDF8F0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3" style={{ backgroundColor: '#E8F5E9', color: '#225D36' }}>
              Seasonal Crop Calendar 2026–27
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">
              What to Sow <span style={{ color: '#225D36' }}>This Season</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Tap a season on the wheel to see the recommended Ubuntu Seeds varieties — planned for maximum profitability.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
            <CropWheel />
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Farming Tips & Guides</h2>
            <p className="text-gray-500">From our agronomy experts</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tipArticles.map(({ icon, title, summary }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover cursor-pointer group"
              >
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-display font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{summary}</p>
                <div className="flex items-center gap-1 mt-4 text-sm font-semibold transition-all" style={{ color: '#225D36' }}>
                  Read more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Blog */}
      <section className="py-16" style={{ backgroundColor: '#FDF8F0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-display font-bold text-gray-900">News & Updates</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCat('')}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${selectedCat === '' ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'}`}
                style={selectedCat === '' ? { backgroundColor: '#225D36', borderColor: '#225D36' } : {}}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat === selectedCat ? '' : cat)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${selectedCat === cat ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'}`}
                  style={selectedCat === cat ? { backgroundColor: '#225D36', borderColor: '#225D36' } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles
              .filter((a) => !selectedCat || a.category === selectedCat)
              .map((article, i) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover cursor-pointer"
                >
                  <div className="h-44 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: '#E8F5E9', color: '#225D36' }}>{article.category}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={11} /> {article.readTime} read
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-gray-900 text-base mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(article.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
