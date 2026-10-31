"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowUpDown,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Layers,
  Search,
  TrendingUp,
} from "lucide-react";
import type { CurriculumProgram } from "@/app/types";

export type DisplayMode =
  | "default"
  | "semester"
  | "debt"
  | "improve";

interface SortOptionConfig {
  id: DisplayMode;
  label: string;
  shortLabel: string;
  description: string;
  icon: typeof Layers;
  iconColor: string;
  badgeColor?: string;
}

const SORT_OPTIONS: SortOptionConfig[] = [
  {
    id: "default",
    label: "Mặc định (Theo khối kiến thức)",
    shortLabel: "Mặc định",
    description: "Nhóm theo mã loại: Đại cương, Cơ sở ngành, Chuyên ngành...",
    icon: Layers,
    iconColor: "text-gray-500",
  },
  {
    id: "semester",
    label: "Theo kỳ đề xuất",
    shortLabel: "Kỳ đề xuất",
    description: "Sắp xếp theo thứ tự lộ trình học chuẩn (HK1, HK2, HK3...)",
    icon: Calendar,
    iconColor: "text-blue-600",
  },
  {
    id: "debt",
    label: "Ưu tiên: Môn đang nợ",
    shortLabel: "Môn đang nợ (F)",
    description: "Đưa các môn học bị điểm F lên đầu để đăng ký học lại sớm",
    icon: AlertTriangle,
    iconColor: "text-red-600",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
  },
  {
    id: "improve",
    label: "Ưu tiên: Môn cải thiện",
    shortLabel: "Cải thiện (≤ D+)",
    description: "Đưa các môn có điểm D, D+ lên đầu để đăng ký nâng điểm GPA",
    icon: TrendingUp,
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

interface CurriculumFiltersProps {
  curricula: CurriculumProgram[];
  selectedCurriculumId: string;
  onCurriculumChange: (id: string) => void;
  searchValue: string;
  onSearchChange: (v: string) => void;
  displayMode: DisplayMode;
  onDisplayModeChange: (m: DisplayMode) => void;
}

export default function CurriculumFilters({
  curricula,
  selectedCurriculumId,
  onCurriculumChange,
  searchValue,
  onSearchChange,
  displayMode,
  onDisplayModeChange,
}: CurriculumFiltersProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSortOpen(false);
      }
    }

    if (isSortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSortOpen]);

  const activeSortOption =
    SORT_OPTIONS.find((opt) => opt.id === displayMode) || SORT_OPTIONS[0];
  const isCustomSortActive = displayMode !== "default";
  const ActiveIcon = activeSortOption.icon;

  return (
    <div className="section-header flex-wrap">
      {/* ── Left: Title + Curriculum selector ── */}
      <div className="flex items-center gap-3 flex-wrap min-w-0">
        <div className="section-header-title">
          <BookOpen aria-hidden="true" className="section-header-icon size-[18px]" />
          <h2>Chương trình đào tạo &amp; Tra cứu</h2>
        </div>

        <div className="flex items-center gap-1.5">
          <label
            htmlFor="curriculumSelect"
            className="text-xs font-medium text-gray-500 whitespace-nowrap shrink-0"
          >
            Chương trình:
          </label>
          <div className="relative inline-block max-w-full">
            <select
              id="curriculumSelect"
              value={selectedCurriculumId}
              onChange={(e) => onCurriculumChange(e.target.value)}
              className="h-7.5 max-w-72 pl-3 pr-8 text-xs font-medium border border-gray-300 bg-white text-gray-800 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer hover:border-gray-400 transition-colors"
            >
              {curricula.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* ── Right: Custom Sort Popover + Search ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* ── Custom Sort Popover ── */}
        <div className="relative" ref={sortDropdownRef}>
          <div className="flex items-center gap-1.5">
            <label className="text-xs font-medium text-gray-500 whitespace-nowrap shrink-0">
              Sắp xếp:
            </label>

            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isSortOpen}
              className={`h-7.5 px-2.5 text-xs font-medium border rounded-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                isCustomSortActive
                  ? "bg-primary-50 border-primary/40 text-primary hover:bg-primary-100/50"
                  : "bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <ActiveIcon
                aria-hidden="true"
                className={`size-3.5 ${
                  isCustomSortActive ? "text-primary" : activeSortOption.iconColor
                }`}
              />
              <span>{activeSortOption.shortLabel}</span>
              <ChevronDown
                aria-hidden="true"
                className={`size-3 text-gray-400 transition-transform duration-200 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* ── Dropdown Panel ── */}
          {isSortOpen && (
            <div
              role="listbox"
              aria-label="Chọn chế độ sắp xếp môn học"
              className="absolute right-0 top-full mt-1.5 w-78 bg-white border border-gray-200 rounded-md shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="px-3 py-1.5 border-b border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <ArrowUpDown aria-hidden="true" className="size-3" />
                  Chế độ sắp xếp môn học
                </span>
                {isCustomSortActive && (
                  <button
                    type="button"
                    onClick={() => {
                      onDisplayModeChange("default");
                      setIsSortOpen(false);
                    }}
                    className="text-[11px] text-primary hover:underline cursor-pointer font-medium"
                  >
                    Đặt lại mặc định
                  </button>
                )}
              </div>

              <div className="p-1 space-y-0.5">
                {SORT_OPTIONS.map((option) => {
                  const isSelected = displayMode === option.id;
                  const Icon = option.icon;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onDisplayModeChange(option.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded flex items-start gap-2.5 transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-primary-50/70 text-gray-900"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div
                        className={`mt-0.5 p-1 rounded ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Icon aria-hidden="true" className="size-3.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`text-xs font-semibold ${
                              isSelected ? "text-primary font-bold" : "text-gray-800"
                            }`}
                          >
                            {option.label}
                          </span>
                          {isSelected && (
                            <Check
                              aria-hidden="true"
                              className="size-3.5 text-primary shrink-0"
                            />
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── Search Input ── */}
        <div className="relative">
          <input
            id="searchInput"
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm mã hoặc tên môn..."
            className="w-56 h-7.5 pl-7 pr-3 text-xs border border-gray-300 rounded-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors hover:border-gray-400"
          />
          <Search
            aria-hidden="true"
            className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
