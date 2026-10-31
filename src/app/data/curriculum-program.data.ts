import type { CurriculumProgram } from "@/app/types";
import {
  mockCurriculumGroups,
  mockCsCurriculumGroups,
} from "./curriculum.data";

/**
 * Danh mục Chương trình Đào tạo (Curriculum Programs)
 * Mỗi CTĐT liên kết tới danh sách các nhóm học phần tương ứng.
 */
export const mockCurricula: CurriculumProgram[] = [
  {
    id: "ctdt-it-k66",
    name: "Công nghệ Thông tin (Việt - Nhật) — K66",
    groups: mockCurriculumGroups,
  },
  {
    id: "ctdt-cs-k65",
    name: "Khoa học Máy tính — K65",
    groups: mockCsCurriculumGroups,
  },
];

