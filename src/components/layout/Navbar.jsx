import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import { FacebookIcon, YoutubeIcon, InstagramIcon, LinkedinIcon } from '../shared/SocialIcons';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { label: t('nav.home'),     path: '/' },
    { label: t('nav.about'),    path: '/about' },
    { label: t('nav.products'), path: '/products' },
    { label: t('nav.advisory'), path: '/crop-advisory' },
    { label: t('nav.dealer'),   path: '/find-dealer' },
    { label: t('nav.gallery'),  path: '/gallery' },
    { label: t('nav.contact'),  path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isHome = pathname === '/';
  const transparent = isHome && !isScrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100'
      }`}
    >
      {/* ── Top Bar ── */}
      <div className="text-white text-xs py-1 px-3 sm:px-6" style={{ backgroundColor: '#225D36' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-3 sm:gap-4 truncate">
            <a href="tel:+917778983555" className="flex items-center gap-1 hover:text-yellow-300 transition-colors text-[11px] sm:text-xs shrink-0" aria-label="Call us">
              <Phone size={12} className="shrink-0" />
              <span>+91 777 89 83 555</span>
            </a>
            <a href="mailto:info@ubuntuseeds.co.in" className="hidden md:flex items-center gap-1 hover:text-yellow-300 transition-colors text-xs truncate" aria-label="Email us">
              <Mail size={12} className="shrink-0" />
              <span className="truncate">info@ubuntuseeds.co.in</span>
            </a>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <a href="https://www.facebook.com/ubuntuseeds/" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-yellow-300 transition-colors p-0.5">
              <FacebookIcon size={14} />
            </a>
            <a href="https://www.youtube.com/@Ubuntuseeds" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-yellow-300 transition-colors p-0.5">
              <YoutubeIcon size={15} />
            </a>
            <a href="https://www.instagram.com/Ubuntuseeds" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-yellow-300 transition-colors p-0.5">
              <InstagramIcon size={14} />
            </a>
            <a href="https://www.linkedin.com/company/ubuntu-seeds-pvt-ltd/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-yellow-300 transition-colors p-0.5">
              <LinkedinIcon size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center shrink-0" aria-label="Ubuntu Seeds Home">
            {transparent ? (
              <div className="flex items-center gap-2">
                <img
                  src="/logo-icon.png"
                  alt="Ubuntu Seeds Icon"
                  className="h-7 sm:h-9 w-auto object-contain shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-base sm:text-xl leading-tight text-white">Ubuntu Seeds</span>
                  <span className="text-[10px] sm:text-xs leading-none text-green-200">Grow with Confidence</span>
                </div>
              </div>
            ) : (
              <img
                src="/logo.png"
                alt="Ubuntu Seeds"
                className="h-8 sm:h-10 max-w-[130px] sm:max-w-[180px] w-auto object-contain shrink-0"
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.path
                    ? 'text-white'
                    : transparent
                    ? 'text-green-100 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-green-800 hover:bg-green-50'
                }`}
                style={pathname === link.path ? { backgroundColor: '#225D36' } : {}}
                aria-current={pathname === link.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}

            <div className="ml-1">
              <LanguageSwitcher transparent={transparent} />
            </div>

            <a
              href="tel:+917778983555"
              className="ml-2 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 hover:scale-105 shrink-0"
              style={{ backgroundColor: '#D4873B' }}
            >
              {t('nav.callNow')}
            </a>
          </nav>

          {/* Mobile & Tablet Right Controls */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <LanguageSwitcher transparent={transparent} />
            <button
              className={`p-2 rounded-xl transition-colors ${
                transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-2xl overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    pathname === link.path ? 'text-white shadow-sm' : 'text-gray-700 hover:bg-green-50 hover:text-green-800'
                  }`}
                  style={pathname === link.path ? { backgroundColor: '#225D36' } : {}}
                  aria-current={pathname === link.path ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+917778983555"
                className="mt-3 px-4 py-3 text-sm font-semibold text-white rounded-xl text-center shadow-md flex items-center justify-center gap-2"
                style={{ backgroundColor: '#D4873B' }}
              >
                <span>📞</span> {t('nav.callNow')} — +91 777 89 83 555
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
