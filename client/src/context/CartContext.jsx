/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  total: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload.items,
        total: action.payload.total,
      };

    case "ADD_ITEM": {
      const existingItem = state.cart.find((i) => i._id === action.payload._id);
      let updatedCart;
      if (existingItem) {
        updatedCart = state.cart.map((i) =>
          i._id === action.payload._id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, qty: 1 }];
      }
      const total = updatedCart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      return { ...state, cart: updatedCart, total };
    }

    case "REMOVE_ITEM": {
      const updatedCart = state.cart.filter((i) => i._id !== action.payload);
      const total = updatedCart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      return { ...state, cart: updatedCart, total };
    }

    case "UPDATE_QTY": {
      const updatedCart = state.cart.map((item) =>
        item._id === action.payload.id
          ? { ...item, qty: Math.max(action.payload.qty, 1) }
          : item
      );
      const total = updatedCart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      return { ...state, cart: updatedCart, total };
    }

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cartState");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initial;
        }
      }
    }
    return initial;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartState", JSON.stringify(state));
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
