"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { product } from "@/product";
import { EditIcon, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import MultipleSelector, { Option } from "./ui/multiple-selector";
import { cn, getCookie } from "@/lib/utils";
import useProductStore from "@/store/productsStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "./ui/responsive-dialog";
import { QuantityDiscount } from "./add-product-main";

export default function ProductEditModal({
  product,
  style,
}: {
  product: product;
  style?: string;
}) {
  const { getProducts, modelOptions, brands, categoryOption } =
    useProductStore();
  const [discounts, setDiscounts] = useState<QuantityDiscount[]>(
    product.quantityDiscounts
  );
  const [newMinQuantity, setNewMinQuantity] = useState("");
  const [newDiscountedPrice, setNewDiscountedPrice] = useState("");
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
    model: Option[];
    totalStock: string;
    limitedStock: number;
  }>({
    image: image || "",
    brand: product.brand,
    model: product.model
      .split(",")
      .map((model) => ({ label: model, value: model })),
    category: product.category.split(",").map((category) => ({
      label: category,
      value: category,
    })),
    description: product.description,
    price: product.price.toString(),
    salePrice: product.salePrice.toString(),
    totalStock: product.totalStock.toString(),
    title: product.title,
    limitedStock:
      product.limitedStock === undefined ? -1 : product.limitedStock,
  });
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
            price: +formData.price,
            brand: formData.brand,
            salePrice: +formData.salePrice,
            category: formData.category
              .map((category) => category.value)
              .join(", "),
            model: formData.model.map((model) => model.value).join(", "),
            totalStock: formData.totalStock,
            image,
            quantityDiscounts: discounts,
            limitedStock: formData.limitedStock,
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
  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button className={cn("w-full", style)}>
          Edit <EditIcon className="w-5 h-5 text-black" />
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent className="sm:max-w-[425px] max-sm:px-2">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Edit Product</ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="w-full grid grid-cols-4 items-center gap-4">
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
                className="min-w-52 col-span-3"
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
              className="min-w-52 col-span-3"
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
              className="min-w-52 col-span-3"
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
              className="min-w-52 col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="ml-auto">
              Brand
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, brand: value }))
              }
            >
              <SelectTrigger className="min-w-52 col-span-3">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="ml-auto">
              Category
            </Label>
            <div className="min-w-52 col-span-3">
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
                placeholder="Select Categories...."
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="ml-auto">
              Modal
            </Label>
            <div className="min-w-52 col-span-3">
              <MultipleSelector
                selectFirstItem={false}
                options={modelOptions}
                value={formData.model}
                onChange={(values) => {
                  setFormData((prev) => ({
                    ...prev,
                    model: values,
                  }));
                }}
                placeholder="Select Modals...."
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
            </div>
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
              className="min-w-52 col-span-3"
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
              className="min-w-52 col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalStock" className="text-right">
              Add Limited Stock
            </Label>
            <Input
              id="limitedStock"
              name="limitedStock"
              type="number"
              value={formData.limitedStock}
              onChange={handleInputChange}
              className="min-w-52 col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 w-full">
            <Label htmlFor="stock" className="text-right">
              Edit Quanity
            </Label>
            <div className="col-span-3">
              {discounts.map((discount, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
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
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeDiscount(index)}
                    className="px-3"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Label className="text-right">Add Discount</Label>
            <div className="col-span-3 flex items-end space-x-2 min-w-full ml-auto">
              <Input
                id="newMinQuantity"
                type="number"
                value={newMinQuantity}
                onChange={(e) => setNewMinQuantity(e.target.value)}
                placeholder="Min Quantity"
                className="min-w-24"
              />

              <Input
                id="newDiscountedPrice"
                type="number"
                value={newDiscountedPrice}
                onChange={(e) => setNewDiscountedPrice(e.target.value)}
                placeholder="Discounted Price"
                className="min-w-24"
              />

              <Button type="button" onClick={addDiscount}>
                <Plus className="" />
              </Button>
            </div>
          </div>
          <ResponsiveModalClose
            type="submit"
            className="mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 py-2 "
          >
            Save changes
          </ResponsiveModalClose>
        </form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
