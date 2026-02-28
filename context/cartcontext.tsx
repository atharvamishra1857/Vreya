"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define what a Cart Item looks like
export type CartItem = {
  id: string; // Usually the Shopify Variant ID
  title: string;
  price: number; // Storing as a number makes math easy
  image: string;
  quantity: number;
  handle: string;
};

// 2. Define the "Brain" interface
type CartContextType = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // --- ADD TO CART LOGIC ---
  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If it exists, just add 1 to the quantity
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      // If it's new, add it to the array with a quantity of 1
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
    openCart(); // Automatically open the drawer when they add something
  };

  // --- SUBTRACT / ADD QUANTITY LOGIC ---
  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          // Prevent quantity from dropping below 1 (they must use the remove button to delete)
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      }),
    );
  };

  // --- REMOVE COMPLETELY ---
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- AUTOMATED MATH ---
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
