"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { EmployeeDetailModal, type EmployeeDetail } from "./components/EmployeeDetailModal";

const employees: EmployeeDetail[] = [
  {
    code: "NV001",
    name: "Nguyen Minh Chau",
    role: "Quan ly cua hang",
    branch: "Cua hang trung tam",
    status: "Dang lam viec",
    workType: "Toan thoi gian",
    phone: "0901 223 456",
    email: "chau.nguyen@kltn.vn",
    joinDate: "16/03/2026",
    salary: "20,000,000 d",
    kpiSalary: "2,500,000 d",
    gender: "Nu",
    birthday: "14/02/1997",
    currentAddress: "Cau Giay, Ha Noi",
    permanentAddress: "Nam Dinh",
    bankAccount: "VCB - 1029384756",
    emergencyPhone: "0988 123 456",
    maritalStatus: "Doc than",
    ethnicity: "Kinh",
    religion: "-",
    idNumber: "001197000123",
    idIssueDate: "20/08/2021",
    department: "Van hanh",
    level: "Truong nhom",
    payrollMethod: "Theo chi nhanh cham cong",
    insuranceStatus: "Co",
    insuranceSalary: "12,000,000 d",
    dependentCount: "0",
    taxCode: "0109988776",
    taxIssueDate: "18/03/2026",
    taxAddress: "Ha Noi",
    attendanceEnabled: "Co",
    payrollEnabled: "Co",
    smartphoneAttendance: "Co",
    attendanceDevice: "Nhan vien cham cong linh hoat tren moi thiet bi",
    faceAttendance: "Chua co",
  },
  {
    code: "NV002",
    name: "Tran Bao Ngan",
    role: "Thu ngan",
    branch: "Cua hang trung tam",
    status: "Dang lam viec",
    workType: "Toan thoi gian",
    phone: "0908 567 112",
    email: "ngan.tran@kltn.vn",
    joinDate: "11/03/2026",
    salary: "11,500,000 d",
    kpiSalary: "800,000 d",
    gender: "Nu",
    birthday: "02/06/1998",
    currentAddress: "Thanh Xuan, Ha Noi",
    permanentAddress: "Hai Duong",
    bankAccount: "MB - 2345678910",
    emergencyPhone: "0977 223 991",
    maritalStatus: "Doc than",
    ethnicity: "Kinh",
    religion: "-",
    idNumber: "001198002222",
    idIssueDate: "12/05/2020",
    department: "Thu ngan",
    level: "Nhan vien",
    payrollMethod: "Theo chi nhanh cham cong",
    insuranceStatus: "Khong",
    insuranceSalary: "-",
    dependentCount: "0",
    taxCode: "-",
    taxIssueDate: "-",
    taxAddress: "-",
    attendanceEnabled: "Co",
    payrollEnabled: "Co",
    smartphoneAttendance: "Co",
    attendanceDevice: "May cham cong cua cua hang",
    faceAttendance: "Co",
  },
  {
    code: "NV003",
    name: "Pham Quoc Huy",
    role: "Ban hang",
    branch: "Kho online",
    status: "Tam nghi",
    workType: "Ca toi",
    phone: "0912 450 888",
    email: "huy.pham@kltn.vn",
    joinDate: "20/02/2026",
    salary: "9,000,000 d",
    kpiSalary: "500,000 d",
    gender: "Nam",
    birthday: "10/10/2000",
    currentAddress: "Long Bien, Ha Noi",
    permanentAddress: "Thai Binh",
    bankAccount: "-",
    emergencyPhone: "0912 000 999",
    maritalStatus: "Doc than",
    ethnicity: "Kinh",
    religion: "-",
    idNumber: "-",
    idIssueDate: "-",
    department: "Ban hang",
    level: "Nhan vien",
    payrollMethod: "Theo chi nhanh cham cong",
    insuranceStatus: "Khong",
    insuranceSalary: "-",
    dependentCount: "0",
    taxCode: "-",
    taxIssueDate: "-",
    taxAddress: "-",
    attendanceEnabled: "Co",
    payrollEnabled: "Co",
    smartphoneAttendance: "Khong",
    attendanceDevice: "May cham cong cua kho",
    faceAttendance: "Khong",
  },
  {
    code: "NV004",
    name: "Le Thao Vy",
    role: "Chuyen vien kho",
    branch: "Kho tong",
    status: "Dang lam viec",
    workType: "Toan thoi gian",
    phone: "0933 218 045",
    email: "vy.le@kltn.vn",
    joinDate: "05/01/2026",
    salary: "12,800,000 d",
    kpiSalary: "1,200,000 d",
    gender: "Nu",
    birthday: "09/09/1996",
    currentAddress: "Hoang Mai, Ha Noi",
    permanentAddress: "Bac Ninh",
    bankAccount: "Techcombank - 3344556677",
    emergencyPhone: "0933 777 111",
    maritalStatus: "Da ket hon",
    ethnicity: "Kinh",
    religion: "-",
    idNumber: "001196009999",
    idIssueDate: "01/11/2021",
    department: "Kho van",
    level: "Nhan vien chinh",
    payrollMethod: "Theo chi nhanh cham cong",
    insuranceStatus: "Co",
    insuranceSalary: "10,000,000 d",
    dependentCount: "1",
    taxCode: "0105566778",
    taxIssueDate: "06/01/2026",
    taxAddress: "Ha Noi",
    attendanceEnabled: "Co",
    payrollEnabled: "Co",
    smartphoneAttendance: "Co",
    attendanceDevice: "May cham cong van tay",
    faceAttendance: "Khong",
  },
  {
    code: "NV005",
    name: "Doan Gia Han",
    role: "Cham soc khach hang",
    branch: "Cua hang trung tam",
    status: "Dang lam viec",
    workType: "Ban thoi gian",
    phone: "0987 654 321",
    email: "han.doan@kltn.vn",
    joinDate: "28/02/2026",
    salary: "7,500,000 d",
    kpiSalary: "400,000 d",
    gender: "Nu",
    birthday: "19/04/2001",
    currentAddress: "Dong Da, Ha Noi",
    permanentAddress: "Ha Nam",
    bankAccount: "-",
    emergencyPhone: "0987 999 222",
    maritalStatus: "Doc than",
    ethnicity: "Kinh",
    religion: "-",
    idNumber: "-",
    idIssueDate: "-",
    department: "Cham soc khach hang",
    level: "Nhan vien",
    payrollMethod: "Theo chi nhanh cham cong",
    insuranceStatus: "Khong",
    insuranceSalary: "-",
    dependentCount: "0",
    taxCode: "-",
    taxIssueDate: "-",
    taxAddress: "-",
    attendanceEnabled: "Co",
    payrollEnabled: "Co",
    smartphoneAttendance: "Co",
    attendanceDevice: "Cham cong tren dien thoai",
    faceAttendance: "Khong",
  },
  {
    code: "NV006",
    name: "Vo Duc Long",
    role: "Ban hang",
    branch: "Chi nhanh Ha Dong",
    status: "Thu viec",
    workType: "Ca sang",
    phone: "0966 887 120",
    email: "long.vo@kltn.vn",
    joinDate: "15/03/2026",
    salary: "8,200,000 d",
    kpiSalary: "300,000 d",
    gender: "Nam",
    birthday: "11/11/2002",
    currentAddress: "Ha Dong, Ha Noi",
    permanentAddress: "Thanh Hoa",
    bankAccount: "-",
    emergencyPhone: "0966 000 555",
    maritalStatus: "Doc than",
    ethnicity: "Kinh",
    religion: "-",
    idNumber: "-",
    idIssueDate: "-",
    department: "Ban hang",
    level: "Thu viec",
    payrollMethod: "Theo chi nhanh cham cong",
    insuranceStatus: "Khong",
    insuranceSalary: "-",
    dependentCount: "0",
    taxCode: "-",
    taxIssueDate: "-",
    taxAddress: "-",
    attendanceEnabled: "Co",
    payrollEnabled: "Co",
    smartphoneAttendance: "Co",
    attendanceDevice: "Cham cong tren dien thoai",
    faceAttendance: "Khong",
  },
  {
    code: "NV007",
    name: "Bui Khanh Linh",
    role: "Thu ngan",
    branch: "Chi nhanh Ha Dong",
    status: "Dang lam viec",
    workType: "Ca sang",
    phone: "0944 778 223",
    email: "linh.bui@kltn.vn",
    joinDate: "08/03/2026",
    salary: "10,300,000 d",
    kpiSalary: "700,000 d",
    gender: "Nu",
    birthday: "23/05/1999",
    currentAddress: "Ha Dong, Ha Noi",
    permanentAddress: "Ninh Binh",
    bankAccount: "ACB - 6677889900",
    emergencyPhone: "0944 000 888",
    maritalStatus: "Doc than",
    ethnicity: "Kinh",
    religion: "-",
    idNumber: "001199004444",
    idIssueDate: "22/07/2022",
    department: "Thu ngan",
    level: "Nhan vien",
    payrollMethod: "Theo chi nhanh cham cong",
    insuranceStatus: "Co",
    insuranceSalary: "8,000,000 d",
    dependentCount: "0",
    taxCode: "0107654321",
    taxIssueDate: "10/03/2026",
    taxAddress: "Ha Noi",
    attendanceEnabled: "Co",
    payrollEnabled: "Co",
    smartphoneAttendance: "Co",
    attendanceDevice: "May cham cong cua cua hang",
    faceAttendance: "Co",
  },
  {
    code: "NV008",
    name: "Dang Tuan Kiet",
    role: "Chuyen vien kho",
    branch: "Kho tong",
    status: "Dang lam viec",
    workType: "Ca toi",
    phone: "0971 336 889",
    email: "kiet.dang@kltn.vn",
    joinDate: "03/02/2026",
    salary: "11,000,000 d",
    kpiSalary: "600,000 d",
    gender: "Nam",
    birthday: "30/08/1998",
    currentAddress: "Gia Lam, Ha Noi",
    permanentAddress: "Hung Yen",
    bankAccount: "VPBank - 7711223344",
    emergencyPhone: "0971 444 555",

    ethnicity: "Kinh",

    idNumber: "001198007777",
    idIssueDate: "09/12/2020",
    department: "Kho van",
    level: "Nhan vien chinh",
    payrollMethod: "Theo chi nhanh cham cong",
    insuranceStatus: "Co",
    insuranceSalary: "9,500,000 d",
    dependentCount: "2",
    taxCode: "0101239876",
    taxIssueDate: "04/02/2026",
    taxAddress: "Ha Noi",
    attendanceEnabled: "Co",
    payrollEnabled: "Co",
    smartphoneAttendance: "Khong",
    attendanceDevice: "May cham cong van tay",
    faceAttendance: "Khong",
  },
];

const roleOptions = ["Tat ca vai tro", "Quan ly cua hang", "Thu ngan", "Ban hang", "Chuyen vien kho", "Cham soc khach hang"];
const branchOptions = ["Tat ca chi nhanh", "Cua hang trung tam", "Kho tong", "Kho online", "Chi nhanh Ha Dong"];
const statusOptions = ["Tat ca trang thai", "Dang lam viec", "Thu viec", "Tam nghi"];
const workTypeOptions = ["Tat ca ca lam", "Toan thoi gian", "Ban thoi gian", "Ca sang", "Ca toi"];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function EmployeePage() {
  const [keyword, setKeyword] = useState("");
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
  const [selectedBranch, setSelectedBranch] = useState(branchOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [selectedWorkType, setSelectedWorkType] = useState(workTypeOptions[0]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetail | null>(null);

  const normalizedKeyword = keyword.trim().toLowerCase();
  const filteredEmployees = employees.filter((employee) => {
    const matchesKeyword =
      normalizedKeyword.length === 0 ||
      employee.code.toLowerCase().includes(normalizedKeyword) ||
      employee.name.toLowerCase().includes(normalizedKeyword) ||
      employee.phone.toLowerCase().includes(normalizedKeyword);

    const matchesRole = selectedRole === roleOptions[0] || employee.role === selectedRole;
    const matchesBranch = selectedBranch === branchOptions[0] || employee.branch === selectedBranch;
    const matchesStatus = selectedStatus === statusOptions[0] || employee.status === selectedStatus;
    const matchesWorkType = selectedWorkType === workTypeOptions[0] || employee.workType === selectedWorkType;

    return matchesKeyword && matchesRole && matchesBranch && matchesStatus && matchesWorkType;
  });

  return (
    <>
      <main className="dashboard-page">
        <div className="dashboard-topbar">
          <DashboardHeader />
          <DashboardNav />
        </div>

        <section className="dashboard-content-shell product-page-shell employee-page-shell">
          <aside className="card product-filter-card employee-filter-card">
            <div className="product-filter-group">
              <div className="product-filter-label-row">
                <h2 className="employee-filter-heading">Bo loc nhan vien</h2>
                <button
                  type="button"
                  className="product-filter-link"
                  onClick={() => {
                    setKeyword("");
                    setSelectedRole(roleOptions[0]);
                    setSelectedBranch(branchOptions[0]);
                    setSelectedStatus(statusOptions[0]);
                    setSelectedWorkType(workTypeOptions[0]);
                  }}
                >
                  Dat lai
                </button>
              </div>

              <input
                className="employee-filter-search"
                placeholder="Tim ma NV, ten, so dien thoai..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>

            <div className="product-filter-group">
              <h3 className="product-filter-title">Vai tro</h3>
              <select className="product-filter-select" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
                {roleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-filter-group">
              <h3 className="product-filter-title">Chi nhanh</h3>
              <select className="product-filter-select" value={selectedBranch} onChange={(event) => setSelectedBranch(event.target.value)}>
                {branchOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-filter-group">
              <h3 className="product-filter-title">Trang thai lam viec</h3>
              <select className="product-filter-select" value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-filter-group">
              <h3 className="product-filter-title">Ca lam</h3>
              <select className="product-filter-select" value={selectedWorkType} onChange={(event) => setSelectedWorkType(event.target.value)}>
                {workTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="employee-filter-summary">
              <div className="employee-filter-summary-value">{filteredEmployees.length}</div>
              <div className="employee-filter-summary-label">Nhan vien phu hop bo loc hien tai</div>
            </div>
          </aside>

          <section className="card employee-list-card">
            <div className="employee-list-toolbar">
              <div>
                <h1 className="employee-list-title">Danh sach nhan vien</h1>
                <p className="employee-list-subtitle">Quan ly thong tin nhan vien, vai tro, chi nhanh va trang thai lam viec.</p>
              </div>
              <button type="button" className="employee-add-button">
                Them nhan vien
              </button>
            </div>

            <div className="employee-table-shell">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Nhan vien</th>
                    <th>Ma NV</th>
                    <th>Vai tro</th>
                    <th>Chi nhanh</th>
                    <th>Ca lam</th>
                    <th>Trang thai</th>
                    <th>Lien he</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <div className="employee-empty">Khong tim thay nhan vien nao phu hop voi bo loc hien tai.</div>
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.code} className="employee-table-row" onClick={() => setSelectedEmployee(employee)}>
                        <td>
                          <div className="employee-person-cell">
                            <span className="employee-avatar">{getInitials(employee.name)}</span>
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
                          <span className={`employee-status-badge employee-status-${employee.status === "Dang lam viec" ? "active" : employee.status === "Thu viec" ? "trial" : "pause"}`}>
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
          </section>
        </section>
      </main>

      <EmployeeDetailModal employee={selectedEmployee} open={selectedEmployee !== null} onClose={() => setSelectedEmployee(null)} />
    </>
  );
}
