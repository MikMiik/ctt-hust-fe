import type { CurriculumProgram } from "@/app/types";
import {
  mockCurriculumGroupsActual,
  mockCurriculumGroupsFreshman,
  mockCurriculumGroupsFallback,
} from "./curriculum.data";

/**
 * Bản dự phòng (Fallback ngầm) dùng làm phao cứu sinh chống sập web và làm gốc khôi phục.
 * TUYỆT ĐỐI KHÔNG nằm trong danh sách dropdown hiển thị cho người dùng.
 */
export const fallbackCurriculumProgram: CurriculumProgram = {
  id: "ctdt-cntt-fallback",
  name: "Cử nhân CNTT K69 (Dữ liệu gốc)",
  groups: mockCurriculumGroupsFallback,
};

/**
 * Danh sách 2 chế độ hiển thị trên giao diện người dùng:
 * 1. "Cử nhân CNTT K69" (Tiến độ thực tế sinh viên đang học)
 * 2. "Cử nhân CNTT K69 (Mặc định)" (Khung chuẩn tân sinh viên 0 TC)
 */
export const mockCurricula: CurriculumProgram[] = [
  {
    id: "ctdt-cntt-k69",
    name: "Cử nhân CNTT K69",
    groups: mockCurriculumGroupsActual,
  },
  {
    id: "ctdt-cntt-freshman",
    name: "Cử nhân CNTT K69 (Mặc định)",
    groups: mockCurriculumGroupsFreshman,
  },
];
