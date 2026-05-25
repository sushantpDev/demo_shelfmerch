import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { user, token } = useAuth();
  
  const [cart, setCart] = useState(() => {
    const saved = sessionStorage.getItem('shelfmerch_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    const saved = sessionStorage.getItem('shelfmerch_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [pointsBalance, setPointsBalance] = useState(0);

  // Initialize points from SSO token
  useEffect(() => {
    if (user) {
      // If user logs in anew, reset points to what's in the token
      setPointsBalance(user.rewardPoints || 0);
    }
  }, [user]);

  // Save to session storage
  useEffect(() => {
    sessionStorage.setItem('shelfmerch_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem('shelfmerch_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const checkout = async () => {
    const totalCost = cart.reduce((sum, item) => sum + item.points, 0);
    if (totalCost > pointsBalance) {
      throw new Error("Insufficient points!");
    }

    try {
      const TOAST_API_URL = import.meta.env.VITE_TOAST_API_URL || 'http://localhost:5001';
      const response = await fetch(`${TOAST_API_URL}/api/sso/deduct-points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          points: totalCost,
          description: `Purchased from ShelfMerch: ${cart.map(item => item.name).join(', ')}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to deduct points from Toast account.');
      }

      setPointsBalance(data.newBalance);
      setCart([]);

      // Update stored user points balance in session storage
      if (user) {
        const updatedUser = { ...user, rewardPoints: data.newBalance };
        sessionStorage.setItem('shelfmerch_user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error('Error during points deduction:', err);
      throw err;
    }
  };

  return (
    <StoreContext.Provider value={{
      cart,
      wishlist,
      pointsBalance,
      addToCart,
      removeFromCart,
      toggleWishlist,
      checkout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
