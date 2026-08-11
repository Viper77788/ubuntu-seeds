import { motion } from 'framer-motion';
import CropTypeCard from './CropTypeCard';

export default function CropTypeGrid({ cropTypeGroups, onSelectCropType, onSelectSingleVariety }) {
  if (!cropTypeGroups || cropTypeGroups.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 shadow-xs">
        <div className="text-6xl mb-4">🌱</div>
        <h3 className="text-xl font-display font-semibold text-gray-700 mb-2">No crop types found</h3>
        <p className="text-gray-500 text-sm">Try selecting a different category or clearing your filters.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {cropTypeGroups.map((group, idx) => (
        <motion.div
          key={group.cropTypeSlug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.04 }}
        >
          <CropTypeCard
            cropTypeGroup={group}
            onSelectCropType={onSelectCropType}
            onSelectSingleVariety={onSelectSingleVariety}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
