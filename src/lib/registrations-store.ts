import type { SelectedCourse } from "@/app/types";
import { mockCurricula } from "@/app/data";

const MAX_CREDITS = 24;

// In-memory state cho giỏ học phần của sinh viên mặc định (202400000 - K69)
let inMemoryRegistrations: SelectedCourse[] = [];

function findCourseInCurricula(courseCode: string) {
  for (const program of mockCurricula) {
    for (const group of program.groups) {
      for (const subGroup of group.subGroups) {
        const found = subGroup.courses.find((c) => c.courseCode === courseCode);
        if (found) {
          return { course: found, categoryCode: group.categoryCode };
        }
      }
    }
  }
  return null;
}

export function getRegistrationsStore(): SelectedCourse[] {
  return [...inMemoryRegistrations];
}

export function addRegistrationStore(courseCode: string): {
  success: boolean;
  message: string;
  course?: SelectedCourse;
  totalCredits?: number;
} {
  const code = courseCode.trim().toUpperCase();

  if (inMemoryRegistrations.some((c) => c.courseCode.toUpperCase() === code)) {
    return {
      success: false,
      message: `Học phần ${code} đã có trong danh sách đăng ký!`,
    };
  }

  const found = findCourseInCurricula(code);
  if (!found) {
    return {
      success: false,
      message: `Không tìm thấy mã học phần ${code} trong CTĐT!`,
    };
  }

  const { course } = found;
  const currentCredits = inMemoryRegistrations.reduce((sum, c) => sum + c.credits, 0);

  if (currentCredits + course.trainingCredits > MAX_CREDITS) {
    return {
      success: false,
      message: `Vượt quá giới hạn tối đa ${MAX_CREDITS} tín chỉ/học kỳ! (Hiện tại: ${currentCredits} TC, môn thêm: ${course.trainingCredits} TC)`,
    };
  }

  const today = new Date().toLocaleDateString("vi-VN");
  const grade = course.letterGrade || course.grade;
  let regType: SelectedCourse["registrationType"] = "NEW";
  if (grade === "F") {
    regType = "RETAKE";
  } else if (grade && grade !== "—") {
    regType = "IMPROVE";
  }

  const newCourse: SelectedCourse = {
    courseCode: course.courseCode,
    className: course.courseName,
    registeredDate: today,
    registrationStatus: "Đang chờ",
    credits: course.trainingCredits,
    registrationType: regType,
  };

  inMemoryRegistrations.push(newCourse);

  return {
    success: true,
    message: `Đã thêm thành công học phần ${course.courseCode} (${course.trainingCredits} TC)`,
    course: newCourse,
    totalCredits: currentCredits + course.trainingCredits,
  };
}

export function removeRegistrationStore(courseCode: string): {
  success: boolean;
  message: string;
  removedCourseCode?: string;
} {
  const code = courseCode.trim().toUpperCase();
  const exists = inMemoryRegistrations.some((c) => c.courseCode.toUpperCase() === code);

  if (!exists) {
    return {
      success: false,
      message: `Học phần ${code} không có trong danh sách đăng ký!`,
    };
  }

  inMemoryRegistrations = inMemoryRegistrations.filter(
    (c) => c.courseCode.toUpperCase() !== code
  );

  return {
    success: true,
    message: `Đã hủy học phần ${code} thành công!`,
    removedCourseCode: code,
  };
}

export function submitRegistrationStore(): {
  success: boolean;
  message: string;
  count: number;
  totalCredits: number;
} {
  if (inMemoryRegistrations.length === 0) {
    return {
      success: false,
      message: "Chưa có học phần nào trong danh sách đăng ký!",
      count: 0,
      totalCredits: 0,
    };
  }

  const totalCredits = inMemoryRegistrations.reduce((sum, c) => sum + c.credits, 0);

  // Đổi trạng thái toàn bộ sang "Thành công"
  inMemoryRegistrations = inMemoryRegistrations.map((c) => ({
    ...c,
    registrationStatus: "Thành công",
  }));

  return {
    success: true,
    message: "Gửi đăng ký học phần thành công!",
    count: inMemoryRegistrations.length,
    totalCredits,
  };
}

export function clearRegistrationStore(): void {
  inMemoryRegistrations = [];
}
