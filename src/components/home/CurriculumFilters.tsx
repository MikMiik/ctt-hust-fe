"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowUpDown,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  GraduationCap,
  Layers,
  RotateCcw,
  Search,
  TrendingUp,
} from "lucide-react";
import type { CurriculumProgram } from "@/app/types";

export type DisplayMode = "default" | "semester" | "debt" | "improve";

interface SortOptionConfig {
  id: DisplayMode;
  label: string;
  shortLabel: string;
  description: string;
  icon: typeof Layers;
  iconColor: string;
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
  },
  {
    id: "improve",
    label: "Ưu tiên: Môn cải thiện",
    shortLabel: "Cải thiện (≤ D+)",
    description: "Đưa các môn có điểm D, D+ lên đầu để đăng ký nâng điểm GPA",
    icon: TrendingUp,
    iconColor: "text-amber-600",
  },
];

function getProgramSummary(program: CurriculumProgram): string {
  const courseCount = program.groups.reduce(
    (sum, g) => sum + g.courseCount,
    0,
  );
  const totalCredits = program.groups.reduce(
    (sum, g) => sum + g.totalCredits,
    0,
  );
  const passedCredits = program.groups.reduce(
    (sum, g) => sum + g.passedCredits,
    0,
  );
  if (program.id === "ctdt-cntt-freshman" || passedCredits === 0) {
    return `Tân sinh viên · 0 TC tích lũy · Khung chuẩn ${totalCredits} TC`;
  }
  return `Đã tích lũy ${passedCredits}/${totalCredits} TC · ${courseCount} học phần`;
}

function PopoverOptionRow({
  isSelected,
  icon: Icon,
  title,
  description,
  truncateTitle = false,
  onSelect,
}: {
  isSelected: boolean;
  icon: typeof Layers;
  title: string;
  description: string;
  truncateTitle?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={onSelect}
      className={`w-full text-left px-2.5 py-2 rounded flex items-start gap-2.5 transition-colors cursor-pointer ${
        isSelected
          ? "bg-primary-50/70 text-gray-900"
          : "hover:bg-gray-50 text-gray-700"
      }`}
    >
      <div
        className={`mt-0.5 p-1 rounded shrink-0 ${
          isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
        }`}
      >
        <Icon aria-hidden="true" className="size-3.5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span
            className={`text-xs font-semibold ${
              truncateTitle ? "truncate " : ""
            }${isSelected ? "text-primary font-bold" : "text-gray-800"}`}
          >
            {title}
          </span>
          {isSelected && (
            <Check aria-hidden="true" className="size-3.5 text-primary shrink-0" />
          )}
        </div>
        <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
          {description}
        </p>
      </div>
    </button>
  );
}

interface CurriculumFiltersProps {
  curricula: CurriculumProgram[];
  selectedCurriculumId: string;
  onCurriculumChange: (id: string) => void;
  searchValue: string;
  onSearchChange: (v: string) => void;
  displayMode: DisplayMode;
  onDisplayModeChange: (m: DisplayMode) => void;
  onReset?: () => void;
}

export default function CurriculumFilters({
  curricula,
  selectedCurriculumId,
  onCurriculumChange,
  searchValue,
  onSearchChange,
  displayMode,
  onDisplayModeChange,
  onReset,
}: CurriculumFiltersProps) {
  const [openMenu, setOpenMenu] = useState<"program" | "sort" | null>(null);
  const programDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenu) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const activeRef =
        openMenu === "program" ? programDropdownRef : sortDropdownRef;
      if (activeRef.current && !activeRef.current.contains(target)) {
        setOpenMenu(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  const activeProgram =
    curricula.find((p) => p.id === selectedCurriculumId) || curricula[0];
  const isProgramOpen = openMenu === "program";

  const activeSortOption =
    SORT_OPTIONS.find((opt) => opt.id === displayMode) || SORT_OPTIONS[0];
  const isCustomSortActive = displayMode !== "default";
  const isSortOpen = openMenu === "sort";
  const ActiveSortIcon = activeSortOption.icon;

  return (
    <div className="section-header flex-wrap">
      {/* ── Left: Title + Curriculum Popover Selector ── */}
      <div className="flex items-center gap-3 flex-wrap min-w-0">
        <div className="section-header-title">
          <BookOpen
            aria-hidden="true"
            className="section-header-icon size-4.5"
          />
          <h2>Chương trình đào tạo &amp; Tra cứu</h2>
        </div>

        <div className="relative max-w-full" ref={programDropdownRef}>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap shrink-0">
              Chương trình:
            </span>

            <button
              id="curriculumSelect"
              type="button"
              onClick={() =>
                setOpenMenu((prev) => (prev === "program" ? null : "program"))
              }
              aria-haspopup="listbox"
              aria-expanded={isProgramOpen}
              className={`h-7.5 max-w-72 px-2.5 text-xs font-medium border rounded-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                isProgramOpen
                  ? "bg-primary-50/50 border-primary/50 text-gray-900 ring-1 ring-primary/20"
                  : "bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <GraduationCap
                aria-hidden="true"
                className="size-3.5 text-primary shrink-0"
              />
              <span className="truncate">
                {activeProgram?.name ?? "Chọn chương trình"}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`size-3 text-gray-400 shrink-0 transition-transform duration-200 ${
                  isProgramOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {isProgramOpen && (
            <div
              role="listbox"
              aria-label="Chọn chương trình đào tạo"
              className="absolute left-0 top-full mt-1.5 w-80 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-md shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="px-3 py-1.5 border-b border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <GraduationCap aria-hidden="true" className="size-3" />
                  Chương trình đào tạo
                </span>
                <span className="text-[11px] text-gray-400">
                  {curricula.length} CTĐT
                </span>
              </div>

              <div className="p-1 space-y-0.5 max-h-72 overflow-y-auto">
                {curricula.map((program) => (
                  <PopoverOptionRow
                    key={program.id}
                    isSelected={program.id === activeProgram?.id}
                    icon={GraduationCap}
                    title={program.name}
                    description={getProgramSummary(program)}
                    truncateTitle
                    onSelect={() => {
                      onCurriculumChange(program.id);
                      setOpenMenu(null);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Right: Custom Sort Popover + Search ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* ── Custom Sort Popover ── */}
        <div className="relative" ref={sortDropdownRef}>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap shrink-0">
              Sắp xếp:
            </span>

            <button
              type="button"
              onClick={() =>
                setOpenMenu((prev) => (prev === "sort" ? null : "sort"))
              }
              aria-haspopup="listbox"
              aria-expanded={isSortOpen}
              className={`h-7.5 px-2.5 text-xs font-medium border rounded-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                isCustomSortActive
                  ? "bg-primary-50 border-primary/40 text-primary hover:bg-primary-100/50"
                  : isSortOpen
                    ? "bg-primary-50/50 border-primary/50 text-gray-900 ring-1 ring-primary/20"
                    : "bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <ActiveSortIcon
                aria-hidden="true"
                className={`size-3.5 ${
                  isCustomSortActive
                    ? "text-primary"
                    : activeSortOption.iconColor
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
              className="absolute right-0 top-full mt-1.5 w-78 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-md shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100"
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
                      setOpenMenu(null);
                    }}
                    className="text-[11px] text-primary hover:underline cursor-pointer font-medium"
                  >
                    Đặt lại mặc định
                  </button>
                )}
              </div>

              <div className="p-1 space-y-0.5">
                {SORT_OPTIONS.map((option) => (
                  <PopoverOptionRow
                    key={option.id}
                    isSelected={displayMode === option.id}
                    icon={option.icon}
                    title={option.label}
                    description={option.description}
                    onSelect={() => {
                      onDisplayModeChange(option.id);
                      setOpenMenu(null);
                    }}
                  />
                ))}
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
