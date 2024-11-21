import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function CategoriesPageMain() {
  const categories = [
    {
      name: "Electronics",
      description: "Latest gadgets and tech innovations",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Shoes",
      description: "Footwear for every occasion",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Cloths",
      description: "Trendy and comfortable apparel",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Accessories",
      description: "Stylish add-ons to complete your look",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Home Decor",
      description: "Elevate your living spaces",
      image: "/placeholder.svg?height=400&width=400",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop by Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={category.image}
                alt={category.name}
                width={400}
                height={400}
                className="w-full h-48 object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-muted-foreground mb-4">
                {category.description}
              </p>
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