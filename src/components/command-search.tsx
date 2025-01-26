"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { product } from "@/product";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CommandSearch() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchData, setSearchData] = React.useState<product[]>([]);

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
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop/search?q=${value}`
            );
            const data: product[] = await response.json();
            setSearchData(data);
          }
        } catch (error) {
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

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="max-h-[400px] overflow-y-auto">
              {searchData.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center space-x-4 py-2 border-b px-4"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-500">
                      ₹{product.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      router.push(`/product/${product._id}`);
                      setOpen(false);
                    }}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
