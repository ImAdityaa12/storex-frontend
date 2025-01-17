import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-8 text-center">
      <div className="mb-4 p-6 bg-muted rounded-full">
        <ShoppingCart className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Looks like you haven&apos;t added anything to your cart yet. Start
        shopping and discover great items!
      </p>
      <Button asChild>
        <Link href="/shop">Start Shopping</Link>
      </Button>
    </div>
  );
}
