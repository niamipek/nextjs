"use client";

import { useEffect, useState, type ChangeEvent, type Dispatch, type DragEvent, type SetStateAction } from "react";
import type { Product } from "../data";
import {
  readImageFile,
  readStoredProductGallery,
  removeStoredProductGallery,
  saveStoredProductGallery,
  type StoredProductImage,
} from "../_lib/productImageStorage";

type UseProductImageGalleryResult = {
  productImages: StoredProductImage[];
  selectedImageIndex: number;
  isDragging: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDrop: (event: DragEvent<HTMLLabelElement>) => Promise<void>;
  handleDragOver: (event: DragEvent<HTMLLabelElement>) => void;
  handleDragLeave: () => void;
  handleRemoveImage: (imageIndex: number) => void;
  setSelectedImageIndex: Dispatch<SetStateAction<number>>;
};

export function useProductImageGallery(product: Product | null): UseProductImageGalleryResult {
  const [productImages, setProductImages] = useState<StoredProductImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!product) {
      setProductImages([]);
      setSelectedImageIndex(0);
      return;
    }

    const storedGallery = readStoredProductGallery(product.code);
    setProductImages(storedGallery?.images ?? []);
    setSelectedImageIndex(0);
  }, [product]);

  async function handleSelectedFiles(fileList: FileList | File[] | null | undefined) {
    if (!product || !fileList) {
      return;
    }

    const validFiles = Array.from(fileList).filter((file) => file.type.startsWith("image/"));

    if (validFiles.length === 0) {
      return;
    }

    const nextImages = await Promise.all(
      validFiles.map(async (file) => ({
        fileName: file.name,
        imageDataUrl: await readImageFile(file),
      })),
    );

    setProductImages((currentImages) => {
      const mergedImages = [...currentImages, ...nextImages];
      saveStoredProductGallery(product.code, { images: mergedImages });
      return mergedImages;
    });

    setSelectedImageIndex((currentIndex) => (productImages.length === 0 ? 0 : currentIndex));
  }

  async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      await handleSelectedFiles(event.target.files);
    } finally {
      event.target.value = "";
    }
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  async function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    await handleSelectedFiles(event.dataTransfer.files);
  }

  function handleRemoveImage(imageIndex: number) {
    if (!product) {
      return;
    }

    const nextImages = productImages.filter((_, index) => index !== imageIndex);

    if (nextImages.length === 0) {
      removeStoredProductGallery(product.code);
      setProductImages([]);
      setSelectedImageIndex(0);
      return;
    }

    saveStoredProductGallery(product.code, { images: nextImages });
    setProductImages(nextImages);
    setSelectedImageIndex((currentIndex) => Math.max(0, Math.min(currentIndex, nextImages.length - 1)));
  }

  return {
    productImages,
    selectedImageIndex,
    isDragging,
    handleInputChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleRemoveImage,
    setSelectedImageIndex,
  };
}
