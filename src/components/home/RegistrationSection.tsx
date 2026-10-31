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
  const pendingCount = courses.filter((c) => c.registrationStatus === "Đang chờ").length;

  return (
    <section>
      <div className="bg-white border border-gray-200 shadow-sm">
        {/* ── Section Header ── */}
        <div className="section-header">
          <div className="section-header-title">
            <UserCheck aria-hidden="true" className="section-header-icon size-[18px]" />
            <h2>Đăng ký học phần</h2>
          </div>
          {courses.length > 0 && (
            <span className="text-xs text-gray-500 font-medium">
              {courses.length} học phần đã chọn ({totalCredits} TC)
            </span>
          )}
        </div>

        <SelectedTable courses={courses} onRemove={onRemove} />
        <RegistrationBar
          totalCredits={totalCredits}
          pendingCount={pendingCount}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
}
