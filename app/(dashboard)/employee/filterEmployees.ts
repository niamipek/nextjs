import { branchOptions, employees, roleOptions, statusOptions, workTypeOptions, type EmployeeDetail } from "./data";

export type EmployeePageFilters = {
  keyword: string;
  role: string;
  branch: string;
  status: string;
  workType: string;
};

export type EmployeeSearchParams = Record<string, string | string[] | undefined>;

export const defaultEmployeePageFilters: EmployeePageFilters = {
  keyword: "",
  role: roleOptions[0],
  branch: branchOptions[0],
  status: statusOptions[0],
  workType: workTypeOptions[0],
};

function readStringParam(value: string | string[] | undefined, fallback: string) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0] ?? fallback;
  }

  return fallback;
}

export function getEmployeePageFilters(searchParams: EmployeeSearchParams = {}): EmployeePageFilters {
  return {
    keyword: readStringParam(searchParams.q, defaultEmployeePageFilters.keyword),
    role: readStringParam(searchParams.role, defaultEmployeePageFilters.role),
    branch: readStringParam(searchParams.branch, defaultEmployeePageFilters.branch),
    status: readStringParam(searchParams.status, defaultEmployeePageFilters.status),
    workType: readStringParam(searchParams.workType, defaultEmployeePageFilters.workType),
  };
}

export function filterEmployees(filters: EmployeePageFilters, sourceEmployees: EmployeeDetail[] = employees) {
  const normalizedKeyword = filters.keyword.trim().toLowerCase();

  return sourceEmployees.filter((employee) => {
    const matchesKeyword =
      normalizedKeyword.length === 0 ||
      employee.code.toLowerCase().includes(normalizedKeyword) ||
      employee.name.toLowerCase().includes(normalizedKeyword) ||
      employee.phone.toLowerCase().includes(normalizedKeyword);

    const matchesRole = filters.role === defaultEmployeePageFilters.role || employee.role === filters.role;
    const matchesBranch = filters.branch === defaultEmployeePageFilters.branch || employee.branch === filters.branch;
    const matchesStatus = filters.status === defaultEmployeePageFilters.status || employee.status === filters.status;
    const matchesWorkType = filters.workType === defaultEmployeePageFilters.workType || employee.workType === filters.workType;

    return matchesKeyword && matchesRole && matchesBranch && matchesStatus && matchesWorkType;
  });
}
