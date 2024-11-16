"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProductCard from "@/components/product-card";
import { product } from "@/product";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
export default function DashboardPage() {
  const [products, setProducts] = useState<
    {
      product: product;
      isLiked: boolean;
    }[]
  >([]);
  const getProducts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:7000/products/shop");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to fetch products: ${error.message}`);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getProducts();

    return () => controller.abort();
  }, [getProducts]);
  return (
    <ContentLayout title="Products">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
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
