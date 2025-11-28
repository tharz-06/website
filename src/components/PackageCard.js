import React, { useEffect, useState } from 'react';
import { Star, Heart, Shield, Info, ArrowRight } from 'lucide-react';
import { getImageForItem, categoryPlaceholders } from '../data/imagePlaceholders';
import { isWishlisted, toggleWishlistItem } from '../utils/wishlist';

const PackageCard = ({ package: pkg, onBookNow, onViewDetails }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isWishlisted(pkg.id));
  }, [pkg.id]);

  const onToggleWishlist = () => {
    toggleWishlistItem(pkg);
    setLiked(isWishlisted(pkg.id));
  };

  return (
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
    <div className="relative">
      <img src={getImageForItem(pkg)} alt={pkg.name} className="w-full h-56 object-cover" onError={(e)=>{e.currentTarget.src=categoryPlaceholders[(pkg?.category||'default').toLowerCase()] || categoryPlaceholders.default || '/logo512.png';}} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      {pkg.rating >= 4.8 && (
        <div className="absolute left-0 top-4 bg-yellow-400 text-black px-3 py-1 rounded-r-full text-xs font-bold shadow">Top Rated</div>
      )}
      <div className="absolute top-4 right-4">
        <button aria-label="Toggle wishlist" onClick={onToggleWishlist} className="p-1">
          <Heart className={`${liked ? 'text-red-500' : 'text-white'} hover:text-red-500 cursor-pointer transition-colors`} size={24} />
        </button>
      </div>
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur capitalize">
        {pkg.category}
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="text-sm font-bold text-gray-700 ml-1">{pkg.rating}</span>
          <span className="text-xs text-gray-500 ml-1">({pkg.reviews})</span>
        </div>
      </div>
      <div className="flex items-center text-gray-600 mb-3">
        <Info size={16} className="mr-2 text-blue-500" />
        <span className="text-sm font-medium">{pkg.location}</span>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
      {pkg.specs && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(pkg.specs).slice(0, 3).map(([k, v]) => (
            <span key={k} className="bg-gray-50 border border-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
              {k}: {v}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {pkg.highlights.slice(0, 3).map((highlight, index) => (
          <span key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 text-xs px-3 py-1 rounded-full font-medium border border-blue-200">
            {highlight}
          </span>
        ))}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-green-600">{pkg.price}</span>
            <span className="text-sm text-gray-700 ml-1">/day</span>
            <span className="text-sm text-gray-400 line-through ml-2">{pkg.originalPrice}</span>
          </div>
          {pkg.deposit && (
            <div className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border">Deposit: {pkg.deposit}</div>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails && onViewDetails(pkg)}
            className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            View Details
          </button>
          <button
            onClick={() => onBookNow(pkg)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            Rent Now
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
        <div className="mt-3 text-xs text-gray-500 flex items-center"><Shield size={14} className="mr-1 text-green-600" /> Damage protection available</div>
      </div>
    </div>
  </div>
  );
};

export default PackageCard;