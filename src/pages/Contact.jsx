import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import SEOHead from '../components/shared/SEOHead';

// ── EmailJS config ─────────────────────────────────────────────────────────
// Replace these with your EmailJS credentials from https://www.emailjs.com/
// Service ID: from EmailJS dashboard > Email Services
// Template ID: from EmailJS dashboard > Email Templates
// Public Key: from EmailJS dashboard > Account > API Keys
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter a valid 10-digit mobile number';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_phone: form.phone,
          from_email: form.email,
          subject: form.subject || 'General Enquiry',
          message: form.message,
          to_name: 'Ubuntu Seeds',
          reply_to: form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      toast.success('✅ Message sent! We will respond within 24 hours.');
      setForm({ name: '', phone: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error('EmailJS error:', err);
      toast.error('❌ Failed to send. Please call us directly or use WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-400 focus:ring-red-100 bg-red-50'
        : 'border-gray-200 focus:border-green-400 focus:ring-green-100'
    }`;

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Contact Ubuntu Seeds Private Limited for product enquiries, dealer partnerships, and crop advisory support. Call +91 777 89 83 555 or email info@ubuntuseeds.co.in."
        path="/contact"
        keywords="contact ubuntu seeds, seed company ahmedabad, hybrid seed enquiry, dealer enquiry gujarat"
      />

      {/* Hero */}
      <section className="pt-24 pb-12" style={{ background: 'linear-gradient(135deg, #1A4728 0%, #225D36 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Get in <span style={{ color: '#D4873B' }}>Touch</span>
            </h1>
            <p className="text-green-200 text-lg max-w-xl mx-auto">
              Have questions about our seeds, pricing, or dealership? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FDF8F0' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left — Info */}
            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Phone', value: '+91 777 89 83 555', href: 'tel:+917778983555', color: '#225D36' },
                { icon: Mail, label: 'Email', value: 'info@ubuntuseeds.co.in', href: 'mailto:info@ubuntuseeds.co.in', color: '#D4873B' },
                { icon: MapPin, label: 'Address', value: 'K.M. Estate, S. Plot-2, Akarni 5135, Near B.M. Thak, Aslali, Daskroi, Ahmedabad – 382427', href: null, color: '#6B4226' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + '15' }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-semibold hover:underline" style={{ color }}>{value}</a>
                    ) : (
                      <p className="text-sm text-gray-700">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <a
                href="https://wa.me/917778983555?text=Hello%20Ubuntu%20Seeds!"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-5 py-4 rounded-2xl text-white font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle size={22} />
                Chat on WhatsApp
              </a>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-48 border border-gray-100 shadow-sm">
                <iframe
                  title="Ubuntu Seeds Location"
                  src="https://maps.google.com/maps?q=Aslali+Daskroi+Ahmedabad+Gujarat&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-display font-bold mb-1" style={{ color: '#225D36' }}>Send Us a Message</h2>
                <p className="text-gray-400 text-sm mb-6">We respond within 24 hours. Fields marked * are required.</p>

                {/* EmailJS credentials notice — remove before going live */}
                {(EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                    ⚠️ <strong>Setup needed:</strong> Add your EmailJS credentials to <code>.env</code> — see the setup guide below.
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name *</label>
                      <input type="text" id="contact-name" placeholder="Ramesh Patel" value={form.name} onChange={update('name')} className={inputClass('name')} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Mobile Number *</label>
                      <input type="tel" id="contact-phone" placeholder="9876543210" value={form.phone} onChange={update('phone')} className={inputClass('phone')} maxLength={10} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address *</label>
                      <input type="email" id="contact-email" placeholder="your@email.com" value={form.email} onChange={update('email')} className={inputClass('email')} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Subject</label>
                      <select id="contact-subject" value={form.subject} onChange={update('subject')} className={inputClass('subject')}>
                        <option value="">Select a topic</option>
                        <option>Product Enquiry</option>
                        <option>Dealer / Distributor</option>
                        <option>Crop Advisory</option>
                        <option>Order / Delivery</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Message *</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us about your requirements, location, and which crops you grow..."
                      value={form.message}
                      onChange={update('message')}
                      className={inputClass('message')}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={sending}
                    className="w-full py-3 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#225D36' }}
                  >
                    {sending ? (
                      <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>

                {/* EmailJS setup guide */}
                <details className="mt-6 text-xs text-gray-400">
                  <summary className="cursor-pointer font-medium hover:text-gray-600">📧 EmailJS Setup Guide (click to expand)</summary>
                  <div className="mt-3 p-4 bg-gray-50 rounded-xl space-y-2 text-gray-600">
                    <p><strong>1.</strong> Go to <a href="https://www.emailjs.com" target="_blank" rel="noreferrer" className="underline text-blue-600">emailjs.com</a> and create a free account.</p>
                    <p><strong>2.</strong> Add an Email Service (e.g., Gmail) and note the <code>Service ID</code>.</p>
                    <p><strong>3.</strong> Create an Email Template and note the <code>Template ID</code>. Use these template variables: <code>{'{{from_name}}, {{from_phone}}, {{from_email}}, {{subject}}, {{message}}'}</code></p>
                    <p><strong>4.</strong> Copy your <code>Public Key</code> from Account &gt; API Keys.</p>
                    <p><strong>5.</strong> Create <code>.env</code> in the project root:</p>
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{`VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx`}</pre>
                    <p><strong>6.</strong> Restart the dev server — the form will send real emails!</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
