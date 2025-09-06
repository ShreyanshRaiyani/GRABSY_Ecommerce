import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Home, Smartphone, Bike, Monitor, Sofa } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const categoryIcons = {
  Cars: Car,
  Properties: Home,
  Mobiles: Smartphone,
  Bikes: Bike,
  Electronics: Monitor,
  Furniture: Sofa
};

const HomePage = () => {
  const { getFeaturedProducts, getCategories } = useProducts();
  const featuredProducts = getFeaturedProducts();
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Buy & Sell Everything
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100">
              India's largest marketplace for everything you need
            </p>
            <Link
              to="/search"
              className="inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category] || Monitor;
              return (
                <Link
                  key={category}
                  to={`/search?category=${encodeURIComponent(category)}`}
                  className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="bg-teal-100 rounded-full p-4 mb-4 mx-auto w-fit group-hover:bg-teal-200 transition-colors">
                    <IconComponent className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                    {category}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Featured Products
            </h2>
            <Link
              to="/search"
              className="text-teal-600 hover:text-teal-700 font-semibold flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose OLX */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Why Choose Grabsy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-6 mx-auto w-fit mb-4">
                <Smartphone className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-slate-600">
                Simple and intuitive interface makes buying and selling effortless.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-6 mx-auto w-fit mb-4">
                <Car className="h-10 w-10 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-slate-600">
                From cars to furniture, find everything you need in one place.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 mx-auto w-fit mb-4">
                <Home className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Deals</h3>
              <p className="text-slate-600">
                Connect with sellers in your area for quick and easy transactions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;