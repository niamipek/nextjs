"use client";

import { useEffect, useState, type ChangeEvent } from "react";

export type EmployeeDetail = {
  code: string;
  name: string;
  role: string;
  branch: string;
  status: string;
  workType: string;
  phone: string;
  email: string;
  joinDate: string;
  salary: string;
  kpiSalary: string;
  gender: string;
  birthday: string;
  currentAddress: string;
  permanentAddress: string;
  bankAccount: string;
  emergencyPhone: string;
  ethnicity: string;

  idNumber: string;
  idIssueDate: string;
  department: string;
  level: string;
  payrollMethod: string;
  insuranceStatus: string;
  insuranceSalary: string;
  dependentCount: string;
  taxCode: string;
  taxIssueDate: string;
  taxAddress: string;
  attendanceEnabled: string;
  payrollEnabled: string;
  smartphoneAttendance: string;
  attendanceDevice: string;
  faceAttendance: string;
};

type EmployeeDetailModalProps = {
  employee: EmployeeDetail | null;
  open: boolean;
  onClose: () => void;
};

type DetailItem = {
  label: string;
  value: string;
  hint?: string;
};

type StoredEmployeeAvatar = {
  fileName: string;
  imageDataUrl: string;
};

const EMPLOYEE_AVATAR_STORAGE_PREFIX = "employee-detail-avatar:";

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
      <div className="employee-detail-empty-illustration">Khong co du lieu</div>
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

function getAvatarStorageKey(employeeCode: string) {
  return `${EMPLOYEE_AVATAR_STORAGE_PREFIX}${employeeCode}`;
}

function readStoredAvatar(employeeCode: string): StoredEmployeeAvatar | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(getAvatarStorageKey(employeeCode));

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoredEmployeeAvatar;
  } catch {
    window.localStorage.removeItem(getAvatarStorageKey(employeeCode));
    return null;
  }
}

function saveStoredAvatar(employeeCode: string, payload: StoredEmployeeAvatar) {
  window.localStorage.setItem(getAvatarStorageKey(employeeCode), JSON.stringify(payload));
}

function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Khong doc duoc file anh."));
    };

    reader.onerror = () => reject(new Error("Khong doc duoc file anh."));
    reader.readAsDataURL(file);
  });
}

export function EmployeeDetailModal({ employee, open, onClose }: EmployeeDetailModalProps) {
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
    } finally {
      event.target.value = "";
    }
  }

  if (!open || !employee) {
    return null;
  }

  const personalBasicItems: DetailItem[] = [
    { label: "Ho ten", value: employee.name },
    { label: "Email", value: employee.email },
    { label: "So dien thoai", value: employee.phone },
    { label: "Ngay sinh", value: employee.birthday },
    { label: "Gioi tinh", value: employee.gender },
    { label: "Noi thuong tru", value: employee.permanentAddress },
    { label: "Noi o hien tai", value: employee.currentAddress },
    { label: "Tai khoan ngan hang", value: employee.bankAccount },
  ];

  const personalExtraItems: DetailItem[] = [
    { label: "So dien thoai khan cap", value: employee.emergencyPhone },
    
    { label: "Dan toc", value: employee.ethnicity },
  ];

  const workInfoItems: DetailItem[] = [
    { label: "Ma nhan vien", value: employee.code },
    { label: "Chuc danh", value: employee.role },
    { label: "Bo phan", value: employee.department },
    { label: "Loai nhan vien", value: employee.workType },
    { label: "Chi nhanh", value: employee.branch },
    { label: "Ngay gia nhap cong ty", value: employee.joinDate },
    { label: "Level", value: employee.level },
    { label: "Muc luong", value: employee.salary },
    { label: "Muc luong KPI", value: employee.kpiSalary },
    {
      label: "Kieu hach toan luong",
      value: employee.payrollMethod,
      hint: "Nhan vien cham cong o chi nhanh nao thi cong va luong se duoc tinh cho chi nhanh do.",
    },
  ];

  const attendanceItems: DetailItem[] = [
    { label: "Duoc cham cong", value: employee.attendanceEnabled },
    { label: "Duoc tinh luong", value: employee.payrollEnabled },
    { label: "Dien thoai thong minh", value: employee.smartphoneAttendance },
    { label: "Thiet bi cham cong", value: employee.attendanceDevice, hint: "Xem lai cau hinh" },
    { label: "Khuon mat cham cong", value: employee.faceAttendance },
  ];

  const insuranceItems: DetailItem[] = [
    { label: "Tham gia bao hiem", value: employee.insuranceStatus },
    { label: "Luong dong bao hiem", value: employee.insuranceSalary },
    { label: "Nguoi phu thuoc", value: employee.dependentCount },
    { label: "Ma so thue", value: employee.taxCode },
    { label: "Ngay cap", value: employee.taxIssueDate },
    { label: "Dia chi dang ky thue", value: employee.taxAddress },
  ];

  return (
    <div className="employee-detail-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="employee-detail-modal" onClick={(event) => event.stopPropagation()}>
        <div className="employee-detail-modal-header">
          <h2 className="employee-detail-modal-title">Thông tin nhân viên</h2>
          <button type="button" className="employee-detail-close" onClick={onClose} aria-label="Dong chi tiet nhan vien">
            x
          </button>
        </div>

        <div className="employee-detail-modal-body">
          <aside className="employee-detail-sidebar">
            <div className="employee-detail-profile-card">
              <label className="employee-detail-profile-avatar-shell">
                <input className="employee-detail-avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} />
                {avatarSrc ? (
                  <img src={avatarSrc} alt={employee.name} className="employee-detail-profile-avatar-image" />
                ) : (
                  <div className="employee-detail-profile-avatar">{getInitials(employee.name)}</div>
                )}
                <span className="employee-detail-avatar-overlay">{avatarSrc ? "Doi avatar" : "Tai avatar"}</span>
              </label>
              <div className="employee-detail-profile-name">{employee.name}</div>
              <div className="employee-detail-profile-role">{employee.role}</div>
              {/* {avatarFileName ? <div className="employee-detail-profile-file">{avatarFileName}</div> : null} */}
            </div>

            <div className="employee-detail-sidebar-info">
              <div className="employee-detail-sidebar-line">3 ngay lam viec</div>
              <div className="employee-detail-sidebar-line">Ma nhan vien {employee.code}</div>
              <div className="employee-detail-sidebar-line">{employee.email}</div>
            </div>

            <div className="employee-detail-sidebar-actions">
              <button type="button" className="employee-detail-side-button">
                Thay doi luong, loai nhan vien
              </button>
              <button type="button" className="employee-detail-side-button">
                Thay doi chuc danh
              </button>
              <button type="button" className="employee-detail-side-button">
                Doi chi nhanh
              </button>
              <button type="button" className="employee-detail-side-button">
                Doi kieu hach toan luong
              </button>
              <button type="button" className="employee-detail-side-button danger">
                Cho nghi viec
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
                Cá nhân
              </button>
              <button
                type="button"
                className={`employee-detail-tab ${activeTab === "work" ? "active" : ""}`}
                onClick={() => setActiveTab("work")}
              >
                Công việc
              </button>
            </div>

            <div className="employee-detail-panels">
              {activeTab === "personal" ? (
                <>
                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Thông tin cơ bản</h3>
                      <button type="button" className="employee-detail-update">
                        Cập nhật
                      </button>
                    </div>
                    <DetailList items={personalBasicItems} />
                  </section>

                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Thông tin căn cước</h3>
                      <button type="button" className="employee-detail-update">
                        Cập nhật
                      </button>
                    </div>
                    <div className="employee-detail-id-gallery">
                      <div className="employee-detail-id-box">Mat truoc</div>
                      <div className="employee-detail-id-box">Mat sau</div>
                    </div>
                    <DetailList
                      items={[
                        { label: "So CCCD", value: employee.idNumber },
                        { label: "Ngay cap CCCD", value: employee.idIssueDate },
                      ]}
                    />
                  </section>

                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Thông tin thêm</h3>
                      <button type="button" className="employee-detail-update">
                        Cập nhật
                      </button>
                    </div>
                    <DetailList items={personalExtraItems} />
                  </section>
                </>
              ) : (
                <>
                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Thông tin công việc</h3>
                      <button type="button" className="employee-detail-update">
                        Cập nhật
                      </button>
                    </div>
                    <DetailList items={workInfoItems} />
                  </section>

                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Chấm công</h3>
                      <button type="button" className="employee-detail-update">
                        Cập nhật
                      </button>
                    </div>
                    <DetailList items={attendanceItems} />
                  </section>

                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Giấy tờ định kèm</h3>
                      <button type="button" className="employee-detail-update">
                        Cập nhật
                      </button>
                    </div>
                    <EmptyCard text="Chưa có dữ liệu" />
                  </section>

                  <section className="employee-detail-panel-card">
                    <div className="employee-detail-panel-head">
                      <h3 className="employee-detail-panel-title">Bảo hiểm</h3>
                      <button type="button" className="employee-detail-update">
                        Cập nhật
                      </button>
                    </div>
                    <DetailList items={insuranceItems} />
                  </section>

                  <section className="employee-detail-panel-card">
                    <h3 className="employee-detail-panel-title">Lịch sử thử việc</h3>
                    <EmptyCard text="Chưa có dữ liệu thử việc" />
                  </section>

                  <section className="employee-detail-panel-card">
                    <h3 className="employee-detail-panel-title">Lịch sử lương</h3>
                    <EmptyCard text="Chưa có dữ liệu lương" />
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
