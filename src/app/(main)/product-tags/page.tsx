"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dialog";
import { getCookie } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductTagsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "brands" | "models" | "categories" | null
  >(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [brands, setBrands] = useState<Option[]>([]);
  const [data, setData] = useState<{
    brands: string[];
    categories: string[];
    models: string[];
  }>({
    brands: [],
    categories: [],
    models: [],
  });
  const [image, setImage] = useState<string | null>(null);
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
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTags();
  }, []);
  const [value, setValue] = useState<string>("");
  const handleSendRequest = async () => {
    try {
      if (selectedCategory === "models") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/addModel`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify({ model: value, image: image }),
          }
        );
        if (res.status === 200) {
          toast.success("Models added successfully");
          setIsModalOpen(false);
        } else {
          toast.error("Error adding models");
        }
      }
      if (selectedCategory === "categories") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/addCategory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify({
              category: value,
              image: image,
            }),
          }
        );
        const data = await res.json();
        if (res.status === 201) {
          toast.success("Category added successfully");
          setIsModalOpen(false);
          setImage(null);
          setValue("");
          setImagePreview(null);
          getTags();
        } else {
          toast.error(data.message);
        }
      }
      if (selectedCategory === "brands") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/addBrand`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify({ brands: brands.map((item) => item.value) }),
          }
        );
        if (res.status === 200) {
          toast.success("Brands added successfully");
          setIsModalOpen(false);
        } else {
          toast.error("Error adding brands");
        }
      }
      setValue("");
      setBrands([]);
      setImage(null);
      getTags();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <ContentLayout title="Product Tags">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            {renderCards(
              key,
              value,
              setIsModalOpen,
              setSelectedCategory,
              getTags
            )}
          </div>
        ))}
      </div>
      <ResponsiveModal
        open={isModalOpen}
        onOpenChange={(value) => {
          setIsModalOpen(value);
          setImage(null);
          setValue("");
          setImagePreview(null);
        }}
      >
        <ResponsiveModalContent className="min-w-3xl">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>
              Create{" "}
              {selectedCategory
                ? selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)
                : ""}
            </ResponsiveModalTitle>
          </ResponsiveModalHeader>
          {selectedCategory === "brands" && (
            <MultipleSelector
              selectFirstItem={false}
              value={brands}
              creatable
              onChange={(values) => {
                setBrands(values);
              }}
              placeholder="Select frameworks you like..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          )}
          {selectedCategory === "models" && (
            <div className="flex flex-col gap-5">
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
              <Input
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>
          )}
          {selectedCategory === "categories" && (
            <div className="flex flex-col gap-5">
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
              <Input
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>
          )}
          {/* {selectedCategory === "models" ||
          selectedCategory === "categories" ? (
            <div className="flex flex-col gap-5">
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
              <Input
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>
          ) : (
            <MultipleSelector
              selectFirstItem={false}
              value={brands}
              creatable
              onChange={(values) => {
                setBrands(values);
              }}
              placeholder="Select frameworks you like..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          )} */}
          <ResponsiveModalFooter className="mt-4">
            <Button
              className="btn btn-primary"
              onClick={handleSendRequest}
              disabled={
                (selectedCategory === "categories" && !image) ||
                (selectedCategory === "models" && !value) ||
                (selectedCategory === "brands" && !brands.length)
              }
            >
              Save
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </ContentLayout>
  );
};
export default ProductTagsPage;
const renderCards = (
  title: string,
  items: string[],
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<"brands" | "models" | "categories" | null>
  >,
  getTags: () => void
) => {
  const deleteTags = async (index: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/deleteTag/${items[index]}?tag=${title}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Tags deleted successfully");
        getTags();
      } else {
        toast.error("Error deleting tags");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Card className="w-full max-w-md mb-6 h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold capitalize">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="list-disc flex gap-2 flex-wrap">
          {items.map((item, index) => (
            <Badge key={index} className="text-sm">
              {item}
              <X
                className="ml-2 text-red-400 hover:bg-white rounded-full cursor-pointer"
                size={16}
                onClick={() => deleteTags(index)}
              />
            </Badge>
          ))}
          <Plus
            className="text-green-400 hover:bg-white rounded-full cursor-pointer p-1"
            onClick={() => {
              setIsModalOpen(true);
              setSelectedCategory(title as "brands" | "models" | "categories");
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
