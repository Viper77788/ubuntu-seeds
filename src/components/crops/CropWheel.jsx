import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Data ─────────────────────────────────────────────────────────────────────
const SEASONS = [
  {
    id: 'kharif',
    label: 'Kharif',
    sublabel: 'Jun – Oct',
    emoji: '☀️',
    color: '#D4873B',
    bg: '#FFF8E1',
    glow: 'rgba(212,135,59,0.3)',
    angle: -90, // top
    crops: [
      { name: 'Cotton', variety: 'US Cotton 101 / 202', sowing: 'May–Jul' },
      { name: 'Hybrid Bajra', variety: 'US Bajra Gold', sowing: 'Jun–Jul' },
      { name: 'Hybrid Corn', variety: 'US Maize Pro 401', sowing: 'Jun–Aug' },
      { name: 'Sesamum', variety: 'US Sesame Research 1', sowing: 'Jun–Jul' },
      { name: 'Okra', variety: 'US Okra Supreme', sowing: 'All Season' },
      { name: 'Bitter Gourd', variety: 'US Karela Pro', sowing: 'Jun–Aug' },
      { name: 'Cucumber', variety: 'US Cucumber Fresh', sowing: 'All Season' },
      { name: 'Moong', variety: 'US Moong Gold', sowing: 'Jun–Jul' },
    ],
  },
  {
    id: 'rabi',
    label: 'Rabi',
    sublabel: 'Oct – Feb',
    emoji: '❄️',
    color: '#225D36',
    bg: '#E8F5E9',
    glow: 'rgba(34,93,54,0.3)',
    angle: 30, // bottom-right
    crops: [
      { name: 'Wheat', variety: 'US Wheat Research 1', sowing: 'Oct–Nov' },
      { name: 'Hybrid Corn', variety: 'US Maize Pro 401', sowing: 'Oct–Nov' },
      { name: 'Cumin (Jeera)', variety: 'US Cumin Select', sowing: 'Nov–Dec' },
      { name: 'Mustard', variety: 'US Mustard Bold', sowing: 'Oct–Nov' },
      { name: 'Cabbage', variety: 'US Cabbage King', sowing: 'Sep–Nov' },
      { name: 'Tomato', variety: 'US Tomato King', sowing: 'Aug–Nov' },
      { name: 'Carrot', variety: 'US Carrot Orange', sowing: 'Oct–Nov' },
      { name: 'Radish', variety: 'US Radish White', sowing: 'Rabi/Winter' },
    ],
  },
  {
    id: 'zaid',
    label: 'Zaid',
    sublabel: 'Feb – Jun',
    emoji: '🌸',
    color: '#6B4226',
    bg: '#FBE9E7',
    glow: 'rgba(107,66,38,0.3)',
    angle: 150, // bottom-left
    crops: [
      { name: 'Okra', variety: 'US Okra Supreme', sowing: 'Feb–May' },
      { name: 'Cucumber', variety: 'US Cucumber Fresh', sowing: 'Feb–Apr' },
      { name: 'Ridge Gourd', variety: 'US Turai Select', sowing: 'Feb–Apr' },
      { name: 'Bottle Gourd', variety: 'US Lauki Long', sowing: 'Feb–Apr' },
      { name: 'Cowpea', variety: 'US Cowpea Strong', sowing: 'Mar–May' },
      { name: 'Moong', variety: 'US Moong Gold', sowing: 'Feb–Apr' },
      { name: 'Sesamum', variety: 'US Sesame Research 1', sowing: 'Feb–May' },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function polarToXY(angleDeg, r, cx = 200, cy = 200) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function CropWheel() {
  const [active, setActive] = useState(SEASONS[0]);

  const CX = 200, CY = 200, R_OUTER = 155, R_INNER = 72, R_LABEL = 125, R_DOT = 160;

  // Build SVG arc segments (3 equal segments of 120°)
  function describeArc(startAngle, endAngle, r) {
    const gap = 4; // degrees gap between segments
    const s = polarToXY(startAngle + gap / 2, r);
    const e = polarToXY(endAngle - gap / 2, r);
    const si = polarToXY(startAngle + gap / 2, R_INNER + 4);
    const ei = polarToXY(endAngle - gap / 2, R_INNER + 4);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return [
      `M ${si.x} ${si.y}`,
      `L ${s.x} ${s.y}`,
      `A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`,
      `L ${ei.x} ${ei.y}`,
      `A ${R_INNER + 4} ${R_INNER + 4} 0 ${large} 0 ${si.x} ${si.y}`,
      'Z',
    ].join(' ');
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      {/* ── Wheel SVG ── */}
      <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-square mx-auto shrink-0">
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl">
          {/* Outer ring background */}
          <circle cx={CX} cy={CY} r={R_OUTER + 12} fill="#f5f5f0" />

          {/* Season segments */}
          {SEASONS.map((season, i) => {
            const startAngle = i * 120 - 90;
            const endAngle = startAngle + 120;
            const isActive = active.id === season.id;
            const d = describeArc(startAngle, endAngle, R_OUTER);
            const labelPos = polarToXY(startAngle + 60, R_LABEL);
            const dotPos = polarToXY(startAngle + 60, R_DOT + 10);

            return (
              <g
                key={season.id}
                onClick={() => setActive(season)}
                className="cursor-pointer"
                style={{ transition: 'all 0.3s' }}
              >
                {/* Glow for active */}
                {isActive && (
                  <circle
                    cx={dotPos.x}
                    cy={dotPos.y}
                    r={18}
                    fill={season.glow}
                    className="animate-pulse"
                  />
                )}
                {/* Segment */}
                <path
                  d={d}
                  fill={isActive ? season.color : season.bg}
                  stroke="white"
                  strokeWidth="3"
                  style={{ filter: isActive ? `drop-shadow(0 0 8px ${season.glow})` : 'none', transition: 'all 0.3s' }}
                />
                {/* Season label inside segment */}
                <text
                  x={labelPos.x}
                  y={labelPos.y - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="Poppins, sans-serif"
                  fill={isActive ? 'white' : season.color}
                  style={{ transition: 'fill 0.3s' }}
                >
                  {season.label}
                </text>
                <text
                  x={labelPos.x}
                  y={labelPos.y + 9}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="9"
                  fontFamily="Inter, sans-serif"
                  fill={isActive ? 'rgba(255,255,255,0.8)' : '#999'}
                  style={{ transition: 'fill 0.3s' }}
                >
                  {season.sublabel}
                </text>
                {/* Emoji dot */}
                <text
                  x={dotPos.x}
                  y={dotPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="18"
                >
                  {season.emoji}
                </text>
              </g>
            );
          })}

          {/* Inner circle hub */}
          <circle cx={CX} cy={CY} r={R_INNER} fill="white" stroke="#e5e7eb" strokeWidth="2" />
          <text x={CX} y={CY - 10} textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="800" fontFamily="Poppins, sans-serif" fill={active.color} style={{ transition: 'fill 0.4s' }}>
            {active.emoji}
          </text>
          <text x={CX} y={CY + 10} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="600" fontFamily="Poppins, sans-serif" fill={active.color} style={{ transition: 'fill 0.4s' }}>
            {active.crops.length} Crops
          </text>
          <text x={CX} y={CY + 24} textAnchor="middle" dominantBaseline="middle" fontSize="8" fontFamily="Inter, sans-serif" fill="#aaa">
            tap to explore
          </text>
        </svg>

        {/* Rotating ring markers */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[0, 120, 240].map((deg, i) => {
            const rad = ((deg - 90) * Math.PI) / 180;
            const x = 180 + 168 * Math.cos(rad);
            const y = 180 + 168 * Math.sin(rad);
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gray-300"
                style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
              />
            );
          })}
        </div>
      </div>

      {/* ── Crop list panel ── */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-3"
              style={{ backgroundColor: active.bg, color: active.color }}
            >
              {active.emoji} {active.label} Season · {active.sublabel}
            </div>
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-5">
              Crops to Sow This Season
            </h3>
            <div className="space-y-2">
              {active.crops.map((crop, i) => (
                <motion.div
                  key={crop.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl border hover:shadow-sm transition-all bg-white"
                  style={{ borderColor: active.color + '25' }}
                >
                  <div
                    className="w-1.5 h-full min-h-8 rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: active.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">{crop.name}</span>
                      <span className="text-xs text-gray-400 shrink-0">{crop.sowing}</span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: active.color }}>{crop.variety}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
