"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { categoryOptions, itemGroupOptions, locationOptions, statusOptions, stockOptions, supplierOptions } from "../data";
import { GroupMultiSelect } from "./GroupMultiSelect";

const booleanFilterOptions = ["Tat ca", "Co", "Khong"];

const timePresetGroups = [
  {
    title: "Theo ngay",
    options: ["Ngay mai", "Ngay kia", "3 ngay toi", "5 ngay toi", "7 ngay toi"],
  },
  {
    title: "Theo tuan",
    options: ["Tuan nay", "Tuan toi", "2 tuan toi"],
  },
  {
    title: "Theo thang",
    options: ["Thang nay", "Thang toi", "30 ngay toi", "2 thang toi", "3 thang toi"],
  },
];

const calendarWeekLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return startOfDay(nextDate);
}

function formatDate(date: Date) {
  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

function formatDateRange(start: Date, end: Date) {
  return `${formatDate(start)} - ${formatDate(end)}`;
}

function getMinimumRangeEnd(start: Date) {
  return addDays(start, 1);
}

function normalizeRange(start: Date, end: Date) {
  if (startOfDay(end).getTime() <= startOfDay(start).getTime()) {
    return {
      start,
      end: getMinimumRangeEnd(start),
    };
  }

  return { start, end };
}

function isSameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function isDateInRange(date: Date, start: Date, end: Date) {
  const current = startOfDay(date).getTime();
  const from = startOfDay(start).getTime();
  const to = startOfDay(end).getTime();
  return current >= Math.min(from, to) && current <= Math.max(from, to);
}

function isBeforeToday(date: Date) {
  return startOfDay(date).getTime() < startOfDay(new Date()).getTime();
}

function buildMonthGrid(monthDate: Date) {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const leadingDays = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - leadingDays);

  return Array.from({ length: 35 }, (_, index) => {
    const cellDate = new Date(gridStart);
    cellDate.setDate(gridStart.getDate() + index);

    return {
      key: `${cellDate.getFullYear()}-${cellDate.getMonth()}-${cellDate.getDate()}`,
      date: cellDate,
      label: cellDate.getDate(),
      isCurrentMonth: cellDate.getMonth() === monthDate.getMonth(),
    };
  });
}

function formatMonthTitle(monthDate: Date) {
  return `Thang ${monthDate.getMonth() + 1} ${monthDate.getFullYear()}`;
}

function FilterChoice({
  checked,
  label,
  hasArrow = false,
  hasCalendar = false,
}: {
  checked: boolean;
  label: string;
  hasArrow?: boolean;
  hasCalendar?: boolean;
}) {
  return (
    <button type="button" className={`product-choice ${checked ? "active" : ""}`}>
      <span className="product-choice-radio" />
      <span className="product-choice-box">
        <span>{label}</span>
        {hasArrow ? <span className="product-choice-icon">{">"}</span> : null}
        {hasCalendar ? (
          <span className="product-choice-icon">
            <Image src="/calendar-icon.png" alt="" width={16} height={16} />
          </span>
        ) : null}
      </span>
    </button>
  );
}

function TimePresetPicker({
  label,
  disablePastDates = false,
}: {
  label: string;
  disablePastDates?: boolean;
}) {
  const [openPanel, setOpenPanel] = useState<"preset" | "custom" | null>(null);
  const [selectionMode, setSelectionMode] = useState<"preset" | "custom">("preset");
  const [selectedPreset, setSelectedPreset] = useState("Toan thoi gian");
  const [displayMonth, setDisplayMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [appliedRangeStart, setAppliedRangeStart] = useState(startOfDay(new Date()));
  const [appliedRangeEnd, setAppliedRangeEnd] = useState(startOfDay(new Date()));
  const [draftRangeStart, setDraftRangeStart] = useState(startOfDay(new Date()));
  const [draftRangeEnd, setDraftRangeEnd] = useState(startOfDay(new Date()));
  const [selectingEdge, setSelectingEdge] = useState<"start" | "end">("start");
  const containerRef = useRef<HTMLDivElement>(null);
  const presetTriggerRef = useRef<HTMLButtonElement>(null);
  const customTriggerRef = useRef<HTMLButtonElement>(null);
  const [panelStyle, setPanelStyle] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpenPanel(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!openPanel) {
      return;
    }

    const updatePanelPosition = () => {
      const anchorRect =
        openPanel === "preset"
          ? presetTriggerRef.current?.getBoundingClientRect()
          : containerRef.current?.getBoundingClientRect();
      if (!anchorRect) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const panelWidth = openPanel === "preset" ? 480 : 620;
      const left = Math.min(anchorRect.right + 14, viewportWidth - panelWidth - 16);
      const topOffset = openPanel === "preset" ? -6 : -18;

      setPanelStyle({
        top: Math.max(16, anchorRect.top + topOffset),
        left: Math.max(16, left),
        width: Math.min(panelWidth, viewportWidth - 32),
      });
    };

    updatePanelPosition();
    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);

    return () => {
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [openPanel]);

  const leftMonth = buildMonthGrid(displayMonth);
  const rightMonthDate = addMonths(displayMonth, 1);
  const rightMonth = buildMonthGrid(rightMonthDate);
  const customRangeLabel = formatDateRange(appliedRangeStart, appliedRangeEnd);

  const openCustomPanel = () => {
    const normalizedRange = normalizeRange(appliedRangeStart, appliedRangeEnd);
    setDraftRangeStart(normalizedRange.start);
    setDraftRangeEnd(normalizedRange.end);
    setSelectingEdge("start");
    setOpenPanel("custom");
  };

  const openPresetPanel = () => {
    setSelectionMode("preset");
    setOpenPanel((current) => (current === "preset" ? null : "preset"));
  };

  const handleDateSelect = (date: Date) => {
    const nextDate = startOfDay(date);

    if (disablePastDates && isBeforeToday(nextDate)) {
      return;
    }

    if (selectingEdge === "start") {
      setDraftRangeStart(nextDate);
      setDraftRangeEnd(getMinimumRangeEnd(nextDate));
      setSelectingEdge("end");
      return;
    }

    if (nextDate.getTime() <= draftRangeStart.getTime()) {
      setDraftRangeStart(nextDate);
      setDraftRangeEnd(getMinimumRangeEnd(nextDate));
      setSelectingEdge("end");
    } else {
      setDraftRangeEnd(nextDate);
      setSelectingEdge("start");
    }
  };

  return (
    <div ref={containerRef} className="product-time-picker">
      <div className={`product-choice ${selectionMode === "preset" ? "active" : ""}`}>
        <button
          type="button"
          className="product-choice-radio-button"
          onClick={() => {
            setSelectionMode("preset");
            setOpenPanel("preset");
          }}
        >
          <span className="product-choice-radio" />
        </button>
        <button
          ref={presetTriggerRef}
          type="button"
          className="product-choice-box"
          onClick={openPresetPanel}
        >
          <span className="product-choice-label">{selectedPreset}</span>
          <span className="product-choice-icon">{">"}</span>
        </button>
      </div>

      <div className={`product-choice ${selectionMode === "custom" ? "active" : ""}`}>
        <button
          type="button"
          className="product-choice-radio-button"
          onClick={() => {
            setSelectionMode("custom");
            openCustomPanel();
          }}
        >
          <span className="product-choice-radio" />
        </button>
        <button
          ref={customTriggerRef}
          type="button"
          className="product-choice-box"
          onClick={() => {
            setSelectionMode("custom");
            openCustomPanel();
          }}
        >
          <span className={`product-choice-label ${selectionMode === "custom" ? "product-choice-label-range" : ""}`}>
            {selectionMode === "custom" ? customRangeLabel : "Tuy chinh"}
          </span>
          <span className="product-choice-icon">
            <Image src="/calendar-icon.png" alt="" width={16} height={16} />
          </span>
        </button>
      </div>

      {openPanel === "preset" ? (
        <div className="product-time-panel" style={panelStyle ?? undefined}>
          <div className="product-time-panel-grid">
            {timePresetGroups.map((group) => (
              <div key={group.title} className="product-time-panel-col">
                <h4 className="product-time-panel-title">{group.title}</h4>
                <div className="product-time-panel-options">
                  {group.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="product-time-panel-option"
                      onClick={() => {
                        setSelectedPreset(option);
                        setSelectionMode("preset");
                        setOpenPanel(null);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="product-time-panel-footer">
            <button
              type="button"
              className="sale-btn product-time-panel-apply"
              onClick={() => {
                setSelectedPreset(label);
                setSelectionMode("preset");
                setOpenPanel(null);
              }}
            >
              {label}
            </button>
          </div>
        </div>
      ) : null}

      {openPanel === "custom" ? (
        <div className="product-date-panel" style={panelStyle ?? undefined}>
          <div className="product-date-panel-summary">
            <span>Tu ngay: </span>
            <strong>{formatDate(draftRangeStart)}</strong>
            <span> - Den ngay: </span>
            <strong>{formatDate(draftRangeEnd)}</strong>
          </div>

          <div className="product-date-panel-calendars">
            {[
              { monthDate: displayMonth, cells: leftMonth, direction: -1 },
              { monthDate: rightMonthDate, cells: rightMonth, direction: 1 },
            ].map(({ monthDate, cells, direction }, index) => (
              <div key={`${monthDate.getFullYear()}-${monthDate.getMonth()}`} className="product-date-calendar">
                <div className="product-date-calendar-header">
                  <button
                    type="button"
                    className="product-date-nav"
                    onClick={() => setDisplayMonth((current) => addMonths(current, direction))}
                  >
                    {index === 0 ? "<" : ">"}
                  </button>
                  <div className="product-date-calendar-title">{formatMonthTitle(monthDate)}</div>
                  <button
                    type="button"
                    className="product-date-nav"
                    onClick={() => setDisplayMonth((current) => addMonths(current, direction))}
                  >
                    {index === 0 ? ">" : "<"}
                  </button>
                </div>

                <div className="product-date-weekdays">
                  {calendarWeekLabels.map((weekLabel) => (
                    <span key={weekLabel} className="product-date-weekday">
                      {weekLabel}
                    </span>
                  ))}
                </div>

                <div className="product-date-grid">
                  {cells.map((cell) => {
                    const inRange = isDateInRange(cell.date, draftRangeStart, draftRangeEnd);
                    const isEdge = isSameDay(cell.date, draftRangeStart) || isSameDay(cell.date, draftRangeEnd);
                    const isDisabled = disablePastDates && isBeforeToday(cell.date);

                    return (
                      <button
                        key={cell.key}
                        type="button"
                        className={`product-date-cell ${cell.isCurrentMonth ? "" : "muted"} ${inRange ? "in-range" : ""} ${isEdge ? "edge" : ""} ${isDisabled ? "disabled" : ""}`}
                        disabled={isDisabled}
                        onClick={() => handleDateSelect(cell.date)}
                      >
                        {cell.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="product-date-panel-footer">
            <button
              type="button"
              className="product-date-link"
              onClick={() => {
                const today = startOfDay(new Date());
                setDraftRangeStart(today);
                setDraftRangeEnd(today);
              }}
            >
              Hom nay
            </button>

            <div className="product-date-actions">
              <button type="button" className="product-date-secondary" onClick={() => setOpenPanel(null)}>
                Bo qua
              </button>
              <button
                type="button"
                className="sale-btn product-date-primary"
                onClick={() => {
                  const normalizedRange = normalizeRange(draftRangeStart, draftRangeEnd);
                  setAppliedRangeStart(normalizedRange.start);
                  setAppliedRangeEnd(normalizedRange.end);
                  setSelectionMode("custom");
                  setOpenPanel(null);
                }}
              >
                Ap dung
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterDropdown({
  options,
  value,
  onChange,
  direction = "down",
}: {
  options: string[];
  value: string;
  onChange?: (nextValue: string) => void;
  direction?: "down" | "up";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`product-filter-dropdown ${isOpen ? "open" : ""} ${direction === "up" ? "open-up" : ""}`}
    >
      <button type="button" className="product-filter-select" onClick={() => setIsOpen((open) => !open)}>
        <span>{value}</span>
      </button>

      {isOpen ? (
        <div className="product-filter-menu">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`product-filter-option ${value === option ? "active" : ""}`}
              onClick={() => {
                onChange?.(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FilterChipGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (nextValue: string) => void;
}) {
  return (
    <div className="product-chip-row">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`product-chip ${value === option ? "active" : ""}`}
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

type ProductFiltersProps = {
  selectedCategory: string;
  selectedDirectSale: string;
  selectedItemGroups: string[];
  selectedLocation: string;
  selectedSalesChannelLink: string;
  selectedStatus: string;
  selectedSupplier: string;
  onSelectedCategoryChange: (nextValue: string) => void;
  onSelectedDirectSaleChange: (nextValue: string) => void;
  onSelectedItemGroupsChange: (nextValues: string[]) => void;
  onSelectedLocationChange: (nextValue: string) => void;
  onSelectedSalesChannelLinkChange: (nextValue: string) => void;
  onSelectedStatusChange: (nextValue: string) => void;
  selectedStock: string;
  onSelectedStockChange: (nextValue: string) => void;
  onSelectedSupplierChange: (nextValue: string) => void;
};

export function ProductFilters({
  selectedCategory,
  selectedDirectSale,
  selectedItemGroups,
  selectedLocation,
  selectedSalesChannelLink,
  selectedStatus,
  selectedSupplier,
  onSelectedCategoryChange,
  onSelectedDirectSaleChange,
  onSelectedItemGroupsChange,
  onSelectedLocationChange,
  onSelectedSalesChannelLinkChange,
  onSelectedStatusChange,
  selectedStock,
  onSelectedStockChange,
  onSelectedSupplierChange,
}: ProductFiltersProps) {
  return (
    <aside className="card product-filter-card">
      <div className="product-filter-group">
        <div className="product-filter-label-row">
          <h3 className="product-filter-title">Nhom hang</h3>
          <button type="button" className="product-filter-link">
            Tao moi
          </button>
        </div>
        <GroupMultiSelect options={itemGroupOptions} selectedValues={selectedItemGroups} onChange={onSelectedItemGroupsChange} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Ton kho</h3>
        <FilterDropdown options={stockOptions} value={selectedStock} onChange={onSelectedStockChange} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Du kien het hang</h3>
        <TimePresetPicker label="Toan thoi gian" disablePastDates />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Thoi gian tao</h3>
        <TimePresetPicker label="Toan thoi gian" />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Nha cung cap</h3>
        <FilterDropdown options={supplierOptions} value={selectedSupplier} onChange={onSelectedSupplierChange} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Vi tri</h3>
        <FilterDropdown options={locationOptions} value={selectedLocation} onChange={onSelectedLocationChange} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Loai hang</h3>
        <FilterDropdown options={categoryOptions} value={selectedCategory} onChange={onSelectedCategoryChange} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Ban truc tiep</h3>
        <FilterChipGroup options={booleanFilterOptions} value={selectedDirectSale} onChange={onSelectedDirectSaleChange} />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Lien ket kenh ban</h3>
        <FilterChipGroup
          options={booleanFilterOptions}
          value={selectedSalesChannelLink}
          onChange={onSelectedSalesChannelLinkChange}
        />
      </div>

      <div className="product-filter-group">
        <h3 className="product-filter-title">Trang thai hang hoa</h3>
        <FilterDropdown options={statusOptions} value={selectedStatus} onChange={onSelectedStatusChange} direction="up" />
      </div>
    </aside>
  );
}
