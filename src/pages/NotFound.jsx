import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  useEffect(() => { document.title = '404 — Page Not Found | Ubuntu Seeds'; }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FDF8F0' }}>
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-9xl mb-6">🌱</div>
        <h1 className="text-6xl font-display font-bold mb-4" style={{ color: '#225D36' }}>404</h1>
        <h2 className="text-2xl font-display font-semibold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          Looks like this page took a different turn in the field. Let's get you back to familiar ground.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#225D36' }}
          >
            <Home size={18} /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-all hover:bg-gray-50"
            style={{ borderColor: '#225D36', color: '#225D36' }}
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
