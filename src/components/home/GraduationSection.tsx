"use client";

import { mockGraduationRequirements } from "@/app/data";
import type { GraduationRequirementGroup } from "@/app/types";
import { BadgeCheck } from "lucide-react";

interface GraduationSectionProps {
  requirements?: GraduationRequirementGroup[];
  addedCreditsByCategory?: Record<string, number>;
}

export default function GraduationSection({
  requirements = mockGraduationRequirements,
  addedCreditsByCategory = {},
}: GraduationSectionProps) {
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

      {/* ── Cards Grid ── */}
      <div className="p-4 bg-gray-50/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {requirements.map((req) => {
            const added = addedCreditsByCategory[req.categoryCode] || 0;
            const completedPercent = Math.min(
              100,
              Math.round((req.completedCredits / req.requiredCredits) * 100),
            );
            const isCompleted = completedPercent >= 100;

            const projectedCredits = req.completedCredits + added;
            const projectedPercent = Math.min(
              100,
              Math.round((projectedCredits / req.requiredCredits) * 100),
            );
            const isProjectedCompleted = projectedPercent >= 100;

            return (
              <div
                key={req.id}
                className={`bg-white border rounded-sm p-3.5 flex flex-col gap-3 transition-all hover:shadow-sm ${
                  isProjectedCompleted
                    ? "border-green-200"
                    : isCompleted
                      ? "border-green-200"
                      : "border-gray-200"
                }`}
              >
                {/* ── Card Header ── */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-semibold text-gray-800 leading-snug">
                    {req.name}
                  </h3>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-500 shrink-0 rounded-sm">
                    {req.shortName}
                  </span>
                </div>

                {/* ── Credit stat ── */}
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-gray-900 leading-none">
                    {projectedCredits}
                  </span>
                  <span className="text-xs text-gray-400">
                    / {req.requiredCredits} TC
                  </span>
                  {added > 0 && (
                    <span className="text-[11px] font-semibold text-blue-600 ml-1">
                      +{added}
                    </span>
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
