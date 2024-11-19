"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProductCard from "@/components/product-card";
import useProductStore from "@/store/productsStore";
import { useEffect } from "react";
export default function DashboardPage() {
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ContentLayout title="Products">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
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
