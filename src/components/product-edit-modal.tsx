"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
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

export default function ProductEditModal({ product }: { product: product }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(product.image);
  const [formData, setFormData] = useState<{
    image: string;
    title: string;
    description: string;
    price: string;
    brand: string;
    category: string;
    salePrice: string;
    totalStock: string;
  }>({
    image: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    salePrice: "",
    totalStock: "",
    title: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    console.log("Submitting form data:", formData);
    // Close the modal or show a success message
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              name="category"
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
                <SelectItem value="toys">Toys</SelectItem>
              </SelectContent>
            </Select>
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
          <Button type="submit" className="mt-4">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
