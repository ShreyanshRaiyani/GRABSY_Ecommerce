import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
  const location = useLocation();
  const { searchProducts, getCategories, getLocations } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState([]);

  const categories = getCategories();
  const locations = getLocations();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const category = params.get('category') || '';
    const locationParam = params.get('location') || '';

    setSearchQuery(query);
    setSelectedCategory(category);
    setSelectedLocation(locationParam);

    // Search products
    const searchResults = searchProducts(query, category, locationParam);
    let filteredResults = [...searchResults];

    // Apply price filter
    if (priceRange.min || priceRange.max) {
      filteredResults = filteredResults.filter(product => {
        const price = product.price;
        const min = priceRange.min ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filteredResults.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredResults.sort((a, b) => b.price - a.price);
        break;
      case 'date':
        filteredResults.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      default:
        // Keep original order (relevance)
        break;
    }

    setResults(filteredResults);
  }, [location.search, priceRange, sortBy, searchProducts]);

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedLocation) params.set('location', selectedLocation);
    
    window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
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
          <span className="text-gray-600">Search Results</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
            </h1>
            <p className="text-gray-600">{results.length} products found</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Latest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              
              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedLocation('');
                  setPriceRange({ min: '', max: '' });
                  setSortBy('relevance');
                  window.history.pushState({}, '', location.pathname);
                }}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <Link
                  to="/"
                  className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;