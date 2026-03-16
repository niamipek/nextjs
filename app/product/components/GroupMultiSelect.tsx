"use client";

import { useEffect, useRef, useState } from "react";

type GroupMultiSelectProps = {
  options: string[];
  selectedValues: string[];
  onChange: (nextValues: string[]) => void;
};

export function GroupMultiSelect({ options, selectedValues, onChange }: GroupMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updateMenuPosition = () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      if (!triggerRect) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const desiredWidth = 500;
      const left = Math.min(triggerRect.right + 12, viewportWidth - desiredWidth - 16);
      const estimatedHeight = Math.min(560, 140 + filteredOptions.length * 52);
      const top = Math.max(16, Math.min(triggerRect.top - 8, viewportHeight - estimatedHeight - 16));

      setMenuStyle({
        top,
        left: Math.max(16, left),
        width: Math.min(desiredWidth, viewportWidth - 32),
        maxHeight: Math.min(560, viewportHeight - top - 16),
      });
    };

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [filteredOptions.length, isOpen]);

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((value) => value !== option));
      return;
    }

    onChange([...selectedValues, option]);
  };

  return (
    <div ref={containerRef} className={`product-filter-dropdown product-filter-dropdown-multi ${isOpen ? "open" : ""}`}>
      <button
        ref={triggerRef}
        type="button"
        className="product-filter-select product-filter-select-multi"
        onClick={() => setIsOpen((value) => !value)}
      >
        <div className="product-filter-select-values">
          {selectedValues.length > 0 ? (
            selectedValues.map((value) => (
              <span key={value} className="product-filter-tag">
                <span>{value}</span>
                <span
                  role="button"
                  tabIndex={0}
                  className="product-filter-tag-remove"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleOption(value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleOption(value);
                    }
                  }}
                >
                  x
                </span>
              </span>
            ))
          ) : (
            <span className="product-filter-placeholder">Chon nhom hang</span>
          )}
        </div>
      </button>

      {isOpen ? (
        <div className="product-group-menu" style={menuStyle ?? undefined}>
          <div className="product-group-header">
            <h4 className="product-group-title">Nhom hang</h4>
            <button type="button" className="product-group-create">
              + Tao moi
            </button>
          </div>

          <div className="product-group-search-shell">
            <span className="product-group-search-icon">o</span>
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="product-group-search"
              placeholder="Tim kiem"
            />
          </div>

          <div className="product-group-options">
            {filteredOptions.map((option) => {
              const checked = selectedValues.includes(option);

              return (
                <button key={option} type="button" className={`product-group-option ${checked ? "active" : ""}`} onClick={() => toggleOption(option)}>
                  <span className="product-group-grip">:</span>
                  <span className={`product-group-checkbox ${checked ? "checked" : ""}`}>{checked ? "v" : ""}</span>
                  <span className="product-group-option-label">{option}</span>
                </button>
              );
            })}
          </div>

          <div className="product-group-actions">
            <button type="button" className="product-group-action-link" onClick={() => onChange([])}>
              Bo chon tat ca
            </button>
            <button type="button" className="sale-btn product-group-apply" onClick={() => setIsOpen(false)}>
              Ap dung
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
