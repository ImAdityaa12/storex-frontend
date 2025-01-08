"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "./ui/responsive-dialog";
import { ShoppingCart } from "lucide-react";

interface DiscountItem {
  minQuantity: number;
  discountedPrice: number;
  _id: string;
}

interface DiscountModalProps {
  discountData: DiscountItem[];
}

export function DiscountModal({ discountData }: DiscountModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = (quantity: number, price: number) => {
    // Placeholder function for adding to cart
    console.log(`Added ${quantity} items at ${price} to cart`);
    setIsOpen(false);
  };

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveModalTrigger asChild>
        <Button className="w-full" onClick={() => setIsOpen(true)}>
          <ShoppingCart className="w-4 h-4 mr-2 max-sm:mr-0" />
          Add to Cart
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent className="sm:max-w-[425px]">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Quantity Discounts</ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <div className="grid gap-4 py-4">
          {discountData.map((item) => (
            <div key={item._id} className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {item.minQuantity} pieces - ₹{item.discountedPrice}
              </span>
              <Button
                onClick={() =>
                  handleAddToCart(item.minQuantity, item.discountedPrice)
                }
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
