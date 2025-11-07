import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardHeader, CardContent } from "@/src/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch from backend: recent orders
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <Loader2 className="animate-spin w-6 h-6 mb-2" />
        <p className="text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground">
      <div className="w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Your Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No orders yet.</p>
            <Button asChild className="mt-3">
              <a href="/">Go Shopping</a>
            </Button>
          </div>
        ) : (
          orders.map((order) => (
            <Card key={order._id} className="border rounded-xl">
              <CardHeader>
                <h3 className="font-semibold text-lg">
                  Order #{order._id.slice(-5).toUpperCase()}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.timestamp).toLocaleString()}
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
                <p>
                  <strong>Items:</strong>{" "}
                  {order.items.map((i) => i.name).join(", ")}
                </p>
                <Button variant="outline" asChild>
                  <a href={`/order/${order._id}`}>View Details</a>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
