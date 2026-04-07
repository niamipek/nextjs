"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "../data";

type ProductTableProps = {
  products: Product[];
  onOpenProductDetail: (product: Product) => void;
  detailRefreshKey?: string;
};

function getStoredProductImage(productCode: string) {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(`product-detail-image:${productCode}`);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as
      | { images?: Array<{ imageDataUrl?: string }> }
      | { imageDataUrl?: string };

    if ("images" in parsedValue && Array.isArray(parsedValue.images)) {
      return parsedValue.images[0]?.imageDataUrl ?? null;
    }

    return "imageDataUrl" in parsedValue ? parsedValue.imageDataUrl ?? null : null;
  } catch {
    return null;
  }
}

export function ProductTable({ products, onOpenProductDetail, detailRefreshKey = "" }: ProductTableProps) {
  const [productImageMap, setProductImageMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const nextImageMap = products.reduce<Record<string, string>>((accumulator, product) => {
      accumulator[product.code] = getStoredProductImage(product.code) ?? product.imageUrl;
      return accumulator;
    }, {});

    setProductImageMap(nextImageMap);
  }, [detailRefreshKey, products]);

  return (
    <section className="card product-list-card">
      <div className="product-table-shell">
        <table className="product-catalog-table">
          <thead>
            <tr>
              <th className="product-catalog-checkbox">
                <span className="product-catalog-checkbox-indicator" aria-hidden="true" />
              </th>
              <th className="product-catalog-fav">Image</th>
              <th>Product code</th>
              <th>Product name</th>
              <th>Sale price</th>
              <th>Cost price</th>
              <th>Stock</th>
              <th>Reserved</th>
              <th>Status</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.code}
                className="product-catalog-row"
                onClick={() => onOpenProductDetail(product)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpenProductDetail(product);
                  }
                }}
                tabIndex={0}
              >
                <td className="product-catalog-checkbox">
                  <input type="checkbox" onClick={(event) => event.stopPropagation()} />
                </td>
                <td className="product-catalog-fav">
                  <Image
                    src={productImageMap[product.code] ?? product.imageUrl}
                    alt={product.name}
                    width={72}
                    height={72}
                    unoptimized
                    className="product-catalog-thumb"
                  />
                </td>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.salePrice}</td>
                <td>{product.costPrice}</td>
                <td>{product.stock}</td>
                <td>{product.reserved}</td>
                <td>{product.status}</td>
                <td>{product.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="product-pagination">
        <div className="product-pagination-meta">
          Showing {products.length === 0 ? "0-0" : `1-${products.length}`} / {products.length} products
        </div>
        <div className="product-pagination-controls">
          <button type="button" className="product-page-button">
            {"<"}
          </button>
          <button type="button" className="product-page-button active">
            1
          </button>
          <button type="button" className="product-page-button">
            2
          </button>
          <button type="button" className="product-page-button">
            3
          </button>
          <span className="product-page-dots">...</span>
          <button type="button" className="product-page-button">
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
}
