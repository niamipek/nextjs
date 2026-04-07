import type { Metadata } from "next";
import { ProductPageClient } from "./components/ProductPageClient";
import { filterProducts, getProductPageFilters, type ProductSearchParams } from "./filterProducts";

type ProductPageProps = {
  searchParams?: Promise<ProductSearchParams> | ProductSearchParams;
};

export const metadata: Metadata = {
  title: "Products | Sales Dashboard",
  description: "Browse products, stock status, and item details in the sales dashboard.",
};

function getTodayDateKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const filters = getProductPageFilters(resolvedSearchParams);
  const filteredProducts = filterProducts(filters);

  return <ProductPageClient filters={filters} products={filteredProducts} todayDateKey={getTodayDateKey()} />;
}
