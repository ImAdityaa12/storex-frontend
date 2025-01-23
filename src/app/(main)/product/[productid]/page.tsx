"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { ShoppingCart, Heart } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCookie } from "@/lib/utils";
import { useEffect, useState } from "react";
import { product } from "@/product";
import useCartStore from "@/store/cartStore";
import userDetailsStore from "@/store/userDetail";

export default function ProductDetail() {
  const { getCartItems } = useCartStore();
  const { userDetails } = userDetailsStore();
  const router = useRouter();
  const [products, setProducts] = useState<
    { isLiked: boolean; product: product }[]
  >([]);
  const [latestProducts, setLatestProducts] = useState<
    { isLiked: boolean; product: product }[]
  >([]);
  const { productid: id } = useParams();
  const [currentProductDetail, setCurrentProductDetail] = useState<{
    product: product;
    discount: number;
    isLiked: boolean;
  }>({
    product: {
      _id: "",
      image: "",
      title: "",
      description: "",
      price: 0,
      brand: "",
      category: "",
      salePrice: 0,
      totalStock: 0,
      quantityDiscounts: [],
      model: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      limitedStock: 0,
    },
    discount: 0,
    isLiked: false,
  });
  const getItems = async () => {
    const token = getCookie("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop/product/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCurrentProductDetail(data);
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
  const getSimilarProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop/getSimilarProducts/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setProducts(data.products);
      } else {
        toast.error("Someting went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong");
    }
  };
  const getLatestProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop/latestProducts/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setLatestProducts(data.products);
      } else {
        toast.error("Someting went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong");
    }
  };
  const toggleLike = async (productId: string) => {
    const token = getCookie("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop/save/${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Item added to favorites");
        setCurrentProductDetail((prev) => ({
          ...prev,
          isLiked: !prev.isLiked,
        }));
      } else {
        toast.error("Error adding item to favorites");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding item to favorites");
    }
  };
  useEffect(() => {
    if (!userDetails.approved) {
      router.push("/shop");
    }
    getItems();
    getSimilarProducts();
    getLatestProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ContentLayout title="Products">
      {userDetails.approved && (
        <div className="mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {currentProductDetail.product.image && (
              <div className="w-full">
                <Image
                  src={currentProductDetail.product.image}
                  alt={currentProductDetail.product.title}
                  width={500}
                  height={500}
                  className="rounded-lg object-cover w-full h-full object-center"
                />
              </div>
            )}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">
                {currentProductDetail?.product.title}
              </h1>
              <p className="text-gray-600">
                {currentProductDetail?.product.description}
              </p>
              <div className="flex items-center space -x-2">
                {currentProductDetail?.product.salePrice && (
                  <span className="text-2xl font-bold">
                    ₹{(currentProductDetail?.product.salePrice).toFixed(2)}
                  </span>
                )}

                <span className="text-lg text-gray-500 line-through ml-4">
                  ₹{currentProductDetail.product.price.toFixed(2)}
                </span>
                <span className="text-lg text-green-500 font-bold ml-4">
                  {currentProductDetail.discount.toFixed(2)}% off
                </span>
              </div>
              <div>
                <Badge>{currentProductDetail?.product.brand}</Badge>
                {currentProductDetail?.product.category
                  .split(",")
                  .map((cat, index) => (
                    <Badge key={index} variant="secondary" className="ml-2">
                      {cat.trim()}
                    </Badge>
                  ))}
              </div>
              {/* <p className="text-sm text-gray-600">
              In stock: {currentProductDetail.product.totalStock}
            </p> */}
              <div className="flex space-x-4">
                <Button
                  className="flex-1"
                  onClick={() => addToCart(currentProductDetail.product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <div
                  onClick={() => toggleLike(currentProductDetail.product._id)}
                >
                  {currentProductDetail.isLiked ? (
                    <Button variant="outline">
                      <Heart className="mr-2 h-4 w-4 text-red-500" fill="red" />{" "}
                      Saved
                    </Button>
                  ) : (
                    <Button variant="outline">
                      <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {products.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
              <Carousel className="w-full mx-auto">
                <CarouselContent>
                  {products.map((product) => (
                    <CarouselItem key={product.product._id} className="w-fit">
                      <ProductCard product={product.product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <CarouselPrevious />
                      <CarouselNext /> */}
              </Carousel>
            </section>
          )}

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
            <Carousel className="w-full mx-auto">
              <CarouselContent>
                {latestProducts.map((product) => (
                  <CarouselItem key={product.product._id} className="">
                    <ProductCard product={product.product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious />
            <CarouselNext /> */}
            </Carousel>
          </section>
        </div>
      )}
    </ContentLayout>
  );
}

function ProductCard({ product }: { product: product }) {
  const router = useRouter();
  return (
    <Card>
      <CardContent className="p-4 border max-sm:w-[200px] max-sm:h-[250px] max-sm:p-0">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="rounded-lg object-cover w-full h-48 mb-4 max-sm:h-2/3 max-sm:rounded-b-none max-sm:object-contain"
          onClick={() => router.push(`/product/${product._id}`)}
        />
        <div className="max-sm:p-2">
          <h3 className="font-semibold mb-2 max-sm:text-sm max-sm:truncate">
            {product.title}
          </h3>
          <p className="text-lg font-bold max-sm:text-sm">
            ₹{product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
