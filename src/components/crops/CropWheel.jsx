import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCropCalendar } from '../../hooks/useData';

const BASE_SEASONS = [
  {
    id: 'kharif',
    label: 'Kharif',
    sublabel: 'Jun – Oct',
    emoji: '☀️',
    color: '#D4873B',
    bg: '#FFF8E1',
    glow: 'rgba(212,135,59,0.3)',
    angle: -90, // top
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
  },
];

export default function CropWheel() {
  const { cropCalendar } = useCropCalendar();
  const [activeSeason, setActiveSeason] = useState('kharif');

  const seasonsData = useMemo(() => {
    return BASE_SEASONS.map((s) => {
      const seasonCrops = cropCalendar
        .filter((item) => item.season.toLowerCase() === s.id)
        .map((item) => ({
          name: item.crop_name,
          variety: item.variety_name,
          sowing: item.sowing_window,
        }));
      return {
        ...s,
        crops: seasonCrops.length > 0 ? seasonCrops : [],
      };
    });
  }, [cropCalendar]);

  const activeData = seasonsData.find((s) => s.id === activeSeason) || seasonsData[0];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-amber-100/60 max-w-4xl mx-auto my-8">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 mb-2">
          Interactive Wheel
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
          Seasonal Sowing Calendar
        </h2>
        <p className="text-gray-500 text-sm mt-1">Select a season to view recommended Ubuntu hybrid seed varieties</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Wheel graphic */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 animate-spin-slow" style={{ animationDuration: '60s' }} />

            {/* Season buttons positioned in a circle */}
            {seasonsData.map((season) => {
              const isActive = activeSeason === season.id;
              const rad = (season.angle * Math.PI) / 180;
              const radius = 95; // px from center
              const x = Math.round(radius * Math.cos(rad));
              const y = Math.round(radius * Math.sin(rad));

              return (
                <button
                  key={season.id}
                  onClick={() => setActiveSeason(season.id)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    borderColor: isActive ? season.color : 'transparent',
                    boxShadow: isActive ? `0 0 20px ${season.glow}` : '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                  className={`absolute w-20 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                    isActive ? 'scale-110 z-20 text-white font-bold' : 'bg-white text-gray-700 hover:scale-105 z-10 border border-gray-100'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-2xl flex flex-col items-center justify-center p-1 transition-all ${
                      isActive ? '' : ''
                    }`}
                    style={{ backgroundColor: isActive ? season.color : season.bg }}
                  >
                    <span className="text-xl mb-0.5">{season.emoji}</span>
                    <span className={`text-xs ${isActive ? 'text-white font-bold' : 'text-gray-800 font-semibold'}`}>{season.label}</span>
                    <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-gray-500'}`}>{season.sublabel}</span>
                  </div>
                </button>
              );
            })}

            {/* Center hub */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-800 to-green-900 text-white flex flex-col items-center justify-center text-center shadow-lg border-2 border-white z-10">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">Ubuntu</span>
              <span className="text-[9px] text-white/80">Calendar</span>
            </div>
          </div>

          <div className="flex gap-2 mt-6 md:hidden">
            {seasonsData.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSeason(s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeSeason === s.id ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600'
                }`}
                style={activeSeason === s.id ? { backgroundColor: s.color } : {}}
              >
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected season details */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSeason}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-6 border border-gray-100 shadow-sm"
              style={{ backgroundColor: activeData.bg }}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeData.emoji}</span>
                  <div>
                    <h3 className="font-display font-bold text-xl text-gray-900">{activeData.label} Season</h3>
                    <p className="text-xs font-medium text-gray-500">Sowing Period: {activeData.sublabel}</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-xs" style={{ backgroundColor: activeData.color }}>
                  {activeData.crops.length} Recommended Varieties
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {activeData.crops.map((crop, i) => (
                  <div key={i} className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-black/5 shadow-2xs">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900 text-xs">{crop.name}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200">
                        {crop.sowing}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-amber-900 mt-1">{crop.variety}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
