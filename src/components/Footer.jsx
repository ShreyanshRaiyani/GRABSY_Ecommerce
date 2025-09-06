import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         
          <div>
            <div className="bg-teal-600 text-white px-3 py-2 rounded-lg font-bold text-xl mb-4 inline-block">
              OLX
            </div>
            <p className="text-slate-400 mb-4">
              India's largest marketplace for buying and selling everything from cars and properties to mobiles and furniture.
            </p>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/search?category=Cars" className="text-slate-400 hover:text-white transition-colors">Cars</Link></li>
              <li><Link to="/search?category=Properties" className="text-slate-400 hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/search?category=Mobiles" className="text-slate-400 hover:text-white transition-colors">Mobiles</Link></li>
              <li><Link to="/search?category=Bikes" className="text-slate-400 hover:text-white transition-colors">Bikes</Link></li>
              <li><Link to="/search?category=Electronics" className="text-slate-400 hover:text-white transition-colors">Electronics</Link></li>
            </ul>
          </div>

          {/* Trending Searches */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Trending Searches</h3>
            <ul className="space-y-2">
              <li><Link to="/search?q=iphone" className="text-slate-400 hover:text-white transition-colors">iPhone</Link></li>
              <li><Link to="/search?q=car" className="text-slate-400 hover:text-white transition-colors">Used Cars</Link></li>
              <li><Link to="/search?q=apartment" className="text-slate-400 hover:text-white transition-colors">Apartments</Link></li>
              <li><Link to="/search?q=bike" className="text-slate-400 hover:text-white transition-colors">Motorcycles</Link></li>
              <li><Link to="/search?q=furniture" className="text-slate-400 hover:text-white transition-colors">Furniture</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About OLX</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 GRABSY India. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
