import { ContentLayout } from "@/components/admin-panel/content-layout";
import InventoryTableWithSearch from "@/components/page-stock-table";
import React from "react";

const page = () => {
  return (
    <ContentLayout title="Product Stock">
      <InventoryTableWithSearch />
    </ContentLayout>
  );
};

export default page;
