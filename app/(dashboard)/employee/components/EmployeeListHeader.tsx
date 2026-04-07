"use client";

import Image from "next/image";
import filtericon from "public/filter.png";

type EmployeeListHeaderProps = {
  keyword: string;
  onKeywordChange: (nextValue: string) => void;
};

export function EmployeeListHeader({ keyword, onKeywordChange }: EmployeeListHeaderProps) {
  return (
    <div className="product-list-header-bar">
      <div className="product-list-actions">
        <label className="product-list-search-shell">
          <span className="product-list-search-icon" aria-hidden="true" />
          <input
            className="product-list-search"
            placeholder="Search by code or name"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
          />

          <i className="product-list-search-filter" aria-hidden="true">
            <Image src={filtericon} alt="" width={18} height={18} />
          </i>
        </label>

        <div className="product-list-action-group">
          <button type="button" className="product-list-primary">
            Create new
          </button>
          <button type="button" className="product-list-secondary">
            Import file
          </button>
          <button type="button" className="product-list-secondary">
            Export file
          </button>
        </div>

        <div className="product-list-utility-group">
          <button type="button" className="product-list-icon-button" aria-label="Display options">
            <span className="product-list-menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <button type="button" className="product-list-icon-button" aria-label="Help">
            ?
          </button>
        </div>
      </div>
    </div>
  );
}
