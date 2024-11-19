"use client";
import ProductCard from "@/components/product-card";
import useProductStore from "@/store/productsStore";
import React, { useEffect } from "react";

const ManageProduct = () => {
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
