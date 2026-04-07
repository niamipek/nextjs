"use client";

import type { TimesheetView } from "../filterTimesheet";

type TimesheetToolbarProps = {
  keyword: string;
  weekLabel: string;
  view: TimesheetView;
  onKeywordChange: (value: string) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onResetWeek: () => void;
  onViewChange: (value: TimesheetView) => void;
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="timesheet-toolbar-icon">
      <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M13.2 13.2 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="timesheet-toolbar-arrow">
      <path
        d={direction === "left" ? "M11.8 4.5 6.2 10l5.6 5.5" : "M8.2 4.5 13.8 10l-5.6 5.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="timesheet-toolbar-icon">
      <circle cx="10" cy="6.2" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 16c.7-2.7 2.8-4 5.5-4s4.8 1.3 5.5 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="timesheet-toolbar-icon">
      <path d="M6 2.8h5.2L15.5 7v10.2H6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11.2 2.8V7h4.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 9v5M7.5 11.5H12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TimesheetToolbar({
  keyword,
  weekLabel,
  view,
  onKeywordChange,
  onPreviousWeek,
  onNextWeek,
  onResetWeek,
  onViewChange,
}: TimesheetToolbarProps) {
  return (
    <div className="timesheet-toolbar">
      <div className="timesheet-toolbar-title-wrap">
        <h1 className="product-list-title">Lịch làm việc</h1>
      </div>

      <div className="timesheet-toolbar-bar">
        <div className="timesheet-toolbar-center">
          <label className="timesheet-search-shell">
            <SearchIcon />
            <input
              className="timesheet-search-input"
              value={keyword}
              onChange={(event) => onKeywordChange(event.target.value)}
              placeholder="Tìm kiếm nhân viên"
              aria-label="Tìm kiếm nhân viên"
            />
          </label>

          <div className="timesheet-week-nav" aria-label="Điều hướng tuần">
            <button type="button" className="timesheet-icon-button" onClick={onPreviousWeek} aria-label="Tuần trước">
              <ArrowIcon direction="left" />
            </button>
            <div className="timesheet-week-label">{weekLabel}</div>
            <button type="button" className="timesheet-icon-button" onClick={onNextWeek} aria-label="Tuần sau">
              <ArrowIcon direction="right" />
            </button>
          </div>

          <button type="button" className="timesheet-outline-button timesheet-today-button" onClick={onResetWeek}>
            Tuần này
          </button>
        </div>

        <div className="timesheet-toolbar-actions">
          <label className="timesheet-select-shell">
            <UserIcon />
            <select
              className="timesheet-select"
              value={view}
              onChange={(event) => onViewChange(event.target.value as TimesheetView)}
              aria-label="Kiểu xem timesheet"
            >
              <option value="employee">Xem theo nhân viên</option>
            </select>
          </label>

          <button type="button" className="timesheet-outline-button">
            <FileIcon />
            Import
          </button>

          <button type="button" className="timesheet-outline-button">
            <FileIcon />
            Xuất file
          </button>
        </div>
      </div>
    </div>
  );
}
