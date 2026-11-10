import {
  mockUsers,
  mockCurriculumGroups,
  mockGraduationRequirements,
} from "@/app/data";
import {
  getRegistrationsStore,
  addRegistrationStore,
  removeRegistrationStore,
  submitRegistrationStore,
} from "@/lib/registrations-store";
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
  registrations: Record<string, SelectedCourse[]>;
}

// Low-level in-memory database mock (thay thế I/O đĩa data/db.json để phản hồi tức thì 0ms)
export async function getDb(): Promise<DatabaseSchema> {
  return {
    users: mockUsers,
    curriculumGroups: mockCurriculumGroups,
    graduationRequirements: mockGraduationRequirements,
    registrations: {
      "202400000": getRegistrationsStore(),
    },
  };
}

export async function saveDb(_data: DatabaseSchema): Promise<void> {
  // In-memory bypass: không cần ghi đĩa trong môi trường demo UI/UX
}

// User Services - Mặc định cho sinh viên duy nhất Nguyễn Văn A (202400000)
export async function getUserByUsername(username: string): Promise<StudentUser | null> {
  return (
    mockUsers.find((u) => u.username === username || u.studentId === username) ||
    mockUsers[0] ||
    null
  );
}

export async function getUserById(id: string): Promise<StudentUser | null> {
  return mockUsers.find((u) => u.id === id) || mockUsers[0] || null;
}

// Curriculum Services
export async function getCurriculum(): Promise<CurriculumGroup[]> {
  return mockCurriculumGroups;
}

export async function findCourseByCode(courseCode: string) {
  const code = courseCode.trim().toUpperCase();
  for (const group of mockCurriculumGroups) {
    for (const subGroup of group.subGroups) {
      const course = subGroup.courses.find((c) => c.courseCode.toUpperCase() === code);
      if (course) {
        return { course, categoryCode: group.categoryCode };
      }
    }
  }
  return null;
}

// Graduation Progress Services
export async function getGraduationRequirements(): Promise<GraduationRequirementGroup[]> {
  return mockGraduationRequirements;
}

// Registration Cart Services (Sử dụng registrations-store in-memory)
export async function getRegistrations(_studentId?: string): Promise<SelectedCourse[]> {
  return getRegistrationsStore();
}

export async function addRegistration(
  _studentId: string,
  courseCode: string
): Promise<{ success: boolean; message: string; course?: SelectedCourse; totalCredits?: number }> {
  return addRegistrationStore(courseCode);
}

export async function removeRegistration(
  _studentId: string,
  courseCode: string
): Promise<{ success: boolean; message: string; removedCourseCode?: string }> {
  return removeRegistrationStore(courseCode);
}

export async function submitRegistration(
  _studentId?: string
): Promise<{ success: boolean; message: string; count?: number; totalCredits?: number }> {
  return submitRegistrationStore();
}
