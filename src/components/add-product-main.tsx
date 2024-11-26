"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";
import MultipleSelector, { Option } from "./ui/multiple-selector";
import { getCookie } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AddProductMain() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [modelOption, setModelOption] = useState<Option[]>([]);
  const [categoryOption, setCategoryOption] = useState<Option[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [formData, setFormData] = useState<{
    image: string;
    productName: string;
    description: string;
    price: string;
    brand: string;
    salePrice: string;
    category: Option[];
    model: Option[];
    totalStock: string;
  }>({
    image: "",
    brand: "",
    category: [],
    model: [],
    description: "",
    price: "",
    salePrice: "",
    totalStock: "",
    productName: "",
  });
  const getTags = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/productTags`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data = await res.json();
      setCategoryOption(
        data.categories.map((category: string) => ({
          label: category,
          value: category,
        }))
      );
      setModelOption(
        data.models.map((model: string) => ({
          label: model,
          value: model,
        }))
      );
      setBrands(data.brands);
    } catch (error) {
      console.log(error);
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/addNewProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          title: formData.productName,
          description: formData.description,
          price: formData.price,
          brand: formData.brand,
          category: formData.category
            .map((category) => category.value)
            .join(", "),
          model: formData.model.map((model) => model.value).join(", "),
          salePrice: formData.salePrice,
          totalStock: formData.totalStock,
        }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      toast.success(data?.message);
      setFormData({
        image: "",
        brand: "",
        category: [],
        description: "",
        price: "",
        salePrice: "",
        totalStock: "",
        productName: "",
        model: [],
      });
      setImage(null);
      setImagePreview(null);
      return;
    } else {
      toast.error(data?.message);
    }
  }

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
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    getTags();
  }, []);
  return (
    <Card className="w-full mx-auto bg-transparent border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={200}
                className="mt-2 max-w-xs h-auto"
              />
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="brand">Brand</Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, brand: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand} className="capitalize">
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <MultipleSelector
              selectFirstItem={false}
              options={categoryOption}
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
          <div>
            <Label htmlFor="model">Model</Label>
            <MultipleSelector
              selectFirstItem={false}
              options={modelOption}
              value={formData.model}
              onChange={(values) => {
                setFormData((prev) => ({
                  ...prev,
                  model: values,
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

          <div>
            <Label htmlFor="salePrice">Sale Price</Label>
            <Input
              id="salePrice"
              name="salePrice"
              type="number"
              value={formData.salePrice}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="totalStock">Total Stock</Label>
            <Input
              id="totalStock"
              name="totalStock"
              type="number"
              value={formData.totalStock}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button
            type="submit"
            onClick={onSubmit}
            disabled={
              formData.category.length === 0 ||
              formData.model.length === 0 ||
              !image ||
              !formData.productName ||
              !formData.description ||
              !formData.price ||
              !formData.brand ||
              !formData.salePrice ||
              !formData.totalStock
            }
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
