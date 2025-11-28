import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';

const BookingModal = ({ package: pkg, onClose, onConfirm }) => {
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    quantity: '1',
    rentalDays: 1
  });

  const calculateDays = (start, end) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const eDate = new Date(end);
    const diff = Math.ceil((eDate - s) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(diff, 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rentalDays = calculateDays(bookingData.startDate, bookingData.endDate);
    onConfirm({ ...bookingData, rentalDays });
  };

  const estimatedTotal = useMemo(() => {
    const price = parseInt(pkg.price.replace('₹','').replace(',','')) || 0;
    return price * (bookingData.rentalDays || 1) * parseInt(bookingData.quantity || '1');
  }, [pkg.price, bookingData.rentalDays, bookingData.quantity]);

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Reserve Your Gear</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
              <X size={24} />
            </button>
          </div>
          
          {/* Gear Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-6 border border-blue-200">
            <div className="flex items-center mb-3">
              <img src={pkg.image} alt={pkg.name} className="w-16 h-16 object-cover rounded-lg mr-3" />
              <div>
                <h3 className="font-bold text-gray-800">{pkg.name}</h3>
                <p className="text-gray-600 text-sm capitalize">{pkg.category}</p>
                <p className="text-green-600 font-bold text-lg">{pkg.price} <span className="text-sm text-gray-600">/day</span></p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                required
                value={bookingData.name}
                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                required
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                required
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Start Date</label>
              <input
                type="date"
                required
                value={bookingData.startDate}
                onChange={(e) => setBookingData({...bookingData, startDate: e.target.value, rentalDays: calculateDays(e.target.value, bookingData.endDate)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">End Date</label>
              <input
                type="date"
                required
                value={bookingData.endDate}
                onChange={(e) => setBookingData({...bookingData, endDate: e.target.value, rentalDays: calculateDays(bookingData.startDate, e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Quantity</label>
              <select
                value={bookingData.quantity}
                onChange={(e) => setBookingData({...bookingData, quantity: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Days:</span>
                <span>{bookingData.rentalDays}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Quantity:</span>
                <span>{bookingData.quantity}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2">
                <span>Estimated Total</span>
                <span className="text-green-600">₹{estimatedTotal.toLocaleString()}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;