import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Leaf, Award, Users, FlaskConical, Truck } from 'lucide-react';

const timeline = [
  { icon: FlaskConical, step: '01', title: 'Seed Research & Breeding', desc: 'Our scientists work on developing new hybrids through controlled crossing and selection under diverse agro-climatic conditions.' },
  { icon: Leaf, step: '02', title: 'Multi-Location Field Trials', desc: 'Each variety undergoes rigorous trials across different soil types, rainfall zones, and states before being approved for release.' },
  { icon: Award, step: '03', title: 'Quality Testing & Certification', desc: 'Seeds are tested for germination, genetic purity, physical purity, and moisture before certification by accredited labs.' },
  { icon: Truck, step: '04', title: 'Distribution to Farmers', desc: 'Certified seeds reach farmers through our trusted dealer and distributor network across Gujarat and other states.' },
];

const team = [
  { name: 'Dr. Arjun Patel', role: 'Head of Seed Research', initials: 'AP', color: '#225D36' },
  { name: 'Priya Shah', role: 'Quality Assurance Lead', initials: 'PS', color: '#D4873B' },
  { name: 'Vijay Desai', role: 'Business Development', initials: 'VD', color: '#6B4226' },
  { name: 'Neha Mehta', role: 'Agronomy Specialist', initials: 'NM', color: '#2E7D48' },
];

export default function About() {
  useEffect(() => { document.title = 'About Us — Ubuntu Seeds'; }, []);

  return (
    <>
      {/* Hero */}
      <section
        className="pt-28 sm:pt-36 pb-12 sm:pb-20 relative overflow-hidden max-w-full"
        style={{ background: 'linear-gradient(135deg, #1A4728 0%, #225D36 60%, #2E7D48 100%)' }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-block px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-amber-200 mb-4 border border-amber-400/40" style={{ backgroundColor: 'rgba(212,135,59,0.2)' }}>
              Our Story
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
              Seeds of Trust,
              <br />
              <span style={{ color: '#D4873B' }}>Harvests of Hope</span>
            </h1>
            <p className="text-green-200 text-sm sm:text-lg leading-relaxed">
              Founded in December 2022, Ubuntu Seeds Private Limited was born with a singular mission: to put research-quality hybrid seeds within reach of every Indian farmer — from large farms to small holdings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ backgroundColor: '#FDF8F0' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: Target,
                color: '#225D36',
                bg: '#E8F5E9',
                title: 'Our Mission',
                text: 'To develop and deliver research-backed hybrid seeds that maximise yield, resist disease, and adapt to Indian soil and climate conditions — making every acre more profitable for the farmer.',
              },
              {
                icon: Eye,
                color: '#D4873B',
                bg: '#FFF3E0',
                title: 'Our Vision',
                text: 'To become India\'s most trusted seed research company — known for scientific integrity, farmer-first values, and consistent crop performance across every season.',
              },
            ].map(({ icon: Icon, color, bg, title, text }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: bg }}>
                  <Icon size={28} style={{ color }} />
                </div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">{title}</h2>
                <p className="text-gray-600 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Built on <span style={{ color: '#225D36' }}>Research</span> and <span style={{ color: '#D4873B' }}>Farmer Trust</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ubuntu Seeds Pvt. Ltd. was incorporated on December 22, 2022, and registered with the Registrar of Companies, Ahmedabad. From day one, we invested in agronomic research and multi-location variety trials across Gujarat, Rajasthan, and Maharashtra.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The name "Ubuntu" — a Zulu philosophy meaning "I am because we are" — reflects our belief that a farmer's success is our success. Every variety we develop starts with one question: what does the farmer truly need?
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, our portfolio spans field crops, vegetable seeds, pulses, and spice crops — with new varieties continuously in the pipeline, and a growing dealer network reaching farmers across multiple states.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700&q=80"
                alt="Farmers in field"
                className="rounded-3xl w-full h-80 object-cover shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
                <p className="text-3xl font-display font-bold" style={{ color: '#225D36' }}>2022</p>
                <p className="text-sm text-gray-500">Year Founded</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
                <p className="text-3xl font-display font-bold" style={{ color: '#D4873B' }}>20+</p>
                <p className="text-sm text-gray-500">Seed Varieties</p>
              </div>
            </motion.div>
          </div>

          {/* R&D Timeline */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Our Quality Process</h2>
              <p className="text-gray-500">From lab to field — every variety goes through our rigorous 4-step process</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map(({ icon: Icon, step, title, desc }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                    <Icon size={24} style={{ color: '#225D36' }} />
                  </div>
                  <div className="text-4xl font-display font-bold mb-2" style={{ color: '#E8F5E9', WebkitTextStroke: '2px #225D36' }}>{step}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Our Team</h2>
            <p className="text-gray-500">The people behind your seeds' success</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {team.map(({ name, role, initials, color }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: color }}
                >
                  {initials}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{name}</h3>
                <p className="text-gray-400 text-xs mt-1">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
