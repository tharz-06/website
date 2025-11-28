import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactSection = () => (
  <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Contact LensRent Hub
          </h2>
          <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto">
            Need help selecting gear, checking availability, or arranging delivery? Our rental experts are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-500 p-4 rounded-2xl mr-6 shadow-lg">
                  <Phone className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us Anytime</h3>
                  <p className="text-gray-600 text-lg">+91 98765 43210</p>
                  <p className="text-gray-600 text-lg">+91 87654 32109</p>
                  <p className="text-sm text-gray-500 mt-1">Available 24/7 for emergencies</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 p-4 rounded-2xl mr-6 shadow-lg">
                  <Mail className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Email Support</h3>
                  <p className="text-gray-600 text-lg">hello@lensrenthub.com</p>
                  <p className="text-gray-600 text-lg">support@lensrenthub.com</p>
                  <p className="text-sm text-gray-500 mt-1">Response within 2 hours</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-500 p-4 rounded-2xl mr-6 shadow-lg">
                  <MapPin className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Our Office</h3>
                  <p className="text-gray-600 text-lg">
                    42 Cine Park, Media District<br />
                    New Delhi, India - 110001
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange-500 p-4 rounded-2xl mr-6 shadow-lg">
                  <Clock className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 7:00 PM<br />
                    Saturday: 10:00 AM - 6:00 PM<br />
                    Sunday: 11:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">How can we help?</option>
                <option value="availability">Check gear availability</option>
                <option value="recommendations">Get gear recommendations</option>
                <option value="delivery">Arrange pickup/delivery</option>
                <option value="billing">Billing & payments</option>
                <option value="other">Other</option>
              </select>
              <textarea
                placeholder="Tell us about your project, dates, and budget..."
                rows="4"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;