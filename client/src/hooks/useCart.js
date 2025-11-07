import { useCartContext } from "@/context/CartContext";

export default function useCart() {
  const { state, dispatch } = useCartContext();

  const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQuantity = (id, qty) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  const setCart = (items, total) =>
    dispatch({ type: "SET_CART", payload: { items, total } });

  return {
    cart: state.cart,
    total: state.total,
    addItem,
    removeItem,
    updateQuantity,
    setCart,
  };
}
