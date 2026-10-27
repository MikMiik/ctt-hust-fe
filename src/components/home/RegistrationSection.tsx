"use client";

import type { SelectedCourse } from "@/app/types";
import SelectedTable from "./SelectedTable";
import RegistrationBar from "./RegistrationBar";
import { UserCheck } from "lucide-react";

interface RegistrationSectionProps {
  courses: SelectedCourse[];
  onRemove: (courseCode: string) => void;
  onSubmit: () => void;
}

export default function RegistrationSection({
  courses,
  onRemove,
  onSubmit,
}: RegistrationSectionProps) {
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <section className="space-y-2">
      <div className="bg-white border border-gray-300">
        {/* ── Section: Registered Courses ── */}
        <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <UserCheck aria-hidden="true" className="size-[18px] text-primary" />
            <h2 className="text-xs font-bold uppercase tracking-wide text-gray-800">
              ĐĂNG KÝ HỌC PHẦN (HỌC PHẦN ĐÃ CHỌN)
            </h2>
          </div>
        </div>

        <SelectedTable courses={courses} onRemove={onRemove} />
        <RegistrationBar totalCredits={totalCredits} onSubmit={onSubmit} />
      </div>
    </section>
  );
}
