export interface GraduationMissingCourse {
  courseCode: string;
  courseName: string;
  credits: number;
  isRequired: boolean;
}

export interface GraduationRequirementGroup {
  id: string;
  categoryCode: string;
  name: string;
  shortName: string;
  requiredCredits: number;
  completedCredits: number;
  missingCourses?: GraduationMissingCourse[];
}
