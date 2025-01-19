"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import { Search } from "lucide-react";
import { getCookie } from "@/lib/utils";

interface InventoryItem {
  title: string;
  _id: string;
  totalStock: number;
  category: string;
  model: string;
  image: string;
}

export default function InventoryTableWithSearch() {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleStockChange = (id: string, newValue: number) => {
    setInventoryData((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, totalStock: newValue } : item
      )
    );
  };

  const filteredInventory = useMemo(() => {
    return inventoryData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [inventoryData, searchTerm]);
  const getProuctStock = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/getProductStock?page=0`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setInventoryData(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProuctStock();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <div className="relative flex justify-end items-center">
          <Search className=" text-gray-400 absolute right-2" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 pr-10"
          />
        </div>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.map((item) => (
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
              <TableCell>{item.model}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredInventory.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No products found matching your search.
        </p>
      )}
    </div>
  );
}
