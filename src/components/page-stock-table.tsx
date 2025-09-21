"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getCookie } from "@/lib/utils";
import { toast } from "sonner";

interface InventoryItem {
  _id: string;
  image: string;
  title: string;
  category: string;
  totalStock: number;
  model: string;
  limitedStock: number;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface PaginationResponse {
  products: InventoryItem[];
  pagination: PaginationInfo;
}

export default function InventoryTableWithSearch() {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setLoading] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const updateStock = useCallback(async (id: string, newValue: number) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/updateStock`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({
            productId: id,
            quantity: newValue,
          }),
        }
      );
      if (response.status === 200) {
        setInventoryData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, totalStock: newValue } : item
          )
        );
        toast.success("Stock updated successfully");
      } else {
        throw new Error("Failed to update stock");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  }, []);

  const handleStockChange = (id: string, newValue: number) => {
    updateStock(id, newValue);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const searchProducts = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/getProductStock?search=${encodeURIComponent(searchQuery)}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data: PaginationResponse = await response.json();
      if (response.status === 200) {
        setInventoryData(data.products || []);
        setTotalProducts(data.pagination?.totalProducts || 0);
        setTotalPages(data.pagination?.totalPages || 0);
        console.log('Search results:', data);
      } else {
        toast.error("Failed to search products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to search products");
    } finally {
      setIsSearching(false);
    }
  }, []);

  const getProductStock = useCallback(async (page: number, limit: number) => {
    setIsLoadingData(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/getProductStock?page=${page}&limit=${limit}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data: PaginationResponse = await response.json();
      if (response.status === 200) {
        setInventoryData(data.products || []);
        setTotalProducts(data.pagination?.totalProducts || 0);
        setTotalPages(data.pagination?.totalPages || 0);
        console.log('Pagination data:', data);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchProducts(searchTerm);
      } else {
        getProductStock(currentPage, itemsPerPage);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, currentPage, itemsPerPage, searchProducts, getProductStock]);

  useEffect(() => {
    if (!searchTerm) {
      getProductStock(currentPage, itemsPerPage);
    }
  }, [currentPage, itemsPerPage, searchTerm, getProductStock]);



  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products by name, category, or ID..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border-2 focus:border-blue-500 transition-colors"
            disabled={isLoadingData || isSearching}
          />
          {(isSearching) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {searchTerm && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Searching for: {searchTerm}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="h-6 px-2 text-xs"
            >
              Clear
            </Button>
          </div>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Total Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Limited Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(isLoadingData || isSearching) ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                {isSearching ? "Searching products..." : "Loading products..."}
              </TableCell>
            </TableRow>
          ) : inventoryData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                {searchTerm
                  ? `No products found matching "${searchTerm}". Try a different search term.`
                  : "No products found."
                }
              </TableCell>
            </TableRow>
          ) : (
            inventoryData.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item._id}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.totalStock}
                    onChange={(e) =>
                      handleStockChange(item._id, parseInt(e.target.value) || 0)
                    }
                    className="w-20"
                  />
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.model || "N/A"}</TableCell>
                <TableCell>{item.limitedStock}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {!isLoadingData && !isSearching && totalProducts > 0 && !searchTerm && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalProducts)} of{" "}
            {totalProducts} products
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoadingData}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  return (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );
                })
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      disabled={isLoadingData}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  </React.Fragment>
                ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoadingData}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
