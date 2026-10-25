"use client";

import { useMemo, useState } from "react";
import CurriculumSection from "@/components/home/CurriculumSection";
import GraduationSection from "@/components/home/GraduationSection";
import RegistrationSection from "@/components/home/RegistrationSection";
import { mockSelectedCourses, mockCurriculumGroups, mockStudent } from "@/app/data";
import type { SelectedCourse } from "@/app/types";

const MAX_CREDITS = 24;

export default function HomePage() {
  const [cart, setCart] = useState<SelectedCourse[]>(mockSelectedCourses);

  const courseLookupMap = useMemo(() => {
    const map = new Map<string, { className: string; credits: number }>();
    mockCurriculumGroups.forEach((group) => {
      group.subGroups.forEach((subGroup) => {
        subGroup.courses.forEach((course) => {
          map.set(course.courseCode, {
            className: course.courseName,
            credits: course.trainingCredits,
          });
        });
      });
    });
    return map;
  }, []);

  const selectedCodes = useMemo(() => new Set(cart.map((c) => c.courseCode)), [cart]);

  function handleAddCourse(courseCode: string) {
    if (selectedCodes.has(courseCode)) {
      alert(`Học phần ${courseCode} đã có trong danh sách đăng ký!`);
      return;
    }

    const info = courseLookupMap.get(courseCode);
    if (!info) return;

    const totalCredits = cart.reduce((sum, c) => sum + c.credits, 0);
    if (totalCredits + info.credits > MAX_CREDITS) {
      alert(`Vượt quá giới hạn tối đa ${MAX_CREDITS} tín chỉ/học kỳ!`);
      return;
    }

    const today = new Date().toLocaleDateString("vi-VN");
    setCart((prev) => [
      ...prev,
      {
        courseCode,
        className: info.className,
        registeredDate: today,
        registrationStatus: "Thành công",
        credits: info.credits,
      },
    ]);
  }

  function handleRemoveCourse(courseCode: string) {
    setCart((prev) => prev.filter((c) => c.courseCode !== courseCode));
  }

  function handleSubmit() {
    const totalCredits = cart.reduce((sum, c) => sum + c.credits, 0);
    alert(
      `Đăng ký thành công cho sinh viên ${mockStudent.fullName} (MSSV: ${mockStudent.studentId}).\nTổng số tín chỉ: ${totalCredits} TC.`
    );
  }

  const courseCategoryMap = useMemo(() => {
    const map = new Map<string, string>();
    mockCurriculumGroups.forEach((group) => {
      group.subGroups.forEach((subGroup) => {
        subGroup.courses.forEach((course) => {
          map.set(course.courseCode, group.categoryCode);
        });
      });
    });
    return map;
  }, []);

  const addedCreditsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    cart.forEach((item) => {
      const categoryCode = courseCategoryMap.get(item.courseCode);
      if (categoryCode) {
        counts[categoryCode] = (counts[categoryCode] || 0) + item.credits;
      }
    });
    return counts;
  }, [cart, courseCategoryMap]);

  return (
    <div className="max-w-350 mx-auto px-4 py-4 space-y-6">
      {/* ── Section: Curriculum (Part 1) ── */}
      <CurriculumSection
        onAddCourse={handleAddCourse}
        selectedCodes={selectedCodes}
      />

      {/* ── Section: Graduation Progress (Middle Section) ── */}
      <GraduationSection addedCreditsByCategory={addedCreditsByCategory} />

      {/* ── Section: Registration Cart (Part 2) ── */}
      <RegistrationSection
        courses={cart}
        onRemove={handleRemoveCourse}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
