"use client";

import { Fragment, useMemo } from "react";
import type { CurriculumGroup, CourseAddStatus } from "@/app/types";
import {
  Check,
  CircleAlert,
  LockKeyhole,
  Plus,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

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

function RequiredCell({ isRequired }: { isRequired: boolean }) {
  if (isRequired) {
    return (
      <span
        className="inline-flex items-center justify-center gap-1 font-medium text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 select-none whitespace-nowrap"
        title="Học phần bắt buộc"
      >
        <ShieldCheck aria-hidden="true" className="size-3.5 text-amber-500 shrink-0" />
        <span>Bắt buộc</span>
      </span>
    );
  }

  return (
    <span className="text-xs text-slate-400 select-none whitespace-nowrap">
      Tự chọn
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
  grade,
  prerequisiteCode,
  onAdd,
  isPeLocked,
}: {
  status: CourseAddStatus;
  grade?: string | null;
  prerequisiteCode?: string;
  onAdd?: () => void;
  isPeLocked?: boolean;
}) {
  // 1. Khi môn đã được thêm vào giỏ: Đổi text nút thành "✓ Đã chọn" (cho click để xóa khỏi giỏ)
  if (status === "added") {
    return (
      <button
        type="button"
        onClick={onAdd}
        title="Đã có trong giỏ học phần (Click để gỡ)"
        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400 transition-all cursor-pointer shadow-2xs whitespace-nowrap"
      >
        <Check aria-hidden="true" className="size-3 text-emerald-600" />
        <span>Đã chọn</span>
      </button>
    );
  }

  const hasGrade = Boolean(grade && grade !== "—");

  // 2. Nếu là môn thực hành thể chất chưa học và sinh viên đã đủ 4 HP thực hành:
  if (!hasGrade && isPeLocked) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed select-none whitespace-nowrap"
        title="Bạn đã chọn đủ 4 học phần thực hành thể chất theo quy chế tốt nghiệp"
      >
        <LockKeyhole aria-hidden="true" className="size-3 text-gray-400" />
        <span>Đã đủ điều kiện</span>
      </button>
    );
  }

  // 3. Nếu môn chưa học (grade == null hoặc '—'):
  if (!hasGrade) {
    // Thiếu tiên quyết -> Render nút "🔒 Khóa" (disable, hover có tooltip)
    if (status === "locked") {
      return (
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed select-none"
          title={`Chưa thỏa mãn điều kiện tiên quyết${
            prerequisiteCode ? `: ${prerequisiteCode}` : ""
          }`}
        >
          <LockKeyhole aria-hidden="true" className="size-3 text-gray-400" />
          <span>Khóa</span>
        </button>
      );
    }

    // Đủ tiên quyết -> Render nút "+ Thêm" (màu xanh lá)
    return (
      <button
        type="button"
        onClick={onAdd}
        className="btn-add-course inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors cursor-pointer"
        aria-label="Thêm học phần vào danh sách đăng ký"
      >
        <Plus aria-hidden="true" className="size-3" />
        <span>Thêm</span>
      </button>
    );
  }

  // 4. Nếu môn đã có điểm:
  // Điểm F -> Render nút "Học lại" (màu đỏ)
  if (grade === "F") {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-2xs transition-colors cursor-pointer"
        title="Đăng ký học lại học phần này"
      >
        <RotateCcw aria-hidden="true" className="size-3" />
        <span>Học lại</span>
      </button>
    );
  }

  // Điểm khác (A, B, C, D, D+...) -> Render nút "Cải thiện" (outline viền vàng cam)
  return (
    <button
      type="button"
      onClick={onAdd}
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold border border-amber-400 text-amber-700 bg-amber-50 hover:bg-amber-100 hover:border-amber-500 shadow-2xs transition-colors cursor-pointer"
      title="Đăng ký học cải thiện điểm số"
    >
      <TrendingUp aria-hidden="true" className="size-3 text-amber-600" />
      <span>Cải thiện</span>
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
  return (
    <span>
      <span className="font-semibold text-gray-700">{label}</span>
      <span className="ml-2 font-normal text-gray-400 text-[11px]">
        ({courseCount} môn &middot; {totalCredits} TC &middot; Đạt:{" "}
        <span className="text-status-success font-semibold">
          {passedCredits} TC
        </span>
        )
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
  // Tính tổng số môn thực hành thể chất (loại trừ môn lý luận PE1014)
  const practicalPeCourses = useMemo(() => {
    return groups
      .flatMap((g) => g.subGroups.flatMap((sg) => sg.courses))
      .filter((c) => c.courseCode.startsWith("PE") && c.courseCode !== "PE1014");
  }, [groups]);

  const completedPracticalCount = practicalPeCourses.filter(
    (c) => c.letterGrade && c.letterGrade !== "—" && c.letterGrade !== "F"
  ).length;

  const inCartPracticalCount = practicalPeCourses.filter(
    (c) => c.addStatus === "added"
  ).length;

  const practicalPeCount = completedPracticalCount + inCartPracticalCount;

  if (groups.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 text-xs">
        Không có học phần nào phù hợp
      </div>
    );
  }

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
            <th className="px-3 py-2 border-r border-gray-200 text-center w-28">
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
            <th className="px-3 py-2 text-center w-24">Thao tác</th>
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
                  {sub.courses.map((course) => {
                    const isPracticalPe =
                      course.courseCode.startsWith("PE") &&
                      course.courseCode !== "PE1014";
                    const isPeLocked = isPracticalPe && practicalPeCount >= 4;

                    return (
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
                          <RequiredCell isRequired={Boolean(course.isRequired)} />
                        </td>
                        {/* TC ĐT */}
                        <td className="px-3 py-2 border-r border-gray-100 text-center font-semibold text-gray-700">
                          {course.trainingCredits}
                        </td>
                        {/* TC HỌC: Môn chưa học -> để trống hoặc '—', chỉ hiện số khi đã học xong */}
                        <td className="px-3 py-2 border-r border-gray-100 text-center font-semibold text-gray-700">
                          {course.letterGrade && course.letterGrade !== "—" ? (
                            course.tuitionCredits
                          ) : (
                            <span className="text-gray-400 font-mono text-xs">—</span>
                          )}
                        </td>
                        {/* ĐIỂM */}
                        <td className="px-3 py-2 border-r border-gray-100 text-center">
                          <GradeCell grade={course.letterGrade} />
                        </td>
                        {/* THAO TÁC / THÊM */}
                        <td className="px-3 py-2 text-center">
                          <AddCell
                            status={course.addStatus}
                            grade={course.letterGrade}
                            prerequisiteCode={course.prerequisiteCode}
                            onAdd={() => onAddCourse(course.courseCode)}
                            isPeLocked={isPeLocked}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
