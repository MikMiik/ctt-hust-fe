"use client";

import { Fragment } from "react";
import type { CurriculumGroup, SemesterOpen, AddStatus } from "./types";

// ─── Sub-components (inline nhỏ) ─────────────────────────────────────────

function SemesterBadge({ type }: { type: SemesterOpen }) {
  if (type === "both") {
    return <span className="badge-both-semester">[Mở 2 Kỳ]</span>;
  }
  if (type === "k1_only") {
    return <span className="badge-semester-1">[Chỉ mở Kỳ 1]</span>;
  }
  return <span className="badge-semester-2">[Chỉ mở Kỳ 2]</span>;
}

function MandatoryIcon() {
  return (
    <span className="mandatory-badge" title="Bắt buộc">
      !
    </span>
  );
}

function GradeCell({ grade }: { grade?: string }) {
  if (!grade) {
    return <span className="text-gray-400 font-mono">--</span>;
  }
  const isWeak = ["D", "D+", "F"].includes(grade);
  return (
    <span className={`font-bold ${isWeak ? "text-grade-fail" : "text-gray-700"}`}>
      {grade}
    </span>
  );
}

function AddCell({
  status,
  onAdd,
}: {
  status: AddStatus;
  onAdd?: () => void;
}) {
  if (status === "added") {
    return <span className="text-green-700 font-bold text-xs">✓ Đã thêm</span>;
  }
  if (status === "locked") {
    return <span className="badge-locked">[Không mở]</span>;
  }
  return (
    <button type="button" onClick={onAdd} className="btn-add-course">
      [+]
    </button>
  );
}

// ─── Props ───────────────────────────────────────────────────────────────

interface CurriculumTableProps {
  groups: CurriculumGroup[];
  onAddCourse: (maHP: string) => void;
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function CurriculumTable({ groups, onAddCourse }: CurriculumTableProps) {
  return (
    <div className="w-full overflow-x-auto" style={{ maxHeight: "400px", overflowY: "auto" }}>
      <table
        id="curriculumTable"
        className="w-full text-left text-xs border-collapse"
      >
        {/* ── Sticky Header ── */}
        <thead className="sticky top-0 z-10 bg-table-header shadow-sm">
          <tr className="bg-table-header text-gray-700 font-bold uppercase border-b border-gray-300">
            <th className="p-2 border-r border-gray-300 text-center w-12">STT</th>
            <th className="p-2 border-r border-gray-300 w-24">MÃ HP</th>
            <th className="p-2 border-r border-gray-300">TÊN HP</th>
            <th className="p-2 border-r border-gray-300 text-center w-28">KỲ MỞ MÔN</th>
            <th className="p-2 border-r border-gray-300 text-center w-24">BẮT BUỘC</th>
            <th className="p-2 border-r border-gray-300 text-center w-16">TC ĐT</th>
            <th className="p-2 border-r border-gray-300 text-center w-16">TC HỌC</th>
            <th className="p-2 border-r border-gray-300 text-center w-20">ĐIỂM CHỮ</th>
            <th className="p-2 text-center w-24">THÊM</th>
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody className="divide-y divide-gray-300">
          {groups.map((group) => (
            <Fragment key={`g-${group.maLoaiHP}`}>
              {/* ── Cấp 1: MÃ LOẠI HP ── */}
              <tr
                className="bg-group-primary border-b border-gray-300 font-bold text-gray-800 text-[11px]"
              >
                <td className="p-1.5 px-3 uppercase tracking-wide" colSpan={9}>
                  <span className="font-mono mr-1">[-]</span>
                  {` MÃ LOẠI HP: ${group.maLoaiHP} (COUNT=${group.count}, TỔNG TC: ${group.tongTC}, TỔNG ĐẠT: ${group.tongDat})`}
                </td>
              </tr>

              {group.subGroups.map((sub) => (
                <Fragment key={`sg-${sub.loaiHPLabel}`}>
                  {/* ── Cấp 2: LOẠI HP ── */}
                  <tr
                    className="bg-group-second border-b border-gray-300 font-semibold text-gray-700 text-[11px]"
                  >
                    <td className="p-1.5 px-6 uppercase tracking-wide" colSpan={9}>
                      <span className="font-mono mr-1">[-]</span>
                      {` LOẠI HP: ${sub.loaiHPLabel} (COUNT=${sub.count}, TỔNG TC: ${sub.tongTC}, TỔNG ĐẠT: ${sub.tongDat})`}
                    </td>
                  </tr>

                  {/* ── Các hàng môn học ── */}
                  {sub.courses.map((course) => (
                    <tr
                      key={course.maHP}
                      className="hover:bg-gray-50 bg-white"
                    >
                      {/* STT */}
                      <td className="p-2 border-r border-gray-300 text-center font-mono">
                        {course.stt}
                      </td>
                      {/* MÃ HP */}
                      <td
                        className={`p-2 border-r border-gray-300 font-mono font-bold ${
                          course.highlight ? "text-primary" : "text-gray-800"
                        }`}
                      >
                        {course.maHP}
                      </td>
                      {/* TÊN HP */}
                      <td className="p-2 border-r border-gray-300">
                        <div>{course.tenHP}</div>
                        {course.tienQuyet && (
                          <div className="text-[11px] text-gray-500 italic mt-0.5">
                            Tiên quyết: {course.tienQuyet}
                          </div>
                        )}
                      </td>
                      {/* KỲ MỞ MÔN */}
                      <td className="p-2 border-r border-gray-300 text-center">
                        <SemesterBadge type={course.kyMoMon} />
                      </td>
                      {/* BẮT BUỘC */}
                      <td className="p-2 border-r border-gray-300 text-center">
                        {course.batBuoc && <MandatoryIcon />}
                      </td>
                      {/* TC ĐT */}
                      <td className="p-2 border-r border-gray-300 text-center font-semibold">
                        {course.tcDT}
                      </td>
                      {/* TC HỌC */}
                      <td className="p-2 border-r border-gray-300 text-center font-semibold">
                        {course.tcHoc}
                      </td>
                      {/* ĐIỂM CHỮ */}
                      <td className="p-2 border-r border-gray-300 text-center">
                        <GradeCell grade={course.diemChu} />
                      </td>
                      {/* THÊM */}
                      <td className="p-2 text-center">
                        <AddCell
                          status={course.addStatus}
                          onAdd={() => onAddCourse(course.maHP)}
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
