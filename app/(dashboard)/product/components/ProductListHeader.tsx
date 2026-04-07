"use client";

import Image from "next/image";
import filtericon from "public/filter.png";

type ProductListHeaderProps = {
  searchQuery: string;
  onSearchQueryChange: (nextValue: string) => void;
  onOpenImport: () => void;
};

export function ProductListHeader({
  searchQuery,
  onSearchQueryChange,
  onOpenImport,
}: ProductListHeaderProps) {
  return (
    <div className="product-list-header-bar">
      
        <div className="product-list-actions">
          <label className="product-list-search-shell">
            <span className="product-list-search-icon" aria-hidden="true" />
            <input
              className="product-list-search"
              placeholder="Search by code or name"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
            />

            <i className="product-list-search-filter" aria-hidden="true">
              <Image src={filtericon} alt="" width={18} height={18} />
            </i>
          </label>

          <div className="product-list-action-group">
            <button type="button" className="product-list-primary">
              Create new
            </button>
            <button type="button" className="product-list-secondary" onClick={onOpenImport}>
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
            {/* <button type="button" className="product-list-icon-button" aria-label="Settings">
              <span className="product-list-gear-icon" aria-hidden="true">
                <span />
              </span>
            </button> */}
            <button type="button" className="product-list-icon-button" aria-label="Help">
              ?
            </button>
          </div>
        </div>
      
    </div>
  );
}
