import React, { useState, useEffect } from 'react';
import { X, CreditCard, Phone, Shield } from 'lucide-react';

const PaymentModal = ({ package: pkg, bookingData, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [processing, setProcessing] = useState(false);

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpayPayment = () => {
    setProcessing(true);
    const perDay = parseInt(pkg.price.replace('₹', '').replace(',', ''));
    const totalAmount = perDay * parseInt(bookingData.rentalDays || 1) * parseInt(bookingData.quantity || 1);
    
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_9WkzpQSRQEF7az', // Replace with your actual key
      amount: totalAmount * 100, // Razorpay expects amount in paise (multiply by 100)
      currency: 'INR',
      name: 'LensRent Hub',
      description: `Rental for ${pkg.name}`,
      image: '/logo192.png', // Your company logo
      order_id: '', // This should come from your backend when creating order
      handler: function (response) {
        console.log('Payment Success:', response);
        // Here you would typically verify the payment on your backend
        setProcessing(false);
        onPaymentSuccess();
      },
      prefill: {
        name: bookingData.name,
        email: bookingData.email,
        contact: bookingData.phone,
      },
      notes: {
        item_id: pkg.id,
        item_name: pkg.name,
        rental_days: bookingData.rentalDays,
        start_date: bookingData.startDate,
        end_date: bookingData.endDate,
        quantity: bookingData.quantity,
      },
      theme: {
        color: '#6366F1', // Your brand color
      },
      modal: {
        ondismiss: function() {
          setProcessing(false);
          console.log('Payment dismissed');
        }
      }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        console.log('Payment Failed:', response);
        setProcessing(false);
        alert('Payment failed. Please try again.');
      });
      
      rzp.open();
    } else {
      console.error('Razorpay SDK not loaded');
      setProcessing(false);
      alert('Payment system not available. Please try again later.');
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      // Fallback simulation for other payment methods
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        onPaymentSuccess();
      }, 3000);
    }
  };

  if (!pkg || !bookingData) return null;

  const perDay = parseInt(pkg.price.replace('₹', '').replace(',', ''));
  const totalAmount = perDay * parseInt(bookingData.rentalDays || 1) * parseInt(bookingData.quantity || 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Complete Rental Payment</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
              <X size={24} />
            </button>
          </div>
          
          {/* Rental Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h3>
            <div className="flex items-center mb-4">
              <img src={pkg.image} alt={pkg.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
              <div>
                <h4 className="font-bold text-gray-800">{pkg.name}</h4>
                <p className="text-gray-600 text-sm">{pkg.location}</p>
                <p className="text-gray-600 text-sm">Per Day</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Customer: {bookingData.name}</span>
                <span>Dates: {bookingData.startDate} → {bookingData.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Days: {bookingData.rentalDays}</span>
                <span>Qty: {bookingData.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Rate:</span>
                <span>{pkg.price}/day</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total Amount:</span>
                <span className="text-green-600">₹{totalAmount.toLocaleString()}</span>
              </div>
              {pkg.deposit && (
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Refundable Deposit:</span>
                  <span>{pkg.deposit}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Method</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod('razorpay')}
                className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                  paymentMethod === 'razorpay' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <CreditCard size={20} className="mr-2" />
                <span className="font-medium">Razorpay (All Methods)</span>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                  paymentMethod === 'upi' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Phone size={20} className="mr-2" />
                <span className="font-medium">Direct UPI</span>
              </button>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            {paymentMethod === 'razorpay' ? (
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center mb-4">
                  <CreditCard className="text-blue-600 mr-3" size={32} />
                  <div>
                    <h3 className="text-lg font-bold text-blue-800">Razorpay Secure Checkout</h3>
                    <p className="text-blue-600 text-sm">Pay with Cards, UPI, NetBanking, Wallets</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-sm font-medium text-gray-700">Cards</div>
                    <div className="text-xs text-gray-500">Visa, Mastercard</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-sm font-medium text-gray-700">UPI</div>
                    <div className="text-xs text-gray-500">GPay, PhonePe</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-sm font-medium text-gray-700">NetBanking</div>
                    <div className="text-xs text-gray-500">All Banks</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-sm font-medium text-gray-700">Wallets</div>
                    <div className="text-xs text-gray-500">Paytm, Amazon</div>
                  </div>
                </div>
                <p className="text-xs text-blue-600">Click "Pay Now" to open secure Razorpay checkout</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4">
                  <Phone size={48} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Direct UPI Payment</h3>
                <p className="text-gray-600 mb-4">Scan QR code or use UPI ID: gtholidays@upi</p>
                <div className="bg-gray-100 p-4 rounded-xl">
                  <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-500">QR Code</span>
                  </div>
                  <p className="text-sm text-gray-600">Amount: ₹{totalAmount.toLocaleString()}</p>
                </div>
              </div>
            )}

            {/* Security */}
            <div className="flex items-center bg-green-50 p-4 rounded-xl">
              <Shield className="text-green-600 mr-3" size={24} />
              <div>
                <p className="text-green-800 font-medium">Your payment is secured</p>
                <p className="text-green-600 text-sm">256-bit SSL encryption & PCI DSS compliant</p>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {processing ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </span>
              ) : (
                `Pay ₹${totalAmount.toLocaleString()}`
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              By proceeding, you agree to our Terms & Conditions and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;