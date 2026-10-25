"use client";

import { mockGraduationRequirements } from "@/app/data";
import type { GraduationRequirementGroup } from "@/app/types";

interface GraduationSectionProps {
  requirements?: GraduationRequirementGroup[];
  addedCreditsByCategory?: Record<string, number>;
}

export default function GraduationSection({
  requirements = mockGraduationRequirements,
  addedCreditsByCategory = {},
}: GraduationSectionProps) {
  return (
    <section className="bg-white border border-gray-300">
      {/* ── Section Header ── */}
      <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[18px]">
            verified
          </span>
          <h2 className="text-xs font-bold uppercase tracking-wide text-gray-800">
            TIẾN ĐỘ &amp; ĐIỀU KIỆN TỐT NGHIỆP
          </h2>
        </div>
      </div>

      {/* ── Section Grid Cards ── */}
      <div className="p-3 bg-gray-50/40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {requirements.map((req) => {
            const added = addedCreditsByCategory[req.categoryCode] || 0;
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
            const remainingAfterAdded = Math.max(0, req.requiredCredits - projectedCredits);

            return (
              <div
                key={req.id}
                className="bg-white border border-gray-300 rounded-sm p-3 flex flex-col justify-between transition-colors hover:border-gray-400"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xs font-bold text-gray-800 leading-tight">
                      {req.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-gray-100 border border-gray-300 text-gray-700 shrink-0">
                      {req.shortName}
                    </span>
                  </div>

                  <div className="mb-2">
                    <div className="flex items-baseline justify-between text-xs mb-1">
                      <span className="text-gray-600">
                        Đạt:{" "}
                        <strong className="text-gray-900 font-bold">
                          {req.completedCredits}
                        </strong>
                        /{req.requiredCredits} TC
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          isCompleted ? "text-green-700" : "text-amber-700"
                        }`}
                      >
                        {completedPercent}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 border border-gray-300 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isCompleted ? "bg-green-600" : "bg-amber-500"
                        }`}
                        style={{ width: `${completedPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-2.5">
                    <div className="flex items-baseline justify-between text-xs mb-1">
                      <span className="text-gray-600">
                        Sau thêm:{" "}
                        <strong className="text-blue-900 font-bold">
                          {projectedCredits}
                        </strong>
                        /{req.requiredCredits} TC
                        {added > 0 && (
                          <span className="text-blue-700 font-semibold text-[11px] ml-1">
                            (+{added} TC)
                          </span>
                        )}
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          isProjectedCompleted ? "text-green-700" : "text-blue-700"
                        }`}
                      >
                        {projectedPercent}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 border border-gray-300 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isProjectedCompleted ? "bg-green-600" : "bg-blue-600"
                        }`}
                        style={{ width: `${projectedPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-[11px] pt-1.5 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-gray-500">Trạng thái:</span>
                    {isProjectedCompleted ? (
                      <span className="text-green-700 font-semibold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">
                          check_circle
                        </span>
                        Đủ điều kiện
                      </span>
                    ) : (
                      <span className="text-amber-800 font-medium">
                        Cần thêm: <strong>{remainingAfterAdded} TC</strong>
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
