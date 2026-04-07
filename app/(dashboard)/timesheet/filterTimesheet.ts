import { buildTimesheetWeek, getTimesheetEmployees, type TimesheetEmployeeWeek } from "./data";

export type TimesheetView = "employee";

export type TimesheetPageFilters = {
  keyword: string;
  weekOffset: number;
  view: TimesheetView;
};

export type TimesheetSearchParams = {
  q?: string | string[];
  weekOffset?: string | string[];
  view?: string | string[];
};

export type TimesheetPageData = {
  filters: TimesheetPageFilters;
  employees: TimesheetEmployeeWeek[];
};

export const defaultTimesheetPageFilters: TimesheetPageFilters = {
  keyword: "",
  weekOffset: 0,
  view: "employee",
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export function getTimesheetPageFilters(searchParams: TimesheetSearchParams): TimesheetPageFilters {
  const keyword = getSingleValue(searchParams.q).trim();
  const weekOffsetParam = Number.parseInt(getSingleValue(searchParams.weekOffset), 10);
  const viewParam = getSingleValue(searchParams.view);

  return {
    keyword,
    weekOffset: Number.isFinite(weekOffsetParam) ? weekOffsetParam : defaultTimesheetPageFilters.weekOffset,
    view: viewParam === "employee" ? viewParam : defaultTimesheetPageFilters.view,
  };
}

export function getTimesheetPageData(filters: TimesheetPageFilters): TimesheetPageData {
  const normalizedKeyword = filters.keyword.toLowerCase();
  const employees = getTimesheetEmployees().filter((employee) => {
    if (!normalizedKeyword) {
      return true;
    }

    return employee.name.toLowerCase().includes(normalizedKeyword) || employee.code.toLowerCase().includes(normalizedKeyword);
  });

  return {
    filters,
    employees: buildTimesheetWeek(employees, filters.weekOffset),
  };
}
