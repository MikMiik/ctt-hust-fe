"use client";

import type { SelectedCourse } from "./types";
import SelectedTable from "./SelectedTable";
import RegistrationBar from "./RegistrationBar";

interface RegistrationSectionProps {
  courses: SelectedCourse[];
  onRemove: (maHP: string) => void;
  onSubmit: () => void;
}

export default function RegistrationSection({
  courses,
  onRemove,
  onSubmit,
}: RegistrationSectionProps) {
  const totalCredits = courses.reduce((sum, c) => sum + c.soTC, 0);

  return (
    <section className="space-y-2">
      <div className="bg-white border border-gray-300">
        {/* ── Section Header ── */}
        <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              how_to_reg
            </span>
            <h2 className="text-xs font-bold uppercase tracking-wide text-gray-800">
              ĐĂNG KÝ HỌC PHẦN (HỌC PHẦN ĐÃ CHỌN)
            </h2>
          </div>
        </div>

        {/* ── Bảng danh sách ── */}
        <SelectedTable courses={courses} onRemove={onRemove} />

        {/* ── Footer Action Bar ── */}
        <RegistrationBar totalCredits={totalCredits} onSubmit={onSubmit} />
      </div>
    </section>
  );
}
