"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import InfiniteScroll from "@/components/infinite-scroll";
import ProductCard from "@/components/product-card";
import { getCookie } from "@/lib/utils";
import { product } from "@/product";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function DashboardPage() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<
    { product: product; isLiked: boolean; discount: number }[]
  >([]);
  const next = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop?page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(products.concat(data.products));
        setPage((prev) => prev + 1);
        if (data.products.length < 3) {
          console.log(data.products.length);
          setHasMore(false);
        }
        setLoading(false);
      }, 800);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to fetch products: ${error.message}`);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    next();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ContentLayout title="Products">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(257px,1fr))] gap-4 max-sm:grid-cols-2 max-sm:gap-2">
        {products.map((product) => (
          <ProductCard
            key={product.product._id}
            product={product.product}
            isLiked={product.isLiked}
            discount={product.discount}
            setProducts={setProducts}
          />
        ))}
      </div>
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={loading}
        next={next}
        threshold={1}
      >
        {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
      </InfiniteScroll>
    </ContentLayout>
  );
}
