import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Heart, LogOut, Coins, Menu, X } from 'lucide-react';
import CartModal from './CartModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const store = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20">
              S
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              Shelf<span className="text-primary">Merch</span>
            </span>
          </div>

          {/* Right Side */}
          {user && store ? (
            <div className="flex items-center gap-3">
              {/* Points Badge */}
              <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-amber-100">
                <Coins className="w-4 h-4" />
                {store.pointsBalance.toLocaleString()} pts
              </div>

              {/* Wishlist */}
              <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600">
                <Heart className="w-5 h-5" />
                {store.wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                    {store.wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600"
              >
                <ShoppingCart className="w-5 h-5" />
                {store.cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                    {store.cart.length}
                  </span>
                )}
              </button>

              {/* User */}
              <div className="hidden sm:flex items-center gap-3 ml-2 pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-violet-500 text-white flex items-center justify-center text-sm font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
                  {user.name}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="p-2 rounded-xl hover:bg-red-50 hover:text-red-500 text-slate-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="px-5 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-primary transition-colors"
            >
              Corporate Login
            </a>
          )}
        </div>
      </nav>

      {/* Cart Modal */}
      {user && <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />}
    </>
  );
};

export default Navbar;
