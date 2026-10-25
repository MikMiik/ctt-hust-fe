export type CourseAddStatus = "add" | "added" | "locked";

export type SemesterTerm = "both" | "k1_only" | "k2_only";

export interface CurriculumCourse {
  indexNumber: number;
  courseCode: string;
  courseName: string;
  prerequisiteCode?: string;
  semesterTerm: SemesterTerm;
  isRequired: boolean;
  trainingCredits: number;
  tuitionCredits: number;
  letterGrade?: string;
  addStatus: CourseAddStatus;
  isHighlighted?: boolean;
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
  courseCount: number;
  totalCredits: number;
  passedCredits: number;
  subGroups: CurriculumSubGroup[];
}
