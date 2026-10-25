export type CourseAddStatus = "add" | "added" | "locked";

export type SemesterTerm = string;

export interface CurriculumCourse {
  indexNumber: number;
  courseCode: string;
  courseName: string;
  prerequisiteCode?: string;
  semesterTerm: string;
  recommendedSemester?: number;
  isRequired: boolean;
  trainingCredits: number;
  tuitionCredits: number;
  letterGrade?: string;
  addStatus: CourseAddStatus;
}

export interface CurriculumSubGroup {
  groupLabel: string;
  courseCount: number;
  totalCredits: number;
  passedCredits: number;
  courses: CurriculumCourse[];
}

export interface CurriculumGroup {
  categoryCode: string;
  categoryName?: string;
  courseCount: number;
  totalCredits: number;
  passedCredits: number;
  subGroups: CurriculumSubGroup[];
}
