"use client";

import { useState } from "react";
import CurriculumFilters, { type DisplayMode } from "./CurriculumFilters";
import CurriculumTable from "./CurriculumTable";
import type { CurriculumGroup } from "./types";

// ─── Dữ liệu tĩnh mẫu (mirror index.html) ───────────────────────────────────

const SAMPLE_GROUPS: CurriculumGroup[] = [
  {
    maLoaiHP: "210",
    count: 6,
    tongTC: 13,
    tongDat: 2,
    subGroups: [
      {
        loaiHPLabel: "LÝ LUẬN CHÍNH TRỊ + PHÁP LUẬT ĐẠI CƯƠNG",
        count: 6,
        tongTC: 13,
        tongDat: 2,
        courses: [
          {
            stt: 1,
            maHP: "SSH1110",
            tenHP: "Triết học Mác - Lênin",
            kyMoMon: "k1_only",
            batBuoc: true,
            tcDT: 3,
            tcHoc: 3,
            diemChu: "B",
            addStatus: "added",
            highlight: false,
          },
          {
            stt: 2,
            maHP: "SSH1121",
            tenHP: "Kinh tế chính trị Mác - Lênin",
            tienQuyet: "SSH1110",
            kyMoMon: "k2_only",
            batBuoc: true,
            tcDT: 2,
            tcHoc: 2,
            diemChu: "D+",
            addStatus: "locked",
            highlight: true,
          },
          {
            stt: 3,
            maHP: "SSH1131",
            tenHP: "Chủ nghĩa xã hội khoa học",
            tienQuyet: "SSH1121",
            kyMoMon: "both",
            batBuoc: true,
            tcDT: 2,
            tcHoc: 2,
            diemChu: "F",
            addStatus: "add",
            highlight: true,
          },
          {
            stt: 4,
            maHP: "SSH1170",
            tenHP: "Lịch sử Đảng Cộng sản Việt Nam",
            kyMoMon: "both",
            batBuoc: true,
            tcDT: 2,
            tcHoc: 2,
            addStatus: "add",
            highlight: false,
          },
          {
            stt: 5,
            maHP: "SSH1180",
            tenHP: "Tư tưởng Hồ Chí Minh",
            kyMoMon: "k2_only",
            batBuoc: true,
            tcDT: 2,
            tcHoc: 2,
            addStatus: "locked",
            highlight: false,
          },
          {
            stt: 6,
            maHP: "LAW1001",
            tenHP: "Pháp luật đại cương",
            kyMoMon: "k1_only",
            batBuoc: true,
            tcDT: 2,
            tcHoc: 2,
            diemChu: "C+",
            addStatus: "add",
            highlight: false,
          },
        ],
      },
    ],
  },
  {
    maLoaiHP: "310",
    count: 5,
    tongTC: 17,
    tongDat: 7,
    subGroups: [
      {
        loaiHPLabel: "TOÁN VÀ KHOA HỌC CƠ BẢN",
        count: 5,
        tongTC: 17,
        tongDat: 7,
        courses: [
          {
            stt: 7,
            maHP: "MAT1091",
            tenHP: "Giải tích I",
            kyMoMon: "k1_only",
            batBuoc: true,
            tcDT: 4,
            tcHoc: 4,
            diemChu: "D",
            addStatus: "add",
            highlight: true,
          },
          {
            stt: 8,
            maHP: "MAT1092",
            tenHP: "Giải tích II",
            tienQuyet: "MAT1091",
            kyMoMon: "k2_only",
            batBuoc: true,
            tcDT: 4,
            tcHoc: 4,
            diemChu: "F",
            addStatus: "added",
            highlight: true,
          },
          {
            stt: 9,
            maHP: "PHY1100",
            tenHP: "Vật lý đại cương I",
            kyMoMon: "k1_only",
            batBuoc: true,
            tcDT: 3,
            tcHoc: 3,
            diemChu: "D",
            addStatus: "add",
            highlight: true,
          },
          {
            stt: 10,
            maHP: "PHY1102",
            tenHP: "Vật lý đại cương II",
            tienQuyet: "PHY1100",
            kyMoMon: "k2_only",
            batBuoc: true,
            tcDT: 3,
            tcHoc: 3,
            addStatus: "added",
            highlight: false,
          },
          {
            stt: 11,
            maHP: "INT3110",
            tenHP: "Trí tuệ nhân tạo",
            tienQuyet: "INT2204",
            kyMoMon: "k2_only",
            batBuoc: true,
            tcDT: 3,
            tcHoc: 3,
            addStatus: "locked",
            highlight: false,
          },
        ],
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface CurriculumSectionProps {
  /** Callback khi người dùng bấm [+] để thêm môn vào giỏ */
  onAddCourse: (maHP: string) => void;
  /** Set các mã HP đã có trong giỏ (để sync trạng thái "Đã thêm") */
  selectedCodes: Set<string>;
}

export default function CurriculumSection({
  onAddCourse,
  selectedCodes,
}: CurriculumSectionProps) {
  const [searchValue, setSearchValue] = useState("");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("default");

  // Sync addStatus với giỏ hàng hiện tại
  const syncedGroups: CurriculumGroup[] = SAMPLE_GROUPS.map((g) => ({
    ...g,
    subGroups: g.subGroups.map((sg) => ({
      ...sg,
      courses: sg.courses.map((c) => ({
        ...c,
        addStatus:
          c.addStatus === "locked"
            ? "locked"
            : selectedCodes.has(c.maHP)
            ? "added"
            : "add",
      })),
    })),
  }));

  return (
    <section className="bg-white border border-gray-300">
      <CurriculumFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
      />
      <CurriculumTable groups={syncedGroups} onAddCourse={onAddCourse} />
    </section>
  );
}
