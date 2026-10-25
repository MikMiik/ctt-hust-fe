import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      studentId: string;
      fullName: string;
      major: string;
      majorCode: string;
      cohort: string;
      curriculumId: string;
      role: "student" | "admin";
    } & DefaultSession["user"];
  }

  interface User {
    studentId: string;
    fullName: string;
    major: string;
    majorCode: string;
    cohort: string;
    curriculumId: string;
    role: "student" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    studentId: string;
    fullName: string;
    major: string;
    majorCode: string;
    cohort: string;
    curriculumId: string;
    role: "student" | "admin";
  }
}
