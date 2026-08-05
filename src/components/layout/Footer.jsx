import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin } from 'lucide-react';
import { FacebookIcon, YoutubeIcon, InstagramIcon, LinkedinIcon } from '../shared/SocialIcons';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Products', path: '/products' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'News & Blog', path: '/crop-advisory' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Cotton Seeds', path: '/products?cat=Field+Crops' },
      { label: 'Hybrid Bajra', path: '/products?cat=Field+Crops' },
      { label: 'Hybrid Corn', path: '/products?cat=Field+Crops' },
      { label: 'Vegetable Seeds', path: '/products?cat=Vegetable+Crops' },
      { label: 'Spice Crops', path: '/products?cat=Spice+Crops' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Crop Advisory', path: '/crop-advisory' },
      { label: 'Find a Dealer', path: '/find-dealer' },
      { label: 'Become a Dealer', path: '/find-dealer#become-dealer' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: '#1A4728' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/logo-icon.png"
                alt="Ubuntu Seeds"
                className="h-10 w-auto object-contain"
              />
              <div>
                <div className="font-display font-bold text-xl text-white">Ubuntu Seeds</div>
                <div className="text-green-300 text-xs">Grow with Confidence</div>
              </div>
            </Link>
            <p className="text-green-200 text-sm leading-relaxed mb-6">
              Ubuntu Seeds Private Limited is a research-driven agricultural seed company based in Ahmedabad, Gujarat. We develop and supply hybrid seeds for field crops, vegetables, pulses, and spices — empowering farmers across India.
            </p>
            {/* Contact info */}
            <div className="space-y-2">
              <a href="tel:+917778983555" className="flex items-center gap-2 text-green-200 hover:text-yellow-300 text-sm transition-colors">
                <Phone size={14} />
                +91 777 89 83 555
              </a>
              <a href="mailto:info@ubuntuseeds.co.in" className="flex items-center gap-2 text-green-200 hover:text-yellow-300 text-sm transition-colors">
                <Mail size={14} />
                info@ubuntuseeds.co.in
              </a>
              <div className="flex items-start gap-2 text-green-200 text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>K.M. Estate, S. Plot-2, Akarni 5135, Near B.M. Thak, Aslali, Daskroi, Ahmedabad – 382427</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { href: 'https://www.facebook.com/ubuntuseeds/', label: 'Facebook', Icon: FacebookIcon },
                { href: 'https://www.youtube.com/@Ubuntuseeds', label: 'YouTube', Icon: YoutubeIcon },
                { href: 'https://www.instagram.com/Ubuntuseeds', label: 'Instagram', Icon: InstagramIcon },
                { href: 'https://www.linkedin.com/company/ubuntu-seeds-pvt-ltd/', label: 'LinkedIn', Icon: LinkedinIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-green-700/80 flex items-center justify-center text-green-200 hover:bg-amber-600 hover:text-white transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-green-300 hover:text-yellow-300 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-green-400 text-xs">
            © {new Date().getFullYear()} Ubuntu Seeds Private Limited. All rights reserved.
          </p>
          <p className="text-green-400 text-xs">
            CIN: U01100GJ2022PTC137672 · Ahmedabad, Gujarat, India
          </p>
        </div>
      </div>
    </footer>
  );
}
