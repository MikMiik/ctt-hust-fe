"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import CurriculumSection from "@/components/home/CurriculumSection";
import GraduationSection from "@/components/home/GraduationSection";
import RegistrationSection from "@/components/home/RegistrationSection";
import {
  mockCurricula,
  fallbackCurriculumProgram,
  getGraduationForCurriculum,
} from "@/app/data";
import type { CourseAddStatus, SelectedCourse, RegistrationType } from "@/app/types";

const MAX_CREDITS = 24;

export default function HomePage() {
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>("ctdt-cntt-k69");
  const [cart, setCart] = useState<SelectedCourse[]>([]);

  const currentProgram = useMemo(() => {
    return (
      mockCurricula.find((p) => p.id === selectedCurriculumId) ||
      fallbackCurriculumProgram
    );
  }, [selectedCurriculumId]);

  const courseLookupMap = useMemo(() => {
    const map = new Map<
      string,
      {
        className: string;
        credits: number;
        letterGrade?: string;
        addStatus: CourseAddStatus;
        prerequisiteCode?: string;
      }
    >();
    currentProgram.groups.forEach((group) => {
      group.subGroups.forEach((subGroup) => {
        subGroup.courses.forEach((course) => {
          map.set(course.courseCode, {
            className: course.courseName,
            credits: course.trainingCredits,
            letterGrade: course.letterGrade || course.grade || undefined,
            addStatus: course.addStatus,
            prerequisiteCode: course.prerequisiteCode,
          });
        });
      });
    });
    return map;
  }, [currentProgram]);

  const selectedCodes = useMemo(
    () => new Set(cart.map((c) => c.courseCode)),
    [cart],
  );

  function handleAddCourse(courseCode: string) {
    // Nếu môn đã có trong giỏ, cho phép click để xóa khỏi giỏ
    if (selectedCodes.has(courseCode)) {
      handleRemoveCourse(courseCode);
      return;
    }

    const info = courseLookupMap.get(courseCode);
    if (!info) return;

    if (info.addStatus === "locked") {
      toast.error(
        `Chưa đủ điều kiện tiên quyết${info.prerequisiteCode ? `: ${info.prerequisiteCode}` : ""}.`
      );
      return;
    }

    const totalCredits = cart.reduce((sum, c) => sum + c.credits, 0);
    if (totalCredits + info.credits > MAX_CREDITS) {
      toast.error(`Vượt quá giới hạn tối đa ${MAX_CREDITS} tín chỉ/học kỳ!`);
      return;
    }

    let regType: RegistrationType = "Học mới";
    const grade = info.letterGrade;
    if (grade === "F") {
      regType = "Học lại";
    } else if (grade && grade !== "—") {
      regType = "Học cải thiện";
    } else {
      regType = "Học mới";
    }

    const today = new Date().toLocaleDateString("vi-VN");
    setCart((prev) => [
      ...prev,
      {
        courseCode,
        className: info.className,
        registeredDate: today,
        registrationStatus: "Đang chờ",
        credits: info.credits,
        registrationType: regType,
      },
    ]);

    const typeDesc =
      regType === "Học lại"
        ? " [Học lại]"
        : regType === "Học cải thiện"
        ? " [Học cải thiện]"
        : "";

    toast.success(
      `Đã thêm học phần ${courseCode}${typeDesc} (${info.credits} TC) vào danh sách chọn`
    );
  }

  function handleRemoveCourse(courseCode: string) {
    setCart((prev) => prev.filter((c) => c.courseCode !== courseCode));
    toast.info(`Đã gỡ học phần ${courseCode} khỏi danh sách chọn`);
  }

  function handleSubmit() {
    if (cart.length === 0) {
      toast.warning("Chưa có học phần nào trong danh sách đăng ký!");
      return;
    }

    const pendingCount = cart.filter((c) => c.registrationStatus === "Đang chờ").length;
    if (pendingCount === 0) {
      toast.info("Tất cả học phần đã được gửi đăng ký thành công trước đó!");
      return;
    }

    // Chuyển toàn bộ các học phần "Đang chờ" thành "Thành công"
    setCart((prev) =>
      prev.map((c) => ({
        ...c,
        registrationStatus: "Thành công",
      }))
    );

    const totalCredits = cart.reduce((sum, c) => sum + c.credits, 0);

    toast.success("Gửi đăng ký học phần thành công!", {
      description: `Đã xác nhận đăng ký thành công ${cart.length} học phần (${totalCredits} TC).`,
    });
  }

  function handleCurriculumChange(newId: string) {
    if (newId === selectedCurriculumId) return;
    setSelectedCurriculumId(newId);
    setCart([]);
    const targetProgram = mockCurricula.find((p) => p.id === newId);
    if (targetProgram) {
      toast.info(`Đã chuyển sang chế độ: ${targetProgram.name}`);
    }
  }

  function handleReset() {
    setCart([]);
    toast.success("Đã khôi phục dữ liệu ban đầu và dọn trống giỏ học phần!");
  }

  useEffect(() => {
    function onResetEvent() {
      handleReset();
    }
    window.addEventListener("ctt-reset-defaults", onResetEvent);
    return () => window.removeEventListener("ctt-reset-defaults", onResetEvent);
  }, []);

  const courseCategoryMap = useMemo(() => {
    const map = new Map<string, string>();
    currentProgram.groups.forEach((group) => {
      group.subGroups.forEach((subGroup) => {
        subGroup.courses.forEach((course) => {
          map.set(course.courseCode, group.categoryCode);
        });
      });
    });
    return map;
  }, [currentProgram]);

  const graduationRequirements = useMemo(() => {
    return getGraduationForCurriculum(selectedCurriculumId);
  }, [selectedCurriculumId]);

  const addedCreditsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    cart.forEach((item) => {
      // Quy chế Đào tạo Bách Khoa:
      // - Học cải thiện: Đã tích lũy trước đó, chỉ để nâng điểm CPA -> +0 TC vào tiến độ tốt nghiệp.
      // - Học lại & Học mới: Mới được cộng thêm tín chỉ vào tiến độ tích lũy dự kiến.
      if (item.registrationType === "Học cải thiện") {
        return;
      }
      const categoryCode = courseCategoryMap.get(item.courseCode);
      if (categoryCode) {
        // Với học phần điều kiện 0 TC (như Giáo dục thể chất nhóm 220), tính theo 1 HP
        const creditValue = item.credits > 0 ? item.credits : 1;
        counts[categoryCode] = (counts[categoryCode] || 0) + creditValue;
      }
    });
    return counts;
  }, [cart, courseCategoryMap]);

  return (
    <div className="max-w-350 mx-auto px-4 py-4 space-y-6">
      {/* ── Section: Curriculum (Part 1) ── */}
      <CurriculumSection
        selectedCurriculumId={selectedCurriculumId}
        onCurriculumChange={handleCurriculumChange}
        onAddCourse={handleAddCourse}
        selectedCodes={selectedCodes}
        onReset={handleReset}
      />

      {/* ── Section: Graduation Progress (Middle Section) ── */}
      <GraduationSection
        requirements={graduationRequirements}
        addedCreditsByCategory={addedCreditsByCategory}
      />

      {/* ── Section: Registration Cart (Part 2) ── */}
      <RegistrationSection
        courses={cart}
        onRemove={handleRemoveCourse}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
