import { useCart } from "@/context/CartContext";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import api from "@/src/lib/api";
import { useState } from "react";

export default function CartSummary() {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (id, delta) => {
    const updatedCart = state.cart.map((item) =>
      item._id === id
        ? { ...item, qty: Math.max(item.qty + delta, 1) } // prevent qty < 1
        : item
    );

    const total = updatedCart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    dispatch({ type: "SET_CART", payload: { items: updatedCart, total } });
  };

  const handleRemove = (id) => {
    const updatedCart = state.cart.filter((item) => item._id !== id);
    const total = updatedCart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    dispatch({ type: "SET_CART", payload: { items: updatedCart, total } });
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await api.post("/checkout", { cartItems: state.cart });
      alert(
        `✅ Order placed!\nTotal: ₹${res.data.total}\nTime: ${res.data.timestamp}`
      );
      dispatch({ type: "SET_CART", payload: { items: [], total: 0 } });
    } catch (err) {
      console.error(err);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (!state.cart.length)
    return (
      <div className="text-center py-20 text-muted-foreground">
        Your cart is empty 🛒
      </div>
    );

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {state.cart.map((item) => (
        <Card key={item._id} className="p-4 flex justify-between items-center">
          <CardContent className="flex items-center gap-4 p-0 w-full justify-between">
            <div className="flex items-center gap-4">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="h-14 w-14 object-contain rounded-md bg-gray-100"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(item._id, -1)}
                  className="h-6 w-6"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-6 text-center font-medium">{item.qty}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(item._id, 1)}
                  className="h-6 w-6"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <span className="font-semibold min-w-20 text-right">
                ₹{(item.price * item.qty).toFixed(2)}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(item._id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="text-right text-lg font-semibold">
        Total: ₹{state.total.toFixed(2)}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleCheckout} disabled={loading}>
          {loading ? "Processing..." : "Proceed to Checkout"}
        </Button>
      </div>
    </div>
  );
}
