"use client";

import type { Product } from "../data";

type ProductTableProps = {
  products: Product[];
  onOpenImport: () => void;
};

export function ProductTable({ products, onOpenImport }: ProductTableProps) {
  return (
    <section className="card product-list-card">
      <div className="product-list-header">
        <div>
          <h1 className="product-list-title">Danh sach hang hoa</h1>
          <p className="product-list-subtitle">Quan ly san pham da nhap, ton kho va thong tin gia ban.</p>
        </div>
        <div className="product-list-actions">
          <input className="product-list-search" placeholder="Tim ma hang, ten hang..." />
          <button type="button" className="product-list-secondary" onClick={onOpenImport}>
            Nhap Excel
          </button>
          <button type="button" className="sale-btn product-list-primary">
            Them hang hoa
          </button>
        </div>
      </div>

      <div className="product-table-shell">
        <table className="product-catalog-table">
          <thead>
            <tr>
              <th className="product-catalog-checkbox">
                <input type="checkbox" />
              </th>
              <th className="product-catalog-fav">*</th>
              <th>Ma hang</th>
              <th>Ten hang</th>
              <th>Gia ban</th>
              <th>Gia von</th>
              <th>Ton kho</th>
              <th>Khach dat</th>
              <th>Trang thai</th>
              <th>Thoi gian tao</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.code}>
                <td className="product-catalog-checkbox">
                  <input type="checkbox" />
                </td>
                <td className="product-catalog-fav">*</td>
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
          Hien thi {products.length === 0 ? "0-0" : `1-${products.length}`} / {products.length} hang hoa
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
