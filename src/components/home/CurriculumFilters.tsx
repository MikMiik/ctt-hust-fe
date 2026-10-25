"use client";

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
        <span className="material-symbols-outlined text-primary text-[18px]">
          format_list_bulleted
        </span>
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
              <option value="semester">Theo kỳ học (HK1, HK2, HK3...)</option>
              <option value="debt">Ưu tiên: Môn đang nợ / Tiến độ</option>
              <option value="improve">Ưu tiên: Môn cải thiện (Điểm ≤ D+)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1.5 text-[18px] text-gray-500 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        <div className="relative">
          <input
            id="searchInput"
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm mã hoặc tên môn học..."
            className="w-64 h-7 pl-7 pr-2 text-xs border border-gray-300 rounded-none bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary"
          />
          <span className="material-symbols-outlined absolute left-1.5 top-1.5 text-[15px] text-gray-400">
            search
          </span>
        </div>
      </div>
    </div>
  );
}
