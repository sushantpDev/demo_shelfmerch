import React from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { cart, wishlist, addToCart, toggleWishlist } = useStore();
  const isInCart = cart.find(item => item.id === product.id);
  const isWishlisted = wishlist.find(item => item.id === product.id);

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isWishlisted
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              : 'bg-white/70 text-slate-500 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-white/80 backdrop-blur-sm text-slate-700 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 mb-4 line-clamp-2">{product.description}</p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">{product.points.toLocaleString()}</span>
            <span className="text-xs text-slate-400 ml-1">pts</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={!!isInCart}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isInCart
                ? 'bg-green-50 text-green-600 cursor-default'
                : 'bg-slate-900 text-white hover:bg-primary hover:shadow-lg hover:shadow-primary/20'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
