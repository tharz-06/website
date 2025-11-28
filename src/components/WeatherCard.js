import React from 'react';
import { Sun, Cloud, CloudRain, Thermometer, Eye, Wind } from 'lucide-react';

const WeatherCard = ({ city, weather }) => {
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun className="text-yellow-500" size={24} />;
      case 'cloudy': return <Cloud className="text-gray-500" size={24} />;
      case 'rainy': return <CloudRain className="text-blue-500" size={24} />;
      default: return <Sun className="text-yellow-500" size={24} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-lg">{city}</h3>
        {getWeatherIcon(weather.condition)}
      </div>
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Thermometer size={18} className="mr-3 text-red-500" />
          <span className="font-medium">{weather.temp}°C</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Eye size={18} className="mr-3 text-blue-500" />
          <span>{weather.humidity}% Humidity</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Wind size={18} className="mr-3 text-green-500" />
          <span>{weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;