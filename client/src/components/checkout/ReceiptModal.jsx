import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ReceiptModal({ receipt, onClose }) {
  return (
    <Dialog open={!!receipt} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Confirmation</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p>
            🧾 <strong>Name:</strong> {receipt.name}
          </p>
          <p>
            📧 <strong>Email:</strong> {receipt.email}
          </p>
          <p>
            💰 <strong>Total:</strong> ₹{receipt.total.toFixed(2)}
          </p>
          <p>
            ⏰ <strong>Time:</strong>{" "}
            {new Date(receipt.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
