import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderItem } from "./profile-page";
import Image from "next/image";

interface ItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  address:
    | {
        addressId: string;
        address: string;
        city: string;
        notes: string;
        phone: string;
        pincode: string;
      }
    | undefined;
}

export function ItemsModal({
  isOpen,
  onClose,
  items,
  address,
}: ItemsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Order Items</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sale Price</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>${item.salePrice.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <p>Shipping Address: {address?.address}</p>
          <p>City: {address?.city}</p>
          <p>Pincode: {address?.pincode}</p>
          <p>Phone: {address?.phone}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
