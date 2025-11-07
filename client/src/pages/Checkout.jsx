import { useState } from "react";
import { useCart } from "@/src/hooks/useCart";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

export default function Checkout() {
  const { state, dispatch } = useCart();
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Please fill out all fields");
    if (state.cart.length === 0) return alert("Your cart is empty");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: state.cart,
          name: form.name,
          email: form.email,
        }),
      });
      const data = await res.json();
      setReceipt(data);
      dispatch({ type: "SET_CART", payload: { items: [], total: 0 } }); // clear cart
      localStorage.removeItem("cartState");
    } catch (error) {
      console.error(error);
      alert("Checkout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md p-6 bg-card rounded-2xl shadow-md border">
        <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="text-sm text-gray-500 mt-2">
            Total:{" "}
            <span className="font-semibold text-gray-800">
              ${state.total.toFixed(2)}
            </span>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Confirm Checkout"}
          </Button>
        </form>
      </div>

      {/* Receipt Modal */}
      <Dialog open={!!receipt} onOpenChange={() => setReceipt(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Receipt</DialogTitle>
          </DialogHeader>
          {receipt && (
            <div className="mt-2 text-sm text-gray-700">
              <p>
                <strong>Name:</strong> {receipt.name}
              </p>
              <p>
                <strong>Email:</strong> {receipt.email}
              </p>
              <p>
                <strong>Total:</strong> ${receipt.total?.toFixed(2)}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(receipt.timestamp).toLocaleString()}
              </p>
            </div>
          )}
          <Button className="mt-4 w-full" onClick={() => setReceipt(null)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
