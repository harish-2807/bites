/* eslint-disable react/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext();

export const FREE_DELIVERY_THRESHOLD = 300;
export const DELIVERY_FEE = 40;

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (food, quantity = 1) => {
    setCart((prev) => ({
      ...prev,
      [food.id]: { food, quantity: (prev[food.id]?.quantity ?? 0) + quantity },
    }));
  };

  const removeItem = (foodId) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[foodId];
      return next;
    });
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeItem(foodId);
      return;
    }
    setCart((prev) => ({
      ...prev,
      [foodId]: { ...prev[foodId], quantity },
    }));
  };

  const clearCart = () => setCart({});
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((open) => !open);

  const { itemCount, subtotal } = useMemo(
    () =>
      Object.values(cart).reduce(
        (acc, item) => ({
          itemCount: acc.itemCount + item.quantity,
          subtotal: acc.subtotal + item.food.price * item.quantity,
        }),
        { itemCount: 0, subtotal: 0 }
      ),
    [cart]
  );

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const items = Object.values(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        toggleCart,
        openCart,
        closeCart,
        itemCount,
        subtotal,
        deliveryFee,
        total,
        FREE_DELIVERY_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};
