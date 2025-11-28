import React from 'react';
import { PackageCheck, Shield, Truck, Clock, FileText, IndianRupee, Headphones } from 'lucide-react';

const HowItWorksCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex items-center mb-3">
      <div className="bg-blue-100 p-3 rounded-xl mr-3">
        {icon}
      </div>
      <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const WeatherSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How Rentals Work
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Simple, fast, and flexible. Reserve the gear you need, when you need it, with transparent pricing and optional damage protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <HowItWorksCard
            icon={<PackageCheck className="text-blue-600" size={24} />}
            title="Choose Gear"
            description="Browse cameras, lenses, and accessories. Check availability and specs."
          />
          <HowItWorksCard
            icon={<FileText className="text-purple-600" size={24} />}
            title="Reserve"
            description="Pick dates, quantity, and add optional protection. Complete KYC online."
          />
          <HowItWorksCard
            icon={<Truck className="text-green-600" size={24} />}
            title="Pickup/Delivery"
            description="Same-day pickup or doorstep delivery in major cities."
          />
          <HowItWorksCard
            icon={<Clock className="text-yellow-600" size={24} />}
            title="Shoot & Return"
            description="Use with care. Extend easily if needed. Return at the end of your slot."
          />
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pricing & Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
            <div className="flex items-start bg-white p-4 rounded-xl shadow-md">
              <IndianRupee className="text-green-600 mr-4 mt-1 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Transparent Rates</h4>
                <p className="text-sm">Daily pricing with refundable deposits. No hidden fees.</p>
              </div>
            </div>
            <div className="flex items-start bg-white p-4 rounded-xl shadow-md">
              <Shield className="text-purple-600 mr-4 mt-1 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Protection Plans</h4>
                <p className="text-sm">Optional damage protection for peace of mind while you shoot.</p>
              </div>
            </div>
            <div className="flex items-start bg-white p-4 rounded-xl shadow-md">
              <Headphones className="text-blue-600 mr-4 mt-1 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Priority Support</h4>
                <p className="text-sm">Real humans to help with setup, compatibility, and troubleshooting.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;