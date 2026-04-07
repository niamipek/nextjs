"use client";

import { startTransition, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { CustomerDetail } from "../data";
import { defaultCustomerPageFilters, type CustomerPageFilters } from "../filterCustomers";
import { CustomerDetailModal } from "./CustomerDetailModal";
import { CustomerFilters } from "./CustomerFilters";
import { CustomerListHeader } from "./CustomerListHeader";

type CustomerPageClientProps = {
  customers: CustomerDetail[];
  filters: CustomerPageFilters;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getStatusClassName(status: string) {
  if (status === "Active") return "employee-status-active";
  if (status === "VIP") return "employee-status-trial";
  return "employee-status-pause";
}

export function CustomerPageClient({ customers, filters }: CustomerPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetail | null>(null);

  function updateFilters(nextFilters: CustomerPageFilters) {
    const params = new URLSearchParams();

    if (nextFilters.keyword.trim()) params.set("q", nextFilters.keyword.trim());
    if (nextFilters.tier !== defaultCustomerPageFilters.tier) params.set("tier", nextFilters.tier);
    if (nextFilters.segment !== defaultCustomerPageFilters.segment) params.set("segment", nextFilters.segment);
    if (nextFilters.status !== defaultCustomerPageFilters.status) params.set("status", nextFilters.status);
    if (nextFilters.city !== defaultCustomerPageFilters.city) params.set("city", nextFilters.city);

    const nextUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;
    startTransition(() => router.replace(nextUrl, { scroll: false }));
  }

  function patchFilters(patch: Partial<CustomerPageFilters>) {
    updateFilters({ ...filters, ...patch });
  }

  return (
    <>
      <div className="dashboard-content-shell product-list-header-shell">
        <div className="product-page-title-shell">
          <h1 className="product-list-title">Customers</h1>
        </div>
        <CustomerListHeader keyword={filters.keyword} onKeywordChange={(nextValue) => patchFilters({ keyword: nextValue })} />
      </div>

      <section className="dashboard-content-shell product-page-shell employee-page-shell">
        <CustomerFilters
          filters={filters}
          onReset={() => updateFilters(defaultCustomerPageFilters)}
          onTierChange={(nextValue) => patchFilters({ tier: nextValue })}
          onSegmentChange={(nextValue) => patchFilters({ segment: nextValue })}
          onStatusChange={(nextValue) => patchFilters({ status: nextValue })}
          onCityChange={(nextValue) => patchFilters({ city: nextValue })}
        />

        <section className="card product-list-card">
          <div className="product-table-shell">
            <table className="product-catalog-table employee-table">
              <thead>
                <tr>
                  <th className="product-catalog-checkbox">
                    <span className="product-catalog-checkbox-indicator" aria-hidden="true" />
                  </th>
                  <th>Customer</th>
                  <th>Code</th>
                  <th>Tier</th>
                  <th>Segment</th>
                  <th>City</th>
                  <th>Orders</th>
                  <th>Total spent</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={9}><div className="employee-empty">No customers match the current filters.</div></td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr
                      key={customer.code}
                      className="product-catalog-row employee-table-row"
                      onClick={() => setSelectedCustomer(customer)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedCustomer(customer);
                        }
                      }}
                      tabIndex={0}
                    >
                      <td className="product-catalog-checkbox"><input type="checkbox" onClick={(event) => event.stopPropagation()} /></td>
                      <td>
                        <div className="employee-person-cell">
                          <span className="employee-avatar">{getInitials(customer.name)}</span>
                          <div>
                            <div className="employee-name">{customer.name}</div>
                            <div className="employee-email">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{customer.code}</td>
                      <td>{customer.tier}</td>
                      <td>{customer.segment}</td>
                      <td>{customer.city}</td>
                      <td>{customer.orders}</td>
                      <td>{customer.totalSpent}</td>
                      <td><span className={`employee-status-badge ${getStatusClassName(customer.status)}`}>{customer.status}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="product-pagination">
            <div className="product-pagination-meta">Showing {customers.length === 0 ? "0-0" : `1-${customers.length}`} / {customers.length} customers</div>
            <div className="product-pagination-controls">
              <button type="button" className="product-page-button">{"<"}</button>
              <button type="button" className="product-page-button active">1</button>
              <button type="button" className="product-page-button">2</button>
              <button type="button" className="product-page-button">3</button>
              <span className="product-page-dots">...</span>
              <button type="button" className="product-page-button">{">"}</button>
            </div>
          </div>
        </section>
      </section>

      <CustomerDetailModal customer={selectedCustomer} open={selectedCustomer !== null} onClose={() => setSelectedCustomer(null)} />
    </>
  );
}
