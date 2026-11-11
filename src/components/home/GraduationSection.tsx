"use client";

import { useMemo } from "react";
import { mockGraduationRequirements } from "@/app/data";
import type { GraduationRequirementGroup } from "@/app/types";
import { BadgeCheck, Check, CircleAlert } from "lucide-react";

interface GraduationSectionProps {
  requirements?: GraduationRequirementGroup[];
  addedCreditsByCategory?: Record<string, number>;
}

const MODULE_CATEGORY_CODES = ["400", "401", "402", "403", "404", "MODULE"];

export default function GraduationSection({
  requirements = mockGraduationRequirements,
  addedCreditsByCategory = {},
}: GraduationSectionProps) {
  // Tính tổng số tín chỉ dự kiến thêm từ các môn thuộc 5 nhóm mô đun (400-404)
  const moduleAddedCredits = useMemo(() => {
    return MODULE_CATEGORY_CODES.reduce(
      (sum, code) => sum + (addedCreditsByCategory[code] || 0),
      0
    );
  }, [addedCreditsByCategory]);

  // Đảm bảo luôn có đủ cả Card Mô đun chuyên sâu định hướng và Giáo dục thể chất
  const displayRequirements = useMemo(() => {
    const list = [...requirements];

    // Card Mô đun chuyên sâu (Target 16 TC)
    if (
      !list.some(
        (r) =>
          r.id === "modchuyensau" ||
          r.categoryCode === "MODULE" ||
          r.name.includes("Mô đun")
      )
    ) {
      list.push({
        id: "modchuyensau",
        categoryCode: "MODULE",
        name: "Mô đun chuyên sâu định hướng",
        shortName: "MÔ ĐUN",
        requiredCredits: 16,
        completedCredits: 0,
        missingCourses: [],
      });
    }

    // Card Giáo dục thể chất (5 HP: 1 Lý luận + 4 Thực hành)
    if (
      !list.some(
        (r) =>
          r.id === "gdtc" ||
          r.categoryCode === "220" ||
          r.name.includes("thể chất")
      )
    ) {
      list.push({
        id: "gdtc",
        categoryCode: "220",
        name: "Giáo dục thể chất",
        shortName: "GDTC",
        requiredCredits: 5,
        completedCredits: 4,
        missingCourses: [],
      });
    }

    return list;
  }, [requirements]);

  return (
    <section className="bg-white border border-gray-200 shadow-sm">
      {/* ── Section Header ── */}
      <div className="section-header">
        <div className="section-header-title">
          <BadgeCheck
            aria-hidden="true"
            className="section-header-icon size-4.5"
          />
          <h2>Tiến độ &amp; Điều kiện tốt nghiệp</h2>
        </div>
      </div>

      {/* ── Cards Grid (6 Cards linh hoạt từ mobile đến desktop) ── */}
      <div className="p-4 bg-gray-50/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {displayRequirements.map((req) => {
            const isModuleGroup =
              req.id === "modchuyensau" ||
              req.categoryCode === "MODULE" ||
              MODULE_CATEGORY_CODES.includes(req.categoryCode) ||
              req.name.includes("Mô đun");

            const isPeGroup =
              req.id === "gdtc" ||
              req.categoryCode === "220" ||
              req.shortName === "GDTC" ||
              req.name.includes("thể chất");

            const added = isModuleGroup
              ? moduleAddedCredits
              : isPeGroup
              ? addedCreditsByCategory["220"] || 0
              : addedCreditsByCategory[req.categoryCode] || 0;

            const unitLabel = isPeGroup ? "HP" : "TC";

            const completedPercent = Math.min(
              100,
              Math.round((req.completedCredits / req.requiredCredits) * 100)
            );
            const isCompleted = completedPercent >= 100;

            const projectedCredits = req.completedCredits + added;
            const projectedPercent = Math.min(
              100,
              Math.round((projectedCredits / req.requiredCredits) * 100)
            );
            const isProjectedCompleted = projectedPercent >= 100;

            return (
              <div
                key={req.id}
                className={`bg-white border rounded-sm p-3.5 flex flex-col justify-between gap-3 transition-all hover:shadow-sm ${
                  isProjectedCompleted
                    ? "border-green-200"
                    : isCompleted
                    ? "border-green-200"
                    : "border-gray-200"
                }`}
              >
                {/* ── Card Header ── */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-semibold text-gray-800 leading-snug">
                      {req.name}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-500 shrink-0 rounded-sm">
                      {req.shortName}
                    </span>
                  </div>
                  {isModuleGroup && (
                    <span className="text-[10px] text-gray-400 block mt-1">
                      Tối thiểu 16 TC từ 2 mô đun
                    </span>
                  )}
                  {isPeGroup && (
                    <span className="text-[10px] text-gray-400 block mt-1">
                      1 Lý luận + 4 Thực hành
                    </span>
                  )}
                </div>

                {/* ── Credit/HP stat ── */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-gray-900 leading-none">
                      {projectedCredits}
                    </span>
                    <span className="text-xs text-gray-400">
                      / {req.requiredCredits} {unitLabel}
                    </span>
                    {added > 0 && (
                      <span className="text-[11px] font-semibold text-blue-600 ml-1">
                        +{added}
                      </span>
                    )}
                  </div>

                  {/* Badge phản hồi trạng thái thực hành thể chất */}
                  {isPeGroup && (
                    <div className="mt-1.5">
                      {projectedCredits >= 5 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 leading-tight">
                          <Check aria-hidden="true" className="size-3 text-emerald-600 shrink-0" />
                          <span>Đã đủ 1 Lý luận + 4 Thực hành</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 leading-tight">
                          <CircleAlert aria-hidden="true" className="size-3 text-amber-500 shrink-0" />
                          <span>Còn thiếu 1 HP thực hành</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Progress bar (combined: completed + projected overlay) ── */}
                <div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden relative">
                    {/* Completed (solid) */}
                    <div
                      className={`absolute left-0 top-0 h-full transition-all duration-500 rounded-full ${
                        isCompleted ? "bg-green-500" : "bg-amber-400"
                      }`}
                      style={{ width: `${completedPercent}%` }}
                    />
                    {/* Projected delta (striped overlay) */}
                    {added > 0 && !isCompleted && (
                      <div
                        className="absolute top-0 h-full bg-blue-400/60 rounded-r-full transition-all duration-500"
                        style={{
                          left: `${completedPercent}%`,
                          width: `${projectedPercent - completedPercent}%`,
                        }}
                      />
                    )}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-gray-400">
                      Đã đạt: {completedPercent}%
                    </span>
                    {added > 0 && projectedPercent !== completedPercent && (
                      <span className="text-[10px] text-blue-500 font-medium">
                        Dự kiến: {projectedPercent}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
