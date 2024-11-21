"use client";
import Image from "next/image";
import { Heart, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { product } from "@/product";
import { cn, getCookie } from "@/lib/utils";
import { toast } from "sonner";
import useProductStore from "@/store/productsStore";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import ProductEditModal from "./product-edit-modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import userDetailsStore from "@/store/userDetail";

export default function ProductCard({
  product,
  isLiked,
  isEdit,
}: {
  product: product;
  isLiked: boolean;
  isEdit?: boolean;
}) {
  const categories = product.category.split(",");
  const { toggleLike, getProducts } = useProductStore();
  const { getCartItems } = useCartStore();
  const { userDetails } = userDetailsStore();
  const router = useRouter();
  const addFavoriteItem = async (id: string) => {
    const token = getCookie("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop/save/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Item added to favorites");
        toggleLike(id);
      } else {
        toast.error("Error adding item to favorites");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding item to favorites");
    }
  };
  const addToCart = async (product: product) => {
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
            productId: product._id,
            quantity: 1,
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
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/deleteProduct/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        getProducts();
      } else {
        toast.error("Error deleting product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };
  return (
    <Card className="flex flex-col max-w-[350px] max-sm:w-full  max-h-[570px] overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(100vw, 100vh)"
            className="rounded-t-lg object-cover cursor-pointer"
            onClick={() => router.push(`/product/${product._id}`)}
          />
          {isEdit ? (
            <X
              className="absolute top-2 right-2 w-6 h-6 cursor-pointer text-red-500 bg-black rounded-full p-1 hover:bg-gray-600"
              onClick={() => handleDelete(product._id)}
            />
          ) : (
            <button
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              onClick={() => addFavoriteItem(product._id)}
            >
              <Heart
                className={cn(
                  "w-5 h-5 text-gray-600 transition-all",
                  isLiked && "text-red-500"
                )}
                fill={isLiked ? "red" : "none"}
              />
              <span className="sr-only">Add to favorites</span>
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h2
          className="text-xl font-semibold mb-2 cursor-pointer"
          onClick={() => router.push(`/product/${product._id}`)}
        >
          {product.title}
        </h2>
        {userDetails.approved ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-lg font-bold">${product.salePrice}</span>
                {product.salePrice < product.price && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${product.price}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        className="rounded-full bg-background text-xs"
                        variant="outline"
                      >
                        Categories
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="w-64 flex gap-2">
                      {categories.map((category, index) => (
                        <Badge key={index} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Brand: {product.brand}
            </div>
            <div className="text-sm text-gray-600">
              In Stock: {product.totalStock}
            </div>
          </>
        ) : (
          <div>
            <span className="text-lg font-bold">NA</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isEdit ? (
          <ProductEditModal product={product} />
        ) : (
          <Button
            className="w-full"
            onClick={() => addToCart(product)}
            disabled={product.totalStock === 0 || !userDetails.approved}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
