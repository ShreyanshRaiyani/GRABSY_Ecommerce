import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹ ${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹ ${(price / 100000).toFixed(1)} L`;
    } else if (price >= 1000) {
      return `₹ ${(price / 1000).toFixed(0)}K`;
    }
    return `₹ ${price.toLocaleString()}`;
  };

  const getTimeSincePosted = (dateString) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
              FEATURED
            </div>
          )}
          <div className="absolute top-2 right-2 flex space-x-2">
            <button className="p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
              <Heart className="h-4 w-4 text-slate-600 hover:text-red-500 transition-colors" />
            </button>
            <button 
              onClick={handleAddToCart}
              className="p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
              disabled={isInCart(product.id)}
            >
              <ShoppingCart className={`h-4 w-4 transition-colors ${
                isInCart(product.id) ? 'text-green-500' : 'text-slate-600 hover:text-teal-500'
              }`} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-2">
              {product.title}
            </h3>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-slate-500">
              {getTimeSincePosted(product.postedDate)}
            </span>
          </div>
          
          <div className="flex items-center text-slate-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{product.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
              {product.category}
            </span>
            <span className="text-xs text-slate-500">
              {product.condition}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;