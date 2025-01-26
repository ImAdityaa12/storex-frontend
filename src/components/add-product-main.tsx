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
import { Plus, Trash2 } from "lucide-react";
export interface QuantityDiscount {
  minQuantity: number;
  discountedPrice: number;
}

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
    limitedStock: number;
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
    limitedStock: 0,
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
          discounts,
          limitedStock: formData.limitedStock,
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
        limitedStock: 0,
      });
      setDiscounts([]);
      setImage(null);
      setImagePreview(null);
      return;
    } else {
      toast.error(data?.message);
    }
  }
  const [discounts, setDiscounts] = useState<QuantityDiscount[]>([]);
  const [newMinQuantity, setNewMinQuantity] = useState("");
  const [newDiscountedPrice, setNewDiscountedPrice] = useState("");

  const addDiscount = () => {
    const minQuantity = parseInt(newMinQuantity);
    const discountedPrice = parseFloat(newDiscountedPrice);

    if (isNaN(minQuantity) || isNaN(discountedPrice)) {
      alert("Please enter valid numbers for both fields.");
      return;
    }

    setDiscounts([...discounts, { minQuantity, discountedPrice }]);
    setNewMinQuantity("");
    setNewDiscountedPrice("");
  };

  const removeDiscount = (index: number) => {
    setDiscounts(discounts.filter((_, i) => i !== index));
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
            <Label htmlFor="salePrice">Manage Quantity Discounts</Label>
            <div className="space-y-4">
              {discounts.map((discount, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={discount.minQuantity}
                    onChange={(e) => {
                      const newDiscounts = [...discounts];
                      newDiscounts[index].minQuantity = parseInt(
                        e.target.value
                      );
                      setDiscounts(newDiscounts);
                    }}
                    placeholder="Min Quantity"
                    className="w-1/3"
                  />
                  <Input
                    type="number"
                    value={discount.discountedPrice}
                    onChange={(e) => {
                      const newDiscounts = [...discounts];
                      newDiscounts[index].discountedPrice = parseFloat(
                        e.target.value
                      );
                      setDiscounts(newDiscounts);
                    }}
                    placeholder="Discounted Price"
                    className="w-1/3"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeDiscount(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-end space-x-2">
                <div className="w-1/3">
                  <Input
                    id="newMinQuantity"
                    type="number"
                    value={newMinQuantity}
                    onChange={(e) => setNewMinQuantity(e.target.value)}
                    placeholder="Min Quantity"
                  />
                </div>
                <div className="w-1/3">
                  <Input
                    id="newDiscountedPrice"
                    type="number"
                    value={newDiscountedPrice}
                    onChange={(e) => setNewDiscountedPrice(e.target.value)}
                    placeholder="Discounted Price"
                  />
                </div>
                <Button type="button" onClick={addDiscount}>
                  <Plus className="" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="totalStock">Total Stock</Label>
            <Input
              id="limitedStock"
              name="limitedStock"
              type="number"
              value={formData.limitedStock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="totalStock">Add Limited Stock</Label>
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
              // formData.model.length === 0 ||
              !image ||
              !formData.productName ||
              // !formData.description ||
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
