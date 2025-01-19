"use client";

import React, { useState, useMemo } from "react";
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

interface InventoryItem {
  itemName: string;
  id: string;
  totalStock: number;
  category: string;
  model: string;
  image: string;
}

const initialMockData: InventoryItem[] = [
  {
    itemName: "Laptop",
    id: "1",
    totalStock: 50,
    category: "Electronics",
    model: "XPS 15",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    itemName: "Smartphone",
    id: "2",
    totalStock: 100,
    category: "Electronics",
    model: "iPhone 12",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    itemName: "Desk Chair",
    id: "3",
    totalStock: 30,
    category: "Furniture",
    model: "Ergonomic Pro",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    itemName: "Headphones",
    id: "4",
    totalStock: 75,
    category: "Electronics",
    model: "WH-1000XM4",
    image: "/placeholder.svg?height=50&width=50",
  },
];

export default function InventoryTableWithSearch() {
  const [inventoryData, setInventoryData] =
    useState<InventoryItem[]>(initialMockData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleStockChange = (id: string, newValue: number) => {
    setInventoryData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, totalStock: newValue } : item
      )
    );
  };

  const filteredInventory = useMemo(() => {
    return inventoryData.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [inventoryData, searchTerm]);

  return (
    <div className="">
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
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.itemName}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>{item.itemName}</TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.totalStock}
                  onChange={(e) =>
                    handleStockChange(item.id, parseInt(e.target.value) || 0)
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
