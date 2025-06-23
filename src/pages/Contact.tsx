import React from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, Heart } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-rose-500 mr-4 fill-current" />
            <h1 className="text-5xl font-bold text-gray-800">Get In Touch</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have questions about our wedding events, 
            want to share memories, or simply want to send us your blessings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our wedding events, want to share a memory, or send us 
                your blessings? We'd love to hear from you!
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-rose-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-gray-800 font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">vishwa.sneha@wedding.com</p>
                    <p className="text-gray-500 text-sm">We typically respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-rose-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-gray-800 font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-500 text-sm">Available Monday - Friday, 9 AM - 6 PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-rose-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-gray-800 font-semibold mb-1">Location</h3>
                    <p className="text-gray-600">New Delhi, India</p>
                    <p className="text-gray-500 text-sm">Wedding venues across Delhi NCR</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Follow Our Journey</h2>
              <p className="text-gray-600 mb-6">
                Stay connected with us and get the latest updates about our wedding 
                celebrations by following us on social media.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex items-center p-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-lg transition-all duration-300 group text-white"
                >
                  <Instagram className="w-6 h-6 mr-3" />
                  <span className="font-medium">Instagram</span>
                </a>
                
                <a
                  href="#"
                  className="flex items-center p-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 group text-white"
                >
                  <Twitter className="w-6 h-6 mr-3" />
                  <span className="font-medium">Twitter</span>
                </a>
                
                <a
                  href="#"
                  className="flex items-center p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 group text-white"
                >
                  <Facebook className="w-6 h-6 mr-3" />
                  <span className="font-medium">Facebook</span>
                </a>
                
                <a
                  href="#"
                  className="flex items-center p-4 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300 group text-white"
                >
                  <Youtube className="w-6 h-6 mr-3" />
                  <span className="font-medium">YouTube</span>
                </a>
              </div>
            </div>

            {/* RSVP */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">RSVP for Our Wedding</h2>
              <p className="text-rose-100 mb-6">
                We would be honored to have you celebrate with us! Please let us know 
                if you'll be joining us for our special day.
              </p>
              <button className="w-full bg-white text-rose-600 font-semibold py-3 px-6 rounded-full hover:bg-rose-50 transition-colors duration-300">
                Confirm Your Attendance
              </button>
            </div>

            {/* Wedding Gifts */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 border border-rose-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Wedding Gifts</h2>
              <p className="text-gray-700 mb-4">
                Your presence at our wedding is the greatest gift of all. However, if you 
                wish to honor us with a gift, we would be grateful for contributions toward 
                our new home together.
              </p>
              <p className="text-gray-600 text-sm">
                Gift registry details will be shared with invited guests separately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;