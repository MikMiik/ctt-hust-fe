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
    fullName: "NGUYỄN VĂN A",
    major: "Toán-Tin",
    majorCode: "MI01",
    cohort: "K69",
    enrollmentYear: 2021,
    curriculumId: "ctdt-toan-tin-k69",
    status: "active",
    role: "student",
  },
];
