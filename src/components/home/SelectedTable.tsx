"use client";

import type { SelectedCourse } from "./types";

interface SelectedTableProps {
  courses: SelectedCourse[];
  onRemove: (maHP: string) => void;
}

export default function SelectedTable({ courses, onRemove }: SelectedTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        id="selectedCoursesTable"
        className="w-full text-left text-xs border-collapse"
      >
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
        <tbody className="divide-y divide-gray-300">
          {courses.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-400 italic">
                Chưa có học phần nào được chọn.
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.maHP} className="hover:bg-gray-50 bg-white">
                {/* MÃ HP */}
                <td className="p-2 border-r border-gray-300 font-mono font-bold text-primary">
                  {course.maHP}
                </td>
                {/* TÊN LỚP */}
                <td className="p-2 border-r border-gray-300 font-medium">
                  {course.tenLop}
                </td>
                {/* NGÀY ĐĂNG KÝ */}
                <td className="p-2 border-r border-gray-300 text-center font-mono text-gray-700">
                  {course.ngayDangKy}
                </td>
                {/* TT ĐĂNG KÝ */}
                <td
                  className={`p-2 border-r border-gray-300 text-center font-semibold ${
                    course.ttDangKy === "Thành công"
                      ? "text-status-success"
                      : course.ttDangKy === "Lỗi"
                      ? "text-status-danger"
                      : "text-status-warning"
                  }`}
                >
                  {course.ttDangKy}
                </td>
                {/* SỐ TC */}
                <td className="p-2 border-r border-gray-300 text-center font-semibold">
                  {course.soTC}
                </td>
                {/* THAO TÁC */}
                <td className="p-2 text-center">
                  <button
                    type="button"
                    onClick={() => onRemove(course.maHP)}
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
