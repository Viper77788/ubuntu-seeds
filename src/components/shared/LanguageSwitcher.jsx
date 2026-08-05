import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

const LANGS = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'gu', label: 'ગુજરાતી', flag: '🪔' },
];

export default function LanguageSwitcher({ transparent = false }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = LANGS.find((l) => l.code === i18n.language) || LANGS[0];

  const select = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    setOpen(false);
  };

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
          transparent
            ? 'text-green-100 hover:text-white hover:bg-white/10 border border-white/20'
            : 'text-gray-600 hover:text-green-800 hover:bg-green-50 border border-gray-200 bg-white'
        }`}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe size={13} className="shrink-0" />
        <span className="font-semibold">{current.code.toUpperCase()}</span>
        <ChevronDown size={11} className={`transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-32"
            >
              {LANGS.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => select(lang.code)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-left transition-colors hover:bg-green-50 ${
                    i18n.language === lang.code ? 'font-semibold text-green-700 bg-green-50' : 'text-gray-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                  {i18n.language === lang.code && <span className="ml-auto text-green-500 text-xs">✓</span>}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
