"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProductCard from "@/components/product-card";
import { getCookie } from "@/lib/utils";
import { product } from "@/product";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SavedProduct = () => {
  const [products, setProducts] = useState<
    {
      product: product;
      isLiked: boolean;
      discount: number;
    }[]
  >([]);
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(257px,1fr))] gap-4 max-sm:grid-cols-2 max-sm:gap-2">
        {products.map((product) => (
          <ProductCard
            key={product.product._id}
            product={product.product}
            isLiked={product.isLiked}
            setProducts={setProducts}
            discount={product.discount}
            isSaved
          />
        ))}
      </div>
    </ContentLayout>
  );
};

export default SavedProduct;
