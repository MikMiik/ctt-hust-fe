export type CourseAddStatus = "add" | "added" | "locked";

export type OpenTerm = "Mở cả 2 kỳ" | "Chỉ mở kỳ 1" | "Chỉ mở kỳ 2";

export interface CurriculumCourse {
  indexNumber: number;

  // ── Các trường chuẩn theo yêu cầu Backend Developer ──
  id: string; // MÃ HP
  name: string; // TÊN HỌC PHẦN
  openTerms: OpenTerm; // KỲ MỞ MÔN
  semester: number | null; // KỲ ĐỀ XUẤT
  isRequired: boolean; // BẮT BUỘC (true / false)
  credits: number; // TC ĐT
  studyCredits: number | null; // TC HỌC (null nếu chưa học)
  grade: string | null; // ĐIỂM (null nếu chưa học)
  prerequisites: string[]; // MÔN TIÊN QUYẾT (danh sách mã HP)

  // ── Các trường map tương thích 100% với Frontend hiện tại ──
  courseCode: string;
  courseName: string;
  prerequisiteCode?: string;
  semesterTerm: string;
  recommendedSemester?: number;
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

export interface CurriculumProgram {
  id: string;
  name: string;
  groups: CurriculumGroup[];
}
