"use client";

import { useState } from "react";
import { categoryOptions, locationOptions, products, statusOptions, stockOptions, supplierOptions, type Product } from "../data";

export function useProductPage() {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedItemGroups, setSelectedItemGroups] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState(stockOptions[0]);
  const [selectedSupplier, setSelectedSupplier] = useState(supplierOptions[0]);
  const [selectedLocation, setSelectedLocation] = useState(locationOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [selectedDirectSale, setSelectedDirectSale] = useState("Tat ca");
  const [selectedSalesChannelLink, setSelectedSalesChannelLink] = useState("Tat ca");
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesGroup =
      selectedItemGroups.length === 0 || product.groups.some((group) => selectedItemGroups.includes(group));

    const matchesStock =
      selectedStock === "Tat ca" ||
      (selectedStock === "Con hang" && product.stock > 0) ||
      (selectedStock === "Het hang" && product.stock === 0) ||
      (selectedStock === "Sap het hang" && product.status === "Sap het hang");

    return matchesGroup && matchesStock;
  });

  return {
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
  };
}
