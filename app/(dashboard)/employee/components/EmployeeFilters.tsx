"use client";

import { branchOptions, roleOptions, statusOptions, workTypeOptions } from "../data";
import type { EmployeePageFilters } from "../filterEmployees";

type EmployeeFiltersProps = {
  filters: EmployeePageFilters;
  onReset: () => void;
  onRoleChange: (nextValue: string) => void;
  onBranchChange: (nextValue: string) => void;
  onStatusChange: (nextValue: string) => void;
  onWorkTypeChange: (nextValue: string) => void;
};

export function EmployeeFilters({
  filters,
  onReset,
  onRoleChange,
  onBranchChange,
  onStatusChange,
  onWorkTypeChange,
}: EmployeeFiltersProps) {
  return (
    <aside className="card product-filter-card">
      <div className="product-filter-group">
        <div className="product-filter-label-row">
          <h3 className="product-filter-title">Role</h3>
          <button type="button" className="product-filter-link" onClick={onReset}>
            Reset
          </button>
        </div>
        <select className="product-filter-select" value={filters.role} onChange={(event) => onRoleChange(event.target.value)}>
          {roleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Branch</h3>
        <select className="product-filter-select" value={filters.branch} onChange={(event) => onBranchChange(event.target.value)}>
          {branchOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Working status</h3>
        <select className="product-filter-select" value={filters.status} onChange={(event) => onStatusChange(event.target.value)}>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Shift</h3>
        <select className="product-filter-select" value={filters.workType} onChange={(event) => onWorkTypeChange(event.target.value)}>
          {workTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
