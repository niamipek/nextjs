"use client";

import { useState } from "react";
import { categoryOptions, locationOptions, products, statusOptions, stockOptions, supplierOptions, type Product } from "../data";

export function useProductPage() {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemGroups, setSelectedItemGroups] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState(stockOptions[0]);
  const [selectedSupplier, setSelectedSupplier] = useState(supplierOptions[0]);
  const [selectedLocation, setSelectedLocation] = useState(locationOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [selectedDirectSale, setSelectedDirectSale] = useState("All");
  const [selectedSalesChannelLink, setSelectedSalesChannelLink] = useState("All");
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchesGroup =
      selectedItemGroups.length === 0 || product.groups.some((group) => selectedItemGroups.includes(group));
    const matchesSearch =
      normalizedQuery.length === 0 ||
      product.code.toLowerCase().includes(normalizedQuery) ||
      product.name.toLowerCase().includes(normalizedQuery);

    const matchesStock =
      selectedStock === "All" ||
      (selectedStock === "In stock" && product.stock > 0) ||
      (selectedStock === "Out of stock" && product.stock === 0) ||
      (selectedStock === "Low stock" && product.status === "Low stock");

    return matchesGroup && matchesSearch && matchesStock;
  });

  return {
    filteredProducts,
    isImportOpen,
    searchQuery,
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
    setSearchQuery,
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
  };
}
