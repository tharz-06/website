import React, { useState, useEffect } from 'react';
import { categoryPlaceholders } from '../data/imagePlaceholders';
import { MapPin, Calendar, Users, Star, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const Hero = ({ onLocationSearch }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      image: "/image/sli1.png",
      title: "Rent Pro Cameras & Lenses",
      subtitle: "Shoot with the best, pay per day",
      description: "Mirrorless bodies, cine lenses, gimbals, lighting, audio and more"
    },
    {
      image: "/image/sli2.png",
      title: "Gear for Every Project",
      subtitle: "Weddings, films, travel, products",
      description: "Curated kits and top picks for every use-case"
    },
    {
      image: "/image/sli3.png",
      title: "Trusted by Creators",
      subtitle: "Fast pickup, doorstep delivery",
      description: "Flexible rentals, affordable deposits, damage protection"
    }
  ];

  // Auto slideshow effect
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Image with Smooth Transitions */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-10000 hover:scale-110"
              onError={(e)=>{e.currentTarget.src=categoryPlaceholders.default || '/logo512.png';}}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Auto-play Control */}
      <div className="absolute top-32 left-4 z-30">
        <button
          onClick={toggleAutoPlay}
          className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 text-sm font-medium flex items-center gap-2 ${
            isAutoPlaying ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}
        >
          {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isAutoPlaying ? 'Auto' : 'Manual'}
        </button>
      </div>

      {/* Slide Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

          {/* Experience Badge */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg">
          SHOOT WITH THE GEAR YOU LOVE
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 pt-20 pb-16 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center text-white">
          
          {/* Main Heading with Animation */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-500 transform">
            {currentSlideData.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-4 text-yellow-300 font-medium transition-all duration-500 transform">
            {currentSlideData.subtitle}
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90 transition-all duration-500 transform">
            {currentSlideData.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button
              onClick={() => onLocationSearch('')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Gear
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto text-center text-white">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="text-yellow-400" size={32} />
            </div>
            <div className="text-3xl font-bold text-yellow-400">500+</div>
            <div className="text-sm opacity-80">Gear Items</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <Users className="text-green-400" size={32} />
            </div>
            <div className="text-3xl font-bold text-green-400">10K+</div>
            <div className="text-sm opacity-80">Happy Creators</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <Star className="text-blue-400 fill-current" size={32} />
            </div>
            <div className="text-3xl font-bold text-blue-400">4.8★</div>
            <div className="text-sm opacity-80">Average Service Rating</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="text-purple-400" size={32} />
            </div>
            <div className="text-3xl font-bold text-purple-400">24h</div>
            <div className="text-sm opacity-80">Fast Turnaround</div>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-300 ${
              index === currentSlide ? 'w-12 h-3' : 'w-3 h-3'
            }`}
          >
            <div
              className={`w-full h-full rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar for Auto-play */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
            style={{ 
              animation: 'slideProgress 5s linear infinite'
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes slideProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;