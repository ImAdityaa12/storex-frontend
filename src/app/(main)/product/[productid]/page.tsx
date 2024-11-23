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

// Mock data for similar and latest products
// const mockProducts = [
//   {
//     id: 1,
//     title: "Similar Product 1",
//     price: 79.99,
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: 2,
//     title: "Similar Product 2",
//     price: 89.99,
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: 3,
//     title: "Similar Product 3",
//     price: 99.99,
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: 4,
//     title: "Latest Product 1",
//     price: 109.99,
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: 5,
//     title: "Latest Product 2",
//     price: 119.99,
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: 6,
//     title: "Latest Product 3",
//     price: 129.99,
//     image: "/placeholder.svg?height=200&width=200",
//   },
// ];

export default function ProductDetail() {
  const { getCartItems } = useCartStore();
  const [products, setProducts] = useState<
    { isLiked: boolean; product: product }[]
  >([]);
  const [latestProducts, setLatestProducts] = useState<
    { isLiked: boolean; product: product }[]
  >([]);
  const { productid: id } = useParams();
  const [currentProductDetail, setCurrentProductDetail] = useState<product>({
    _id: "",
    image: "",
    title: "",
    description: "",
    price: 0,
    brand: "",
    category: "",
    salePrice: 0,
    totalStock: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
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
      setCurrentProductDetail(data.product);
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
  useEffect(() => {
    getItems();
    getSimilarProducts();
    getLatestProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ContentLayout title="Products">
      <div className="mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {currentProductDetail.image && (
            <div className="w-full">
              <Image
                src={currentProductDetail.image}
                alt={currentProductDetail.title}
                width={500}
                height={500}
                className="rounded-lg object-cover w-full h-full object-center"
              />
            </div>
          )}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              {currentProductDetail?.title}
            </h1>
            <p className="text-gray-600">{currentProductDetail?.description}</p>
            <div className="flex items-center space -x-2">
              {currentProductDetail?.salePrice && (
                <span className="text-2xl font-bold">
                  ${(currentProductDetail?.salePrice / 100).toFixed(2)}
                </span>
              )}

              <span className="text-lg text-gray-500 line-through">
                ${(currentProductDetail.price / 100).toFixed(2)}
              </span>
            </div>
            <div>
              <Badge>{currentProductDetail?.brand}</Badge>
              {currentProductDetail?.category.split(",").map((cat, index) => (
                <Badge key={index} variant="secondary" className="ml-2">
                  {cat.trim()}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              In stock: {currentProductDetail.totalStock}
            </p>
            <div className="flex space-x-4">
              <Button
                className="flex-1"
                onClick={() => addToCart(currentProductDetail)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline">
                <Heart className="mr-2 h-4 w-4" /> Wishlist
              </Button>
            </div>
          </div>
        </div>

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
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
