import type { StudentUser } from "@/app/types";

export const DEMO_CREDENTIALS = {
  username: "20210842",
  password: "hust2021",
} as const;

export const mockUsers: StudentUser[] = [
  {
    id: "usr-001",
    studentId: "20210842",
    username: DEMO_CREDENTIALS.username,
    email: "20210842@sis.hust.edu.vn",
    password: DEMO_CREDENTIALS.password,
    fullName: "PHẠM VĂN MINH",
    major: "Công nghệ Thông tin (Việt - Nhật)",
    majorCode: "IT-VJ",
    cohort: "K66",
    enrollmentYear: 2021,
    curriculumId: "ctdt-it-k66",
    status: "active",
    role: "student",
  },
];
