import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import './i18n/index.js';
import Layout from './components/layout/Layout';

// ── Route-level code splitting ─────────────────────────────────────────────
const Home         = lazy(() => import('./pages/Home'));
const About        = lazy(() => import('./pages/About'));
const Products     = lazy(() => import('./pages/Products'));
const CropAdvisory = lazy(() => import('./pages/CropAdvisory'));
const DealerLocator = lazy(() => import('./pages/DealerLocator'));
const Gallery      = lazy(() => import('./pages/Gallery'));
const Contact      = lazy(() => import('./pages/Contact'));
const NotFound     = lazy(() => import('./pages/NotFound'));

// ── Page loading fallback ─────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ backgroundColor: '#FDF8F0' }}
    >
      {/* Pulsing logo icon */}
      <div className="relative flex items-center justify-center">
        {/* Subtle glowing background ring */}
        <div
          className="absolute w-24 h-24 rounded-full animate-ping opacity-25"
          style={{ backgroundColor: '#225D36', animationDuration: '1.5s' }}
        />
        <div
          className="relative w-20 h-20 rounded-full flex items-center justify-center bg-white shadow-lg border border-green-100"
        >
          <img
            src="/logo-icon.png"
            alt="Ubuntu Seeds loading"
            className="w-12 h-12 object-contain"
            style={{
              animation: 'logoBounce 1s ease-in-out infinite alternate',
            }}
          />
        </div>
      </div>
      <p
        className="mt-6 text-sm font-bold tracking-widest uppercase"
        style={{ color: '#225D36', letterSpacing: '0.15em' }}
      >
        Ubuntu Seeds
      </p>
      <p className="text-xs text-gray-400 mt-1 font-medium">Grow with Confidence</p>

      <style>{`
        @keyframes logoBounce {
          from { transform: scale(0.92); }
          to   { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#225D36',
              color: '#fff',
              borderRadius: '8px',
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
            <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
            <Route path="products" element={<Suspense fallback={<PageLoader />}><Products /></Suspense>} />
            <Route path="products/:categorySlug" element={<Suspense fallback={<PageLoader />}><Products /></Suspense>} />
            <Route path="products/:categorySlug/:cropTypeSlug" element={<Suspense fallback={<PageLoader />}><Products /></Suspense>} />
            <Route path="crop-advisory" element={<Suspense fallback={<PageLoader />}><CropAdvisory /></Suspense>} />
            <Route path="find-dealer" element={<Suspense fallback={<PageLoader />}><DealerLocator /></Suspense>} />
            <Route path="gallery" element={<Suspense fallback={<PageLoader />}><Gallery /></Suspense>} />
            <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
