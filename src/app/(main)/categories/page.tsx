import { ContentLayout } from "@/components/admin-panel/content-layout";
import CategoriesPageMain from "@/components/CategoriesPage";
import React from "react";

const CategoriesPage = () => {
  return (
    <ContentLayout title="Categories">
      <CategoriesPageMain />
    </ContentLayout>
  );
};

export default CategoriesPage;
