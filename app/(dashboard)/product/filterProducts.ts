import { products, type Product } from "./data";

export type ProductPageFilters = {
  searchQuery: string;
  selectedCategory: string;
  selectedDirectSale: string;
  selectedItemGroups: string[];
  selectedLocation: string;
  selectedSalesChannelLink: string;
  selectedStatus: string;
  selectedStock: string;
  selectedSupplier: string;
};

export type ProductSearchParams = Record<string, string | string[] | undefined>;

export const defaultProductPageFilters: ProductPageFilters = {
  searchQuery: "",
  selectedCategory: "Select category",
  selectedDirectSale: "All",
  selectedItemGroups: [],
  selectedLocation: "Select location",
  selectedSalesChannelLink: "All",
  selectedStatus: "Active",
  selectedStock: "All",
  selectedSupplier: "Select supplier",
};

function readStringParam(value: string | string[] | undefined, fallback: string) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0] ?? fallback;
  }

  return fallback;
}

function readListParam(value: string | string[] | undefined) {
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (Array.isArray(value)) {
    return value
      .flatMap((item) => item.split(","))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function matchesCategory(product: Product, selectedCategory: string) {
  if (selectedCategory === defaultProductPageFilters.selectedCategory) {
    return true;
  }

  if (selectedCategory === "Shoes") {
    return product.groups.includes("Shoes");
  }

  if (selectedCategory === "Bags & Wallets") {
    return product.groups.includes("Accessories");
  }

  if (selectedCategory === "Women's Fashion") {
    return product.groups.includes("Women's Fashion");
  }

  return true;
}

export function getProductPageFilters(searchParams: ProductSearchParams = {}): ProductPageFilters {
  return {
    searchQuery: readStringParam(searchParams.q, defaultProductPageFilters.searchQuery),
    selectedCategory: readStringParam(searchParams.category, defaultProductPageFilters.selectedCategory),
    selectedDirectSale: readStringParam(searchParams.directSale, defaultProductPageFilters.selectedDirectSale),
    selectedItemGroups: readListParam(searchParams.groups),
    selectedLocation: readStringParam(searchParams.location, defaultProductPageFilters.selectedLocation),
    selectedSalesChannelLink: readStringParam(searchParams.salesChannel, defaultProductPageFilters.selectedSalesChannelLink),
    selectedStatus: readStringParam(searchParams.status, defaultProductPageFilters.selectedStatus),
    selectedStock: readStringParam(searchParams.stock, defaultProductPageFilters.selectedStock),
    selectedSupplier: readStringParam(searchParams.supplier, defaultProductPageFilters.selectedSupplier),
  };
}

export function filterProducts(filters: ProductPageFilters, sourceProducts: Product[] = products) {
  const normalizedQuery = filters.searchQuery.trim().toLowerCase();

  return sourceProducts.filter((product) => {
    const matchesGroup =
      filters.selectedItemGroups.length === 0 || product.groups.some((group) => filters.selectedItemGroups.includes(group));
    const matchesSearch =
      normalizedQuery.length === 0 ||
      product.code.toLowerCase().includes(normalizedQuery) ||
      product.name.toLowerCase().includes(normalizedQuery);
    const matchesStock =
      filters.selectedStock === "All" ||
      (filters.selectedStock === "In stock" && product.stock > 0) ||
      (filters.selectedStock === "Out of stock" && product.stock === 0) ||
      (filters.selectedStock === "Low stock" && product.status === "Low stock");
    const matchesStatus = filters.selectedStatus === "Active" || product.status === filters.selectedStatus;
    const matchesSelectedCategory = matchesCategory(product, filters.selectedCategory);

    return matchesGroup && matchesSearch && matchesStock && matchesStatus && matchesSelectedCategory;
  });
}
