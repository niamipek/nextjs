"use client";

import { useState } from "react";
import { products, stockOptions } from "../data";

export function useProductPage() {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedItemGroups, setSelectedItemGroups] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState(stockOptions[0]);

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
    selectedFile,
    selectedItemGroups,
    selectedStock,
    setIsImportOpen,
    setSelectedFile,
    setSelectedItemGroups,
    setSelectedStock,
  };
}
