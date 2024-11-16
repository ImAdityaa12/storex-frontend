"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProductCard from "@/components/product-card";
import useProductStore from "@/store/productsStore";
import React, { useCallback, useEffect } from "react";
import { toast } from "sonner";

const ManageProduct = () => {
  const { products, setProducts } = useProductStore();
  const getProducts = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getProducts();

    return () => controller.abort();
  }, [getProducts]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.product._id}
          product={product.product}
          isLiked={product.isLiked}
          isEdit={true}
        />
      ))}
    </div>
  );
};

export default ManageProduct;
