import type { StudentUser } from "@/app/types";

export const DEMO_CREDENTIALS = {
  username: "202400000",
  password: "hust2024",
} as const;

export const defaultStudentUser: StudentUser = {
  id: "usr-202400000",
  studentId: "202400000",
  username: DEMO_CREDENTIALS.username,
  email: "202400000@sis.hust.edu.vn",
  password: DEMO_CREDENTIALS.password,
  fullName: "NGUYỄN VĂN A",
  major: "Công nghệ thông tin - IT1",
  majorCode: "IT1",
  cohort: "K69",
  enrollmentYear: 2024,
  curriculumId: "ctdt-cntt-k69",
  status: "active",
  role: "student",
};

export const mockUsers: StudentUser[] = [defaultStudentUser];
