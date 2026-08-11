import { useState, useRef, useEffect } from 'react';
import SEOHead from '../components/shared/SEOHead';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Phone, Mail, MapPin, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useProducts, useTestimonials, useNews } from '../hooks/useData';
import ProductModal from '../components/products/ProductModal';
import ProductCard from '../components/products/ProductCard';
import CropMarquee from '../components/home/CropMarquee';

// Animated counter
function Counter({ end, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// Fade-in wrapper
function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const variants = {
    hidden: { opacity: 0, y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0, x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0 },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}

const categoryTiles = [
  { label: 'Field Crops', icon: '🌾', desc: 'Cotton, Bajra, Corn, Sesamum, Wheat', cat: CATEGORIES.FIELD, color: '#225D36', bg: '#E8F5E9' },
  { label: 'Vegetable Crops', icon: '🥦', desc: 'Okra, Tomato, Cucumber, Gourd & more', cat: CATEGORIES.VEGETABLE, color: '#2E7D48', bg: '#F1F8E9' },
  { label: 'Pulse Crops', icon: '🫘', desc: 'Moong, Cowpea and more protein-rich varieties', cat: CATEGORIES.PULSE, color: '#D4873B', bg: '#FFF8E1' },
  { label: 'Spice Crops', icon: '🌿', desc: 'Cumin (Jeera), Mustard (Rai) & more', cat: CATEGORIES.SPICE, color: '#6B4226', bg: '#FBE9E7' },
];

const usps = [
  { icon: '🔬', title: 'Research-Backed Varieties', desc: 'Every seed variety undergoes multi-year trials across diverse soil and climatic conditions before release.' },
  { icon: '🌱', title: 'Superior Germination', desc: 'Our seeds consistently deliver 90%+ germination rates, giving your crop the best possible start.' },
  { icon: '🛡️', title: 'Disease Resistant', desc: 'Bred for resistance to common threats like bollworm, downy mildew, YVMV, and TYLCV.' },
  { icon: '📈', title: 'Higher Yields', desc: 'Farmers report 20–35% higher yields compared to traditional varieties in independent field trials.' },
  { icon: '🤝', title: 'Farmer Support', desc: 'Our agronomy team provides direct support — from sowing guidance to post-harvest advice.' },
  { icon: '🌍', title: 'Pan-India Availability', desc: 'Reach us through our growing dealer network across Gujarat, Maharashtra, Rajasthan & MP.' },
];

export default function Home() {
  const { products } = useProducts();
  const { testimonials } = useTestimonials();
  const { newsArticles } = useNews();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const featuredProducts = (products || []).filter((p) => p.featured);

  const prevTestimonial = () => setTestimonialIdx((i) => (i === 0 ? (testimonials.length ? testimonials.length - 1 : 0) : i - 1));
  const nextTestimonial = () => setTestimonialIdx((i) => (i === (testimonials.length ? testimonials.length - 1 : 0) ? 0 : i + 1));

  return (
    <>
      <SEOHead
        description="Ubuntu Seeds Private Limited — research-backed hybrid seeds for Indian farmers. Cotton, bajra, corn, vegetables and spice seeds developed in Ahmedabad, Gujarat."
        path="/"
        keywords="ubuntu seeds, hybrid seeds india, cotton seeds gujarat, vegetable hybrid seeds, seed company ahmedabad, bajra hybrid india"
      />
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
            alt="Farm field at golden hour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,71,40,0.92) 0%, rgba(34,93,54,0.85) 50%, rgba(26,71,40,0.75) 100%)' }} />
        </div>

        {/* Floating shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10" style={{ background: '#D4873B', filter: 'blur(80px)' }} />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-10" style={{ background: '#fff', filter: 'blur(60px)' }} />

        {/* Main Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-8 w-full flex-1 flex flex-col justify-center">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-amber-200 mb-4 sm:mb-6 border border-amber-400/30" style={{ backgroundColor: 'rgba(212,135,59,0.2)' }}>
                🌱 Research-Backed Hybrid Seeds Since 2022
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-4 sm:mb-6">
                Grow with
                <br />
                <span style={{ color: '#D4873B' }}>Confidence</span>
              </h1>
              <p className="text-green-100 text-sm sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-10 max-w-2xl">
                Ubuntu Seeds develops and supplies premium hybrid seeds for Indian farmers — from cotton fields of Gujarat to vegetable farms across India. Every seed is backed by science and trusted by thousands of farmers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-semibold text-white text-base sm:text-lg transition-all hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: '#D4873B' }}
                >
                  Explore Our Seeds <ArrowRight size={18} />
                </Link>
                <Link
                  to="/find-dealer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-semibold text-white text-base sm:text-lg border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all"
                >
                  Find a Dealer
                </Link>
              </div>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { label: 'Seed Varieties', end: 20, suffix: '+' },
                { label: 'States Covered', end: 4, suffix: '+' },
                { label: 'Farmers Served', end: 5000, suffix: '+' },
                { label: 'Years of R&D', end: 3, suffix: '+' },
              ].map(({ label, end, suffix }) => (
                <div key={label} className="text-center p-4 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="text-3xl font-display font-bold text-white"><Counter end={end} suffix={suffix} /></div>
                  <div className="text-green-200 text-sm mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ===== FULL-WIDTH INFINITE CROP MARQUEE AT BOTTOM OF HERO ===== */}
        <div className="relative w-full z-10 pb-4 pt-1 flex flex-col items-center">
          <CropMarquee />

          {/* Animated Scroll Down Indicator Toggle */}
          <button
            onClick={() => {
              const target = document.getElementById('why-choose-us');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-1 group cursor-pointer mt-3 transition-transform hover:scale-110"
            aria-label="Scroll to next section"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-6 h-9 rounded-full border-2 border-white/50 group-hover:border-amber-400 flex justify-center pt-1.5 backdrop-blur-xs bg-black/10 transition-colors shadow-md"
            >
              <div className="w-1 h-2 rounded-full bg-amber-400 group-hover:bg-amber-300" />
            </motion.div>
            <ChevronDown size={14} className="text-white/80 group-hover:text-amber-400 animate-bounce -mt-0.5" />
          </button>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section id="why-choose-us" className="py-20" style={{ backgroundColor: '#FDF8F0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block" style={{ backgroundColor: '#E8F5E9', color: '#225D36' }}>
                Why Ubuntu Seeds
              </span>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                The <span style={{ color: '#225D36' }}>Science</span> Behind Your Harvest
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                From field trial to your farm — every variety is developed with one goal: maximum yield, minimum risk.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usps.map(({ icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full card-hover group">
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-2 group-hover:text-green-700 transition-colors">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORY TILES ===== */}
      <section className="py-20" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Our Seed <span style={{ color: '#D4873B' }}>Categories</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                From field crops to spices — a complete portfolio for every Indian farmer
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryTiles.map(({ label, icon, desc, cat, color, bg }, i) => (
              <FadeIn key={label} delay={i * 0.1}>
                <Link to={`/products?cat=${encodeURIComponent(cat)}`} className="block">
                  <div
                    className="rounded-2xl p-6 h-full cursor-pointer card-hover border transition-all group"
                    style={{ backgroundColor: bg, borderColor: color + '30' }}
                  >
                    <div className="text-5xl mb-4">{icon}</div>
                    <h3 className="font-display font-bold text-lg mb-2 group-hover:underline" style={{ color }}>{label}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color }}>
                      Browse <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20" style={{ backgroundColor: '#FDF8F0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
              <div>
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">
                  Featured <span style={{ color: '#225D36' }}>Varieties</span>
                </h2>
                <p className="text-gray-500">Our best-selling and top-performing seed varieties</p>
              </div>
              <Link
                to="/products"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 shrink-0"
                style={{ backgroundColor: '#225D36' }}
              >
                View All Seeds <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product, i) => (
                <FadeIn key={product.id} delay={i * 0.1}>
                  <ProductCard product={product} onClick={setSelectedProduct} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-xs max-w-xl mx-auto">
              <div className="text-5xl mb-3">🌱</div>
              <h3 className="text-lg font-bold text-gray-800 font-display">No Featured Varieties Listed Yet</h3>
              <p className="text-xs text-gray-500 mt-1">Explore all research hybrid seeds in our catalog.</p>
              <Link to="/products" className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-800 hover:bg-green-900 transition-colors">
                Browse Seed Catalog <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20" style={{ backgroundColor: '#225D36' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-4xl font-display font-bold text-white mb-4">
                What Farmers <span style={{ color: '#D4873B' }}>Say</span>
              </h2>
              <p className="text-green-200 text-lg">Real stories from real farmers across India</p>
            </div>
          </FadeIn>

          <div className="relative max-w-3xl mx-auto">
            {testimonials && testimonials.length > 0 ? (
              <>
                {(() => {
                  const currentTestimonial = testimonials[testimonialIdx % testimonials.length] || testimonials[0];
                  if (!currentTestimonial) return null;

                  return (
                    <motion.div
                      key={testimonialIdx}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center"
                    >
                      {/* Stars */}
                      <div className="flex justify-center gap-1 mb-4">
                        {Array.from({ length: currentTestimonial.rating || 5 }).map((_, i) => (
                          <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <p className="text-white text-lg leading-relaxed italic mb-6">
                        "{currentTestimonial.text}"
                      </p>

                      <div className="flex items-center justify-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                          style={{ backgroundColor: currentTestimonial.bgColor || '#225D36' }}
                        >
                          {currentTestimonial.avatar}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-white">{currentTestimonial.name}</p>
                          <p className="text-green-300 text-sm">{currentTestimonial.location} • {currentTestimonial.crop}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Navigation */}
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex gap-2 items-center">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIdx(i)}
                        className={`rounded-full transition-all ${i === testimonialIdx ? 'w-6 h-3' : 'w-3 h-3'}`}
                        style={{ backgroundColor: i === testimonialIdx ? '#D4873B' : 'rgba(255,255,255,0.4)' }}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 text-center text-white">
                <div className="text-5xl mb-3">💬</div>
                <h3 className="text-xl font-bold font-display text-white mb-1">Farmer Reviews Coming Soon</h3>
                <p className="text-green-200 text-xs">We are currently gathering new field trial reviews from our partner farmers across Gujarat & Maharashtra.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== NEWS PREVIEW ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
              <div>
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">
                  Latest <span style={{ color: '#225D36' }}>News</span>
                </h2>
                <p className="text-gray-500">Updates, crop advisory, and farmer success stories</p>
              </div>
              <Link to="/crop-advisory" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold border-2 transition-all hover:bg-green-50 shrink-0" style={{ borderColor: '#225D36', color: '#225D36' }}>
                Read All Articles <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>

          {newsArticles && newsArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.slice(0, 3).map((article, i) => (
                <FadeIn key={article.id} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover">
                    <div className="h-44 overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <div className="flex gap-2 mb-3 items-center justify-between">
                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: '#E8F5E9', color: '#225D36' }}>{article.category}</span>
                        <span className="text-xs text-gray-400">{article.readTime} read</span>
                      </div>
                      <h3 className="font-display font-bold text-gray-900 text-base mb-2 line-clamp-2 hover:text-green-700 transition-colors cursor-pointer">{article.title}</h3>
                      <p className="text-gray-500 text-xs mb-4 line-clamp-2">{article.excerpt}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-3xl p-10 text-center border border-gray-200/80 max-w-xl mx-auto">
              <div className="text-5xl mb-3">📰</div>
              <h3 className="text-lg font-bold text-gray-800 font-display">No Advisory Articles Published Yet</h3>
              <p className="text-xs text-gray-500 mt-1">Seasonal agronomy guides and research updates will be posted soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== CONTACT STRIP ===== */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #1A4728, #225D36)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-4xl font-display font-bold text-white mb-4">
                Ready to Grow with <span style={{ color: '#D4873B' }}>Ubuntu Seeds?</span>
              </h2>
              <p className="text-green-200 text-lg mb-8">
                Contact our team for seed recommendations, pricing, and dealer information in your area.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+917778983555" className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#D4873B' }}>
                  <Phone size={18} /> Call Now
                </a>
                <a href="https://wa.me/917778983555" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/40 hover:bg-white/10 transition-all">
                  💬 WhatsApp
                </a>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 space-y-4">
                {[
                  { icon: Phone, label: 'Call / WhatsApp', value: '+91 777 89 83 555', href: 'tel:+917778983555' },
                  { icon: Mail, label: 'Email', value: 'info@ubuntuseeds.co.in', href: 'mailto:info@ubuntuseeds.co.in' },
                  { icon: MapPin, label: 'Location', value: 'Aslali, Daskroi, Ahmedabad, Gujarat – 382427', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-green-300 text-xs">{label}</p>
                      {href ? (
                        <a href={href} className="text-white text-sm font-medium hover:text-yellow-300 transition-colors">{value}</a>
                      ) : (
                        <p className="text-white text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
