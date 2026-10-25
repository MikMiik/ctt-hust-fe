export interface StudentUser {
  id: string;
  studentId: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  major: string;
  majorCode: string;
  cohort: string;
  enrollmentYear: number;
  curriculumId: string;
  status: "active" | "inactive" | "graduated" | "suspended";
  role: "student" | "admin";
}
