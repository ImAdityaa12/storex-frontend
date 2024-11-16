import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { product } from "@/product";
import { cn } from "@/lib/utils";

export default function ProductCard({
  product,
  isLiked,
}: {
  product: product;
  isLiked: boolean;
}) {
  const categories = product.category.split(",");
  return (
    <Card className="flex flex-col max-w-[350px] max-h-[570px]">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            // objectFit="cover"
            className="rounded-t-lg object-cover"
          />
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart
              className={cn(
                "w-5 h-5 text-gray-600 transition-all",
                isLiked && "text-red-500"
              )}
              fill={isLiked ? "red" : "none"}
            />
            <span className="sr-only">Add to favorites</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-lg font-bold">${product.salePrice}</span>
            {product.salePrice < product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.price}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {categories.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          {/* <Badge variant="secondary">{product.category}</Badge> */}
        </div>
        <div className="text-sm text-gray-600 mb-2">Brand: {product.brand}</div>
        <div className="text-sm text-gray-600">
          In Stock: {product.totalStock}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
