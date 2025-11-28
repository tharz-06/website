import React from 'react';
import { Camera, Film, Heart, Plane, Box, Star } from 'lucide-react';

const RecommendationCard = ({ category, places }) => {
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'filmmaking': return <Film className="text-purple-600" size={24} />;
      case 'wedding': return <Heart className="text-pink-600" size={24} />;
      case 'travel': return <Plane className="text-blue-600" size={24} />;
      case 'product': return <Box className="text-green-600" size={24} />;
      default: return <Camera className="text-gray-600" size={24} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-4">
        {getCategoryIcon(category)}
        <h3 className="font-bold text-gray-800 ml-3 text-lg capitalize">Top gear for {category}</h3>
      </div>
      <div className="space-y-3">
        {places.map((place, index) => (
          <div key={index} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
            <Star size={16} className="mr-3 text-blue-500 flex-shrink-0" />
            <span className="font-medium">{place}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCard;