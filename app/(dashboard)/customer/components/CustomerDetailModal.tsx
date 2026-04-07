"use client";

import { useState } from "react";
import type { CustomerDetail } from "../data";

type CustomerDetailModalProps = {
  customer: CustomerDetail | null;
  open: boolean;
  onClose: () => void;
};

type DetailItem = { label: string; value: string; hint?: string };

function DetailList({ items }: { items: DetailItem[] }) {
  return (
    <div className="employee-detail-list">
      {items.map((item) => (
        <div key={item.label} className="employee-detail-row">
          <div className="employee-detail-label">{item.label}</div>
          <div className="employee-detail-value">
            <div>{item.value}</div>
            {item.hint ? <div className="employee-detail-hint">{item.hint}</div> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyCard({ text }: { text: string }) {
  return (
    <div className="employee-detail-empty-card">
      <div className="employee-detail-empty-illustration">No data</div>
      <div className="employee-detail-empty-text">{text}</div>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function CustomerDetailModal({ customer, open, onClose }: CustomerDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "purchase">("overview");

  if (!open || !customer) return null;

  const overviewItems: DetailItem[] = [
    { label: "Customer code", value: customer.code },
    { label: "Phone number", value: customer.phone },
    { label: "Email", value: customer.email },
    { label: "Birthday", value: customer.birthday },
    { label: "Address", value: customer.address },
    { label: "Account owner", value: customer.owner },
  ];

  const purchaseItems: DetailItem[] = [
    { label: "Tier", value: customer.tier },
    { label: "Segment", value: customer.segment },
    { label: "Status", value: customer.status },
    { label: "Total spent", value: customer.totalSpent },
    { label: "Orders", value: customer.orders },
    { label: "Loyalty points", value: customer.loyaltyPoints },
    { label: "Last purchase", value: customer.lastPurchase, hint: customer.note },
  ];

  return (
    <div className="employee-detail-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="employee-detail-modal" onClick={(event) => event.stopPropagation()}>
        <div className="employee-detail-modal-header">
          <h2 className="employee-detail-modal-title">Customer information</h2>
          <button type="button" className="employee-detail-close" onClick={onClose} aria-label="Close customer details">
            x
          </button>
        </div>

        <div className="employee-detail-modal-body">
          <aside className="employee-detail-sidebar">
            <div className="employee-detail-profile-card">
              <div className="employee-detail-profile-avatar">{getInitials(customer.name)}</div>
              <div className="employee-detail-profile-name">{customer.name}</div>
              <div className="employee-detail-profile-role">{customer.tier} customer</div>
            </div>

            <div className="employee-detail-sidebar-info">
              <div className="employee-detail-sidebar-line">{customer.city}</div>
              <div className="employee-detail-sidebar-line">Customer code {customer.code}</div>
              <div className="employee-detail-sidebar-line">{customer.email}</div>
            </div>
          </aside>

          <div className="employee-detail-content">
            <div className="employee-detail-tabs">
              <button type="button" className={`employee-detail-tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
                Overview
              </button>
              <button type="button" className={`employee-detail-tab ${activeTab === "purchase" ? "active" : ""}`} onClick={() => setActiveTab("purchase")}>
                Purchase
              </button>
            </div>

            <div className="employee-detail-panels">
              {activeTab === "overview" ? (
                <section className="employee-detail-panel-card">
                  <div className="employee-detail-panel-head">
                    <h3 className="employee-detail-panel-title">Basic information</h3>
                    <button type="button" className="employee-detail-update">Update</button>
                  </div>
                  <DetailList items={overviewItems} />
                </section>
              ) : (
                <>
                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Purchase summary</h3>
                      <button type="button" className="employee-detail-update">Update</button>
                    </div>
                    <DetailList items={purchaseItems} />
                  </section>

                  <section className="employee-detail-panel-card">
                    <h3 className="employee-detail-panel-title">Campaign response</h3>
                    <EmptyCard text="No campaign interaction data available" />
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
