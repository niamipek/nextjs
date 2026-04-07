"use client";

import { cityOptions, segmentOptions, statusOptions, tierOptions } from "../data";
import type { CustomerPageFilters } from "../filterCustomers";

type CustomerFiltersProps = {
  filters: CustomerPageFilters;
  onReset: () => void;
  onTierChange: (nextValue: string) => void;
  onSegmentChange: (nextValue: string) => void;
  onStatusChange: (nextValue: string) => void;
  onCityChange: (nextValue: string) => void;
};

export function CustomerFilters({
  filters,
  onReset,
  onTierChange,
  onSegmentChange,
  onStatusChange,
  onCityChange,
}: CustomerFiltersProps) {
  return (
    <aside className="card product-filter-card">
      <div className="product-filter-group">
        <div className="product-filter-label-row">
          <h3 className="product-filter-title">Tier</h3>
          <button type="button" className="product-filter-link" onClick={onReset}>
            Reset
          </button>
        </div>
        <select className="product-filter-select" value={filters.tier} onChange={(event) => onTierChange(event.target.value)}>
          {tierOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Segment</h3>
        <select className="product-filter-select" value={filters.segment} onChange={(event) => onSegmentChange(event.target.value)}>
          {segmentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Status</h3>
        <select className="product-filter-select" value={filters.status} onChange={(event) => onStatusChange(event.target.value)}>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">City</h3>
        <select className="product-filter-select" value={filters.city} onChange={(event) => onCityChange(event.target.value)}>
          {cityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
