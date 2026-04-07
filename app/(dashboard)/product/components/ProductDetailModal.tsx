"use client";

import Image from "next/image";
import type { Product } from "../data";
import { useProductImageGallery } from "../hooks/useProductImageGallery";

type ProductDetailModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
};

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="product-detail-field">
      <div className="product-detail-field-label">{label}</div>
      <div className="product-detail-field-value">{value}</div>
    </div>
  );
}

export function ProductDetailModal({ open, product, onClose }: ProductDetailModalProps) {
  const {
    productImages,
    selectedImageIndex,
    isDragging,
    handleInputChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleRemoveImage,
    setSelectedImageIndex,
  } = useProductImageGallery(product);

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
                      <Image
                        src={selectedImage.imageDataUrl}
                        alt={product.name}
                        width={720}
                        height={720}
                        unoptimized
                        className="product-detail-image"
                      />
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
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
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
                        <Image
                          src={image.imageDataUrl}
                          alt={`${product.name} ${index + 1}`}
                          width={160}
                          height={160}
                          unoptimized
                          className="product-detail-gallery-thumb-image"
                        />
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
