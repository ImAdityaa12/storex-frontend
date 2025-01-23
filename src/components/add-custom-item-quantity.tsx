"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCookie } from "@/lib/utils";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import useCartStore from "@/store/cartStore";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "./ui/responsive-dialog";

export default function NumberInputModal({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const { getCartItems } = useCartStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}user/cart/updateCartItemCustomQuantity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({
            productId,
            quantity: +number,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Item quantity updated successfully");
        getCartItems();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setNumber("");
  };

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalTrigger asChild>
        <Button variant="outline">
          <Edit />
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent className="sm:max-w-[425px] pb-10">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Enter a Number</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Please input a number in the field below and click submit.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Number
              </Label>
              <Input
                id="number"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <ResponsiveModalFooter>
            <Button type="submit">Submit</Button>
          </ResponsiveModalFooter>
        </form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
