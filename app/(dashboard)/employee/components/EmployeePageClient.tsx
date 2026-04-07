"use client";

import Image from "next/image";
import { startTransition, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { EmployeeDetail } from "../data";
import { readStoredAvatar } from "../_lib/employeeAvatarStorage";
import { defaultEmployeePageFilters, type EmployeePageFilters } from "../filterEmployees";
import { EmployeeDetailModal } from "./EmployeeDetailModal";
import { EmployeeFilters } from "./EmployeeFilters";
import { EmployeeListHeader } from "./EmployeeListHeader";

type EmployeePageClientProps = {
  employees: EmployeeDetail[];
  filters: EmployeePageFilters;
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

export function EmployeePageClient({ employees, filters }: EmployeePageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetail | null>(null);
  const [employeeAvatarMap, setEmployeeAvatarMap] = useState<Record<string, string>>({});

  function updateFilters(nextFilters: EmployeePageFilters) {
    const params = new URLSearchParams();

    if (nextFilters.keyword.trim()) {
      params.set("q", nextFilters.keyword.trim());
    }

    if (nextFilters.role !== defaultEmployeePageFilters.role) {
      params.set("role", nextFilters.role);
    }

    if (nextFilters.branch !== defaultEmployeePageFilters.branch) {
      params.set("branch", nextFilters.branch);
    }

    if (nextFilters.status !== defaultEmployeePageFilters.status) {
      params.set("status", nextFilters.status);
    }

    if (nextFilters.workType !== defaultEmployeePageFilters.workType) {
      params.set("workType", nextFilters.workType);
    }

    const nextUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  }

  function patchFilters(patch: Partial<EmployeePageFilters>) {
    updateFilters({
      ...filters,
      ...patch,
    });
  }

  useEffect(() => {
    const nextAvatarMap = employees.reduce<Record<string, string>>((accumulator, employee) => {
      const storedAvatar = readStoredAvatar(employee.code);

      if (storedAvatar?.imageDataUrl) {
        accumulator[employee.code] = storedAvatar.imageDataUrl;
      }

      return accumulator;
    }, {});

    setEmployeeAvatarMap(nextAvatarMap);
  }, [employees]);

  return (
    <>
      <div className="dashboard-content-shell product-list-header-shell">
        <div className="product-page-title-shell">
          <h1 className="product-list-title">Employees</h1>
        </div>
        <EmployeeListHeader keyword={filters.keyword} onKeywordChange={(nextValue) => patchFilters({ keyword: nextValue })} />
      </div>

      <section className="dashboard-content-shell product-page-shell employee-page-shell">
        <EmployeeFilters
          filters={filters}
          onReset={() => updateFilters(defaultEmployeePageFilters)}
          onRoleChange={(nextValue) => patchFilters({ role: nextValue })}
          onBranchChange={(nextValue) => patchFilters({ branch: nextValue })}
          onStatusChange={(nextValue) => patchFilters({ status: nextValue })}
          onWorkTypeChange={(nextValue) => patchFilters({ workType: nextValue })}
        />

        <section className="card product-list-card">
          <div className="product-table-shell">
            <table className="product-catalog-table employee-table">
              <thead>
                <tr>
                  <th className="product-catalog-checkbox">
                    <span className="product-catalog-checkbox-indicator" aria-hidden="true" />
                  </th>
                  <th>Employee</th>
                  <th>Employee code</th>
                  <th>Role</th>
                  <th>Branch</th>
                  <th>Shift</th>
                  <th>Status</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={8}>
                      <div className="employee-empty">No employees match the current filters.</div>
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr
                      key={employee.code}
                      className="product-catalog-row employee-table-row"
                      onClick={() => setSelectedEmployee(employee)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedEmployee(employee);
                        }
                      }}
                      tabIndex={0}
                    >
                      <td className="product-catalog-checkbox">
                        <input type="checkbox" onClick={(event) => event.stopPropagation()} />
                      </td>
                      <td>
                        <div className="employee-person-cell">
                          {employeeAvatarMap[employee.code] ? (
                            <Image
                              src={employeeAvatarMap[employee.code]}
                              alt={employee.name}
                              width={42}
                              height={42}
                              unoptimized
                              className="employee-avatar-image"
                            />
                          ) : (
                            <span className="employee-avatar">{getInitials(employee.name)}</span>
                          )}
                          <div>
                            <div className="employee-name">{employee.name}</div>
                            <div className="employee-email">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{employee.code}</td>
                      <td>{employee.role}</td>
                      <td>{employee.branch}</td>
                      <td>{employee.workType}</td>
                      <td>
                        <span
                          className={`employee-status-badge employee-status-${
                            employee.status === "Working" ? "active" : employee.status === "Probation" ? "trial" : "pause"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      <td>{employee.phone}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="product-pagination">
            <div className="product-pagination-meta">
              Showing {employees.length === 0 ? "0-0" : `1-${employees.length}`} / {employees.length} employees
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
      </section>

      <EmployeeDetailModal
        employee={selectedEmployee}
        open={selectedEmployee !== null}
        onClose={() => setSelectedEmployee(null)}
        onAvatarUpdated={(employeeCode, imageDataUrl) => {
          setEmployeeAvatarMap((currentMap) => ({
            ...currentMap,
            [employeeCode]: imageDataUrl,
          }));
        }}
      />
    </>
  );
}
