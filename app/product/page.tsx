"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

const products = [
  { code: "NU011", name: "Giay nu mau xanh bong", salePrice: "1,995,000", costPrice: "950,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:35" },
  { code: "NU010", name: "Giay nu mau trang", salePrice: "1,750,000", costPrice: "950,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:34" },
  { code: "NU009", name: "Giay nu mau den ho mui", salePrice: "1,980,000", costPrice: "1,200,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:33" },
  { code: "NU008", name: "Tui xach nu mau xanh duong", salePrice: "1,899,000", costPrice: "950,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:32" },
  { code: "NU007", name: "Vi mau xanh la cay", salePrice: "1,849,000", costPrice: "940,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:31" },
  { code: "NU006", name: "Vi mau xanh nhat", salePrice: "1,899,000", costPrice: "950,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:30" },
  { code: "NU005", name: "Vi VIENNE mau tim", salePrice: "190,000", costPrice: "55,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:29" },
  { code: "NU004", name: "Ao vest nu mau xanh duong", salePrice: "2,169,000", costPrice: "820,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:28" },
  { code: "NU003", name: "Ao vest nu mau hong", salePrice: "1,249,000", costPrice: "580,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:27" },
];

const supplierOptions = ["Chon nha cung cap", "KLTN Fashion", "Blue Lotus", "Vienne"];
const locationOptions = ["Chon vi tri", "Kho tong", "Cua hang trung tam", "Kho online"];
const categoryOptions = ["Chon loai hang", "Giay dep", "Tui vi", "Thoi trang nu"];

export default function ProductPage() {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  return (
    <>
      <main className="dashboard-page">
        <DashboardHeader />
        <DashboardNav />

        <section className="product-page-shell">
          <aside className="card product-filter-card">
            <div className="product-filter-toolbar">
              <span className="product-filter-radio" />
              <button className="product-filter-trigger">
                <span>Tuy chinh</span>
                <span className="product-filter-calendar">▣</span>
              </button>
            </div>

            <div className="product-filter-group">
              <h3 className="product-filter-title">Nha cung cap</h3>
              <select className="product-filter-select" defaultValue={supplierOptions[0]}>
                {supplierOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="product-filter-group">
              <h3 className="product-filter-title">Vi tri</h3>
              <select className="product-filter-select" defaultValue={locationOptions[0]}>
                {locationOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="product-filter-group">
              <h3 className="product-filter-title">Loai hang</h3>
              <select className="product-filter-select" defaultValue={categoryOptions[0]}>
                {categoryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="product-filter-group">
              <h3 className="product-filter-title">Ban truc tiep</h3>
              <div className="product-chip-row">
                <button className="product-chip active">Tat ca</button>
                <button className="product-chip">Co</button>
                <button className="product-chip">Khong</button>
              </div>
            </div>

            <div className="product-filter-group">
              <h3 className="product-filter-title">Lien ket kenh ban</h3>
              <div className="product-chip-row">
                <button className="product-chip active">Tat ca</button>
                <button className="product-chip">Co</button>
                <button className="product-chip">Khong</button>
              </div>
            </div>
          </aside>

          <section className="card product-list-card">
            <div className="product-list-header">
              <div>
                <h1 className="product-list-title">Danh sach hang hoa</h1>
                <p className="product-list-subtitle">Quan ly san pham da nhap, ton kho va thong tin gia ban.</p>
              </div>
              <div className="product-list-actions">
                <input className="product-list-search" placeholder="Tim ma hang, ten hang..." />
                <button className="product-list-secondary" onClick={() => setIsImportOpen(true)}>
                  Nhap Excel
                </button>
                <button className="sale-btn product-list-primary">Them hang hoa</button>
              </div>
            </div>

            <div className="product-table-shell">
              <table className="product-catalog-table">
                <thead>
                  <tr>
                    <th className="product-catalog-checkbox">
                      <input type="checkbox" />
                    </th>
                    <th className="product-catalog-fav">☆</th>
                    <th>Ma hang</th>
                    <th>Ten hang</th>
                    <th>Gia ban</th>
                    <th>Gia von</th>
                    <th>Ton kho</th>
                    <th>Khach dat</th>
                    <th>Thoi gian tao</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.code}>
                      <td className="product-catalog-checkbox">
                        <input type="checkbox" />
                      </td>
                      <td className="product-catalog-fav">☆</td>
                      <td>{product.code}</td>
                      <td>{product.name}</td>
                      <td>{product.salePrice}</td>
                      <td>{product.costPrice}</td>
                      <td>{product.stock}</td>
                      <td>{product.reserved}</td>
                      <td>{product.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="product-pagination">
              <div className="product-pagination-meta">Hien thi 1-9 / 24 hang hoa</div>
              <div className="product-pagination-controls">
                <button className="product-page-button">‹</button>
                <button className="product-page-button active">1</button>
                <button className="product-page-button">2</button>
                <button className="product-page-button">3</button>
                <span className="product-page-dots">...</span>
                <button className="product-page-button">›</button>
              </div>
            </div>
          </section>
        </section>
      </main>

      {isImportOpen ? (
        <div className="product-import-overlay" role="dialog" aria-modal="true">
          <div className="product-import-modal">
            <div className="product-import-header">
              <button className="product-import-close" onClick={() => setIsImportOpen(false)}>
                ×
              </button>
              <h2 className="product-import-title">Tai tep du lieu len he thong</h2>
              <button className="sale-btn product-import-check">Kiem tra du lieu</button>
            </div>

            <div className="product-import-body">
              <aside className="product-import-steps">
                <h3 className="product-import-step-heading">Buoc 1. Chon tep nguon</h3>
                <div className="product-import-step active">1. Chon tep nguon</div>
                <div className="product-import-step">2. Kiem tra du lieu</div>
                <div className="product-import-step">3. Tai len he thong</div>
              </aside>

              <div className="product-import-content">
                <label className="product-import-dropzone">
                  <input
                    className="product-import-input"
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={(event) => setSelectedFile(event.target.files?.[0]?.name ?? "")}
                  />
                  <div className="product-import-drop-title">Chon hoac tha tep du lieu vao day</div>
                  <div className="product-import-drop-note">(Dinh dang file xls, xlsx va co toi da 3000 dong)</div>
                  <span className="product-import-select">Chon file</span>
                  {selectedFile ? <div className="product-import-file">Da chon: {selectedFile}</div> : null}
                </label>

                <div className="product-import-help">
                  <div className="product-import-help-title">Neu chua co tep mau de chuan bi du lieu ?</div>
                  <div className="product-import-help-line">
                    1. Tai tep du lieu mau (excel) ma phan mem cung cap de chuan bi du lieu{" "}
                    <span className="product-import-link">Tai day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
