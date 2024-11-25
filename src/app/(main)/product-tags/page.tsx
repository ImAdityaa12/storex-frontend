"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductTagsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "brands" | "models" | "categories" | null
  >(null);
  const [data, setData] = useState<{
    brands: string[];
    categories: string[];
    models: string[];
  }>({
    brands: [],
    categories: [],
    models: [],
  });
  // const data = {
  //   brands: ["havells"],
  //   categories: ["shoes", "shoes1", "shoes2", "shoes3", "shoes4", "shoes5"],
  //   models: ["coral", "coral1"],
  // };
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
  const [value, setValue] = useState<Option[]>([]);
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
            body: JSON.stringify({ models: value.map((item) => item.value) }),
          }
        );
        if (res.status === 200) {
          toast.success("Models added successfully");
          setIsModalOpen(false);
        } else {
          toast.error("Error adding models");
        }
      } else if (selectedCategory === "categories") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/addCategory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify({
              categories: value.map((item) => item.value),
            }),
          }
        );
        if (res.status === 200) {
          toast.success("Categories added successfully");
          setIsModalOpen(false);
        } else {
          toast.error("Error adding categories");
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
            body: JSON.stringify({ brands: value.map((item) => item.value) }),
          }
        );
        if (res.status === 200) {
          toast.success("Brands added successfully");
          setIsModalOpen(false);
        } else {
          toast.error("Error adding brands");
        }
      }
      setValue([]);
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
      <ResponsiveModal open={isModalOpen} onOpenChange={setIsModalOpen}>
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
          <MultipleSelector
            selectFirstItem={false}
            value={value}
            creatable
            onChange={(values) => {
              setValue(values);
              console.log(value);
            }}
            placeholder="Select frameworks you like..."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
          />
          <ResponsiveModalFooter className="mt-4">
            <Button className="btn btn-primary" onClick={handleSendRequest}>
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
