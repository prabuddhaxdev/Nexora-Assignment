import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { dispatch, state } = useCart();

  const handleAddToCart = () => {
    const existingItem = state.cart.find((item) => item._id === product._id);
    const updatedCart = existingItem
      ? state.cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        )
      : [...state.cart, { ...product, qty: 1 }];

    const total = updatedCart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    dispatch({ type: "SET_CART", payload: { items: updatedCart, total } });
  };

  return (
    <Card className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4 flex flex-col items-start">
        {/* Image */}
        <div className="w-full h-40 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-contain h-32 w-32 group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Info */}
        <h3 className="text-base font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {product.description || "A high-quality product."}
        </p>
        <p className="text-lg font-semibold mb-3 text-primary">
          ₹{product.price.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <Button onClick={handleAddToCart} className="w-full" variant="default">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
