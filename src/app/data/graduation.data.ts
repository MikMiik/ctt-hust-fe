import type { GraduationRequirementGroup } from "@/app/types";

export const mockGraduationRequirements: GraduationRequirementGroup[] = [
  {
    id: "llct",
    categoryCode: "210",
    name: "Lý luận chính trị & Pháp luật",
    shortName: "LLCT",
    requiredCredits: 13,
    completedCredits: 7,
    missingCourses: [
      {
        courseCode: "SSH1131",
        courseName: "Chủ nghĩa xã hội khoa học",
        credits: 2,
        isRequired: true,
      },
      {
        courseCode: "SSH1140",
        courseName: "Lịch sử Đảng Cộng sản Việt Nam",
        credits: 2,
        isRequired: true,
      },
      {
        courseCode: "SSH1151",
        courseName: "Tư tưởng Hồ Chí Minh",
        credits: 2,
        isRequired: true,
      },
    ],
  },
  {
    id: "tkhcb",
    categoryCode: "220",
    name: "Toán & Khoa học cơ bản",
    shortName: "TKHCB",
    requiredCredits: 24,
    completedCredits: 11,
    missingCourses: [
      {
        courseCode: "MAT1092",
        courseName: "Giải tích II",
        credits: 4,
        isRequired: true,
      },
      {
        courseCode: "MAT1093",
        courseName: "Giải tích III",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "PHY1101",
        courseName: "Vật lý đại cương II",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "MI2020",
        courseName: "Xác suất thống kê",
        credits: 3,
        isRequired: true,
      },
    ],
  },
  {
    id: "cscln",
    categoryCode: "310",
    name: "Cơ sở cốt lõi ngành CNTT",
    shortName: "CSCLN",
    requiredCredits: 25,
    completedCredits: 9,
    missingCourses: [
      {
        courseCode: "IT3011",
        courseName: "Cấu trúc dữ liệu và Giải thuật",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT3020",
        courseName: "Toán rời rạc",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT3030",
        courseName: "Kiến trúc máy tính",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT3070",
        courseName: "Nguyên lý Hệ điều hành",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT3080",
        courseName: "Mạng máy tính",
        credits: 4,
        isRequired: true,
      },
    ],
  },
  {
    id: "ktbt",
    categoryCode: "320",
    name: "Kiến thức Chuyên ngành & Tự chọn",
    shortName: "CNTC",
    requiredCredits: 19,
    completedCredits: 4,
    missingCourses: [
      {
        courseCode: "IT3090",
        courseName: "Cơ sở dữ liệu",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT3120",
        courseName: "Công nghệ phần mềm",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT4440",
        courseName: "Trí tuệ nhân tạo",
        credits: 3,
        isRequired: false,
      },
      {
        courseCode: "IT4490",
        courseName: "Phát triển ứng dụng Web hiện đại",
        credits: 3,
        isRequired: false,
      },
    ],
  },
];
