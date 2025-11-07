import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import api from "@/src/lib/api";
import ReceiptModal from "./ReceiptModal";

export default function CheckoutForm() {
  const { state, dispatch } = useCart();
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/checkout", { cartItems: state.cart });
      setReceipt({
        name: form.name,
        email: form.email,
        total: res.data.total,
        timestamp: res.data.timestamp,
      });
      dispatch({ type: "SET_CART", payload: { items: [], total: 0 } });
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (!state.cart.length)
    return (
      <div className="text-center py-20 text-muted-foreground">
        No items to checkout 🛒
      </div>
    );

  return (
    <>
      <Card className="max-w-md mx-auto shadow-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Checkout</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {receipt && (
        <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
      )}
    </>
  );
}
