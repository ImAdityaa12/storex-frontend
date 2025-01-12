"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CategoriesPageMain() {
  const router = useRouter();
  const [category, setCategory] = useState<
    {
      name: string;
      image: string;
    }[]
  >([]);
  const getCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop/getCategory`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data = await response.json();
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop by Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.map((category, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent
              className="p-0 cursor-pointer"
              onClick={() => {
                router.push(`/categories/${category.name.toLowerCase()}`);
              }}
            >
              <Image
                src={category.image}
                alt={category.name}
                width={400}
                height={400}
                className="w-full h-72 object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              {/* <p className="text-muted-foreground mb-4">
                {category.description}
              </p> */}
              <Link
                href={`/categories/${category.name.toLowerCase()}`}
                className="text-primary hover:underline"
              >
                Shop {category.name}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
