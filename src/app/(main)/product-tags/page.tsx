import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import React from "react";

const ProductTagsPage = () => {
  const data = {
    brands: ["havells"],
    categories: ["shoes", "shoes1", "shoes2", "shoes3", "shoes4", "shoes5"],
    models: ["coral", "coral1"],
  };
  return (
    <ContentLayout title="Product Tags">
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>{renderCards(key, value)}</div>
        ))}
      </div>
    </ContentLayout>
  );
};

export default ProductTagsPage;
const renderCards = (title: string, items: string[]) => (
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
            />
          </Badge>
        ))}
        <Plus className="text-green-400 hover:bg-white rounded-full cursor-pointer p-1" />
      </div>
    </CardContent>
  </Card>
);
