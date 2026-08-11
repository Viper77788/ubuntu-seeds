import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Pure dynamic client-side hook for Products (Supabase)
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!isSupabaseConfigured || !supabase) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data: dbProducts, error: dbError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (dbError) throw dbError;

        if (dbProducts && Array.isArray(dbProducts)) {
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
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products from Supabase:', err);
        setError(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

/**
 * Pure dynamic client-side hook for Testimonials (Supabase)
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTestimonials() {
      if (!isSupabaseConfigured || !supabase) {
        setTestimonials([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: true });

        if (dbError) throw dbError;

        if (data && Array.isArray(data)) {
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
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        console.error('Error fetching testimonials from Supabase:', err);
        setError(err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}

/**
 * Pure dynamic client-side hook for News (Supabase)
 */
export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      if (!isSupabaseConfigured || !supabase) {
        setNews([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('news')
          .select('*')
          .order('published_date', { ascending: false });

        if (dbError) throw dbError;

        if (data && Array.isArray(data)) {
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
        } else {
          setNews([]);
        }
      } catch (err) {
        console.error('Error fetching news from Supabase:', err);
        setError(err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return { newsArticles: news, loading, error };
}

/**
 * Pure dynamic client-side hook for Gallery (Supabase)
 */
export function useGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      if (!isSupabaseConfigured || !supabase) {
        setGallery([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: true });

        if (dbError) throw dbError;

        if (data && Array.isArray(data)) {
          setGallery(data.map((g) => ({
            id: g.id,
            src: g.image_url,
            alt: g.caption,
            category: g.category,
          })));
        } else {
          setGallery([]);
        }
      } catch (err) {
        console.error('Error fetching gallery from Supabase:', err);
        setError(err);
        setGallery([]);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  return { galleryItems: gallery, loading, error };
}

/**
 * Pure dynamic client-side hook for Dealers (Supabase)
 */
export function useDealers() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDealers() {
      if (!isSupabaseConfigured || !supabase) {
        setDealers([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('dealers')
          .select('*')
          .order('state', { ascending: true });

        if (dbError) throw dbError;

        if (data && Array.isArray(data)) {
          setDealers(data.map((d) => ({
            id: d.id,
            name: d.name,
            contact: 'Agri Manager',
            address: d.address,
            city: d.district,
            district: d.district,
            state: d.state,
            products: ['Hybrid Seeds', 'Crop Advisory'],
          })));
        } else {
          setDealers([]);
        }
      } catch (err) {
        console.error('Error fetching dealers from Supabase:', err);
        setError(err);
        setDealers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDealers();
  }, []);

  return { dealers, loading, error };
}

/**
 * Pure dynamic client-side hook for Seasonal Crop Calendar (Supabase)
 */
export function useCropCalendar() {
  const [cropCalendar, setCropCalendar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCropCalendar() {
      if (!isSupabaseConfigured || !supabase) {
        setCropCalendar([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('crop_calendar')
          .select('*')
          .order('display_order', { ascending: true });

        if (dbError) throw dbError;

        if (data && Array.isArray(data)) {
          setCropCalendar(data);
        } else {
          setCropCalendar([]);
        }
      } catch (err) {
        console.error('Error fetching crop calendar from Supabase:', err);
        setError(err);
        setCropCalendar([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCropCalendar();
  }, []);

  return { cropCalendar, loading, error };
}
