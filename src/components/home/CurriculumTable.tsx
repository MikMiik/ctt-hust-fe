"use client";

import { Fragment } from "react";
import type { CurriculumGroup, CourseAddStatus } from "@/app/types";
import { Check, CircleAlert, LockKeyhole, Minus, Plus } from "lucide-react";

function SemesterBadge({ term }: { term: string }) {
  if (!term) return <span className="text-gray-400 font-mono">--</span>;
  return <span className="badge-both-semester">[{term}]</span>;
}

function RecommendedSemesterCell({ semester }: { semester?: number }) {
  if (semester === undefined || semester === null) {
    return <span className="text-gray-400 font-mono">--</span>;
  }
  return (
    <span className="font-mono font-bold text-gray-800 text-xs">
      {semester}
    </span>
  );
}

function MandatoryIcon() {
  return (
    <span className="mandatory-badge" title="Bắt buộc">
      <CircleAlert aria-hidden="true" className="size-3.5" />
    </span>
  );
}

function GradeCell({ grade }: { grade?: string }) {
  if (!grade) {
    return <span className="text-gray-400 font-mono">--</span>;
  }
  const isWeak = ["D", "D+", "F"].includes(grade);
  return (
    <span
      className={`font-bold ${isWeak ? "text-grade-fail" : "text-gray-700"}`}
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
      <span className="text-green-700 font-bold text-xs inline-flex items-center gap-1">
        <Check aria-hidden="true" className="size-3.5" />
        Đã thêm
      </span>
    );
  }
  if (status === "locked") {
    return (
      <span className="badge-locked inline-flex items-center gap-1">
        <LockKeyhole aria-hidden="true" className="size-3.5" />
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onAdd}
      className="btn-add-course"
      aria-label="Thêm học phần"
    >
      <Plus aria-hidden="true" className="size-3.5" />
    </button>
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
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      <table
        id="curriculumTable"
        className="w-full text-left text-xs border-collapse"
      >
        {/* ── Section: Curriculum Table Header ── */}
        <thead className="sticky top-0 z-10 bg-table-header shadow-sm">
          <tr className="bg-table-header text-gray-700 font-bold uppercase border-b border-gray-300">
            <th className="p-2 border-r border-gray-300 text-center w-12">
              STT
            </th>
            <th className="p-2 border-r border-gray-300 w-24">MÃ HP</th>
            <th className="p-2 border-r border-gray-300">TÊN HP</th>
            <th className="p-2 border-r border-gray-300 text-center w-28">
              KỲ MỞ MÔN
            </th>
            <th className="p-2 border-r border-gray-300 text-center w-24">
              KỲ ĐỀ XUẤT
            </th>
            <th className="p-2 border-r border-gray-300 text-center w-24">
              BẮT BUỘC
            </th>
            <th className="p-2 border-r border-gray-300 text-center w-16">
              TC ĐT
            </th>
            <th className="p-2 border-r border-gray-300 text-center w-16">
              TC HỌC
            </th>
            <th className="p-2 border-r border-gray-300 text-center w-20">
              ĐIỂM CHỮ
            </th>
            <th className="p-2 text-center w-24">THÊM</th>
          </tr>
        </thead>

        {/* ── Section: Curriculum Table Body ── */}
        <tbody className="divide-y divide-gray-300">
          {groups.map((group) => (
            <Fragment key={`g-${group.categoryCode}`}>
              <tr className="bg-group-primary border-b border-gray-300 font-bold text-gray-800 text-[11px]">
                <td className="p-1.5 px-3 uppercase tracking-wide" colSpan={10}>
                  <Minus
                    aria-hidden="true"
                    className="inline-block size-3.5 mr-1"
                  />
                  {` MÃ LOẠI HP: ${group.categoryCode} (COUNT=${group.courseCount}, TỔNG TC: ${group.totalCredits}, TỔNG ĐẠT: ${group.passedCredits})`}
                </td>
              </tr>

              {group.subGroups.map((sub) => (
                <Fragment key={`sg-${sub.groupLabel}`}>
                  <tr className="bg-group-second border-b border-gray-300 font-semibold text-gray-700 text-[11px]">
                    <td
                      className="p-1.5 px-6 uppercase tracking-wide"
                      colSpan={10}
                    >
                      <Minus
                        aria-hidden="true"
                        className="inline-block size-3.5 mr-1"
                      />
                      {` LOẠI HP: ${sub.groupLabel} (COUNT=${sub.courseCount}, TỔNG TC: ${sub.totalCredits}, TỔNG ĐẠT: ${sub.passedCredits})`}
                    </td>
                  </tr>

                  {sub.courses.map((course) => (
                    <tr
                      key={course.courseCode}
                      className="hover:bg-gray-50 bg-white"
                    >
                      <td className="p-2 border-r border-gray-300 text-center font-mono">
                        {course.indexNumber}
                      </td>
                      <td className="p-2 border-r border-gray-300 font-mono font-bold text-gray-800">
                        {course.courseCode}
                      </td>
                      <td className="p-2 border-r border-gray-300">
                        <div>{course.courseName}</div>
                        {course.prerequisiteCode && (
                          <div className="text-[11px] text-gray-500 italic mt-0.5">
                            Tiên quyết: {course.prerequisiteCode}
                          </div>
                        )}
                      </td>
                      <td className="p-2 border-r border-gray-300 text-center">
                        <SemesterBadge term={course.semesterTerm} />
                      </td>
                      <td className="p-2 border-r border-gray-300 text-center">
                        <RecommendedSemesterCell
                          semester={course.recommendedSemester}
                        />
                      </td>
                      <td className="p-2 border-r border-gray-300 text-center">
                        {course.isRequired && <MandatoryIcon />}
                      </td>
                      <td className="p-2 border-r border-gray-300 text-center font-semibold">
                        {course.trainingCredits}
                      </td>
                      <td className="p-2 border-r border-gray-300 text-center font-semibold">
                        {course.tuitionCredits}
                      </td>
                      <td className="p-2 border-r border-gray-300 text-center">
                        <GradeCell grade={course.letterGrade} />
                      </td>
                      <td className="p-2 text-center">
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
