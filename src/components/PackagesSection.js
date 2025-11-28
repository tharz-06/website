import React, { useState, useEffect } from 'react';
import { Camera, ZoomIn, Film, Sun, Mic, Drone, Boxes, ArrowUpDown } from 'lucide-react';
import { travelPackages } from '../data/constants';
import PackageCard from './PackageCard';

const PackagesSection = ({ onBookNow, onViewDetails, selectedLocation }) => {
  const [filteredPackages, setFilteredPackages] = useState(travelPackages);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    let filtered = travelPackages;
    
    if (selectedLocation) {
      filtered = filtered.filter(pkg =>
        pkg.category.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        pkg.name.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(pkg => pkg.category === filterCategory);
    }
    // sorting
    if (sortBy === 'priceLow') {
      filtered = [...filtered].sort((a, b) => parseInt(a.price.replace('₹','').replace(',','')) - parseInt(b.price.replace('₹','').replace(',','')));
    } else if (sortBy === 'priceHigh') {
      filtered = [...filtered].sort((a, b) => parseInt(b.price.replace('₹','').replace(',','')) - parseInt(a.price.replace('₹','').replace(',','')));
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    setFilteredPackages(filtered);
  }, [selectedLocation, filterCategory, sortBy]);

  const categories = ['all', 'cameras', 'lenses', 'gimbals', 'lighting', 'audio', 'tripods', 'drones'];

  const categoryIcon = (cat) => {
    switch (cat) {
      case 'cameras': return <Camera size={16} className="mr-2" />;
      case 'lenses': return <ZoomIn size={16} className="mr-2" />;
      case 'gimbals': return <Film size={16} className="mr-2" />;
      case 'lighting': return <Sun size={16} className="mr-2" />;
      case 'audio': return <Mic size={16} className="mr-2" />;
      case 'drones': return <Drone size={16} className="mr-2" />;
      default: return <Boxes size={16} className="mr-2" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Rent Professional Camera Gear
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Browse cameras, lenses, lighting, audio, gimbals and more. Daily pricing with flexible deposits and fast pickup/delivery.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center items-center mb-12">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white text-gray-700 border border-gray-300 rounded-full px-4 py-3 pr-10 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ArrowUpDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                filterCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 shadow-md'
              }`}
            >
              <span className="inline-flex items-center">{categoryIcon(category)} {category}</span>
            </button>
          ))}
        </div>

        {(selectedLocation || filterCategory !== 'all') && (
          <div className="mb-8 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              {selectedLocation && (
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                  🎯 Showing results for: {selectedLocation}
                </span>
              )}
              {filterCategory !== 'all' && (
                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                  📂 Category: {filterCategory}
                </span>
              )}
              <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                📊 {filteredPackages.length} item{filteredPackages.length !== 1 ? 's' : ''} found
              </span>
              {filterCategory !== 'all' && (
                <button
                  onClick={() => {
                    setFilterCategory('all');
                  }}
                  className="bg-gradient-to-r from-red-100 to-orange-100 text-red-800 px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-red-200 hover:to-orange-200 transition-all duration-300"
                >
                  🗑️ Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPackages.map(pkg => (
            <PackageCard key={pkg.id} package={pkg} onBookNow={onBookNow} onViewDetails={onViewDetails} />
          ))}
        </div>
        
        {filteredPackages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No gear found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your filters or browse all categories</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesSection;