import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <Card className="p-4 flex justify-between items-center">
      <CardContent className="flex items-center justify-between w-full p-0">
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
              onClick={() => updateQuantity(item._id, item.qty - 1)}
              className="h-6 w-6"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center font-medium">{item.qty}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(item._id, item.qty + 1)}
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
            onClick={() => removeItem(item._id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
