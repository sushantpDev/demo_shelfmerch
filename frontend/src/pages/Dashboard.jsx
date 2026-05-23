import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Sparkles, TrendingUp, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const { pointsBalance } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary rounded-3xl p-8 text-white"
      >
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                Welcome back, {user?.name} 👋
              </h1>
              <p className="text-slate-300 text-sm">
                Browse our curated catalog and redeem your points for premium rewards.
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
              <p className="text-xs text-slate-300 uppercase tracking-wider font-medium">Available Balance</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold">{pointsBalance.toLocaleString()}</span>
                <span className="text-sm text-slate-300">pts</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl" />
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Products</p>
            <p className="text-xl font-bold text-slate-900">{products.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-green-50 text-green-500">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Categories</p>
            <p className="text-xl font-bold text-slate-900">{categories.length - 1}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-violet-50 text-violet-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Best Deal</p>
            <p className="text-xl font-bold text-slate-900">{Math.min(...products.map(p => p.points)).toLocaleString()} pts</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
