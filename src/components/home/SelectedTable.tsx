"use client";

import type { SelectedCourse, RegistrationStatus } from "@/app/types";
import {
  AlertCircle,
  BookOpen,
  Check,
  Clock,
  LoaderCircle,
  Trash2,
} from "lucide-react";

function RegistrationStatusBadge({ status }: { status: RegistrationStatus }) {
  if (status === "Đang chờ") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <Clock aria-hidden="true" className="size-3" />
        Đang chờ
      </span>
    );
  }

  if (status === "Thành công") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <Check aria-hidden="true" className="size-3" />
        Thành công
      </span>
    );
  }

  if (status === "Lỗi") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
        <AlertCircle aria-hidden="true" className="size-3" />
        Lỗi
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
      <LoaderCircle aria-hidden="true" className="size-3 animate-spin" />
      Đang xử lý
    </span>
  );
}

interface SelectedTableProps {
  courses: SelectedCourse[];
  onRemove: (courseCode: string) => void;
}

export default function SelectedTable({ courses, onRemove }: SelectedTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        id="selectedCoursesTable"
        className="w-full text-left text-xs border-collapse"
      >
        {/* ── Header ── */}
        <thead>
          <tr className="bg-table-header text-gray-600 font-semibold uppercase text-[11px] tracking-wide border-b border-gray-200">
            <th className="px-3 py-2 border-r border-gray-200 w-28">Mã HP</th>
            <th className="px-3 py-2 border-r border-gray-200">Tên lớp học phần</th>
            <th className="px-3 py-2 border-r border-gray-200 text-center w-28">Ngày đăng ký</th>
            <th className="px-3 py-2 border-r border-gray-200 text-center w-32">Trạng thái</th>
            <th className="px-3 py-2 border-r border-gray-200 text-center w-20">Số TC</th>
            <th className="px-3 py-2 text-center w-24">Thao tác</th>
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center">
                <div className="flex flex-col items-center gap-2.5">
                  <BookOpen
                    aria-hidden="true"
                    className="size-8 text-gray-200"
                  />
                  <p className="text-sm font-medium text-gray-400">
                    Chưa có học phần nào trong danh sách đăng ký
                  </p>
                  <p className="text-xs text-gray-400">
                    Chọn học phần từ bảng Chương trình đào tạo phía trên để thêm vào giỏ
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr
                key={course.courseCode}
                className="hover:bg-row-hover bg-white border-b border-gray-100 transition-colors"
              >
                <td className="px-3 py-2 border-r border-gray-100 font-mono font-semibold text-primary">
                  {course.courseCode}
                </td>
                <td className="px-3 py-2 border-r border-gray-100 text-gray-800 font-medium">
                  {course.className}
                </td>
                <td className="px-3 py-2 border-r border-gray-100 text-center font-mono text-gray-600">
                  {course.registeredDate}
                </td>
                <td className="px-3 py-2 border-r border-gray-100 text-center">
                  <RegistrationStatusBadge status={course.registrationStatus} />
                </td>
                <td className="px-3 py-2 border-r border-gray-100 text-center font-semibold text-gray-700">
                  {course.credits}
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => onRemove(course.courseCode)}
                    className="inline-flex items-center gap-1 text-gray-400 hover:text-primary text-xs font-medium cursor-pointer transition-colors py-0.5 px-1.5 rounded hover:bg-primary-50"
                    aria-label={`Xóa học phần ${course.courseCode}`}
                  >
                    <Trash2 aria-hidden="true" className="size-3.5" />
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
