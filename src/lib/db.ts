import fs from "fs/promises";
import path from "path";
import {
  mockUsers,
  mockCurriculumGroups,
  mockGraduationRequirements,
  mockSelectedCourses,
} from "@/app/data";
import type {
  StudentUser,
  CurriculumGroup,
  GraduationRequirementGroup,
  SelectedCourse,
} from "@/app/types";

export interface DatabaseSchema {
  users: StudentUser[];
  curriculumGroups: CurriculumGroup[];
  graduationRequirements: GraduationRequirementGroup[];
  registrations: Record<string, SelectedCourse[]>; // studentId -> courses
}

const DB_PATH = path.join(process.cwd(), "data", "db.json");

let memoryCache: DatabaseSchema | null = null;

// Khởi tạo Database ban đầu nếu chưa có file
async function initDatabase(): Promise<DatabaseSchema> {
  const defaultData: DatabaseSchema = {
    users: mockUsers,
    curriculumGroups: mockCurriculumGroups,
    graduationRequirements: mockGraduationRequirements,
    registrations: {
      "20210842": mockSelectedCourses,
    },
  };

  try {
    const dir = path.dirname(DB_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
  } catch (error) {
    console.error("Lỗi khi tạo file db.json:", error);
  }

  return defaultData;
}

export async function getDb(): Promise<DatabaseSchema> {
  if (memoryCache) return memoryCache;

  try {
    const content = await fs.readFile(DB_PATH, "utf-8");
    memoryCache = JSON.parse(content) as DatabaseSchema;
    return memoryCache;
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      memoryCache = await initDatabase();
      return memoryCache;
    }
    console.error("Lỗi khi đọc database:", error);
    memoryCache = await initDatabase();
    return memoryCache;
  }
}

export async function saveDb(data: DatabaseSchema): Promise<void> {
  memoryCache = data;
  try {
    const dir = path.dirname(DB_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Lỗi khi ghi database:", error);
  }
}

// User Services
export async function getUserByUsername(username: string): Promise<StudentUser | null> {
  const db = await getDb();
  return db.users.find((u) => u.username === username && u.status === "active") || null;
}

export async function getUserById(id: string): Promise<StudentUser | null> {
  const db = await getDb();
  return db.users.find((u) => u.id === id) || null;
}

// Curriculum Services
export async function getCurriculum(): Promise<CurriculumGroup[]> {
  const db = await getDb();
  return db.curriculumGroups;
}

export async function findCourseByCode(courseCode: string) {
  const db = await getDb();
  for (const group of db.curriculumGroups) {
    for (const subGroup of group.subGroups) {
      const course = subGroup.courses.find((c) => c.courseCode === courseCode);
      if (course) {
        return { course, categoryCode: group.categoryCode };
      }
    }
  }
  return null;
}

// Graduation Progress Services
export async function getGraduationRequirements(): Promise<GraduationRequirementGroup[]> {
  const db = await getDb();
  return db.graduationRequirements;
}

// Registration Cart Services
export async function getRegistrations(studentId: string): Promise<SelectedCourse[]> {
  const db = await getDb();
  return db.registrations[studentId] || [];
}

export async function addRegistration(
  studentId: string,
  courseCode: string
): Promise<{ success: boolean; message: string; course?: SelectedCourse; totalCredits?: number }> {
  const db = await getDb();
  const currentList = db.registrations[studentId] || [];

  // 1. Kiểm tra xem môn đã được đăng ký chưa
  if (currentList.some((c) => c.courseCode === courseCode)) {
    return { success: false, message: `Học phần ${courseCode} đã có trong danh sách đăng ký!` };
  }

  // 2. Tìm thông tin học phần trong CSDL
  const found = await findCourseByCode(courseCode);
  if (!found) {
    return { success: false, message: `Không tìm thấy mã học phần ${courseCode} trong CTĐT!` };
  }

  const { course } = found;

  // 3. Kiểm tra giới hạn tín chỉ tối đa (24 TC)
  const currentCredits = currentList.reduce((sum, c) => sum + c.credits, 0);
  const MAX_CREDITS = 24;
  if (currentCredits + course.trainingCredits > MAX_CREDITS) {
    return {
      success: false,
      message: `Vượt quá giới hạn tối đa ${MAX_CREDITS} tín chỉ/học kỳ! (Hiện tại: ${currentCredits} TC, môn thêm: ${course.trainingCredits} TC)`,
    };
  }

  // 4. Thêm vào danh sách
  const today = new Date().toLocaleDateString("vi-VN");
  const newCourse: SelectedCourse = {
    courseCode: course.courseCode,
    className: course.courseName,
    registeredDate: today,
    registrationStatus: "Thành công",
    credits: course.trainingCredits,
  };

  db.registrations[studentId] = [...currentList, newCourse];
  await saveDb(db);

  return {
    success: true,
    message: `Đã thêm thành công học phần ${course.courseCode} (${course.trainingCredits} TC)`,
    course: newCourse,
    totalCredits: currentCredits + course.trainingCredits,
  };
}

export async function removeRegistration(
  studentId: string,
  courseCode: string
): Promise<{ success: boolean; message: string; removedCourseCode?: string }> {
  const db = await getDb();
  const currentList = db.registrations[studentId] || [];

  const exists = currentList.some((c) => c.courseCode === courseCode);
  if (!exists) {
    return { success: false, message: `Học phần ${courseCode} không có trong danh sách đăng ký!` };
  }

  db.registrations[studentId] = currentList.filter((c) => c.courseCode !== courseCode);
  await saveDb(db);

  return {
    success: true,
    message: `Đã hủy học phần ${courseCode} thành công!`,
    removedCourseCode: courseCode,
  };
}

export async function submitRegistration(
  studentId: string
): Promise<{ success: boolean; message: string; count?: number; totalCredits?: number }> {
  const db = await getDb();
  const currentList = db.registrations[studentId] || [];

  if (currentList.length === 0) {
    return { success: false, message: "Chưa có học phần nào trong danh sách đăng ký!" };
  }

  const totalCredits = currentList.reduce((sum, c) => sum + c.credits, 0);

  // Đánh dấu trạng thái chính thức nộp
  db.registrations[studentId] = currentList.map((c) => ({
    ...c,
    registrationStatus: "Thành công",
  }));

  await saveDb(db);

  return {
    success: true,
    message: "Gửi đăng ký học phần thành công!",
    count: currentList.length,
    totalCredits,
  };
}
