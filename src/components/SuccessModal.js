import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
      <div className="mb-6">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Rental Confirmed!</h2>
        <p className="text-gray-600">Your payment was successful. We’ve emailed your rental details and pickup/delivery instructions.</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-blue-800 font-medium">What's Next?</p>
          <ul className="text-blue-600 text-sm mt-2 space-y-1">
            <li>✓ Confirmation email sent</li>
            <li>✓ Keep ID proof ready for KYC</li>
            <li>✓ Pickup/Delivery as scheduled</li>
          </ul>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Continue Browsing Gear
        </button>
      </div>
    </div>
  </div>
);

export default SuccessModal;