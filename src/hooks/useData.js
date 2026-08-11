import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { products as staticProducts } from '../data/products';
import { testimonials as staticTestimonials } from '../data/testimonials';
import { newsArticles as staticNews } from '../data/news';
import { dealers as staticDealers } from '../data/dealers';

// Static Fallback for Gallery
const staticGallery = [
  { id: 1, src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', alt: 'Farmers in Cotton Field', category: 'Field Days' },
  { id: 2, src: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=800&q=80', alt: 'Cotton Crop Close-up', category: 'Field Crops' },
  { id: 3, src: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80', alt: 'Hybrid Corn / Maize Field', category: 'Field Crops' },
  { id: 4, src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80', alt: 'Wheat Crop Field Day', category: 'Field Days' },
  { id: 5, src: 'https://images.unsplash.com/photo-1621955964441-c173e01c135b?w=800&q=80', alt: 'Fresh Okra Harvest', category: 'Vegetables' },
  { id: 6, src: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80', alt: 'Crispy Cucumber Field', category: 'Vegetables' },
  { id: 7, src: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&q=80', alt: 'Tomato Glory Harvest', category: 'Vegetables' },
  { id: 8, src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80', alt: 'Cumin & Spice Crop Trial', category: 'Spice Crops' },
];

// Static Fallback for Crop Calendar
const staticCropCalendar = [
  { id: 1, season: 'Kharif', crop_name: 'Cotton', variety_name: 'Ubuntu 555', sowing_window: 'May–Jul', display_order: 1 },
  { id: 2, season: 'Kharif', crop_name: 'Hybrid Bajra', variety_name: 'Ubuntu Vajra', sowing_window: 'Jun–Jul', display_order: 2 },
  { id: 3, season: 'Kharif', crop_name: 'Hybrid Corn', variety_name: 'Ubuntu Master', sowing_window: 'Jun–Aug', display_order: 3 },
  { id: 4, season: 'Kharif', crop_name: 'Research Seeds', variety_name: 'Ubuntu 365', sowing_window: 'Jun–Jul', display_order: 4 },
  { id: 5, season: 'Kharif', crop_name: 'Okra', variety_name: 'Ubuntu Okra Royal', sowing_window: 'All Season', display_order: 5 },
  { id: 6, season: 'Rabi', crop_name: 'Tomato', variety_name: 'Ubuntu Glory', sowing_window: 'Aug–Nov', display_order: 6 },
  { id: 7, season: 'Rabi', crop_name: 'Cumin (Jeera)', variety_name: 'Ubuntu 2530', sowing_window: 'Nov–Dec', display_order: 7 },
  { id: 8, season: 'Zaid', crop_name: 'Cucumber', variety_name: 'Ubuntu 4045', sowing_window: 'Feb–Apr', display_order: 8 },
];

/**
 * Hook to fetch products (Supabase with static fallback)
 */
export function useProducts() {
  const [products, setProducts] = useState(staticProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!isSupabaseConfigured || !supabase) {
        setProducts(staticProducts);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data: dbProducts, error: dbError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (dbError || !dbProducts || dbProducts.length === 0) {
          setProducts(staticProducts);
        } else {
          const formatted = dbProducts.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            subCategory: p.crop_type,
            tagline: p.description ? p.description.slice(0, 75) + '...' : '',
            image: p.image_url,
            season: p.season,
            maturityDays: p.maturity_days_min === p.maturity_days_max
              ? `${p.maturity_days_min}`
              : `${p.maturity_days_min}-${p.maturity_days_max}`,
            featured: p.is_featured,
            badge: p.badge,
            description: p.description,
            specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs || []),
          }));
          setProducts(formatted);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to static products:', err);
        setError(err);
        setProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

/**
 * Hook to fetch testimonials (Supabase with static fallback)
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState(staticTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTestimonials() {
      if (!isSupabaseConfigured || !supabase) {
        setTestimonials(staticTestimonials);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: true });

        if (dbError || !data || data.length === 0) {
          setTestimonials(staticTestimonials);
        } else {
          setTestimonials(data.map((t, idx) => ({
            id: t.id,
            name: t.farmer_name,
            location: t.location,
            crop: t.crop_grown,
            product_name: t.product_name,
            rating: t.rating || 5,
            text: t.quote,
            avatar: t.avatar_initials || 'US',
            bgColor: idx % 3 === 0 ? '#225D36' : idx % 3 === 1 ? '#D4873B' : '#6B4226',
          })));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to static testimonials:', err);
        setError(err);
        setTestimonials(staticTestimonials);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials: testimonials || staticTestimonials, loading, error };
}

/**
 * Hook to fetch news (Supabase with static fallback)
 */
export function useNews() {
  const [news, setNews] = useState(staticNews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      if (!isSupabaseConfigured || !supabase) {
        setNews(staticNews);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('news')
          .select('*')
          .order('published_date', { ascending: false });

        if (dbError || !data || data.length === 0) {
          setNews(staticNews);
        } else {
          setNews(data.map((n) => ({
            id: n.id,
            title: n.title,
            excerpt: n.excerpt,
            category: n.category,
            date: n.published_date,
            readTime: `${n.read_time_minutes} min`,
            image: n.image_url,
            body: n.body,
          })));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to static news:', err);
        setError(err);
        setNews(staticNews);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return { newsArticles: news || staticNews, loading, error };
}

/**
 * Hook to fetch gallery (Supabase with static fallback)
 */
export function useGallery() {
  const [gallery, setGallery] = useState(staticGallery);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      if (!isSupabaseConfigured || !supabase) {
        setGallery(staticGallery);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: true });

        if (dbError || !data || data.length === 0) {
          setGallery(staticGallery);
        } else {
          setGallery(data.map((g) => ({
            id: g.id,
            src: g.image_url,
            alt: g.caption,
            category: g.category,
          })));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to static gallery:', err);
        setError(err);
        setGallery(staticGallery);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  return { galleryItems: gallery || staticGallery, loading, error };
}

/**
 * Hook to fetch dealers (Supabase with static fallback)
 */
export function useDealers() {
  const [dealers, setDealers] = useState(staticDealers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDealers() {
      if (!isSupabaseConfigured || !supabase) {
        setDealers(staticDealers);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('dealers')
          .select('*')
          .order('state', { ascending: true });

        if (dbError || !data || data.length === 0) {
          setDealers(staticDealers);
        } else {
          setDealers(data.map((d) => ({
            id: d.id,
            name: d.name,
            contact: 'Agri Manager',
            phone: d.phone,
            address: d.address,
            city: d.district,
            district: d.district,
            state: d.state,
            products: ['Hybrid Seeds', 'Crop Advisory'],
          })));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to static dealers:', err);
        setError(err);
        setDealers(staticDealers);
      } finally {
        setLoading(false);
      }
    }

    fetchDealers();
  }, []);

  return { dealers: dealers || staticDealers, loading, error };
}

/**
 * Hook to fetch seasonal crop calendar (Supabase with static fallback)
 */
export function useCropCalendar() {
  const [cropCalendar, setCropCalendar] = useState(staticCropCalendar);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCropCalendar() {
      if (!isSupabaseConfigured || !supabase) {
        setCropCalendar(staticCropCalendar);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('crop_calendar')
          .select('*')
          .order('display_order', { ascending: true });

        if (dbError || !data || data.length === 0) {
          setCropCalendar(staticCropCalendar);
        } else {
          setCropCalendar(data);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to static crop calendar:', err);
        setError(err);
        setCropCalendar(staticCropCalendar);
      } finally {
        setLoading(false);
      }
    }

    fetchCropCalendar();
  }, []);

  return { cropCalendar: cropCalendar || staticCropCalendar, loading, error };
}
