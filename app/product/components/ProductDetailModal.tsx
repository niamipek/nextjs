"use client";

import { useEffect, useState, type ChangeEvent, type DragEvent } from "react";
import type { Product } from "../data";

type ProductDetailModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
};

type StoredProductImage = {
  fileName: string;
  imageDataUrl: string;
};

type StoredProductGallery = {
  images: StoredProductImage[];
};

const PRODUCT_IMAGE_STORAGE_PREFIX = "product-detail-image:";

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="product-detail-field">
      <div className="product-detail-field-label">{label}</div>
      <div className="product-detail-field-value">{value}</div>
    </div>
  );
}

function getStorageKey(productCode: string) {
  return `${PRODUCT_IMAGE_STORAGE_PREFIX}${productCode}`;
}

function readStoredProductGallery(productCode: string): StoredProductGallery | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(getStorageKey(productCode));

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as StoredProductGallery | StoredProductImage;

    if ("images" in parsedValue && Array.isArray(parsedValue.images)) {
      return {
        images: parsedValue.images.filter((image) => Boolean(image?.imageDataUrl)),
      };
    }

    if ("imageDataUrl" in parsedValue && "fileName" in parsedValue) {
      return {
        images: [parsedValue],
      };
    }

    return null;
  } catch {
    window.localStorage.removeItem(getStorageKey(productCode));
    return null;
  }
}

function saveStoredProductGallery(productCode: string, payload: StoredProductGallery) {
  window.localStorage.setItem(getStorageKey(productCode), JSON.stringify(payload));
}

function removeStoredProductGallery(productCode: string) {
  window.localStorage.removeItem(getStorageKey(productCode));
}

function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read image file."));
    };

    reader.onerror = () => reject(new Error("Unable to read image file."));
    reader.readAsDataURL(file);
  });
}

export function ProductDetailModal({ open, product, onClose }: ProductDetailModalProps) {
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

  if (!open || !product) {
    return null;
  }

  const selectedImage = productImages[selectedImageIndex] ?? null;

  return (
    <div className="product-detail-overlay" role="dialog" aria-modal="true" aria-labelledby="product-detail-title" onClick={onClose}>
      <div className="product-detail-modal" onClick={(event) => event.stopPropagation()}>
        <div className="product-detail-header">
          <button type="button" className="product-detail-close" onClick={onClose} aria-label="Close product detail modal">
            x
          </button>
          <h2 id="product-detail-title" className="product-detail-title">
            Product details
          </h2>
          <div className="product-detail-actions">
            <button type="button" className="product-detail-action product-detail-action-copy">
              Edit
            </button>
            <button type="button" className="product-detail-action product-detail-action-delete">
              Add new
            </button>
            <button type="button" className="product-detail-action product-detail-action-save">
              Save
            </button>
          </div>
        </div>

        <div className="product-detail-body">
          <section className="product-detail-section">
            <div className="product-detail-section-head">
              <h3 className="product-detail-section-title">General information</h3>
              <span className="product-detail-status">{product.status}</span>
            </div>

            <div className="product-detail-layout">
              <div className="product-detail-grid">
                <DetailField label="Product code" value={product.code} />
                <DetailField label="Product name" value={product.name} />
                <DetailField label="Sale price" value={`${product.salePrice} VND`} />
                <DetailField label="Description" value={product.description} />
              </div>

              <div className="product-detail-visual">
                <div className="product-detail-image-card">
                  {selectedImage ? (
                    <div className="product-detail-image-preview">
                      <img src={selectedImage.imageDataUrl} alt={product.name} className="product-detail-image" />
                      <div className="product-detail-image-hover-actions">
                        <label className="product-detail-image-action">
                          <input className="product-detail-upload-input" type="file" accept="image/*" multiple onChange={handleInputChange} />
                          Add image
                        </label>
                        <button type="button" className="product-detail-image-remove" onClick={() => handleRemoveImage(selectedImageIndex)}>
                          Remove image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      className={`product-detail-upload ${isDragging ? "dragging" : ""}`}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                    >
                      <input className="product-detail-upload-input" type="file" accept="image/*" multiple onChange={handleInputChange} />
                      <div className="product-detail-upload-title">Choose or drop images here</div>
                      <div className="product-detail-upload-note">(Supports PNG, JPG, WEBP. You can upload multiple images for each product)</div>
                      <span className="product-detail-upload-button">Choose images</span>
                    </label>
                  )}
                </div>

                {productImages.length > 0 ? (
                  <div className="product-detail-gallery-strip">
                    {productImages.map((image, index) => (
                      <button
                        key={`${image.fileName}-${index}`}
                        type="button"
                        className={`product-detail-gallery-thumb ${index === selectedImageIndex ? "active" : ""}`}
                        onClick={() => setSelectedImageIndex(index)}
                        aria-label={`View image ${index + 1} of ${product.name}`}
                      >
                        <img src={image.imageDataUrl} alt={`${product.name} ${index + 1}`} className="product-detail-gallery-thumb-image" />
                      </button>
                    ))}

                    <label className="product-detail-gallery-add">
                      <input className="product-detail-upload-input" type="file" accept="image/*" multiple onChange={handleInputChange} />
                      <span>+</span>
                    </label>
                  </div>
                ) : null}

                
              </div>
            </div>
          </section>

          <section className="product-detail-section">
            <div className="product-detail-subhead">
              <h3 className="product-detail-section-title">Product summary</h3>
            </div>

            <div className="product-detail-summary-table">
              <div className="product-detail-summary-head">#</div>
              <div className="product-detail-summary-head">Product code</div>
              <div className="product-detail-summary-head">Product name</div>
              <div className="product-detail-summary-head">Cost price</div>
              <div className="product-detail-summary-head">Stock</div>
              <div className="product-detail-summary-head">Reserved</div>

              <div className="product-detail-summary-cell">1</div>
              <div className="product-detail-summary-cell">{product.code}</div>
              <div className="product-detail-summary-cell">{product.name}</div>
              <div className="product-detail-summary-cell">{product.costPrice} VND</div>
              <div className="product-detail-summary-cell">{product.stock}</div>
              <div className="product-detail-summary-cell">{product.reserved}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
