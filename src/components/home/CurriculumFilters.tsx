"use client";

import { ChevronDown, List, Search } from "lucide-react";

export type DisplayMode =
  | "default"
  | "semester"
  | "debt"
  | "improve";

interface CurriculumFiltersProps {
  searchValue: string;
  onSearchChange: (v: string) => void;
  displayMode: DisplayMode;
  onDisplayModeChange: (m: DisplayMode) => void;
}

export default function CurriculumFilters({
  searchValue,
  onSearchChange,
  displayMode,
  onDisplayModeChange,
}: CurriculumFiltersProps) {
  return (
    <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
      {/* ── Section: Curriculum Filters ── */}
      <div className="flex items-center gap-1.5">
        <List aria-hidden="true" className="size-[18px] text-primary" />
        <h2 className="text-xs font-bold uppercase tracking-wide text-gray-800">
          CHƯƠNG TRÌNH ĐÀO TẠO &amp; TRA CỨU
        </h2>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <label
            htmlFor="displayModeSelect"
            className="text-xs font-semibold text-gray-700 whitespace-nowrap shrink-0"
          >
            Chế độ hiển thị / Sắp xếp:
          </label>
          <div className="relative inline-block">
            <select
              id="displayModeSelect"
              value={displayMode}
              onChange={(e) => onDisplayModeChange(e.target.value as DisplayMode)}
              className="h-7.5 pl-3 pr-8 text-xs font-medium border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-primary appearance-none cursor-pointer"
            >
              <option value="default">Mặc định (Theo Mã loại HP)</option>
              <option value="semester">Theo kỳ đề xuất (HK1, HK2, HK3...)</option>
              <option value="debt">Ưu tiên: Môn đang nợ / Tiến độ</option>
              <option value="improve">Ưu tiên: Môn cải thiện (Điểm ≤ D+)</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="absolute right-2 top-1.5 size-[18px] text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        <div className="relative">
          <input
            id="searchInput"
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm mã hoặc tên môn học..."
            className="w-64 h-7 pl-6 pr-2 text-xs border border-gray-300 rounded-none bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary"
          />
          <Search
            aria-hidden="true"
            className="absolute left-1 top-1/2 -translate-y-1/2 size-3.5 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
