import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook, Mail, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-rose-500 fill-current" />
              <div>
                <span className="text-2xl font-bold text-gray-800 block">Vishwa & Sneha</span>
                <span className="text-sm text-gray-600">Forever Together</span>
              </div>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Celebrating the beautiful love story of Vishwa Prakash and Sneha Singh. 
              Join us in our journey of love, laughter, and happily ever after.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-rose-500 transition-colors">Home</Link></li>
              <li><Link to="/events" className="text-gray-600 hover:text-rose-500 transition-colors">Wedding Events</Link></li>
              <li><Link to="/gallery" className="text-gray-600 hover:text-rose-500 transition-colors">Photo Gallery</Link></li>
              <li><Link to="/film" className="text-gray-600 hover:text-rose-500 transition-colors">Our Story</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-rose-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-rose-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-gray-600">
              <li>vishwa.sneha@wedding.com</li>
              <li>+91 98765 43210</li>
              <li>New Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © {currentYear} Vishwa & Sneha Wedding. Made with ❤️ for our special day.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;