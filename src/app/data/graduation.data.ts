import type { GraduationRequirementGroup } from "@/app/types";
import { getActiveScenario, type ScenarioPreset } from "@/lib/scenario";

export const mockGraduationNormal: GraduationRequirementGroup[] = [
  {
    id: "llct",
    categoryCode: "210",
    name: "Lý luận chính trị + Pháp luật đại cương",
    shortName: "LLCT",
    requiredCredits: 13,
    completedCredits: 9,
    missingCourses: [
      {
        courseCode: "SSH1131",
        courseName: "Chủ nghĩa xã hội khoa học",
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
    categoryCode: "250",
    name: "Toán và Khoa học cơ bản",
    shortName: "TKHCB",
    requiredCredits: 32,
    completedCredits: 32, // Hoàn thành 100% Đủ điều kiện
    missingCourses: [],
  },
  {
    id: "cscln",
    categoryCode: "300",
    name: "Cơ sở và cốt lõi ngành",
    shortName: "CSCLN",
    requiredCredits: 48,
    completedCredits: 26,
    missingCourses: [
      {
        courseCode: "IT3150",
        courseName: "Project I",
        credits: 2,
        isRequired: true,
      },
      {
        courseCode: "IT3180",
        courseName: "Nhập môn công nghệ phần mềm",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT3190",
        courseName: "Nhập môn Học máy và khai phá dữ liệu",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT4653",
        courseName: "Học sâu và ứng dụng",
        credits: 2,
        isRequired: true,
      },
      {
        courseCode: "IT3120",
        courseName: "Phân tích và thiết kế hệ thống",
        credits: 2,
        isRequired: true,
      },
      {
        courseCode: "IT4015",
        courseName: "Nhập môn an toàn thông tin",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT3930",
        courseName: "Project II",
        credits: 2,
        isRequired: true,
      },
      {
        courseCode: "IT3940",
        courseName: "Project III",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT4244",
        courseName: "Quản trị dự án CNTT",
        credits: 2,
        isRequired: true,
      },
    ],
  },
  {
    id: "ktbt",
    categoryCode: "320",
    name: "Khối kiến thức bổ trợ",
    shortName: "KTBT",
    requiredCredits: 9,
    completedCredits: 7,
    missingCourses: [
      {
        courseCode: "CH2021",
        courseName: "Đổi mới sáng tạo và khởi nghiệp",
        credits: 2,
        isRequired: false,
      },
      {
        courseCode: "ED3280",
        courseName: "Tâm lý học ứng dụng",
        credits: 2,
        isRequired: false,
      },
    ],
  },
  {
    id: "modchuyensau",
    categoryCode: "MODULE",
    name: "Mô đun chuyên sâu định hướng",
    shortName: "MÔ ĐUN",
    requiredCredits: 16,
    completedCredits: 0,
    missingCourses: [
      {
        courseCode: "IT4490",
        courseName: "Thiết kế và xây dựng phần mềm",
        credits: 3,
        isRequired: false,
      },
      {
        courseCode: "IT4441",
        courseName: "Giao diện và trải nghiệm người dùng",
        credits: 3,
        isRequired: false,
      },
      {
        courseCode: "IT4409",
        courseName: "Công nghệ Web và dịch vụ trực tuyến",
        credits: 3,
        isRequired: false,
      },
    ],
  },
  {
    id: "gdtc",
    categoryCode: "220",
    name: "Giáo dục thể chất",
    shortName: "GDTC",
    requiredCredits: 5,
    completedCredits: 4,
    missingCourses: [
      {
        courseCode: "PE2211",
        courseName: "Cầu lông 1 (Thực hành)",
        credits: 0,
        isRequired: false,
      },
    ],
  },
];

export const mockGraduationWarning: GraduationRequirementGroup[] = [
  {
    id: "llct",
    categoryCode: "210",
    name: "Lý luận chính trị + Pháp luật đại cương",
    shortName: "LLCT",
    requiredCredits: 13,
    completedCredits: 4,
    missingCourses: [
      {
        courseCode: "SSH1111",
        courseName: "Triết học Mác - Lênin (Cải thiện D+)",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "SSH1131",
        courseName: "Chủ nghĩa xã hội khoa học",
        credits: 2,
        isRequired: true,
      },
      {
        courseCode: "SSH1141",
        courseName: "Lịch sử Đảng cộng sản Việt Nam",
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
    categoryCode: "250",
    name: "Toán và Khoa học cơ bản",
    shortName: "TKHCB",
    requiredCredits: 32,
    completedCredits: 9, // Bị tụt xuống 9/32 TC do nợ IT1108 và các môn liên quan
    missingCourses: [
      {
        courseCode: "IT1108",
        courseName: "Nhập môn lập trình (Nợ F - Môn nền tảng chuỗi IT)",
        credits: 4,
        isRequired: true,
      },
      {
        courseCode: "MI1111",
        courseName: "Giải tích I (Cải thiện D)",
        credits: 4,
        isRequired: true,
      },
      {
        courseCode: "MI1121",
        courseName: "Giải tích II",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "MI1131",
        courseName: "Giải tích III",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "PH1120",
        courseName: "Vật lý đại cương II",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT3020",
        courseName: "Toán rời rạc",
        credits: 3,
        isRequired: true,
      },
    ],
  },
  {
    id: "cscln",
    categoryCode: "300",
    name: "Cơ sở và cốt lõi ngành",
    shortName: "CSCLN",
    requiredCredits: 48,
    completedCredits: 6,
    missingCourses: [
      {
        courseCode: "IT3011",
        courseName: "Cấu trúc dữ liệu và thuật toán",
        credits: 2,
        isRequired: true,
      },
      {
        courseCode: "IT3040",
        courseName: "Kỹ thuật lập trình",
        credits: 2,
        isRequired: true,
      },
      {
        courseCode: "IT3080",
        courseName: "Mạng máy tính",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "IT3090",
        courseName: "Cơ sở dữ liệu",
        credits: 3,
        isRequired: true,
      },
    ],
  },
  {
    id: "ktbt",
    categoryCode: "320",
    name: "Khối kiến thức bổ trợ",
    shortName: "KTBT",
    requiredCredits: 9,
    completedCredits: 2,
    missingCourses: [
      {
        courseCode: "IT2030",
        courseName: "Technical Writing and Presentation",
        credits: 3,
        isRequired: true,
      },
      {
        courseCode: "EM1010",
        courseName: "Quản trị học đại cương",
        credits: 2,
        isRequired: false,
      },
    ],
  },
  {
    id: "modchuyensau",
    categoryCode: "MODULE",
    name: "Mô đun chuyên sâu định hướng",
    shortName: "MÔ ĐUN",
    requiredCredits: 16,
    completedCredits: 0,
    missingCourses: [
      {
        courseCode: "IT4490",
        courseName: "Thiết kế và xây dựng phần mềm",
        credits: 3,
        isRequired: false,
      },
    ],
  },
  {
    id: "gdtc",
    categoryCode: "220",
    name: "Giáo dục thể chất",
    shortName: "GDTC",
    requiredCredits: 5,
    completedCredits: 4,
    missingCourses: [
      {
        courseCode: "PE2211",
        courseName: "Cầu lông 1 (Thực hành)",
        credits: 0,
        isRequired: false,
      },
    ],
  },
];

/**
 * Chuẩn đầu ra và tiến độ cho Tân sinh viên (0 TC / 0 HP đạt):
 */
export const mockGraduationFreshman: GraduationRequirementGroup[] = [
  {
    id: "llct",
    categoryCode: "210",
    name: "Lý luận chính trị + Pháp luật đại cương",
    shortName: "LLCT",
    requiredCredits: 13,
    completedCredits: 0,
    missingCourses: [],
  },
  {
    id: "tkhcb",
    categoryCode: "250",
    name: "Toán và Khoa học cơ bản",
    shortName: "TKHCB",
    requiredCredits: 32,
    completedCredits: 0,
    missingCourses: [],
  },
  {
    id: "cscln",
    categoryCode: "300",
    name: "Cơ sở và cốt lõi ngành",
    shortName: "CSCLN",
    requiredCredits: 48,
    completedCredits: 0,
    missingCourses: [],
  },
  {
    id: "ktbt",
    categoryCode: "320",
    name: "Khối kiến thức bổ trợ",
    shortName: "KTBT",
    requiredCredits: 9,
    completedCredits: 0,
    missingCourses: [],
  },
  {
    id: "modchuyensau",
    categoryCode: "MODULE",
    name: "Mô đun chuyên sâu định hướng",
    shortName: "MÔ ĐUN",
    requiredCredits: 16,
    completedCredits: 0,
    missingCourses: [],
  },
  {
    id: "gdtc",
    categoryCode: "220",
    name: "Giáo dục thể chất",
    shortName: "GDTC",
    requiredCredits: 5,
    completedCredits: 0,
    missingCourses: [],
  },
];

export function getGraduationForScenario(preset?: ScenarioPreset): GraduationRequirementGroup[] {
  const active = preset ?? getActiveScenario();
  return active === "warning" ? mockGraduationWarning : mockGraduationNormal;
}

export function getGraduationForCurriculum(curriculumId: string, preset?: ScenarioPreset): GraduationRequirementGroup[] {
  if (curriculumId === "ctdt-cntt-freshman") {
    return mockGraduationFreshman;
  }
  return getGraduationForScenario(preset);
}

export const mockGraduationRequirements: GraduationRequirementGroup[] = new Proxy(
  [] as GraduationRequirementGroup[],
  {
    get(_t, prop) {
      const list = getGraduationForScenario();
      const val = Reflect.get(list, prop);
      return typeof val === "function" ? val.bind(list) : val;
    },
    has(_t, prop) {
      return prop in getGraduationForScenario();
    },
    getOwnPropertyDescriptor(_t, prop) {
      return Object.getOwnPropertyDescriptor(getGraduationForScenario(), prop);
    },
    ownKeys() {
      return Reflect.ownKeys(getGraduationForScenario());
    },
  }
);
