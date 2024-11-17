"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProductCard from "@/components/product-card";
import { getCookie } from "@/lib/utils";
import { product } from "@/product";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SavedProduct = () => {
  const [products, setProducts] = useState<product[]>([]);
  const getSavedProduct = async () => {
    const token = getCookie("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}users/savedItem`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  };
  useEffect(() => {
    const controller = new AbortController();
    getSavedProduct();
    return () => controller.abort();
  }, []);
  return (
    <ContentLayout title="Products">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} isLiked={true} />
        ))}
      </div>
    </ContentLayout>
  );
};

export default SavedProduct;
