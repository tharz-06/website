import React from 'react';
import { X, Info, Clock, Star, PackageCheck, Calendar, Shield, ArrowRight, Heart, Share2 } from 'lucide-react';
import { getImageForItem, categoryPlaceholders } from '../data/imagePlaceholders';

const PackageDetailsModal = ({ package: pkg, onClose, onBookNow }) => {
  if (!pkg) return null;

  const getSeasonIcon = (season) => {
    switch (season) {
      case 'winter': return '❄️';
      case 'summer': return '☀️';
      case 'monsoon': return '🌧️';
      case 'spring': return '🌸';
      default: return '🌤️';
    }
  };

  const inclusions = [
    { icon: <PackageCheck size={20} />, text: 'Thoroughly tested gear' },
    { icon: <Shield size={20} />, text: 'Damage protection (optional)' },
    { icon: <Calendar size={20} />, text: 'Flexible rental days' },
    { icon: <Info size={20} />, text: 'Cables, caps, and cases' }
  ];

  const rentalNotes = [
    { title: 'Pickup/Delivery', description: 'Same-day pickup or doorstep delivery available in select cities.' },
    { title: 'KYC', description: 'Valid ID and address proof required. Security deposit refundable post check.' },
    { title: 'Usage', description: 'Use with care. Water and drop damage not covered unless add-on purchased.' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header Section */}
        <div className="relative">
          <img src={getImageForItem(pkg)} alt={pkg.name} className="w-full h-64 object-cover rounded-t-2xl" onError={(e)=>{e.currentTarget.src=categoryPlaceholders[(pkg?.category||'default').toLowerCase()] || categoryPlaceholders.default || '/logo512.png';}} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
          >
            <X size={24} />
          </button>

          {/* Action Buttons */}
          <div className="absolute top-4 left-4 flex gap-2">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300">
              <Heart size={20} />
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300">
              <Share2 size={20} />
            </button>
          </div>

          {/* Item Info Overlay */}
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl font-bold mb-2">{pkg.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center">
                <Info size={16} className="mr-1" />
                {pkg.location}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                Per Day
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-1 fill-current" />
                {pkg.rating} ({pkg.reviews} reviews)
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Gear</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{pkg.description}</p>
                {pkg.specs && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                    {Object.entries(pkg.specs).map(([k, v]) => (
                      <div key={k} className="bg-gray-50 p-3 rounded-lg border">
                        <div className="text-xs uppercase text-gray-500">{k}</div>
                        <div className="font-medium text-gray-800">{v}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center bg-blue-50 p-3 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rental Notes */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Rental Notes</h3>
                <div className="space-y-4">
                  {rentalNotes.map((note, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-gray-800 mb-1">{note.title}</h4>
                      <p className="text-gray-600 text-sm">{note.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inclusions.map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                      <div className="text-green-600 mr-3">{item.icon}</div>
                      <span className="text-gray-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 shadow-lg">
                
                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">{pkg.price} <span className="text-base text-gray-600">/day</span></div>
                  <div className="text-lg text-gray-400 line-through mb-2">{pkg.originalPrice}</div>
                  {pkg.deposit && (
                    <div className="text-sm text-gray-700">Refundable Deposit: <span className="font-semibold">{pkg.deposit}</span></div>
                  )}
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
                    Save ₹{parseInt(pkg.originalPrice.replace('₹', '').replace(',', '')) - parseInt(pkg.price.replace('₹', '').replace(',', ''))}
                  </div>
                </div>

                {/* Item Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium capitalize">{pkg.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rental Unit:</span>
                    <span className="font-medium">Per Day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Availability:</span>
                    <span className="font-medium">In Stock</span>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onBookNow(pkg)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                >
                  Rent This Gear
                  <ArrowRight size={20} className="ml-2" />
                </button>

                {/* Contact Info */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600 text-sm mb-2">Need help with rental?</p>
                  <p className="text-blue-600 font-semibold">📞 +91 98765 43210</p>
                  <p className="text-gray-500 text-xs mt-2">Available 24/7</p>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Shield size={14} className="mr-1 text-green-500" />
                      Secure Rentals
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-blue-500" />
                      Flexible Extensions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsModal;