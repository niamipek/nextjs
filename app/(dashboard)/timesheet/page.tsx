import type { Metadata } from "next";
import { getTimesheetPageData, getTimesheetPageFilters, type TimesheetSearchParams } from "./filterTimesheet";
import { TimesheetPageClient } from "./components/TimesheetPageClient";

type TimesheetPageProps = {
  searchParams?: Promise<TimesheetSearchParams> | TimesheetSearchParams;
};

export const metadata: Metadata = {
  title: "Timesheet | Sales Dashboard",
  description: "Manage employee weekly shifts in a calendar-style timesheet grid.",
};

function getTodayDateKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default async function TimesheetPage({ searchParams }: TimesheetPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const filters = getTimesheetPageFilters(resolvedSearchParams);
  const pageData = getTimesheetPageData(filters);

  return (
    <TimesheetPageClient
      employees={pageData.employees}
      filters={pageData.filters}
      todayDateKey={getTodayDateKey()}
    />
  );
}
