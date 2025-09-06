import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Heart, Share2, MapPin, Calendar, Package, ShoppingCart } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart, isInCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link
            to="/"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Link to="/" className="text-teal-600 hover:text-teal-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/search" className="text-teal-600 hover:text-teal-700">
            All Products
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{product.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Main Image */}
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="p-4 border-t">
                  <div className="flex space-x-4 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImageIndex === index
                            ? 'border-teal-500'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              
              {/* Product Details */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Brand</span>
                  <p className="text-gray-900">{product.brand}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Condition</span>
                  <p className="text-gray-900">{product.condition}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info & Seller Details */}
          <div className="space-y-6">
            {/* Product Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-4">
                {formatPrice(product.price)}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Posted {getTimeSincePosted(product.postedDate)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Package className="h-4 w-4 mr-2" />
                  <span>{product.category}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart(product.id)}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isInCart(product.id)
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}</span>
                </button>
                
                <Link 
                  to="/cart"
                  className="w-full flex items-center justify-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-semibold">
                    {product.sellerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{product.sellerName}</h4>
                  <p className="text-sm text-gray-600">Active seller</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowContact(!showContact)}
                  className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>{showContact ? 'Hide Contact' : 'Show Contact'}</span>
                </button>
                
                {showContact && (
                  <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-900">{product.sellerPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-900">{product.sellerEmail}</span>
                    </div>
                  </div>
                )}
                
                <button className="w-full border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Safety Tips</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Meet in a public place</li>
                <li>• Check the item before paying</li>
                <li>• Avoid advance payments</li>
                <li>• Report suspicious activity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;