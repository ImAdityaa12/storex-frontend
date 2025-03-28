"use client";

import { useEffect } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";
import NumberInputModal from "./add-custom-item-quantity";
import EmptyCart from "./empty-cart";

export default function Cart() {
  const router = useRouter();
  const { cartItems, getCartItems, updateQuantity, removeItem, total } =
    useCartStore();
  useEffect(() => {
    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg max-h-[100dvh] max-sm:px-2">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100dvh-10rem)] pr-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between space-x-4 py-4 border-b max-sm:space-x-2"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="rounded-md"
                />
                <div className="sm:flex-1">
                  <h3 className="font-semibold max-sm:text-xs line-clamp-2 max-sm:min-w-[80px]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ₹{item.price.toFixed(1)}
                  </p>
                </div>
                <div className="w-full max-sm:max-w-[40%] h-full flex items-center justify-between sm:hidden">
                  <Minus
                    className="h-4 w-4"
                    onClick={() => updateQuantity(item.productId, "minus")}
                  />
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Plus
                    className="h-4 w-4"
                    onClick={() => updateQuantity(item.productId, "plus")}
                  />
                  <NumberInputModal productId={item.productId} />
                </div>
                <div className="flex items-center space-x-2 max-sm:hidden">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.productId, "minus")}
                  >
                    <Minus className="h-4 w-4 max-sm:w-2 max-sm:h-2" />
                  </Button>
                  <div className="flex items-center">
                    <span className="w-8 text-center">{item.quantity}</span>
                    <NumberInputModal productId={item.productId} />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.productId, "plus")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.productId)}
                  className="ml-auto"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            ))
          ) : (
            <EmptyCart />
          )}
        </ScrollArea>
        <div className="mt-4 space-y-4 max-sm:mt-0 max-sm:mb-4 max-sm:space-y-0">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
          <Button className="w-full" onClick={() => router.push("/checkout")}>
            Place Order
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
