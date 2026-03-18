"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { ImportModal } from "./components/ImportModal";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { ProductFilters } from "./components/ProductFilters";
import { ProductTable } from "./components/ProductTable";
import { useProductPage } from "./hooks/useProductPage";

export default function ProductPage() {
  const {
    filteredProducts,
    isImportOpen,
    selectedCategory,
    selectedFile,
    selectedDirectSale,
    selectedItemGroups,
    selectedLocation,
    selectedProductDetail,
    selectedSalesChannelLink,
    selectedStatus,
    selectedStock,
    selectedSupplier,
    setIsImportOpen,
    setSelectedCategory,
    setSelectedDirectSale,
    setSelectedFile,
    setSelectedItemGroups,
    setSelectedLocation,
    setSelectedProductDetail,
    setSelectedSalesChannelLink,
    setSelectedStatus,
    setSelectedStock,
    setSelectedSupplier,
  } = useProductPage();

  return (
    <>
      <main className="dashboard-page">
        <div className="dashboard-topbar">
          <DashboardHeader />
          <DashboardNav />
        </div>

        <section className="dashboard-content-shell product-page-shell">
          <ProductFilters
            selectedCategory={selectedCategory}
            selectedDirectSale={selectedDirectSale}
            selectedItemGroups={selectedItemGroups}
            selectedLocation={selectedLocation}
            selectedSalesChannelLink={selectedSalesChannelLink}
            selectedStatus={selectedStatus}
            selectedSupplier={selectedSupplier}
            onSelectedCategoryChange={setSelectedCategory}
            onSelectedItemGroupsChange={setSelectedItemGroups}
            onSelectedDirectSaleChange={setSelectedDirectSale}
            onSelectedLocationChange={setSelectedLocation}
            onSelectedSalesChannelLinkChange={setSelectedSalesChannelLink}
            onSelectedStatusChange={setSelectedStatus}
            selectedStock={selectedStock}
            onSelectedStockChange={setSelectedStock}
            onSelectedSupplierChange={setSelectedSupplier}
          />
          <ProductTable
            products={filteredProducts}
            onOpenImport={() => setIsImportOpen(true)}
            onOpenProductDetail={setSelectedProductDetail}
          />
        </section>
      </main>

      <ImportModal
        open={isImportOpen}
        selectedFile={selectedFile}
        onClose={() => setIsImportOpen(false)}
        onFileChange={setSelectedFile}
      />
      <ProductDetailModal
        open={selectedProductDetail !== null}
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
      />
    </>
  );
}
