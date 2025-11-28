import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { popularLocations } from '../data/constants';

const LocationSearch = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = popularLocations.filter(location =>
        location.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectLocation = (location) => {
    setSearchQuery(location);
    setShowSuggestions(false);
    onLocationSelect(location);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for a city or destination..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-xl mt-2 shadow-2xl z-10 max-h-60 overflow-y-auto">
          {suggestions.map((location, index) => (
            <button
              key={index}
              onClick={() => selectLocation(location)}
              className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 flex items-center transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <MapPin size={16} className="mr-3 text-blue-400" />
              <span className="font-medium">{location}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;