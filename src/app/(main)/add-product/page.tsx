import AddProductMain from "@/components/add-product-main";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";

const page = () => {
  return (
    <ContentLayout title="Add Product">
      <AddProductMain />
    </ContentLayout>
  );
};

export default page;
