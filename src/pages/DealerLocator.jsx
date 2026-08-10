import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Building2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STATES } from '../data/dealers';
import { useDealers } from '../hooks/useData';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import SEOHead from '../components/shared/SEOHead';

// Fix Leaflet default icon in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom green teardrop marker
const greenIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;background:#225D36;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);transform:rotate(-45deg)"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
});

// Approximate coords for each dealer city
const DEALER_COORDS = {
  8:  [20.7002, 77.0082], // Akola
  9:  [26.2389, 73.0243], // Jodhpur
  10: [22.7196, 75.8577], // Indore
};

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_DEALER_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY';

export default function DealerLocator() {
  const [selectedState, setSelectedState] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', message: '' });
  const [sending, setSending] = useState(false);
  const [activeDealer, setActiveDealer] = useState(null);

  const filtered = dealers.filter((d) => {
    const matchState = !selectedState || d.state === selectedState;
    const matchSearch = !search
      || d.name.toLowerCase().includes(search.toLowerCase())
      || d.city.toLowerCase().includes(search.toLowerCase())
      || d.district.toLowerCase().includes(search.toLowerCase());
    return matchState && matchSearch;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_phone: form.phone,
          from_email: form.email || 'Not provided',
          subject: 'Dealer Enquiry — Ubuntu Seeds',
          message: `City/District: ${form.city}\n\n${form.message}`,
          to_name: 'Ubuntu Seeds',
        },
        EMAILJS_PUBLIC_KEY
      );
      toast.success('✅ Dealer enquiry sent! Our team will contact you within 48 hours.');
      setForm({ name: '', phone: '', email: '', city: '', message: '' });
    } catch {
      toast.error('❌ Send failed. Please call us directly at +91 777 89 83 555.');
    } finally {
      setSending(false);
    }
  };

  const mapCenter = [22.2587, 71.1924]; // Gujarat centre

  return (
    <>
      <SEOHead
        title="Find a Dealer"
        description="Find authorised Ubuntu Seeds dealers near you in Gujarat, Maharashtra, Rajasthan, and Madhya Pradesh. Become an authorised dealer — enquire now."
        path="/find-dealer"
        keywords="ubuntu seeds dealer gujarat, hybrid seed dealer ahmedabad, seed dealer rajkot, become seed dealer india"
      />

      <section className="pt-24 pb-12" style={{ background: 'linear-gradient(135deg, #1A4728 0%, #225D36 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Find a <span style={{ color: '#D4873B' }}>Dealer</span> Near You
            </h1>
            <p className="text-green-200 text-lg max-w-xl mx-auto">
              Our authorised dealers across Gujarat, Maharashtra, Rajasthan, and Madhya Pradesh.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FDF8F0' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Leaflet Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-8" style={{ height: '380px' }}>
            <MapContainer
              center={mapCenter}
              zoom={6}
              style={{ height: '100%', width: '100%', zIndex: 0 }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {dealers.map((dealer) => {
                const coords = DEALER_COORDS[dealer.id];
                if (!coords) return null;
                return (
                  <Marker
                    key={dealer.id}
                    position={coords}
                    icon={greenIcon}
                    eventHandlers={{ click: () => setActiveDealer(dealer) }}
                  >
                    <Popup>
                      <div className="text-sm">
                        <strong>{dealer.name}</strong><br />
                        {dealer.city}, {dealer.state}<br />
                        <a href={`tel:${dealer.phone.replace(/\s/g, '')}`} style={{ color: '#225D36' }}>{dealer.phone}</a>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-48 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                id="dealer-search"
                placeholder="Search by city, district, or dealer name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
              />
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 bg-gray-50"
              id="dealer-state-filter"
            >
              <option value="">All States</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Showing <strong>{filtered.length}</strong> dealers
            {search && <> for "<strong>{search}</strong>"</>}
            {selectedState && <> in <strong>{selectedState}</strong></>}
          </p>

          {/* Dealer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-gray-400">
                <p className="text-4xl mb-3">🗺️</p>
                <p className="text-lg font-medium">No dealers found</p>
                <p className="text-sm">Try a different search or <a href="tel:+917778983555" className="underline" style={{ color: '#225D36' }}>call us directly</a></p>
              </div>
            ) : filtered.map((dealer, i) => (
              <motion.div
                key={dealer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`bg-white rounded-2xl p-5 shadow-sm border transition-all card-hover cursor-pointer ${
                  activeDealer?.id === dealer.id ? 'border-green-400 shadow-md ring-2 ring-green-100' : 'border-gray-100'
                }`}
                onClick={() => setActiveDealer(dealer)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#E8F5E9' }}>
                    <Building2 size={20} style={{ color: '#225D36' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{dealer.name}</h3>
                    <p className="text-xs text-gray-400">{dealer.contact}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-xs text-gray-500">
                    <MapPin size={12} className="mt-0.5 shrink-0" style={{ color: '#225D36' }} />
                    <span>{dealer.address}, {dealer.state}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Phone size={12} style={{ color: '#D4873B' }} />
                    <a href={`tel:${dealer.phone.replace(/\s/g, '')}`} className="font-medium" style={{ color: '#D4873B' }}>{dealer.phone}</a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {dealer.products.map((p) => (
                    <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">{p}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Become a Dealer Form ── */}
          <div id="become-dealer" className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3" style={{ backgroundColor: '#E8F5E9', color: '#225D36' }}>
                  Join Our Network
                </span>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Become an Authorised Dealer</h2>
                <p className="text-gray-500">Join our growing dealer network and bring premium hybrid seeds to your local farming community.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name *</label>
                    <input required id="dealer-name" type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm(f => ({...f, name: e.target.value}))} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Mobile *</label>
                    <input required id="dealer-phone" type="tel" placeholder="10-digit mobile" value={form.phone} onChange={(e) => setForm(f => ({...f, phone: e.target.value}))} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Email</label>
                    <input id="dealer-email" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm(f => ({...f, email: e.target.value}))} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">City / District *</label>
                    <input required id="dealer-city" type="text" placeholder="Your city" value={form.city} onChange={(e) => setForm(f => ({...f, city: e.target.value}))} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Message</label>
                  <textarea id="dealer-message" rows={4} placeholder="Tell us about your existing business, crops you deal in, and area coverage..." value={form.message} onChange={(e) => setForm(f => ({...f, message: e.target.value}))} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
                </div>
                <button
                  id="dealer-submit"
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#225D36' }}
                >
                  {sending
                    ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Submitting...</>
                    : 'Submit Dealer Enquiry'
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
