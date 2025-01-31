"use client";

import * as React from "react";
import { LoaderCircle, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { product } from "@/product";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { DiscountModal } from "./discount-modal";
import { getCookie } from "@/lib/utils";
import userDetailsStore from "@/store/userDetail";
import useCartStore from "@/store/cartStore";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "./ui/responsive-dialog";
import ProductEditModal from "./product-edit-modal";

export default function CommandSearch() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchData, setSearchData] = React.useState<product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [noProducts, setNoProducts] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const { userDetails } = userDetailsStore();
  const { getCartItems } = useCartStore();
  const pathname = usePathname();
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
  // Debounce function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <F extends (...args: any[]) => any>(
    func: F,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<F>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Memoized search function with debounce
  const debouncedSearchProducts = React.useMemo(
    () =>
      debounce(async (value: string) => {
        try {
          if (value !== "") {
            setLoading(true);
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop/search?q=${value}`
            );
            const data: product[] = await response.json();
            setLoading(false);
            setSearchData(data);
            if (data.length === 0) {
              setNoProducts(true);
            } else {
              setNoProducts(false);
            }
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
          toast.error("Error searching products");
        }
      }, 300), // 300ms delay
    []
  );

  // Keyboard shortcut effect
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    if (pathname === "/manage-product") {
      setEdit(true);
    }
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search effect with debounced search
  React.useEffect(() => {
    debouncedSearchProducts(query);
    if (query === "") {
      setSearchData([]);
    }
  }, [query, debouncedSearchProducts]);

  // Initial search on component mount
  React.useEffect(() => {
    debouncedSearchProducts("");
  }, [debouncedSearchProducts]);

  return (
    <div className="md:w-full">
      <Button
        onClick={() => setOpen(true)}
        className="relative lg:min-w-[20rem] max-lg:hidden justify-start text-sm text-muted-foreground flex items-center text-white ml-auto dark:bg-gray-900 border-2 hover:bg-transparent hover:text-blue-400 border-blue-400 dark:border-gray-900 dark:hover:bg-gray-800 dark:focus:bg-gray-800 group"
        disabled={!userDetails.approved}
      >
        Search
        <span className="w-full">
          <Search className="text-white ml-auto group-hover:text-blue-400" />
        </span>
      </Button>
      <Button
        onClick={() => setOpen(true)}
        className="relative hidden max-lg:flex justify-center text-sm text-muted-foreground items-center text-white ml-auto dark:bg-gray-900 border-2 hover:bg-transparent hover:text-blue-400 border-blue-400 dark:border-gray-900 dark:hover:bg-gray-800 dark:focus:bg-gray-800 group rounded-full w-10 h-10"
      >
        <Search
          className="text-white ml-auto group-hover:text-blue-400"
          size={10}
        />
      </Button>
      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Search Products</ResponsiveModalTitle>
          </ResponsiveModalHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="max-h-[400px] overflow-y-auto">
              {loading && (
                <div className="flex items-center space-x-4 py-2 px-4 cursor-pointer max-sm:px-1 w-full justify-center">
                  <LoaderCircle className="animate-spin" />
                </div>
              )}
              {!loading && query.length === 0 && (
                <div className="flex items-center space-x-4 py-2 px-4 cursor-pointer max-sm:px-1">
                  <p className="text-sm text-gray-500 max-sm:text-xs">
                    Search for products
                  </p>
                </div>
              )}
              {!loading && noProducts && query.length > 0 && (
                <div className="flex items-center space-x-4 py-2 px-4 cursor-pointer max-sm:px-1">
                  <p className="text-sm text-gray-500 max-sm:text-xs">
                    No products found
                  </p>
                </div>
              )}
              {searchData.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center space-x-4 py-2 border-b px-4 cursor-pointer max-sm:px-1"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                    onClick={() => {
                      router.push(`/product/${product._id}`);
                      setOpen(false);
                    }}
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold max-sm:text-xs">
                      {product.title}
                    </h3>
                    {userDetails.approved && (
                      <p className="text-sm text-gray-500 max-sm:text-xs">
                        ₹{product.salePrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                  {edit && userDetails.role === "admin" ? (
                    <ProductEditModal
                      product={product}
                      style="w-fit"
                      key={product._id}
                    />
                  ) : product.quantityDiscounts.length > 0 ? (
                    <DiscountModal
                      discountData={product.quantityDiscounts}
                      productId={product._id}
                      stock={product.totalStock}
                      key={product._id}
                      buttonStyles="w-fit max-sm:text-xs"
                    />
                  ) : (
                    <Button
                      className="w-fit max-sm:text-xs"
                      onClick={() => addToCart(product)}
                      disabled={
                        product.totalStock === 0 || !userDetails.approved
                      }
                    >
                      <ShoppingCart className="w-4 h-4 mr-2 max-sm:mr-0" />
                      {product.totalStock === 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </div>
  );
}
