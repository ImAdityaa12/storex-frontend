import { ContentLayout } from "@/components/admin-panel/content-layout";
import ManageProduct from "@/components/ManageProductsMain";
import React from "react";

const page = () => {
  return (
    <ContentLayout title="Manage Product">
      <ManageProduct />
    </ContentLayout>
  );
};

export default page;
