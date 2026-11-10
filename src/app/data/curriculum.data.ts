import type {
  CurriculumGroup,
  CurriculumCourse,
  CourseAddStatus,
  OpenTerm,
} from "@/app/types";
import { getActiveScenario, type ScenarioPreset } from "@/lib/scenario";

interface RawCourseSpec {
  id: string;
  name: string;
  openTerms: OpenTerm;
  semester: number | null;
  isRequired: boolean;
  credits: number;
  studyCredits: number | null;
  grade: string | null;
  prerequisites: string[];
}

function createCourseItem(
  indexNumber: number,
  spec: RawCourseSpec,
  passedCodes: Set<string>
): CurriculumCourse {
  // Kiểm tra điều kiện tiên quyết: nếu thiếu thì khóa
  const meetsPrereqs = spec.prerequisites.every((reqCode) => passedCodes.has(reqCode));
  const addStatus: CourseAddStatus = meetsPrereqs ? "add" : "locked";

  return {
    indexNumber,
    id: spec.id,
    name: spec.name,
    openTerms: spec.openTerms,
    semester: spec.semester,
    isRequired: spec.isRequired,
    credits: spec.credits,
    studyCredits: spec.studyCredits,
    grade: spec.grade,
    prerequisites: spec.prerequisites,

    // Tương thích 100% với UI và các bảng Frontend hiện hữu
    courseCode: spec.id,
    courseName: spec.name,
    prerequisiteCode: spec.prerequisites.length > 0 ? spec.prerequisites.join(", ") : undefined,
    semesterTerm: spec.openTerms,
    recommendedSemester: spec.semester ?? undefined,
    trainingCredits: spec.credits,
    tuitionCredits: spec.studyCredits ?? 0,
    letterGrade: spec.grade ?? undefined,
    addStatus,
  };
}

export function generateCurriculumGroups(preset: ScenarioPreset): CurriculumGroup[] {
  const isWarning = preset === "warning";

  // 1. NHÓM 210: Lý luận chính trị + Pháp luật đại cương (13 TC - Đạt 9 TC)
  const nhom210Raw: RawCourseSpec[] = [
    {
      id: "SSH1111",
      name: "Triết học Mác - Lênin",
      openTerms: "Mở cả 2 kỳ",
      semester: 3,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: isWarning ? "D+" : "B+",
      prerequisites: [],
    },
    {
      id: "SSH1121",
      name: "Kinh tế chính trị Mác - Lênin",
      openTerms: "Mở cả 2 kỳ",
      semester: 4,
      isRequired: true,
      credits: 2,
      studyCredits: 2,
      grade: "B+",
      prerequisites: [],
    },
    {
      id: "SSH1131",
      name: "Chủ nghĩa xã hội khoa học",
      openTerms: "Mở cả 2 kỳ",
      semester: 5,
      isRequired: true,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "SSH1141",
      name: "Lịch sử Đảng cộng sản Việt Nam",
      openTerms: "Mở cả 2 kỳ",
      semester: 6,
      isRequired: true,
      credits: 2,
      studyCredits: 2,
      grade: "A",
      prerequisites: [],
    },
    {
      id: "SSH1151",
      name: "Tư tưởng Hồ Chí Minh",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: true,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "EM1170",
      name: "Pháp luật đại cương",
      openTerms: "Mở cả 2 kỳ",
      semester: 2,
      isRequired: true,
      credits: 2,
      studyCredits: 2,
      grade: "A",
      prerequisites: [],
    },
  ];

  // 2. NHÓM 250: Khối kiến thức Toán và Khoa học cơ bản (32 TC - Đạt 32 TC)
  const nhom250Raw: RawCourseSpec[] = [
    {
      id: "MI1111",
      name: "Giải tích I",
      openTerms: "Mở cả 2 kỳ",
      semester: 1,
      isRequired: true,
      credits: 4,
      studyCredits: 4,
      grade: isWarning ? "D" : "B",
      prerequisites: [],
    },
    {
      id: "MI1121",
      name: "Giải tích II",
      openTerms: "Mở cả 2 kỳ",
      semester: 2,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: isWarning ? null : "B",
      prerequisites: ["MI1111"],
    },
    {
      id: "MI1131",
      name: "Giải tích III",
      openTerms: "Mở cả 2 kỳ",
      semester: 3,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: isWarning ? null : "C",
      prerequisites: ["MI1121"],
    },
    {
      id: "MI1141",
      name: "Đại số",
      openTerms: "Mở cả 2 kỳ",
      semester: 1,
      isRequired: true,
      credits: 4,
      studyCredits: 4,
      grade: "B",
      prerequisites: [],
    },
    {
      id: "MI2020",
      name: "Xác suất thống kê",
      openTerms: "Mở cả 2 kỳ",
      semester: 3,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: isWarning ? null : "A",
      prerequisites: ["MI1111"],
    },
    {
      id: "IT2000",
      name: "Nhập môn CNTT và TT",
      openTerms: "Mở cả 2 kỳ",
      semester: 1,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: "A+",
      prerequisites: [],
    },
    {
      id: "PH1120",
      name: "Vật lý đại cương II",
      openTerms: "Mở cả 2 kỳ",
      semester: 3,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: isWarning ? null : "C",
      prerequisites: [],
    },
    {
      id: "IT1108",
      name: "Nhập môn lập trình",
      openTerms: "Mở cả 2 kỳ",
      semester: 1,
      isRequired: true,
      credits: 4,
      studyCredits: 4,
      grade: isWarning ? "F" : "A+", // Trượt F ở warning demo
      prerequisites: [],
    },
    {
      id: "IT3020",
      name: "Toán rời rạc",
      openTerms: "Mở cả 2 kỳ",
      semester: 2,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: isWarning ? null : "A",
      prerequisites: [],
    },
    {
      id: "MI3052",
      name: "Nhập môn các phương pháp tối ưu",
      openTerms: "Mở cả 2 kỳ",
      semester: 3,
      isRequired: true,
      credits: 2,
      studyCredits: 2,
      grade: isWarning ? null : "C",
      prerequisites: [],
    },
  ];

  // 3. NHÓM 300: Cơ sở và cốt lõi ngành (48 TC - Đạt 26 TC)
  const nhom300Raw: RawCourseSpec[] = [
    {
      id: "IT2022",
      name: "Thống kê ứng dụng và quy hoạch thực nghiệm",
      openTerms: "Mở cả 2 kỳ",
      semester: 2,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: "A",
      prerequisites: [],
    },
    {
      id: "IT3011",
      name: "Cấu trúc dữ liệu và thuật toán",
      openTerms: "Mở cả 2 kỳ",
      semester: 2,
      isRequired: true,
      credits: 2,
      studyCredits: 2,
      grade: isWarning ? null : "A",
      prerequisites: ["IT1108"],
    },
    {
      id: "IT3030",
      name: "Kiến trúc máy tính",
      openTerms: "Mở cả 2 kỳ",
      semester: 3,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: "B",
      prerequisites: [],
    },
    {
      id: "IT3040",
      name: "Kỹ thuật lập trình",
      openTerms: "Mở cả 2 kỳ",
      semester: 4,
      isRequired: true,
      credits: 2,
      studyCredits: 2,
      grade: isWarning ? null : "B",
      prerequisites: ["IT3011"],
    },
    {
      id: "IT3070",
      name: "Nguyên lý hệ điều hành",
      openTerms: "Mở cả 2 kỳ",
      semester: 4,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: "B+",
      prerequisites: ["IT3030"],
    },
    {
      id: "IT4653",
      name: "Học sâu và ứng dụng",
      openTerms: "Chỉ mở kỳ 2",
      semester: 6,
      isRequired: true,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: ["IT3190"],
    },
    {
      id: "IT3080",
      name: "Mạng máy tính",
      openTerms: "Mở cả 2 kỳ",
      semester: 4,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: "A+",
      prerequisites: [],
    },
    {
      id: "IT3090",
      name: "Cơ sở dữ liệu",
      openTerms: "Mở cả 2 kỳ",
      semester: 5,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: "B",
      prerequisites: [],
    },
    {
      id: "IT3100",
      name: "Lập trình hướng đối tượng",
      openTerms: "Mở cả 2 kỳ",
      semester: 3,
      isRequired: true,
      credits: 2,
      studyCredits: 2,
      grade: isWarning ? null : "A",
      prerequisites: ["IT1108"],
    },
    {
      id: "IT3170",
      name: "Thuật toán ứng dụng",
      openTerms: "Mở cả 2 kỳ",
      semester: 5,
      isRequired: true,
      credits: 2,
      studyCredits: 2,
      grade: isWarning ? null : "B+",
      prerequisites: ["IT3011"],
    },
    {
      id: "IT3180",
      name: "Nhập môn công nghệ phần mềm",
      openTerms: "Mở cả 2 kỳ",
      semester: 5,
      isRequired: true,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: ["IT3100"],
    },
    {
      id: "IT3150",
      name: "Project I",
      openTerms: "Chỉ mở kỳ 1",
      semester: 5,
      isRequired: true,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: ["IT3011"],
    },
    {
      id: "IT3160",
      name: "Nhập môn Trí tuệ nhân tạo",
      openTerms: "Mở cả 2 kỳ",
      semester: 4,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: "B+",
      prerequisites: [],
    },
    {
      id: "IT3120",
      name: "Phân tích và thiết kế hệ thống",
      openTerms: "Mở cả 2 kỳ",
      semester: 6,
      isRequired: true,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: ["IT3090", "IT3180"],
    },
    {
      id: "IT4015",
      name: "Nhập môn an toàn thông tin",
      openTerms: "Mở cả 2 kỳ",
      semester: 6,
      isRequired: true,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: ["IT3080"],
    },
    {
      id: "IT3190",
      name: "Nhập môn Học máy và khai phá dữ liệu",
      openTerms: "Mở cả 2 kỳ",
      semester: 5,
      isRequired: true,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: ["MI2020"],
    },
    {
      id: "IT3930",
      name: "Project II",
      openTerms: "Chỉ mở kỳ 2",
      semester: 6,
      isRequired: true,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: ["IT3150"],
    },
    {
      id: "IT3940",
      name: "Project III",
      openTerms: "Chỉ mở kỳ 1",
      semester: 7,
      isRequired: true,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: ["IT3930"],
    },
    {
      id: "IT4244",
      name: "Quản trị dự án CNTT",
      openTerms: "Mở cả 2 kỳ",
      semester: 8,
      isRequired: true,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
  ];

  // 4. NHÓM 320: Khối kiến thức bổ trợ (Yêu cầu tích lũy: 9 TC, Đã đạt: 7 TC)
  const nhom320Raw: RawCourseSpec[] = [
    {
      id: "IT2030",
      name: "Technical Writing and Presentation",
      openTerms: "Mở cả 2 kỳ",
      semester: 4,
      isRequired: true,
      credits: 3,
      studyCredits: 3,
      grade: "B+",
      prerequisites: [],
    },
    {
      id: "CH2021",
      name: "Đổi mới sáng tạo và khởi nghiệp",
      openTerms: "Mở cả 2 kỳ",
      semester: null,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "ME3123",
      name: "Thiết kế mỹ thuật công nghiệp",
      openTerms: "Mở cả 2 kỳ",
      semester: null,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "ME3124",
      name: "Thiết kế quảng bá sản phẩm",
      openTerms: "Mở cả 2 kỳ",
      semester: null,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "EM1010",
      name: "Quản trị học đại cương",
      openTerms: "Mở cả 2 kỳ",
      semester: null,
      isRequired: false,
      credits: 2,
      studyCredits: 2,
      grade: "A",
      prerequisites: [],
    },
    {
      id: "EM1180",
      name: "Văn hóa kinh doanh và tinh thần khởi nghiệp",
      openTerms: "Mở cả 2 kỳ",
      semester: null,
      isRequired: false,
      credits: 2,
      studyCredits: 2,
      grade: "A+",
      prerequisites: [],
    },
    {
      id: "ED3280",
      name: "Tâm lý học ứng dụng",
      openTerms: "Mở cả 2 kỳ",
      semester: null,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "ED3220",
      name: "Kỹ năng mềm",
      openTerms: "Mở cả 2 kỳ",
      semester: null,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "ET3262",
      name: "Tư duy công nghệ và thiết kế kỹ thuật",
      openTerms: "Mở cả 2 kỳ",
      semester: null,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "TEX3123",
      name: "Thiết kế mỹ thuật công nghiệp",
      openTerms: "Mở cả 2 kỳ",
      semester: null,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
  ];

  // 5. NHÓM 360: Thực tập (2 TC - Đạt: 0 TC)
  const nhom360Raw: RawCourseSpec[] = [
    {
      id: "IT4991",
      name: "Thực tập kỹ thuật",
      openTerms: "Chỉ mở kỳ 2",
      semester: 6,
      isRequired: true,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
  ];

  // 6. NHÓM 7: Đồ án / Khóa luận tốt nghiệp (6 TC - Đạt: 0 TC)
  const nhom7Raw: RawCourseSpec[] = [
    {
      id: "IT4995",
      name: "Đồ án tốt nghiệp cử nhân",
      openTerms: "Chỉ mở kỳ 2",
      semester: 8,
      isRequired: true,
      credits: 6,
      studyCredits: null,
      grade: null,
      prerequisites: ["IT4991"],
    },
  ];

  // 7. DANH SÁCH 5 KHỐI MÔ ĐUN CHUYÊN SÂU (TỰ CHỌN ĐỊNH HƯỚNG)
  // Mã 400: Mô đun 1 - Công nghệ phần mềm (Tổng 10 TC)
  const nhom400Raw: RawCourseSpec[] = [
    {
      id: "IT4490",
      name: "Thiết kế và xây dựng phần mềm",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "IT4441",
      name: "Giao diện và trải nghiệm người dùng",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "IT4501",
      name: "Đảm bảo chất lượng Phần mềm",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "IT4785",
      name: "Phát triển ứng dụng cho thiết bị di động",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
  ];

  // Mã 401: Mô đun 2 - Hệ thống thông tin (Tổng 10 TC)
  const nhom401Raw: RawCourseSpec[] = [
    {
      id: "IT4350",
      name: "Kiến trúc các hệ thống thông tin và ứng dụng",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "IT4611",
      name: "Các hệ thống phân tán và ứng dụng",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "IT4341",
      name: "Hệ trợ giúp quyết định",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "IT4863",
      name: "Tìm kiếm thông tin",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
  ];

  // Mã 402: Mô đun 3 - Phân tích dữ liệu thông minh (Tổng 10 TC)
  const nhom402Raw: RawCourseSpec[] = [
    {
      id: "IT4930",
      name: "Nhập môn Khoa học dữ liệu",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "IT4931",
      name: "Lưu trữ và xử lý dữ liệu lớn",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "IT5425",
      name: "Quản trị dữ liệu và trực quan hóa",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 2,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "IT4906",
      name: "Tính toán tiến hóa",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
  ];

  // Mã 403: Mô đun 4 - Phát triển ứng dụng nghiệp vụ (Tổng 6 TC)
  const nhom403Raw: RawCourseSpec[] = [
    {
      id: "IT4409",
      name: "Công nghệ Web và dịch vụ trực tuyến",
      openTerms: "Mở cả 2 kỳ",
      semester: 6,
      isRequired: false,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: ["IT3090"],
    },
    {
      id: "IT4788",
      name: "Phát triển ứng dụng đa nền tảng",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
  ];

  // Mã 404: Mô đun 5 - Phát triển ứng dụng thông minh (Tổng 6 TC)
  const nhom404Raw: RawCourseSpec[] = [
    {
      id: "IT4663",
      name: "Tối ưu lập kế hoạch",
      openTerms: "Mở cả 2 kỳ",
      semester: 6,
      isRequired: false,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
    {
      id: "IT4613",
      name: "Hệ gợi ý",
      openTerms: "Mở cả 2 kỳ",
      semester: 7,
      isRequired: false,
      credits: 3,
      studyCredits: null,
      grade: null,
      prerequisites: [],
    },
  ];

  // Tập hợp các môn đã hoàn thành (đạt) để kiểm tra điều kiện tiên quyết
  const allRaw = [
    ...nhom210Raw,
    ...nhom250Raw,
    ...nhom300Raw,
    ...nhom320Raw,
    ...nhom360Raw,
    ...nhom7Raw,
    ...nhom400Raw,
    ...nhom401Raw,
    ...nhom402Raw,
    ...nhom403Raw,
    ...nhom404Raw,
  ];
  const passedCodes = new Set<string>(
    allRaw.filter((r) => r.grade !== null && r.grade !== "F").map((r) => r.id)
  );

  function mapGroup(
    categoryCode: string,
    categoryName: string,
    groupLabel: string,
    rawList: RawCourseSpec[]
  ): CurriculumGroup {
    const courses = rawList.map((spec, idx) =>
      createCourseItem(idx + 1, spec, passedCodes)
    );
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    const passedCredits = courses
      .filter((c) => c.grade !== null && c.grade !== "F")
      .reduce((sum, c) => sum + c.credits, 0);

    return {
      categoryCode,
      categoryName,
      courseCount: courses.length,
      totalCredits,
      passedCredits,
      subGroups: [
        {
          groupLabel,
          courseCount: courses.length,
          totalCredits,
          passedCredits,
          courses,
        },
      ],
    };
  }

  return [
    mapGroup("210", "Lý luận chính trị + Pháp luật đại cương", "LÝ LUẬN CHÍNH TRỊ + PHÁP LUẬT ĐẠI CƯƠNG", nhom210Raw),
    mapGroup("250", "Toán và Khoa học cơ bản", "TOÁN VÀ KHOA HỌC CƠ BẢN", nhom250Raw),
    mapGroup("300", "Cơ sở và cốt lõi ngành", "CƠ SỞ VÀ CỐT LÕI NGÀNH", nhom300Raw),
    mapGroup("320", "Khối kiến thức bổ trợ", "KHỐI KIẾN THỨC BỔ TRỢ", nhom320Raw),
    mapGroup("360", "Thực tập", "THỰC TẬP DOANH NGHIỆP", nhom360Raw),
    mapGroup("7", "Đồ án / Khóa luận tốt nghiệp", "ĐỒ ÁN / KHÓA LUẬN TỐT NGHIỆP CỬ NHÂN", nhom7Raw),
    mapGroup("400", "Mô đun 1 - Công nghệ phần mềm", "MÔ ĐUN 1 - CÔNG NGHỆ PHẦN MỀM", nhom400Raw),
    mapGroup("401", "Mô đun 2 - Hệ thống thông tin", "MÔ ĐUN 2 - HỆ THỐNG THÔNG TIN", nhom401Raw),
    mapGroup("402", "Mô đun 3 - Phân tích dữ liệu thông minh", "MÔ ĐUN 3 - PHÂN TÍCH DỮ LIỆU THÔNG MINH", nhom402Raw),
    mapGroup("403", "Mô đun 4 - Phát triển ứng dụng nghiệp vụ", "MÔ ĐUN 4 - PHÁT TRIỂN ỨNG DỤNG NGHIỆP VỤ", nhom403Raw),
    mapGroup("404", "Mô đun 5 - Phát triển ứng dụng thông minh", "MÔ ĐUN 5 - PHÁT TRIỂN ỨNG DỤNG THÔNG MINH", nhom404Raw),
  ];
}

export const mockCurriculumGroupsNormal = generateCurriculumGroups("normal");
export const mockCurriculumGroupsWarning = generateCurriculumGroups("warning");

export function getCurrentCurriculumGroups(): CurriculumGroup[] {
  const active = getActiveScenario();
  return active === "warning" ? mockCurriculumGroupsWarning : mockCurriculumGroupsNormal;
}

/**
 * Proxy động cho `mockCurriculumGroups`:
 * Liên kết các method mảng nguyên bản (map, forEach, filter, find...) trực tiếp vào list thực tế.
 */
export const mockCurriculumGroups: CurriculumGroup[] = new Proxy([] as CurriculumGroup[], {
  get(_t, prop) {
    const list = getCurrentCurriculumGroups();
    const val = (list as any)[prop];
    return typeof val === "function" ? val.bind(list) : val;
  },
  has(_t, prop) {
    return prop in getCurrentCurriculumGroups();
  },
  getOwnPropertyDescriptor(_t, prop) {
    return Object.getOwnPropertyDescriptor(getCurrentCurriculumGroups(), prop);
  },
  ownKeys(_t) {
    return Reflect.ownKeys(getCurrentCurriculumGroups());
  },
});
