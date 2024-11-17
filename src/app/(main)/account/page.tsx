import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProfilePage from "@/components/profile-page";
import React from "react";

const page = () => {
  return (
    <ContentLayout title="Profile">
      <ProfilePage />
    </ContentLayout>
  );
};

export default page;
