-- =============================================================================
-- UBUNTU SEEDS PRIVATE LIMITED — SEED DATA MIGRATION
-- =============================================================================
-- Run this SQL in your Supabase SQL Editor AFTER running schema.sql
-- =============================================================================

-- Clear existing data if re-seeding
TRUNCATE TABLE public.products, public.testimonials, public.news, public.gallery, public.dealers, public.crop_calendar RESTART IDENTITY CASCADE;

-- -----------------------------------------------------------------------------
-- 1. PRODUCTS SEED DATA
-- -----------------------------------------------------------------------------
INSERT INTO public.products (name, category, crop_type, season, maturity_days_min, maturity_days_max, badge, description, image_url, specs, is_featured)
VALUES
  (
    'Ubuntu 555', 'Field Crops', 'Cotton', 'Kharif', 160, 175, 'Bestseller',
    'Ubuntu 555 is a flagship hybrid cotton variety bred for exceptional boll count, extra-long staple fibre, and robust tolerance to bollworm and sucking pests. Proven performance in Gujarat and Maharashtra cotton belts.',
    '/products/ubuntu_555.png',
    '[{"label": "Plant Height", "value": "130–150 cm"}, {"label": "Boll Weight", "value": "4.8–5.4 g"}, {"label": "Staple Length", "value": "30–32 mm"}, {"label": "Ginning %", "value": "37–39%"}, {"label": "Maturity", "value": "160–175 days"}, {"label": "Sowing Season", "value": "Kharif (May–July)"}, {"label": "Seed Rate", "value": "750 g/acre"}, {"label": "Disease Resistance", "value": "Bollworm tolerant, sucking pest resistant"}]'::jsonb,
    true
  ),
  (
    'Ubuntu Vajra', 'Field Crops', 'Hybrid Bajra', 'Kharif', 70, 75, 'Top Pick',
    'Ubuntu Vajra is an extra-early hybrid bajra with outstanding tillering capacity and dense ear heads. High tolerance to downy mildew and ergot for maximum grain & fodder yields.',
    '/products/ubuntu_vajara.png',
    '[{"label": "Plant Height", "value": "210–240 cm"}, {"label": "Ear Head Length", "value": "28–32 cm"}, {"label": "Grain Yield", "value": "18–22 q/acre"}, {"label": "Maturity", "value": "70–75 days"}, {"label": "Sowing Season", "value": "Kharif (June–July)"}, {"label": "Seed Rate", "value": "1.5 kg/acre"}, {"label": "Disease Resistance", "value": "Downy Mildew & Ergot resistant"}]'::jsonb,
    true
  ),
  (
    'Ubuntu Master', 'Field Crops', 'Hybrid Corn', 'Kharif', 95, 105, 'Featured',
    'Ubuntu Master is a high-yield hybrid corn variety suitable for both grain harvest and green fodder. Features superior staygreen character, uniform cob filling, and excellent shelling percentage.',
    '/products/master.png',
    '[{"label": "Plant Height", "value": "200–220 cm"}, {"label": "Cob Length", "value": "18–20 cm"}, {"label": "Grain Yield", "value": "22–26 q/acre"}, {"label": "Maturity", "value": "95–105 days"}, {"label": "Sowing Season", "value": "Kharif & Rabi"}, {"label": "Seed Rate", "value": "7–8 kg/acre"}]'::jsonb,
    true
  ),
  (
    'Ubuntu 365', 'Field Crops', 'Research Seeds', 'All Season', 90, 100, 'Popular',
    'Ubuntu 365 is an all-weather, adaptable hybrid engineered for multi-season cultivation. Excellent disease resilience and stable yield across varying soil moisture conditions.',
    '/products/ubuntu_365.png',
    '[{"label": "Plant Type", "value": "Medium tall, robust stem"}, {"label": "Maturity", "value": "90–100 days"}, {"label": "Sowing Season", "value": "All Season (Kharif, Rabi & Zaid)"}, {"label": "Adaptability", "value": "Wide agro-climatic range"}]'::jsonb,
    false
  ),
  (
    'Ubuntu 2.0', 'Field Crops', 'Research Seeds', 'Kharif', 85, 95, 'New',
    'Ubuntu 2.0 represents our latest breeding breakthrough with enhanced drought tolerance, quick emergence, and strong stem strength to prevent lodging.',
    '/products/ubantu_2.0.png',
    '[{"label": "Maturity", "value": "85–95 days"}, {"label": "Drought Resilience", "value": "High"}, {"label": "Sowing Season", "value": "Kharif (June–July)"}, {"label": "Lodging Resistance", "value": "Superior stem strength"}]'::jsonb,
    false
  ),
  (
    'Ubuntu XXL', 'Field Crops', 'Research Seeds', 'Kharif', 100, 110, 'Popular',
    'Ubuntu XXL is specifically bred for extra-bold grain size and high biomass output. Excellent option for commercial farmers aiming for top market value.',
    '/products/ubuntu_xxl.png',
    '[{"label": "Grain Size", "value": "Extra Bold (XXL)"}, {"label": "Maturity", "value": "100–110 days"}, {"label": "Sowing Season", "value": "Kharif & Rabi"}, {"label": "Market Value", "value": "Premium grain quality"}]'::jsonb,
    false
  ),
  (
    'Ubuntu Okra Royal', 'Vegetable Crops', 'Hybrid Okra', 'Kharif', 45, 50, 'Bestseller',
    'Ubuntu Okra Royal yields tender, dark green, pentagonal pods with exceptional market appeal. Highly resistant to Yellow Vein Mosaic Virus (YVMV) with high picking frequency.',
    '/products/okra_royal.png',
    '[{"label": "Pod Length", "value": "10–13 cm"}, {"label": "Pod Colour", "value": "Deep Dark Green"}, {"label": "First Picking", "value": "45–50 days"}, {"label": "Sowing Season", "value": "Kharif & Summer"}, {"label": "Seed Rate", "value": "1.5–2 kg/acre"}, {"label": "Disease Resistance", "value": "YVMV & OLCV tolerant"}]'::jsonb,
    true
  ),
  (
    'Ubuntu Red Giant', 'Vegetable Crops', 'Hot Pepper', 'Kharif', 60, 70, 'Hot',
    'Ubuntu Red Giant is a high-pungency hybrid chilli variety producing long, glossy red fruits. Ideal for both green chilli market and dry red chilli processing.',
    '/products/red_giant.png',
    '[{"label": "Fruit Length", "value": "9–11 cm"}, {"label": "Pungency", "value": "High Capsaicin"}, {"label": "Maturity", "value": "60–70 days"}, {"label": "Sowing Season", "value": "Kharif & Rabi"}, {"label": "Seed Rate", "value": "150–200 g/acre"}]'::jsonb,
    true
  ),
  (
    'Ubuntu Glory', 'Vegetable Crops', 'Tomato', 'Rabi', 65, 70, 'Featured',
    'Ubuntu Glory produces uniform, firm, bright red tomatoes with crack resistance and extended post-harvest shelf life — perfect for long-distance market transport.',
    '/products/ubuntu_glory.png',
    '[{"label": "Fruit Weight", "value": "90–110 g"}, {"label": "Fruit Shape", "value": "Square Round"}, {"label": "Maturity", "value": "65–70 days"}, {"label": "Sowing Season", "value": "Rabi & Kharif"}, {"label": "Seed Rate", "value": "20–25 g/acre"}, {"label": "Disease Resistance", "value": "TYLCV & Bacterial Wilt resistant"}]'::jsonb,
    true
  ),
  (
    'Ubuntu 4045', 'Vegetable Crops', 'Cucumber', 'Kharif', 40, 45, 'Popular',
    'Ubuntu 4045 is an early-bearing salad cucumber hybrid producing uniform, cylindrical fruits with smooth light green skin and non-bitter crunchy flesh.',
    '/products/ubuntu_4045.png',
    '[{"label": "Fruit Length", "value": "18–20 cm"}, {"label": "First Harvest", "value": "40–45 days"}, {"label": "Sowing Season", "value": "All Season"}, {"label": "Seed Rate", "value": "300–350 g/acre"}]'::jsonb,
    false
  ),
  (
    'Ubuntu 4050', 'Vegetable Crops', 'Bottle Gourd', 'Kharif', 55, 65, 'New',
    'Ubuntu 4050 produces smooth, elongated bottle gourds with tender flesh and excellent transport strength. High female flower ratio for continuous harvest.',
    '/products/ubuntu_4050.png',
    '[{"label": "Fruit Length", "value": "45–55 cm"}, {"label": "Fruit Weight", "value": "800g – 1.1 kg"}, {"label": "Maturity", "value": "55–65 days"}, {"label": "Sowing Season", "value": "Kharif & Summer"}]'::jsonb,
    false
  ),
  (
    'Ubuntu 1618', 'Pulse Crops', 'Green Gram (Moong)', 'Kharif', 60, 65, 'Top Pick',
    'Ubuntu 1618 is a compact, erect green gram variety with synchronized pod maturity — enabling single-pass harvest. High protein content and shiny green grains.',
    '/products/ubuntu_1618.png',
    '[{"label": "Plant Type", "value": "Erect, compact bushy"}, {"label": "Grain Colour", "value": "Shiny Bright Green"}, {"label": "Protein Content", "value": "23–25%"}, {"label": "Maturity", "value": "60–65 days"}, {"label": "Sowing Season", "value": "Kharif & Summer (Zaid)"}, {"label": "Seed Rate", "value": "8–10 kg/acre"}]'::jsonb,
    false
  ),
  (
    'Ubuntu 2530', 'Spice Crops', 'Cumin (Jeera)', 'Rabi', 100, 110, 'Research',
    'Ubuntu 2530 produces bold, aromatic cumin seeds with high essential oil content. Bred for wilt tolerance in Gujarat and Rajasthan cumin belts.',
    '/products/ubuntu_2530.png',
    '[{"label": "Seed Size", "value": "Bold"}, {"label": "Essential Oil", "value": "3.0–3.6%"}, {"label": "Maturity", "value": "100–110 days"}, {"label": "Sowing Season", "value": "Rabi (Nov–Dec)"}, {"label": "Seed Rate", "value": "4–5 kg/acre"}, {"label": "Disease Resistance", "value": "Fusarium Wilt tolerant"}]'::jsonb,
    false
  );

-- -----------------------------------------------------------------------------
-- 2. TESTIMONIALS SEED DATA
-- -----------------------------------------------------------------------------
INSERT INTO public.testimonials (farmer_name, location, crop_grown, product_name, quote, rating, avatar_initials)
VALUES
  ('Ramesh Patel', 'Saurashtra, Gujarat', 'Cotton', 'Ubuntu 555', 'Ubuntu Seeds ne amara cotton nu utpadan 30% vadharyun. Bollworm ni koi samasya nathi ane boll size pan khub saras che. Have darak varsh Ubuntu Seeds j vaparo chu.', 5, 'RP'),
  ('Kishan Sharma', 'Mehsana, Gujarat', 'Hybrid Bajra', 'Ubuntu Vajra', 'Ubuntu Vajra is exceptionally early and the ear head size is remarkable. In just 72 days I got an excellent harvest. The downy mildew resistance saved my crop this season.', 5, 'KS'),
  ('Meena Verma', 'Anand, Gujarat', 'Tomato', 'Ubuntu Glory', 'The tomatoes have incredible shelf life — I could transport them to markets 200 km away with almost no damage. Yield was also 20% higher than last season.', 5, 'MV'),
  ('Suresh Desai', 'Rajkot, Gujarat', 'Hybrid Corn', 'Ubuntu Master', 'Excellent staygreen character and the cob uniformity was outstanding. Got 25 quintals per acre which is the best I have ever achieved in 20 years of farming maize.', 5, 'SD'),
  ('Harish Gadhvi', 'Jamnagar, Gujarat', 'Hybrid Okra', 'Ubuntu Okra Royal', 'Daily picking is smooth because pod quality stays consistent. YVMV resistance is real — my neighbouring plots suffered heavily but Ubuntu Okra Royal stayed clean.', 4, 'HG'),
  ('Bhavna Chaudhary', 'Banaskantha, Gujarat', 'Cumin (Jeera)', 'Ubuntu 2530', 'Jeeru no rang, khushbu ane daano — badhu first class! Market ma pan saras bhav malyo. Ubuntu Seeds na team na experts e khub saras margdarshan aapyu.', 5, 'BC');

-- -----------------------------------------------------------------------------
-- 3. NEWS SEED DATA
-- -----------------------------------------------------------------------------
INSERT INTO public.news (title, category, excerpt, body, image_url, read_time_minutes, published_date)
VALUES
  (
    'Ubuntu Seeds Launches Ubuntu Master — Record Yield in Gujarat Trials',
    'Product Launch',
    'Our newest hybrid corn variety exceeded expectations in multi-location trials across Gujarat, Rajasthan, and Maharashtra, achieving up to 26 quintals per acre.',
    'Ubuntu Seeds Private Limited is proud to announce the commercial launch of Ubuntu Master (Hybrid Maize). In rigorous multi-location agronomic trials conducted across Gujarat, Rajasthan, and Maharashtra, Ubuntu Master recorded impressive yield increases ranging from 18% to 26% over conventional commercial hybrids. Built for dual-purpose utility, Ubuntu Master yields high-density grain as well as lush green fodder.',
    'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80',
    3, '2026-07-15'
  ),
  (
    'Kharif 2026: Expert Sowing Guide for Cotton Farmers in Gujarat',
    'Crop Advisory',
    'With monsoon approaching, our agronomy team shares best practices for cotton sowing, plant spacing, and early season pest management.',
    'Proper seed bed preparation and timely sowing are critical for maximizing cotton yield in Saurashtra and North Gujarat. Our lead agronomist recommends maintaining 4x1.5 feet spacing for hybrid cotton varieties like Ubuntu 555. Basal application of organic matter along with balanced NPK ensures strong root development before monsoon heavy spells.',
    'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=600&q=80',
    5, '2026-06-20'
  ),
  (
    'Farmer Success Story: Ramesh Patel Triples Cotton Income with Ubuntu 555',
    'Success Story',
    'A Saurashtra farmer''s journey from struggling with bollworm losses to achieving his best harvest ever — powered by research-backed hybrid seeds.',
    'For three consecutive years, Ramesh Patel of Saurashtra faced heavy crop losses due to sucking pests and bollworm infestation. Switching to Ubuntu 555 transformed his farm economics. By achieving a ginning outturn of 38% and harvest weight of 5.2g per boll, Ramesh recorded a net income surge of 3x over previous years.',
    'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=600&q=80',
    4, '2026-05-10'
  ),
  (
    'Ubuntu Seeds Expands Dealer Network to Rajasthan and Madhya Pradesh',
    'Company News',
    'We are proud to announce our expansion into two new states, bringing our research-backed hybrid seeds closer to more farmers across India.',
    'Ubuntu Seeds Private Limited has officially appointed 25 new authorized retail dealers across Rajasthan (Jodhpur, Kota) and Madhya Pradesh (Indore, Ujjain). Farmers in these regions can now access genuine certified hybrid seeds with direct guidance from our regional field agronomists.',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
    2, '2026-04-05'
  ),
  (
    'Rabi Review: Record Performance of Ubuntu Glory Across Gujarat',
    'Research',
    'Post-season analysis reveals that Ubuntu Glory outperformed competitors by 18-22% in yield, with significantly better shelf life and crack resistance.',
    'Post-harvest evaluations across Anand, Kheda, and Vadodara tomato farming clusters have confirmed the superior transport durability of Ubuntu Glory. Transported over 200+ kilometers to central wholesale mandis, Ubuntu Glory showed zero fruit cracking and retained crisp firmness.',
    'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=600&q=80',
    4, '2026-03-18'
  ),
  (
    'Seasonal Crop Calendar 2026-27: Plan Your Sowing for Maximum Profit',
    'Crop Advisory',
    'Our experts have prepared a comprehensive crop calendar for Gujarat farmers — covering Kharif, Rabi, and Zaid season planning with variety recommendations.',
    'Timely rotation between cereal crops and pulses or spices protects soil microbial health while maximizing farm profit per acre. Download our comprehensive sowing guide covering optimum weather windows for Kharif, Rabi, and Zaid seasons.',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
    6, '2026-02-28'
  );

-- -----------------------------------------------------------------------------
-- 4. GALLERY SEED DATA
-- -----------------------------------------------------------------------------
INSERT INTO public.gallery (image_url, caption, category)
VALUES
  ('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', 'Farmers in Cotton Field', 'Field Days'),
  ('https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=800&q=80', 'Cotton Crop Close-up', 'Field Crops'),
  ('https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80', 'Hybrid Corn / Maize Field', 'Field Crops'),
  ('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80', 'Wheat Crop Field Day', 'Field Days'),
  ('https://images.unsplash.com/photo-1621955964441-c173e01c135b?w=800&q=80', 'Fresh Okra Harvest', 'Vegetables'),
  ('https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80', 'Crispy Cucumber Field', 'Vegetables'),
  ('https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&q=80', 'Tomato Glory Harvest', 'Vegetables'),
  ('https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80', 'Cumin & Spice Crop Trial', 'Spice Crops'),
  ('https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&q=80', 'Red Giant Chilli Plot', 'Vegetables'),
  ('https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80', 'Green Gram Moong Harvest', 'Pulses'),
  ('https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&q=80', 'Pumpkin & Gourd Crop', 'Vegetables'),
  ('https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80', 'Carrot Farm Harvest', 'Vegetables');

-- -----------------------------------------------------------------------------
-- 5. DEALERS SEED DATA
-- -----------------------------------------------------------------------------
INSERT INTO public.dealers (name, state, district, phone, address)
VALUES
  ('Patel Agro Traders', 'Gujarat', 'Ahmedabad', '+91 98250 11111', 'Shop No. 12, APMC Market, Ahmedabad'),
  ('Kisan Krishi Kendra', 'Gujarat', 'Rajkot', '+91 94260 22222', 'Near Bus Stand, Rajkot'),
  ('Saurashtra Seeds Hub', 'Gujarat', 'Jamnagar', '+91 94270 33333', 'Main Market Road, Jamnagar'),
  ('North Gujarat Agri Store', 'Gujarat', 'Mehsana', '+91 94290 44444', 'APMC Complex, Mehsana'),
  ('Anand Seed Agency', 'Gujarat', 'Anand', '+91 97230 55555', 'Near Old Bus Stand, Anand'),
  ('Surendranagar Agri Centre', 'Gujarat', 'Surendranagar', '+91 97250 66666', 'Market Yard, Surendranagar'),
  ('Khandesh Krishi Seva', 'Maharashtra', 'Jalgaon', '+91 98234 77777', 'Agricultural Market, Jalgaon'),
  ('Vidarbha Seeds World', 'Maharashtra', 'Akola', '+91 98236 88888', 'Near Krishi Bhavan, Akola'),
  ('Rajasthan Agri Point', 'Rajasthan', 'Jodhpur', '+91 94140 99999', 'Grain Market, Jodhpur'),
  ('MP Seeds & Fertilizers', 'Madhya Pradesh', 'Indore', '+91 94252 10101', 'Krishi Upaj Mandi, Indore');

-- -----------------------------------------------------------------------------
-- 6. CROP CALENDAR SEED DATA
-- -----------------------------------------------------------------------------
INSERT INTO public.crop_calendar (season, crop_name, variety_name, sowing_window, display_order)
VALUES
  ('Kharif', 'Cotton', 'Ubuntu 555', 'May–Jul', 1),
  ('Kharif', 'Hybrid Bajra', 'Ubuntu Vajra', 'Jun–Jul', 2),
  ('Kharif', 'Hybrid Corn', 'Ubuntu Master', 'Jun–Aug', 3),
  ('Kharif', 'Research Seeds', 'Ubuntu 365', 'Jun–Jul', 4),
  ('Kharif', 'Okra', 'Ubuntu Okra Royal', 'All Season', 5),
  ('Kharif', 'Cucumber', 'Ubuntu 4045', 'All Season', 6),
  ('Kharif', 'Bottle Gourd', 'Ubuntu 4050', 'Jun–Aug', 7),
  ('Kharif', 'Moong', 'Ubuntu 1618', 'Jun–Jul', 8),

  ('Rabi', 'Hybrid Corn', 'Ubuntu Master', 'Oct–Nov', 1),
  ('Rabi', 'Cumin (Jeera)', 'Ubuntu 2530', 'Nov–Dec', 2),
  ('Rabi', 'Mustard', 'Ubuntu Mustard Bold', 'Oct–Nov', 3),
  ('Rabi', 'Tomato', 'Ubuntu Glory', 'Aug–Nov', 4),
  ('Rabi', 'Cabbage', 'US Cabbage King', 'Sep–Nov', 5),
  ('Rabi', 'Carrot', 'US Carrot Orange', 'Oct–Nov', 6),

  ('Zaid', 'Okra', 'Ubuntu Okra Royal', 'Feb–May', 1),
  ('Zaid', 'Cucumber', 'Ubuntu 4045', 'Feb–Apr', 2),
  ('Zaid', 'Bottle Gourd', 'Ubuntu 4050', 'Feb–Apr', 3),
  ('Zaid', 'Cowpea', 'US Cowpea Strong', 'Mar–May', 4);
