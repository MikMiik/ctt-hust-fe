// ─── Curriculum Table Types ───────────────────────────────────────────────

/** Trạng thái nút THÊM */
export type AddStatus = "add" | "added" | "locked";

/** Kỳ mở môn */
export type SemesterOpen = "both" | "k1_only" | "k2_only";

/** Một môn học trong CTĐT */
export interface CurriculumCourse {
  stt: number;
  maHP: string;
  tenHP: string;
  /** Môn tiên quyết, nếu có (VD: "SSH1110") */
  tienQuyet?: string;
  kyMoMon: SemesterOpen;
  batBuoc: boolean;
  tcDT: number;
  tcHoc: number;
  /** Điểm chữ cũ nếu có (VD: "B", "D+", "F"). undefined = chưa học. */
  diemChu?: string;
  addStatus: AddStatus;
  /** Mã HP được hiển thị màu đỏ (môn đang nợ / cần cải thiện) */
  highlight?: boolean;
}

/** Nhóm con (LOẠI HP) bên trong Mã loại HP */
export interface CurriculumSubGroup {
  loaiHPLabel: string;
  count: number;
  tongTC: number;
  tongDat: number;
  courses: CurriculumCourse[];
}

/** Nhóm cấp 1 (MÃ LOẠI HP) */
export interface CurriculumGroup {
  maLoaiHP: string;
  count: number;
  tongTC: number;
  tongDat: number;
  subGroups: CurriculumSubGroup[];
}

// ─── Selected Courses (Giỏ hàng) Types ───────────────────────────────────────

/** Trạng thái đăng ký */
export type RegistrationStatus = "Thành công" | "Đang xử lý" | "Lỗi";

/** Một học phần đã chọn */
export interface SelectedCourse {
  maHP: string;
  tenLop: string;
  ngayDangKy: string;
  ttDangKy: RegistrationStatus;
  soTC: number;
}
