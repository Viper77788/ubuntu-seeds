import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CropTypeCard({ cropTypeGroup, onSelectCropType, onSelectSingleVariety }) {
  const { cropType, cropTypeSlug, products, representativeImage, varietyCount } = cropTypeGroup;
  const isSingleVariety = varietyCount === 1;
  const singleProduct = products[0];

  const handleClick = () => {
    if (isSingleVariety && singleProduct) {
      onSelectSingleVariety(singleProduct);
    } else {
      onSelectCropType(cropTypeSlug);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={handleClick}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-300 cursor-pointer transition-all duration-300 flex flex-col justify-between"
    >
      {/* Representative Image */}
      <div className="relative h-48 sm:h-56 bg-gray-50 overflow-hidden flex items-center justify-center p-4">
        <img
          src={representativeImage}
          alt={cropType}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {/* Variety Count Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-900/80 backdrop-blur-md text-white border border-white/20 shadow-sm flex items-center gap-1">
            {varietyCount === 1 ? (
              <>
                <Sparkles size={12} className="text-amber-400" /> 1 Variety
              </>
            ) : (
              `${varietyCount} Varieties`
            )}
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-lg font-bold text-gray-900 font-display group-hover:text-green-800 transition-colors">
            {cropType}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {isSingleVariety
              ? singleProduct?.description || `Explore our premium ${cropType} hybrid variety.`
              : `Explore ${varietyCount} high-yielding research hybrid varieties for ${cropType}.`}
          </p>
        </div>

        {/* Footer Action */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-green-700 group-hover:text-green-900">
            {isSingleVariety ? 'View Specifications' : 'Browse Varieties'}
          </span>
          <div className="w-7 h-7 rounded-full bg-green-50 group-hover:bg-green-700 group-hover:text-white text-green-800 flex items-center justify-center transition-all duration-300">
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
