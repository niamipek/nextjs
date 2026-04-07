import type { Metadata } from "next";
import { EmployeePageClient } from "./components/EmployeePageClient";
import { filterEmployees, getEmployeePageFilters, type EmployeeSearchParams } from "./filterEmployees";

type EmployeePageProps = {
  searchParams?: Promise<EmployeeSearchParams> | EmployeeSearchParams;
};

export const metadata: Metadata = {
  title: "Employees | Sales Dashboard",
  description: "Browse employees, roles, branches, and working status in the sales dashboard.",
};

export default async function EmployeePage({ searchParams }: EmployeePageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const filters = getEmployeePageFilters(resolvedSearchParams);
  const filteredEmployees = filterEmployees(filters);

  return <EmployeePageClient employees={filteredEmployees} filters={filters} />;
}
