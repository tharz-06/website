import React, { useState, useEffect } from 'react';
import { categoryPlaceholders } from '../data/imagePlaceholders';
import { CheckCircle, Users, MapPin, Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const AboutSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of slideshow images
  const slideImages = [
    {
      url: "/image/download.jpeg",
      alt: "Professional camera equipment",
      caption: "Professional Camera Equipment"
    },
    {
      url: "/image/canon len.jpeg",
      alt: "Canon camera lens",
      caption: "Canon Professional Lens"
    },
    {
      url: "/image/gimbal.jpeg",
      alt: "Professional gimbal stabilizer",
      caption: "Gimbal Stabilizer"
    },
    {
      url: "/image/led.jpeg",
      alt: "Professional lighting equipment",
      caption: "Professional Lighting"
    },
    {
      url: "/image/aud.jpeg",
      alt: "Audio recording equipment",
      caption: "Audio Equipment"
    },
    {
      url: "/image/tri.jpeg",
      alt: "Professional tripod",
      caption: "Professional Tripod"
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About LensRent Hub
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto">
              Your trusted camera rental partner for films, weddings, travel, and brand shoots. Fast pickup/delivery, transparent pricing, and well-maintained gear.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Professional Slideshow Container */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
                {slideImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-900 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-3/4 h-3/4 object-contain mx-auto my-auto"
                      onError={(e)=>{e.currentTarget.src=categoryPlaceholders.default || '/logo512.png';}}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-white text-lg font-semibold">{image.caption}</p>
                    </div>
                  </div>
                ))}

                {/* Professional Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm text-gray-800 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm text-gray-800 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {slideImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide
                          ? 'bg-white scale-110'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-4000 ease-linear"
                  style={{ 
                    width: `${((currentSlide + 1) / slideImages.length) * 100}%`,
                    animation: 'slideProgress 4000ms linear infinite'
                  }}
                />
              </div>

              <style jsx>{`
                @keyframes slideProgress {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(0%); }
                }
              `}</style>
            </div>

            {/* Professional Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose LensRent Hub?
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                With over 15 years of experience and cutting-edge AI technology, we provide weather-informed travel planning and personalized destination recommendations for your perfect Indian adventure.
              </p>
              <div className="space-y-6">
                <div className="flex items-start bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Creator-Ready Gear</h4>
                    <p className="text-gray-600 leading-relaxed">Meticulously maintained cameras, lenses, lighting and audio kits for reliable shoots</p>
                  </div>
                </div>
                <div className="flex items-start bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <CheckCircle className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Curated Recommendations</h4>
                    <p className="text-gray-600 leading-relaxed">Top picks by use-case and budget so you can select the right kit faster</p>
                  </div>
                </div>
                <div className="flex items-start bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <CheckCircle className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">24/7 Premium Support</h4>
                    <p className="text-gray-600 leading-relaxed">Setup help, compatibility guidance, and quick replacements when needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={36} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600 font-medium">Happy Creators</p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-green-600" size={36} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">6</h3>
              <p className="text-gray-600 font-medium">Cities Served</p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="text-orange-600" size={36} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8★</h3>
              <p className="text-gray-600 font-medium">Average Rating</p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="text-purple-600" size={36} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600 font-medium">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;