"use client";

import type { SelectedCourse } from "@/app/types";

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
        {/* ── Section: Selected Courses Header ── */}
        <thead>
          <tr className="bg-table-header text-gray-700 font-bold uppercase border-b border-gray-300">
            <th className="p-2 border-r border-gray-300 w-28">MÃ HP</th>
            <th className="p-2 border-r border-gray-300">TÊN LỚP</th>
            <th className="p-2 border-r border-gray-300 text-center w-28">NGÀY ĐĂNG KÝ</th>
            <th className="p-2 border-r border-gray-300 text-center w-28">TT ĐĂNG KÝ</th>
            <th className="p-2 border-r border-gray-300 text-center w-20">SỐ TC</th>
            <th className="p-2 text-center w-24">THAO TÁC</th>
          </tr>
        </thead>

        {/* ── Section: Selected Courses Body ── */}
        <tbody className="divide-y divide-gray-300">
          {courses.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-400 italic">
                Chưa có học phần nào được chọn.
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.courseCode} className="hover:bg-gray-50 bg-white">
                <td className="p-2 border-r border-gray-300 font-mono font-bold text-primary">
                  {course.courseCode}
                </td>
                <td className="p-2 border-r border-gray-300 font-medium">
                  {course.className}
                </td>
                <td className="p-2 border-r border-gray-300 text-center font-mono text-gray-700">
                  {course.registeredDate}
                </td>
                <td
                  className={`p-2 border-r border-gray-300 text-center font-semibold ${
                    course.registrationStatus === "Thành công"
                      ? "text-status-success"
                      : course.registrationStatus === "Lỗi"
                      ? "text-status-danger"
                      : "text-status-warning"
                  }`}
                >
                  {course.registrationStatus}
                </td>
                <td className="p-2 border-r border-gray-300 text-center font-semibold">
                  {course.credits}
                </td>
                <td className="p-2 text-center">
                  <button
                    type="button"
                    onClick={() => onRemove(course.courseCode)}
                    className="text-primary hover:underline font-semibold text-xs cursor-pointer"
                  >
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
