import type { CurriculumProgram } from "@/app/types";
import { mockCurriculumGroups } from "./curriculum.data";

export const mockCurricula: CurriculumProgram[] = [
  {
    id: "ctdt-cntt-k69",
    name: "Cử nhân Công nghệ thông tin — K69",
    groups: mockCurriculumGroups,
  },
  {
    id: "ctdt-cntt-k66",
    name: "Cử nhân Công nghệ thông tin — K69 (Mặc định)",
    groups: mockCurriculumGroups,
  },
  {
    id: "ctdt-toan-tin-k69",
    name: "Cử nhân Công nghệ thông tin — K69 (Dự phòng)",
    groups: mockCurriculumGroups,
  },
];
