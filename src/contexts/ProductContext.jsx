import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Sample products data
const sampleProducts = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB',
    price: 134900,
    category: 'Mobiles',
    location: 'Mumbai, Maharashtra',
    description: 'Brand new iPhone 15 Pro Max in excellent condition. All accessories included. Natural Titanium color with 256GB storage. Perfect for photography enthusiasts.',
    images: [
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
      'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg'
    ],
    sellerId: '1',
    sellerName: 'Rahul Sharma',
    sellerPhone: '+91 9876543210',
    sellerEmail: 'rahul@example.com',
    postedDate: '2024-01-15',
    featured: true,
    condition: 'New',
    brand: 'Apple'
  },
  {
    id: '2',
    title: 'Honda City 2023 Petrol Manual',
    price: 1450000,
    category: 'Cars',
    location: 'Delhi, Delhi',
    description: 'Well maintained Honda City with low mileage. Single owner, all papers clear. Excellent condition with regular servicing.',
    images: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg'
    ],
    sellerId: '2',
    sellerName: 'Priya Singh',
    sellerPhone: '+91 9876543211',
    sellerEmail: 'priya@example.com',
    postedDate: '2024-01-14',
    featured: true,
    condition: 'Excellent',
    brand: 'Honda'
  },
  {
    id: '3',
    title: '3BHK Apartment for Rent',
    price: 35000,
    category: 'Properties',
    location: 'Bangalore, Karnataka',
    description: 'Spacious 3BHK apartment in prime location. Furnished with modern amenities. Near metro station and shopping complex.',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg'
    ],
    sellerId: '3',
    sellerName: 'Amit Kumar',
    sellerPhone: '+91 9876543212',
    sellerEmail: 'amit@example.com',
    postedDate: '2024-01-13',
    featured: true,
    condition: 'Good',
    brand: 'N/A'
  },
  {
    id: '4',
    title: 'MacBook Pro M3 14-inch',
    price: 199000,
    category: 'Electronics',
    location: 'Pune, Maharashtra',
    description: 'Latest MacBook Pro with M3 chip. Perfect for professionals and students. Includes original charger and box.',
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg'
    ],
    sellerId: '1',
    sellerName: 'Rahul Sharma',
    sellerPhone: '+91 9876543210',
    sellerEmail: 'rahul@example.com',
    postedDate: '2024-01-12',
    condition: 'Like New',
    brand: 'Apple'
  },
  {
    id: '5',
    title: 'Royal Enfield Classic 350',
    price: 165000,
    category: 'Bikes',
    location: 'Chennai, Tamil Nadu',
    description: 'Well maintained Royal Enfield Classic 350. Perfect condition, ready to ride. All documents clear.',
    images: [
      'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg',
      'https://images.pexels.com/photos/1416169/pexels-photo-1416169.jpeg',
      'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'
    ],
    sellerId: '4',
    sellerName: 'Vikram Reddy',
    sellerPhone: '+91 9876543213',
    sellerEmail: 'vikram@example.com',
    postedDate: '2024-01-11',
    condition: 'Good',
    brand: 'Royal Enfield'
  },
  {
    id: '6',
    title: 'Premium Sofa Set 3+2+1',
    price: 45000,
    category: 'Furniture',
    location: 'Hyderabad, Telangana',
    description: 'Premium quality sofa set in excellent condition. Comfortable and stylish. Perfect for modern homes.',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg'
    ],
    sellerId: '5',
    sellerName: 'Meera Patel',
    sellerPhone: '+91 9876543214',
    sellerEmail: 'meera@example.com',
    postedDate: '2024-01-10',
    condition: 'Excellent',
    brand: 'N/A'
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(sampleProducts);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      postedDate: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const getProductsByUser = (userId) => {
    return products.filter(product => product.sellerId === userId);
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const searchProducts = (query, category, location) => {
    return products.filter(product => {
      const matchesQuery = query === '' || 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !category || category === 'All Categories' || 
        product.category === category;
      
      const matchesLocation = !location || location === 'All Locations' ||
        product.location.toLowerCase().includes(location.toLowerCase());
      
      return matchesQuery && matchesCategory && matchesLocation;
    });
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured).slice(0, 6);
  };

  const getCategories = () => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories;
  };

  const getLocations = () => {
    const locations = [...new Set(products.map(product => product.location))];
    return locations;
  };

  const value = {
    products,
    addProduct,
    getProductsByUser,
    getProductById,
    searchProducts,
    getFeaturedProducts,
    getCategories,
    getLocations
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};