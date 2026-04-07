"use client";

import { startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { TimesheetEmployeeWeek } from "../data";
import { defaultTimesheetPageFilters, type TimesheetPageFilters, type TimesheetView } from "../filterTimesheet";
import { TimesheetGrid } from "./TimesheetGrid";
import { TimesheetToolbar } from "./TimesheetToolbar";

type TimesheetPageClientProps = {
  employees: TimesheetEmployeeWeek[];
  filters: TimesheetPageFilters;
  todayDateKey: string;
};

type WeekDay = {
  dateKey: string;
  weekdayLabel: string;
  dayNumber: number;
  isToday: boolean;
};

const weekdayFormatter = new Intl.DateTimeFormat("vi-VN", { weekday: "long" });

function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfWeek(date: Date) {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date: Date, amount: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekLabel(weekStart: Date) {
  const firstThursday = addDays(weekStart, 3);
  const yearStart = new Date(firstThursday.getFullYear(), 0, 1);
  const weekNumber = Math.ceil((((firstThursday.getTime() - yearStart.getTime()) / 86400000) + yearStart.getDay() + 1) / 7);

  return `Tuần ${weekNumber} - Th. ${weekStart.getMonth() + 1} ${weekStart.getFullYear()}`;
}

function getWeekDays(todayDateKey: string, weekOffset: number): { weekLabel: string; weekDays: WeekDay[] } {
  const today = parseDateKey(todayDateKey);
  const weekStart = addDays(startOfWeek(today), weekOffset * 7);
  const todayKey = getDateKey(today);

  return {
    weekLabel: getWeekLabel(weekStart),
    weekDays: Array.from({ length: 7 }, (_, index) => {
      const date = addDays(weekStart, index);
      const label = weekdayFormatter.format(date);

      return {
        dateKey: getDateKey(date),
        weekdayLabel: label.charAt(0).toUpperCase() + label.slice(1),
        dayNumber: date.getDate(),
        isToday: getDateKey(date) === todayKey,
      };
    }),
  };
}

export function TimesheetPageClient({ employees, filters, todayDateKey }: TimesheetPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { weekLabel, weekDays } = getWeekDays(todayDateKey, filters.weekOffset);

  function updateFilters(nextFilters: TimesheetPageFilters) {
    const params = new URLSearchParams();

    if (nextFilters.keyword.trim()) {
      params.set("q", nextFilters.keyword.trim());
    }

    if (nextFilters.weekOffset !== defaultTimesheetPageFilters.weekOffset) {
      params.set("weekOffset", String(nextFilters.weekOffset));
    }

    if (nextFilters.view !== defaultTimesheetPageFilters.view) {
      params.set("view", nextFilters.view);
    }

    const nextUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  }

  function patchFilters(patch: Partial<TimesheetPageFilters>) {
    updateFilters({
      ...filters,
      ...patch,
    });
  }

  return (
    <section className="dashboard-content-shell timesheet-page-shell">
      <TimesheetToolbar
        keyword={filters.keyword}
        weekLabel={weekLabel}
        view={filters.view}
        onKeywordChange={(value) => patchFilters({ keyword: value })}
        onPreviousWeek={() => patchFilters({ weekOffset: filters.weekOffset - 1 })}
        onNextWeek={() => patchFilters({ weekOffset: filters.weekOffset + 1 })}
        onResetWeek={() => patchFilters({ weekOffset: 0 })}
        onViewChange={(value: TimesheetView) => patchFilters({ view: value })}
      />

      <TimesheetGrid employees={employees} weekDays={weekDays} />
    </section>
  );
}
