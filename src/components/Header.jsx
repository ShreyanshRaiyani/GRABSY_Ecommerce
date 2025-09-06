import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Heart, MessageCircle, Plus, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-slate-100 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-slate-600">GRABSY</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-slate-600">Welcome, {user?.name}</span>
                  <Link to="/dashboard" className="text-slate-600 hover:text-teal-600 transition-colors">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-slate-600 hover:text-teal-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-slate-600 hover:text-teal-600 transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="text-slate-600 hover:text-teal-600 transition-colors">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-teal-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
              GRABSY
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Find Cars, Mobile Phones and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-l-lg focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-3 rounded-r-lg hover:bg-teal-700 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-teal-600 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {isAuthenticated && (
              <Link
                to="/post-ad"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">SELL</span>
              </Link>
            )}

            {/* Desktop user menu */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/favorites" className="p-2 text-slate-600 hover:text-teal-600 transition-colors">
                  <Heart className="h-5 w-5" />
                </Link>
                <Link to="/messages" className="p-2 text-slate-600 hover:text-teal-600 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </Link>
                <Link to="/dashboard" className="p-2 text-slate-600 hover:text-teal-600 transition-colors">
                  <User className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-slate-700 hover:text-teal-600 transition-colors"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-teal-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-l-lg focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded-r-lg hover:bg-teal-700 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 text-slate-700 hover:text-teal-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/cart"
                  className="block py-2 text-slate-700 hover:text-teal-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart ({getTotalItems()})
                </Link>
                <Link
                  to="/favorites"
                  className="block py-2 text-slate-700 hover:text-teal-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favorites
                </Link>
                <Link
                  to="/messages"
                  className="block py-2 text-slate-700 hover:text-teal-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-slate-700 hover:text-teal-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-slate-700 hover:text-teal-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 text-slate-700 hover:text-teal-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;