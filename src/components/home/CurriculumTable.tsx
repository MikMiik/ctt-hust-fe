"use client";

import { Fragment } from "react";
import type { CurriculumGroup, CourseAddStatus } from "@/app/types";
import { Check, CircleAlert, LockKeyhole, Plus } from "lucide-react";

function SemesterBadge({ term }: { term: string }) {
  if (!term) return <span className="text-gray-400 font-mono text-xs">—</span>;
  return <span className="badge-both-semester">[{term}]</span>;
}

function RecommendedSemesterCell({ semester }: { semester?: number }) {
  if (semester === undefined || semester === null) {
    return <span className="text-gray-400 font-mono text-xs">—</span>;
  }
  return (
    <span className="font-mono font-semibold text-gray-700 text-xs">
      HK{semester}
    </span>
  );
}

function MandatoryIcon() {
  return (
    <span className="mandatory-badge" title="Bắt buộc">
      <CircleAlert aria-hidden="true" className="size-3" />
    </span>
  );
}

function GradeCell({ grade }: { grade?: string }) {
  if (!grade) {
    return <span className="text-gray-400 font-mono text-xs">—</span>;
  }
  const isFail = grade === "F";
  const isWeak = ["D", "D+"].includes(grade);
  return (
    <span
      className={`font-bold text-xs ${
        isFail ? "text-grade-fail" : isWeak ? "text-amber-600" : "text-gray-700"
      }`}
    >
      {grade}
    </span>
  );
}

function AddCell({
  status,
  onAdd,
}: {
  status: CourseAddStatus;
  onAdd?: () => void;
}) {
  if (status === "added") {
    return (
      <span className="text-status-success font-semibold text-xs inline-flex items-center gap-1">
        <Check aria-hidden="true" className="size-3.5" />
        Đã thêm
      </span>
    );
  }
  if (status === "locked") {
    return (
      <span className="badge-locked">
        <LockKeyhole aria-hidden="true" className="size-3" />
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onAdd}
      className="btn-add-course"
      aria-label="Thêm học phần vào danh sách đăng ký"
    >
      <Plus aria-hidden="true" className="size-3" />
      Thêm
    </button>
  );
}

/** Format group header thân thiện: "Lý luận chính trị (5 môn · 19 TC · Đạt: 9 TC)" */
function GroupHeaderText({
  label,
  courseCount,
  totalCredits,
  passedCredits,
}: {
  label: string;
  courseCount: number;
  totalCredits: number;
  passedCredits: number;
}) {
  return (
    <span>
      <span className="font-semibold text-gray-800">Mã HP: {label}</span>
      <span className="ml-2 font-normal text-gray-500 text-[11px]">
        {courseCount} môn &middot; {totalCredits} TC &middot; Đạt:{" "}
        <span className="text-status-success font-semibold">
          {passedCredits} TC
        </span>
      </span>
    </span>
  );
}

function SubGroupHeaderText({
  label,
  courseCount,
  totalCredits,
  passedCredits,
}: {
  label: string;
  courseCount: number;
  totalCredits: number;
  passedCredits: number;
}) {
  // Humanize label: BẮT_BUỘC → Bắt buộc
  const humanLabel = label
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase());

  return (
    <span>
      <span className="font-medium text-gray-700">{humanLabel}</span>
      <span className="ml-2 font-normal text-gray-400 text-[11px]">
        {courseCount} môn &middot; {totalCredits} TC &middot; Đạt:{" "}
        <span className="text-status-success">{passedCredits} TC</span>
      </span>
    </span>
  );
}

interface CurriculumTableProps {
  groups: CurriculumGroup[];
  onAddCourse: (courseCode: string) => void;
}

export default function CurriculumTable({
  groups,
  onAddCourse,
}: CurriculumTableProps) {
  return (
    <div
      className="w-full overflow-x-auto"
      style={{
        maxHeight: "calc(100vh - 340px)",
        minHeight: "280px",
        overflowY: "auto",
      }}
    >
      <table
        id="curriculumTable"
        className="w-full text-left text-xs border-collapse"
      >
        {/* ── Table Header ── */}
        <thead className="sticky top-0 z-10 bg-table-header">
          <tr className="text-gray-600 font-semibold uppercase text-[11px] tracking-wide border-b border-gray-300">
            <th className="px-3 py-2 border-r border-gray-200 text-center w-12">
              STT
            </th>
            <th className="px-3 py-2 border-r border-gray-200 w-24">Mã HP</th>
            <th className="px-3 py-2 border-r border-gray-200">Tên học phần</th>
            <th className="px-3 py-2 border-r border-gray-200 text-center w-28">
              Kỳ mở môn
            </th>
            <th className="px-3 py-2 border-r border-gray-200 text-center w-24">
              Kỳ đề xuất
            </th>
            <th className="px-3 py-2 border-r border-gray-200 text-center w-20">
              Bắt buộc
            </th>
            <th className="px-3 py-2 border-r border-gray-200 text-center w-16">
              TC ĐT
            </th>
            <th className="px-3 py-2 border-r border-gray-200 text-center w-16">
              TC Học
            </th>
            <th className="px-3 py-2 border-r border-gray-200 text-center w-20">
              Điểm
            </th>
            <th className="px-3 py-2 text-center w-24">Thêm</th>
          </tr>
        </thead>

        {/* ── Table Body ── */}
        <tbody>
          {groups.map((group) => (
            <Fragment key={`g-${group.categoryCode}`}>
              {/* Group row */}
              <tr className="bg-group-primary border-y border-gray-300">
                <td className="px-3 py-2 text-[11px]" colSpan={10}>
                  <GroupHeaderText
                    label={group.categoryCode}
                    courseCount={group.courseCount}
                    totalCredits={group.totalCredits}
                    passedCredits={group.passedCredits}
                  />
                </td>
              </tr>

              {group.subGroups.map((sub) => (
                <Fragment key={`sg-${sub.groupLabel}`}>
                  {/* Sub-group row */}
                  <tr className="bg-group-second border-b border-gray-200">
                    <td className="pl-6 pr-3 py-1.5 text-[11px]" colSpan={10}>
                      <SubGroupHeaderText
                        label={sub.groupLabel}
                        courseCount={sub.courseCount}
                        totalCredits={sub.totalCredits}
                        passedCredits={sub.passedCredits}
                      />
                    </td>
                  </tr>

                  {/* Course rows */}
                  {sub.courses.map((course) => (
                    <tr
                      key={course.courseCode}
                      className="hover:bg-row-hover bg-white border-b border-gray-100 transition-colors"
                    >
                      <td className="px-3 py-2 border-r border-gray-100 text-center font-mono text-gray-500">
                        {course.indexNumber}
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100 font-mono font-semibold text-gray-800">
                        {course.courseCode}
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100">
                        <div className="text-gray-800">{course.courseName}</div>
                        {course.prerequisiteCode && (
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            Tiên quyết: {course.prerequisiteCode}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100 text-center">
                        <SemesterBadge term={course.semesterTerm} />
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100 text-center">
                        <RecommendedSemesterCell
                          semester={course.recommendedSemester}
                        />
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100 text-center">
                        {course.isRequired && <MandatoryIcon />}
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100 text-center font-semibold text-gray-700">
                        {course.trainingCredits}
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100 text-center font-semibold text-gray-700">
                        {course.tuitionCredits}
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100 text-center">
                        <GradeCell grade={course.letterGrade} />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <AddCell
                          status={course.addStatus}
                          onAdd={() => onAddCourse(course.courseCode)}
                        />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
