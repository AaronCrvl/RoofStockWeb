import React from "react";
import { PageContainer } from "../components/PageContainer";
import Layout from "../layout/Layout";

function Settings() {
  return (
    <Layout>
      <PageContainer.Root>
        <PageContainer.Header title={"Configurações"}></PageContainer.Header>
        <PageContainer.Body>
          <div className="h-screen"></div>
        </PageContainer.Body>
      </PageContainer.Root>
    </Layout>
  );
}

export default Settings;
