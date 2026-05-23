import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, pointsBalance, checkout } = useStore();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const totalCost = cart.reduce((sum, item) => sum + item.points, 0);
  const canAfford = totalCost <= pointsBalance;

  const handleCheckout = async () => {
    try {
      await checkout();
      setCheckoutSuccess(true);
      setCheckoutError('');
      setTimeout(() => {
        setCheckoutSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <motion.div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {checkoutSuccess && (
            <motion.div
              className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl flex items-center gap-3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Order placed successfully! 🎉</span>
            </motion.div>
          )}

          {checkoutError && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{checkoutError}</span>
            </div>
          )}

          {cart.length === 0 && !checkoutSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
              <p className="font-medium text-lg">Your cart is empty</p>
              <p className="text-sm mt-1">Browse our catalog and add items!</p>
            </div>
          ) : (
            cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-sm text-primary font-bold">
                    {item.points.toLocaleString()} pts
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Total</span>
              <span className="text-2xl font-bold text-slate-900">
                {totalCost.toLocaleString()} <span className="text-sm text-slate-400 font-normal">pts</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Your Balance</span>
              <span className={`font-semibold ${canAfford ? 'text-green-600' : 'text-red-500'}`}>
                {pointsBalance.toLocaleString()} pts
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={!canAfford}
              className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-200 ${
                canAfford
                  ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              {canAfford ? 'Place Order' : 'Insufficient Points'}
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;
