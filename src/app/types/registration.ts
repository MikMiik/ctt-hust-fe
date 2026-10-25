export type RegistrationStatus = "Thành công" | "Đang xử lý" | "Lỗi";

export interface SelectedCourse {
  courseCode: string;
  className: string;
  registeredDate: string;
  registrationStatus: RegistrationStatus;
  credits: number;
}
