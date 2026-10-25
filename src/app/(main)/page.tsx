"use client";

import { useState } from "react";
import CurriculumSection from "@/components/home/CurriculumSection";
import RegistrationSection from "@/components/home/RegistrationSection";
import type { SelectedCourse } from "@/components/home/types";

// Dữ liệu giỏ hàng mẫu ban đầu (mirror index.html)
const INITIAL_CART: SelectedCourse[] = [
  {
    maHP: "MI3050",
    tenLop: "Các phương pháp tối ưu",
    ngayDangKy: "10/1/2026",
    ttDangKy: "Thành công",
    soTC: 4,
  },
  {
    maHP: "MAT1092",
    tenLop: "Giải tích II",
    ngayDangKy: "10/1/2026",
    ttDangKy: "Thành công",
    soTC: 4,
  },
  {
    maHP: "INT2204",
    tenLop: "Lập trình Hướng đối tượng",
    ngayDangKy: "10/1/2026",
    ttDangKy: "Thành công",
    soTC: 3,
  },
  {
    maHP: "ENG1002",
    tenLop: "Tiếng Anh học thuật B2",
    ngayDangKy: "10/1/2026",
    ttDangKy: "Thành công",
    soTC: 3,
  },
];

// Map từ maHP → thông tin môn (dùng khi thêm từ bảng CTĐT)
const COURSE_INFO_MAP: Record<string, { tenLop: string; soTC: number }> = {
  SSH1110: { tenLop: "Triết học Mác - Lênin", soTC: 3 },
  SSH1121: { tenLop: "Kinh tế chính trị Mác - Lênin", soTC: 2 },
  SSH1131: { tenLop: "Chủ nghĩa xã hội khoa học", soTC: 2 },
  SSH1170: { tenLop: "Lịch sử Đảng Cộng sản Việt Nam", soTC: 2 },
  SSH1180: { tenLop: "Tư tưởng Hồ Chí Minh", soTC: 2 },
  LAW1001: { tenLop: "Pháp luật đại cương", soTC: 2 },
  MAT1091: { tenLop: "Giải tích I", soTC: 4 },
  MAT1092: { tenLop: "Giải tích II", soTC: 4 },
  PHY1100: { tenLop: "Vật lý đại cương I", soTC: 3 },
  PHY1102: { tenLop: "Vật lý đại cương II", soTC: 3 },
  INT3110: { tenLop: "Trí tuệ nhân tạo", soTC: 3 },
};

const MAX_CREDITS = 24;

export default function HomePage() {
  const [cart, setCart] = useState<SelectedCourse[]>(INITIAL_CART);

  const selectedCodes = new Set(cart.map((c) => c.maHP));

  function handleAddCourse(maHP: string) {
    if (selectedCodes.has(maHP)) {
      alert(`Học phần ${maHP} đã có trong danh sách đăng ký!`);
      return;
    }
    const info = COURSE_INFO_MAP[maHP];
    if (!info) return;

    const totalCredits = cart.reduce((s, c) => s + c.soTC, 0);
    if (totalCredits + info.soTC > MAX_CREDITS) {
      alert(`Vượt quá giới hạn tối đa ${MAX_CREDITS} tín chỉ/học kỳ!`);
      return;
    }

    const today = new Date().toLocaleDateString("vi-VN");
    setCart((prev) => [
      ...prev,
      {
        maHP,
        tenLop: info.tenLop,
        ngayDangKy: today,
        ttDangKy: "Thành công",
        soTC: info.soTC,
      },
    ]);
  }

  function handleRemoveCourse(maHP: string) {
    setCart((prev) => prev.filter((c) => c.maHP !== maHP));
  }

  function handleSubmit() {
    const totalCredits = cart.reduce((s, c) => s + c.soTC, 0);
    alert(
      `Đăng ký thành công cho sinh viên PHẠM VĂN MINH (MSSV: 20210842).\nTổng số tín chỉ: ${totalCredits} TC.`
    );
  }

  return (
    <div className="max-w-350 mx-auto px-4 py-4 space-y-6">
      {/* ── Phần 1: Chương trình đào tạo & Tra cứu ── */}
      <CurriculumSection
        onAddCourse={handleAddCourse}
        selectedCodes={selectedCodes}
      />

      {/* ── Phần 2: Học phần đã chọn (Giỏ hàng) ── */}
      <RegistrationSection
        courses={cart}
        onRemove={handleRemoveCourse}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
