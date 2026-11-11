export type RegistrationStatus = "Đang chờ" | "Thành công" | "Đang xử lý" | "Lỗi";

export type RegistrationType =
  | "NEW"
  | "IMPROVE"
  | "RETAKE"
  | "Học mới"
  | "Học cải thiện"
  | "Học lại";

export interface SelectedCourse {
  courseCode: string;
  className: string;
  registeredDate: string;
  registrationStatus: RegistrationStatus;
  credits: number;
  registrationType?: RegistrationType;
}
