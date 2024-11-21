"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCookie } from "@/lib/utils";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import useCartStore from "@/store/cartStore";

export default function NumberInputModal({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState(quantity.toString());
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
      if (response.status === 200) {
        toast.success("Item quantity updated successfully");
        getCartItems();
      } else {
        toast.error("Error updating item quantity");
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setNumber("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter a Number</DialogTitle>
          <DialogDescription>
            Please input a number in the field below and click submit.
          </DialogDescription>
        </DialogHeader>
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
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
