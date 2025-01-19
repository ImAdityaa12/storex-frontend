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
import { getCookie } from "@/lib/utils";
import { toast } from "sonner";
import useCartStore from "@/store/cartStore";

interface DiscountItem {
  minQuantity: number;
  discountedPrice: number;
  _id: string;
}

interface DiscountModalProps {
  discountData: DiscountItem[];
  productId: string;
}

export function DiscountModal({ discountData, productId }: DiscountModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartItems } = useCartStore();
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
          className="w-full"
          // variant={"outline"}
          onClick={() => setIsOpen(true)}
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
              <Button
                onClick={() => {
                  addToCart(item.minQuantity);
                  setIsOpen(false);
                }}
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
