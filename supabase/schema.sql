-- =============================================================================
-- UBUNTU SEEDS PRIVATE LIMITED — SUPABASE DATABASE SCHEMA & RLS POLICIES
-- =============================================================================
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- =============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. PRODUCTS TABLE
-- Stores hybrid seed catalog items, technical specifications, and metadata
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Field Crops', 'Vegetable Crops', 'Pulse Crops', 'Spice Crops')),
  crop_type TEXT NOT NULL, -- e.g. Cotton, Hybrid Bajra, Hybrid Corn, Okra, Tomato, etc.
  season TEXT NOT NULL CHECK (season IN ('Kharif', 'Rabi', 'Zaid', 'All Season')),
  maturity_days_min INT NOT NULL DEFAULT 40,
  maturity_days_max INT NOT NULL DEFAULT 180,
  badge TEXT CHECK (badge IN ('Bestseller', 'Top Pick', 'Featured', 'Popular', 'New', 'Hot', 'Research') OR badge IS NULL),
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  specs JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { label, value } objects
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. TESTIMONIALS TABLE
-- Stores farmer reviews, locations, rating, and crop feedback
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_name TEXT NOT NULL,
  location TEXT NOT NULL,
  crop_grown TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  avatar_initials TEXT NOT NULL DEFAULT 'US',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. NEWS TABLE
-- Stores articles, research updates, advisories, and company news
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Company News', 'Crop Advisory', 'Product Launch', 'Research', 'Success Story')),
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT NOT NULL,
  read_time_minutes INT NOT NULL DEFAULT 3,
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. GALLERY TABLE
-- Stores field day photos, crop trial imagery, and captions
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Field Days', 'Field Crops', 'Vegetables', 'Spice Crops', 'Pulses')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. DEALERS TABLE
-- Stores verified distributor and dealer locator details across India
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.dealers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 6. CROP CALENDAR TABLE
-- Stores seasonal crop wheel schedule (Kharif, Rabi, Zaid) with display ordering
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.crop_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season TEXT NOT NULL CHECK (season IN ('Kharif', 'Rabi', 'Zaid')),
  crop_name TEXT NOT NULL,
  variety_name TEXT NOT NULL,
  sowing_window TEXT NOT NULL, -- e.g. "Jun–Jul"
  display_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
-- Security Model:
-- - Public (anon): Read-only access (SELECT) on all tables
-- - Admin (authenticated): Full CRUD access (INSERT, UPDATE, DELETE)
-- =============================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_calendar ENABLE ROW LEVEL SECURITY;

-- 1. Products RLS Policies
CREATE POLICY "Public read access for products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admin write access for products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Testimonials RLS Policies
CREATE POLICY "Public read access for testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admin write access for testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. News RLS Policies
CREATE POLICY "Public read access for news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Admin write access for news" ON public.news FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Gallery RLS Policies
CREATE POLICY "Public read access for gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Admin write access for gallery" ON public.gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Dealers RLS Policies
CREATE POLICY "Public read access for dealers" ON public.dealers FOR SELECT USING (true);
CREATE POLICY "Admin write access for dealers" ON public.dealers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Crop Calendar RLS Policies
CREATE POLICY "Public read access for crop_calendar" ON public.crop_calendar FOR SELECT USING (true);
CREATE POLICY "Admin write access for crop_calendar" ON public.crop_calendar FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =============================================================================
-- SUPABASE STORAGE BUCKETS SETUP INSTRUCTIONS & RLS
-- =============================================================================
-- Execute these in SQL Editor to create public storage buckets for images:
--
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true) ON CONFLICT DO NOTHING;
--
-- Storage Policies:
-- CREATE POLICY "Public read for product-images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
-- CREATE POLICY "Admin write for product-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');
-- CREATE POLICY "Admin update for product-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images');
-- CREATE POLICY "Admin delete for product-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images');
--
-- CREATE POLICY "Public read for gallery-images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
-- CREATE POLICY "Admin write for gallery-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery-images');
-- CREATE POLICY "Admin update for gallery-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gallery-images');
-- CREATE POLICY "Admin delete for gallery-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery-images');
-- =============================================================================
