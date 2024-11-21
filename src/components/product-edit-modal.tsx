"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { product } from "@/product";
import { EditIcon, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import MultipleSelector, { Option } from "./ui/multiple-selector";
import { getCookie } from "@/lib/utils";
import useProductStore from "@/store/productsStore";

export default function ProductEditModal({ product }: { product: product }) {
  const { getProducts } = useProductStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(product.image);
  const [formData, setFormData] = useState<{
    image: string;
    title: string;
    description: string;
    price: string;
    brand: string;
    salePrice: string;
    category: Option[];
    totalStock: string;
  }>({
    image: image || "",
    brand: product.brand,
    category: product.category.split(",").map((category) => ({
      label: category,
      value: category,
    })),
    description: product.description,
    price: product.price.toString(),
    salePrice: product.salePrice.toString(),
    totalStock: product.totalStock.toString(),
    title: product.title,
  });
  const OPTIONS: Option[] = [
    { label: "Shoes", value: "shoes" },
    { label: "Clothing", value: "cloths" },
  ];
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const categories: string = formData.category
        .map((category) => category.value)
        .join(", ");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/updateProduct/${product._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            price: formData.price,
            brand: formData.brand,
            category: categories,
            salePrice: formData.salePrice,
            totalStock: formData.totalStock,
            image,
          }),
        }
      );
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        getProducts();
      } else {
        toast.error("Error deleting product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append("image", file);

      const message = toast.loading("Uploading image...");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}upload/image`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          toast.error("Error uploading image", { id: message, duration: 3000 });
          throw new Error("Image upload failed");
        }

        const data = await response.json();
        setImage(data?.result?.url);
        toast.success("Image uploaded successfully", {
          id: message,
          duration: 3000,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image", { id: message, duration: 3000 });
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          Edit <EditIcon className="w-5 h-5 text-black" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            {imagePreview ? (
              <div className="relative w-full h-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="mt-2"
                />
                <X
                  className="absolute top-2 -right-10 cursor-pointer text-red-500 bg-white rounded-full hover:bg-red-100"
                  onClick={() => setImagePreview(null)}
                />
              </div>
            ) : (
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="col-span-3"
              />
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">
              Brand
            </Label>
            <Input
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="w-full flex items-center gap-4">
            <Label className=" ml-5">Category</Label>
            <MultipleSelector
              selectFirstItem={false}
              defaultOptions={OPTIONS}
              value={formData.category}
              onChange={(values) => {
                setFormData((prev) => ({
                  ...prev,
                  category: values,
                }));
              }}
              placeholder="Select frameworks you like..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salePrice" className="text-right">
              Sale Price
            </Label>
            <Input
              id="salePrice"
              name="salePrice"
              type="number"
              value={formData.salePrice}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalStock" className="text-right">
              Total Stock
            </Label>
            <Input
              id="totalStock"
              name="totalStock"
              type="number"
              value={formData.totalStock}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <DialogClose
            type="submit"
            className="mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 py-2 "
          >
            Save changes
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
