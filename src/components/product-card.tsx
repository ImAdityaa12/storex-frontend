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
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import ProductEditModal from "./product-edit-modal";
import userDetailsStore from "@/store/userDetail";
import { Dispatch, SetStateAction } from "react";
import { DiscountModal } from "./discount-modal";

export default function ProductCard({
  product,
  isLiked,
  isEdit,
  discount,
  setProducts,
  isSaved,
}: {
  product: product;
  isLiked: boolean;
  isEdit?: boolean;
  discount?: number;
  isSaved?: boolean;
  setProducts: Dispatch<
    SetStateAction<
      {
        product: product;
        isLiked: boolean;
        discount: number;
      }[]
    >
  >;
}) {
  // const categories = product.category.split(",");
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
        if (isSaved) {
          setProducts((prev) => prev.filter((item) => item.product._id !== id));
        }
        setProducts((prev) =>
          prev.map((item) =>
            item.product._id === id ? { ...item, isLiked: !item.isLiked } : item
          )
        );
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
        setProducts((prev) => prev.filter((item) => item.product._id !== id));
      } else {
        toast.error("Error deleting product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };
  return (
    <Card className="flex flex-col max-w-[350px] max-sm:w-full max-h-[570px] max-sm:min-h-[335px] overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          {product.totalStock < product.limitedStock && (
            <Badge
              className="absolute top-2 left-2 z-10"
              variant={"destructive"}
            >
              Limited
            </Badge>
          )}
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
          className="text-xl font-semibold mb-2 cursor-pointer max-sm:text-sm max-sm:mb-0"
          onClick={() => router.push(`/product/${product._id}`)}
        >
          {product.title}
        </h2>
        {userDetails.approved ? (
          <>
            <div className="flex justify-between items-center mb-2 max-sm:mb-0 max-sm:justify-normal">
              <div>
                <span className="text-lg font-bold max-sm:text-xs">
                  ₹{product.salePrice}
                </span>
                <span className="text-sm ml-2 max-sm:text-xs line-through">
                  ₹{product.price}
                </span>
                {product.salePrice < product.price && (
                  <span className="text-sm ml-2 max-sm:text-xs font-bold text-green-500">
                    {discount?.toFixed(0)}% off
                  </span>
                )}
              </div>
              <div className="flex gap-2 max-sm:hidden">
                <Badge>{product.model.split(",")[0] || "NA"}</Badge>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2 max-sm:mb-0">
              Brand: {product.brand}
            </div>
            <div className="text-sm text-gray-600 sm:hidden">
              Model: {product.model.split(",")[0] || "NA"}
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
        ) : product.quantityDiscounts?.length > 0 ? (
          <DiscountModal
            discountData={product.quantityDiscounts}
            productId={product._id}
            stock={product.totalStock}
          />
        ) : (
          <Button
            className="w-full max-sm:text-xs"
            onClick={() => addToCart(product)}
            disabled={product.totalStock === 0 || !userDetails.approved}
          >
            <ShoppingCart className="w-4 h-4 mr-2 max-sm:mr-0" />
            {product.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
