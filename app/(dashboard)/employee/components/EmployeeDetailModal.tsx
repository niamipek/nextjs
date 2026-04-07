"use client";

import Image from "next/image";
import { useEffect, useState, type ChangeEvent } from "react";
import type { EmployeeDetail } from "../data";
import { readImageFile, readStoredAvatar, saveStoredAvatar } from "../_lib/employeeAvatarStorage";

type EmployeeDetailModalProps = {
  employee: EmployeeDetail | null;
  open: boolean;
  onClose: () => void;
  onAvatarUpdated?: (employeeCode: string, imageDataUrl: string) => void;
};

type DetailItem = {
  label: string;
  value: string;
  hint?: string;
};

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

export function EmployeeDetailModal({ employee, open, onClose, onAvatarUpdated }: EmployeeDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"personal" | "work">("personal");
  const [avatarSrc, setAvatarSrc] = useState("");
  const [avatarFileName, setAvatarFileName] = useState("");

  useEffect(() => {
    if (!employee) {
      setAvatarSrc("");
      setAvatarFileName("");
      return;
    }

    const storedAvatar = readStoredAvatar(employee.code);
    setAvatarSrc(storedAvatar?.imageDataUrl ?? "");
    setAvatarFileName(storedAvatar?.fileName ?? "");
  }, [employee]);

  async function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    if (!employee) {
      return;
    }

    try {
      const file = event.target.files?.[0];

      if (!file || !file.type.startsWith("image/")) {
        return;
      }

      const imageDataUrl = await readImageFile(file);
      saveStoredAvatar(employee.code, {
        fileName: file.name,
        imageDataUrl,
      });
      setAvatarSrc(imageDataUrl);
      setAvatarFileName(file.name);
      onAvatarUpdated?.(employee.code, imageDataUrl);
    } finally {
      event.target.value = "";
    }
  }

  if (!open || !employee) {
    return null;
  }

  const personalBasicItems: DetailItem[] = [
    { label: "Full name", value: employee.name },
    { label: "Email", value: employee.email },
    { label: "Phone number", value: employee.phone },
    { label: "Date of birth", value: employee.birthday },
    { label: "Gender", value: employee.gender },
    { label: "Permanent address", value: employee.permanentAddress },
    { label: "Current address", value: employee.currentAddress },
    { label: "Bank account", value: employee.bankAccount },
  ];

  const personalExtraItems: DetailItem[] = [
    { label: "Emergency phone", value: employee.emergencyPhone },
    { label: "Ethnicity", value: employee.ethnicity },
  ];

  const workInfoItems: DetailItem[] = [
    { label: "Employee code", value: employee.code },
    { label: "Job title", value: employee.role },
    { label: "Department", value: employee.department },
    { label: "Employee type", value: employee.workType },
    { label: "Branch", value: employee.branch },
    { label: "Company join date", value: employee.joinDate },
    { label: "Level", value: employee.level },
    { label: "Salary", value: employee.salary },
    { label: "KPI salary", value: employee.kpiSalary },
    {
      label: "Payroll method",
      value: employee.payrollMethod,
      hint: "Attendance and salary are calculated for the branch where the employee checks in.",
    },
  ];

  const attendanceItems: DetailItem[] = [
    { label: "Attendance enabled", value: employee.attendanceEnabled },
    { label: "Payroll enabled", value: employee.payrollEnabled },
    { label: "Smartphone attendance", value: employee.smartphoneAttendance },
    { label: "Attendance device", value: employee.attendanceDevice, hint: "Review configuration" },
    { label: "Face attendance", value: employee.faceAttendance },
  ];

  const insuranceItems: DetailItem[] = [
    { label: "Insurance participation", value: employee.insuranceStatus },
    { label: "Insurance salary", value: employee.insuranceSalary },
    { label: "Dependents", value: employee.dependentCount },
    { label: "Tax code", value: employee.taxCode },
    { label: "Issue date", value: employee.taxIssueDate },
    { label: "Tax registration address", value: employee.taxAddress },
  ];

  return (
    <div className="employee-detail-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="employee-detail-modal" onClick={(event) => event.stopPropagation()}>
        <div className="employee-detail-modal-header">
          <h2 className="employee-detail-modal-title">Employee information</h2>
          <button type="button" className="employee-detail-close" onClick={onClose} aria-label="Close employee details">
            x
          </button>
        </div>

        <div className="employee-detail-modal-body">
          <aside className="employee-detail-sidebar">
            <div className="employee-detail-profile-card">
              <label className="employee-detail-profile-avatar-shell">
                <input className="employee-detail-avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} />
                {avatarSrc ? (
                  <Image
                    src={avatarSrc}
                    alt={employee.name}
                    width={160}
                    height={160}
                    unoptimized
                    className="employee-detail-profile-avatar-image"
                  />
                ) : (
                  <div className="employee-detail-profile-avatar">{getInitials(employee.name)}</div>
                )}
                <span className="employee-detail-avatar-overlay">{avatarSrc ? "Change avatar" : "Upload avatar"}</span>
              </label>
              <div className="employee-detail-profile-name">{employee.name}</div>
              <div className="employee-detail-profile-role">{employee.role}</div>
              {/* {avatarFileName ? <div className="employee-detail-profile-file">{avatarFileName}</div> : null} */}
            </div>

            <div className="employee-detail-sidebar-info">
              <div className="employee-detail-sidebar-line">3 working days</div>
              <div className="employee-detail-sidebar-line">Employee code {employee.code}</div>
              <div className="employee-detail-sidebar-line">{employee.email}</div>
            </div>

            <div className="employee-detail-sidebar-actions">
              <button type="button" className="employee-detail-side-button">
                Change salary and employee type
              </button>
              <button type="button" className="employee-detail-side-button">
                Change job title
              </button>
              <button type="button" className="employee-detail-side-button">
                Change branch
              </button>
              <button type="button" className="employee-detail-side-button">
                Change payroll method
              </button>
              <button type="button" className="employee-detail-side-button danger">
                Terminate employment
              </button>
            </div>
          </aside>

          <div className="employee-detail-content">
            <div className="employee-detail-tabs">
              <button
                type="button"
                className={`employee-detail-tab ${activeTab === "personal" ? "active" : ""}`}
                onClick={() => setActiveTab("personal")}
              >
                Personal
              </button>
              <button
                type="button"
                className={`employee-detail-tab ${activeTab === "work" ? "active" : ""}`}
                onClick={() => setActiveTab("work")}
              >
                Work
              </button>
            </div>

            <div className="employee-detail-panels">
              {activeTab === "personal" ? (
                <>
                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Basic information</h3>
                      <button type="button" className="employee-detail-update">
                        Update
                      </button>
                    </div>
                    <DetailList items={personalBasicItems} />
                  </section>

                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Identity information</h3>
                      <button type="button" className="employee-detail-update">
                        Update
                      </button>
                    </div>
                    <div className="employee-detail-id-gallery">
                      <div className="employee-detail-id-box">Front side</div>
                      <div className="employee-detail-id-box">Back side</div>
                    </div>
                    <DetailList
                      items={[
                        { label: "ID number", value: employee.idNumber },
                        { label: "ID issue date", value: employee.idIssueDate },
                      ]}
                    />
                  </section>

                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Additional information</h3>
                      <button type="button" className="employee-detail-update">
                        Update
                      </button>
                    </div>
                    <DetailList items={personalExtraItems} />
                  </section>
                </>
              ) : (
                <>
                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Work information</h3>
                      <button type="button" className="employee-detail-update">
                        Update
                      </button>
                    </div>
                    <DetailList items={workInfoItems} />
                  </section>

                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Attendance</h3>
                      <button type="button" className="employee-detail-update">
                        Update
                      </button>
                    </div>
                    <DetailList items={attendanceItems} />
                  </section>

                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Attached documents</h3>
                      <button type="button" className="employee-detail-update">
                        Update
                      </button>
                    </div>
                    <EmptyCard text="No data available" />
                  </section>

                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Insurance</h3>
                      <button type="button" className="employee-detail-update">
                        Update
                      </button>
                    </div>
                    <DetailList items={insuranceItems} />
                  </section>

                  <section className="employee-detail-panel-card">
                    <h3 className="employee-detail-panel-title">Probation history</h3>
                    <EmptyCard text="No probation data available" />
                  </section>

                  <section className="employee-detail-panel-card">
                    <h3 className="employee-detail-panel-title">Salary history</h3>
                    <EmptyCard text="No salary data available" />
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
