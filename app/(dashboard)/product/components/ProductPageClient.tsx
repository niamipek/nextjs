"use client";

import { startTransition, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Product } from "../data";
import { defaultProductPageFilters, type ProductPageFilters } from "../filterProducts";
import { ImportModal } from "./ImportModal";
import { ProductDetailModal } from "./ProductDetailModal";
import { ProductFilters } from "./ProductFilters";
import { ProductListHeader } from "./ProductListHeader";
import { ProductTable } from "./ProductTable";

type ProductPageClientProps = {
  filters: ProductPageFilters;
  products: Product[];
  todayDateKey: string;
};

export function ProductPageClient({ filters, products, todayDateKey }: ProductPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  function updateFilters(nextFilters: ProductPageFilters) {
    const params = new URLSearchParams();

    if (nextFilters.searchQuery.trim()) {
      params.set("q", nextFilters.searchQuery.trim());
    }

    if (nextFilters.selectedCategory !== defaultProductPageFilters.selectedCategory) {
      params.set("category", nextFilters.selectedCategory);
    }

    if (nextFilters.selectedDirectSale !== defaultProductPageFilters.selectedDirectSale) {
      params.set("directSale", nextFilters.selectedDirectSale);
    }

    if (nextFilters.selectedItemGroups.length > 0) {
      params.set("groups", nextFilters.selectedItemGroups.join(","));
    }

    if (nextFilters.selectedLocation !== defaultProductPageFilters.selectedLocation) {
      params.set("location", nextFilters.selectedLocation);
    }

    if (nextFilters.selectedSalesChannelLink !== defaultProductPageFilters.selectedSalesChannelLink) {
      params.set("salesChannel", nextFilters.selectedSalesChannelLink);
    }

    if (nextFilters.selectedStatus !== defaultProductPageFilters.selectedStatus) {
      params.set("status", nextFilters.selectedStatus);
    }

    if (nextFilters.selectedStock !== defaultProductPageFilters.selectedStock) {
      params.set("stock", nextFilters.selectedStock);
    }

    if (nextFilters.selectedSupplier !== defaultProductPageFilters.selectedSupplier) {
      params.set("supplier", nextFilters.selectedSupplier);
    }

    const nextUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  }

  function patchFilters(patch: Partial<ProductPageFilters>) {
    updateFilters({
      ...filters,
      ...patch,
    });
  }

  return (
    <>
      <div className="dashboard-content-shell product-list-header-shell">
        <div className="product-page-title-shell">
          <h1 className="product-list-title">Products</h1>
        </div>
        <ProductListHeader
          searchQuery={filters.searchQuery}
          onSearchQueryChange={(nextValue) => patchFilters({ searchQuery: nextValue })}
          onOpenImport={() => setIsImportOpen(true)}
        />
      </div>

      <section className="dashboard-content-shell product-page-shell">
        <ProductFilters
          todayDateKey={todayDateKey}
          selectedCategory={filters.selectedCategory}
          selectedDirectSale={filters.selectedDirectSale}
          selectedItemGroups={filters.selectedItemGroups}
          selectedLocation={filters.selectedLocation}
          selectedSalesChannelLink={filters.selectedSalesChannelLink}
          selectedStatus={filters.selectedStatus}
          selectedSupplier={filters.selectedSupplier}
          onSelectedCategoryChange={(nextValue) => patchFilters({ selectedCategory: nextValue })}
          onSelectedItemGroupsChange={(nextValues) => patchFilters({ selectedItemGroups: nextValues })}
          onSelectedDirectSaleChange={(nextValue) => patchFilters({ selectedDirectSale: nextValue })}
          onSelectedLocationChange={(nextValue) => patchFilters({ selectedLocation: nextValue })}
          onSelectedSalesChannelLinkChange={(nextValue) => patchFilters({ selectedSalesChannelLink: nextValue })}
          onSelectedStatusChange={(nextValue) => patchFilters({ selectedStatus: nextValue })}
          selectedStock={filters.selectedStock}
          onSelectedStockChange={(nextValue) => patchFilters({ selectedStock: nextValue })}
          onSelectedSupplierChange={(nextValue) => patchFilters({ selectedSupplier: nextValue })}
        />
        <ProductTable
          products={products}
          onOpenProductDetail={setSelectedProductDetail}
          detailRefreshKey={selectedProductDetail?.code ?? ""}
        />
      </section>

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
