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
import { cn, getCookie } from "@/lib/utils";
import { toast } from "sonner";
import useCartStore from "@/store/cartStore";
import userDetailsStore from "@/store/userDetail";

interface DiscountItem {
  minQuantity: number;
  discountedPrice: number;
  _id: string;
}

interface DiscountModalProps {
  discountData: DiscountItem[];
  productId: string;
  stock: number;
  buttonStyles?: string;
}

export function DiscountModal({
  discountData,
  productId,
  stock,
  buttonStyles,
}: DiscountModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartItems } = useCartStore();
  const { userDetails } = userDetailsStore();
  const addToCart = async (
    quantity: number,
    minQuantityFlag: boolean = true
  ) => {
    const token = getCookie("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}user/cart/addToCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
            quantity,
            minQuantityFlag,
          }),
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Item added to cart");
        getCartItems();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding item to cart");
    }
  };
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveModalTrigger asChild>
        <Button
          className={cn("w-full", buttonStyles)}
          onClick={() => setIsOpen(true)}
          disabled={!userDetails.approved}
        >
          <ShoppingCart className="w-4 h-4 mr-2 max-sm:mr-0" />
          Add options
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
                {item.minQuantity}
                {` piece${item.minQuantity > 1 ? "s" : ""}`} or above- ₹
                {item.discountedPrice / item.minQuantity} per piece
              </span>
              {stock < item.minQuantity ? (
                <Button disabled>Out of stock</Button>
              ) : (
                <Button
                  onClick={() => {
                    addToCart(item.minQuantity);
                    setIsOpen(false);
                  }}
                  disabled={!userDetails.approved}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          ))}
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
