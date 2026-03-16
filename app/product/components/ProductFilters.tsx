"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { categoryOptions, itemGroupOptions, locationOptions, statusOptions, stockOptions, supplierOptions } from "../data";
import { GroupMultiSelect } from "./GroupMultiSelect";

function FilterChoice({
  checked,
  label,
  hasArrow = false,
  hasCalendar = false,
}: {
  checked: boolean;
  label: string;
  hasArrow?: boolean;
  hasCalendar?: boolean;
}) {
  return (
    <button type="button" className={`product-choice ${checked ? "active" : ""}`}>
      <span className="product-choice-radio" />
      <span className="product-choice-box">
        <span>{label}</span>
        {hasArrow ? <span className="product-choice-icon">{">"}</span> : null}
        {hasCalendar ? (
          <span className="product-choice-icon">
            <Image src="/calendar-icon.png" alt="" width={16} height={16} />
          </span>
        ) : null}
      </span>
    </button>
  );
}

function FilterDropdown({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange?: (nextValue: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`product-filter-dropdown ${isOpen ? "open" : ""}`}>
      <button type="button" className="product-filter-select" onClick={() => setIsOpen((open) => !open)}>
        <span>{value}</span>
      </button>

      {isOpen ? (
        <div className="product-filter-menu">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`product-filter-option ${value === option ? "active" : ""}`}
              onClick={() => {
                onChange?.(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type ProductFiltersProps = {
  selectedItemGroups: string[];
  onSelectedItemGroupsChange: (nextValues: string[]) => void;
  selectedStock: string;
  onSelectedStockChange: (nextValue: string) => void;
};

export function ProductFilters({
  selectedItemGroups,
  onSelectedItemGroupsChange,
  selectedStock,
  onSelectedStockChange,
}: ProductFiltersProps) {
  return (
    <aside className="card product-filter-card">
      <div className="product-filter-group">
        <div className="product-filter-label-row">
          <h3 className="product-filter-title">Nhom hang</h3>
          <button type="button" className="product-filter-link">
            Tao moi
          </button>
        </div>
        <GroupMultiSelect options={itemGroupOptions} selectedValues={selectedItemGroups} onChange={onSelectedItemGroupsChange} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Ton kho</h3>
        <FilterDropdown options={stockOptions} value={selectedStock} onChange={onSelectedStockChange} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Du kien het hang</h3>
        <div className="product-choice-list">
          <FilterChoice checked label="Toan thoi gian" hasArrow />
          <FilterChoice checked={false} label="Tuy chinh" hasCalendar />
        </div>
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Thoi gian tao</h3>
        <div className="product-choice-list">
          <FilterChoice checked label="Toan thoi gian" hasArrow />
          <FilterChoice checked={false} label="Tuy chinh" hasCalendar />
        </div>
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Nha cung cap</h3>
        <FilterDropdown options={supplierOptions} value={supplierOptions[0]} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Vi tri</h3>
        <FilterDropdown options={locationOptions} value={locationOptions[0]} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Loai hang</h3>
        <FilterDropdown options={categoryOptions} value={categoryOptions[0]} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Ban truc tiep</h3>
        <div className="product-chip-row">
          <button type="button" className="product-chip active">
            Tat ca
          </button>
          <button type="button" className="product-chip">
            Co
          </button>
          <button type="button" className="product-chip">
            Khong
          </button>
        </div>
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Lien ket kenh ban</h3>
        <div className="product-chip-row">
          <button type="button" className="product-chip active">
            Tat ca
          </button>
          <button type="button" className="product-chip">
            Co
          </button>
          <button type="button" className="product-chip">
            Khong
          </button>
        </div>
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Trang thai hang hoa</h3>
        <FilterDropdown options={statusOptions} value={statusOptions[0]} />
      </div>
    </aside>
  );
}
