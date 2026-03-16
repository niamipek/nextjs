"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { ImportModal } from "./components/ImportModal";
import { ProductFilters } from "./components/ProductFilters";
import { ProductTable } from "./components/ProductTable";
import { useProductPage } from "./hooks/useProductPage";

export default function ProductPage() {
  const {
    filteredProducts,
    isImportOpen,
    selectedFile,
    selectedItemGroups,
    selectedStock,
    setIsImportOpen,
    setSelectedFile,
    setSelectedItemGroups,
    setSelectedStock,
  } = useProductPage();

  return (
    <>
      <main className="dashboard-page">
        <DashboardHeader />
        <DashboardNav />

        <section className="product-page-shell">
          <ProductFilters
            selectedItemGroups={selectedItemGroups}
            onSelectedItemGroupsChange={setSelectedItemGroups}
            selectedStock={selectedStock}
            onSelectedStockChange={setSelectedStock}
          />
          <ProductTable products={filteredProducts} onOpenImport={() => setIsImportOpen(true)} />
        </section>
      </main>

      <ImportModal
        open={isImportOpen}
        selectedFile={selectedFile}
        onClose={() => setIsImportOpen(false)}
        onFileChange={setSelectedFile}
      />
    </>
  );
}
