import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, User, Settings, Package, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const Dashboard = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { getProductsByUser } = useProducts();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <Link
            to="/login"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const userProducts = getProductsByUser(user.id);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateProfile(profileData);
    setIsEditingProfile(false);
  };

  const stats = [
    { title: 'Total Item', value: userProducts.length, icon: Package, color: 'bg-blue-500' },
    { title: 'Active Item', value: userProducts.length, icon: Eye, color: 'bg-green-500' },
    { title: 'Favorites', value: 0, icon: Heart, color: 'bg-red-500' },
    { title: 'Views', value: '1.2K', icon: Eye, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="px-6 py-8 border-b">
            <div className="flex items-center space-x-6">
              <img
                src={user.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg'}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
              </div>
              <Link
                to="/post-ad"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Post New Ad</span>
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('ads')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'ads'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Ads
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'favorites'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Favorites
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Ads */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Ads</h2>
              </div>
              <div className="p-6">
                {userProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProducts.slice(0, 3).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No ads yet</h3>
                    <p className="text-gray-600 mb-4">Start by posting your first ad</p>
                    <Link
                      to="/post-ad"
                      className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Post New Ad
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">My Ads</h2>
              <Link
                to="/post-ad"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Post New Ad</span>
              </Link>
            </div>
            <div className="p-6">
              {userProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {userProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No ads posted</h3>
                  <p className="text-gray-600 mb-4">Start selling by posting your first ad</p>
                  <Link
                    to="/post-ad"
                    className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Ad
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>
            <div className="p-6">
              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Favorite Ads</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                <p className="text-gray-600 mb-4">Save your favorite ads to view them here</p>
                <Link
                  to="/search"
                  className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
