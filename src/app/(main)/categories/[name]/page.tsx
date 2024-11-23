"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProductCard from "@/components/product-card";
import { getCookie } from "@/lib/utils";
import { product } from "@/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CategoryProduct() {
  const { name } = useParams();
  const [products, setProducts] = useState<
    {
      product: product;
      isLiked: boolean;
    }[]
  >([]);

  const getCategoryProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop/${name}`,
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
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting products");
    }
  };
  useEffect(() => {
    getCategoryProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ContentLayout title={Array.isArray(name) ? name[0] : name || ""}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 max-sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product.product._id}
            product={product.product}
            isLiked={product.isLiked}
          />
        ))}
      </div>
    </ContentLayout>
  );
}
