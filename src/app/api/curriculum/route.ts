import { NextRequest, NextResponse } from "next/server";
import {
  generateCurriculumGroups,
  generateFreshmanCurriculumGroups,
} from "@/app/data/curriculum.data";
import { getActiveScenario, type ScenarioPreset } from "@/lib/scenario";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const presetParam = searchParams.get("preset");
    const curriculumId = searchParams.get("curriculumId");
    const cookieScenario = request.cookies.get("ctt_scenario")?.value;
    const activeScenario: ScenarioPreset = getActiveScenario(presetParam || cookieScenario);

    const semester = searchParams.get("semester");
    const search = searchParams.get("search")?.toLowerCase().trim();

    let groups =
      presetParam === "freshman" || curriculumId === "ctdt-cntt-freshman"
        ? generateFreshmanCurriculumGroups()
        : generateCurriculumGroups(activeScenario);

    if (semester || search) {
      groups = groups
        .map((group) => {
          const filteredSubGroups = group.subGroups
            .map((subGroup) => {
              const filteredCourses = subGroup.courses.filter((course) => {
                let matchSemester = true;
                let matchSearch = true;

                if (semester && semester !== "all") {
                  const semNum = parseInt(semester, 10);
                  if (!isNaN(semNum)) {
                    matchSemester = course.recommendedSemester === semNum;
                  }
                }

                if (search) {
                  matchSearch =
                    course.courseCode.toLowerCase().includes(search) ||
                    course.courseName.toLowerCase().includes(search);
                }

                return matchSemester && matchSearch;
              });

              return {
                ...subGroup,
                courseCount: filteredCourses.length,
                totalCredits: filteredCourses.reduce(
                  (sum, c) => sum + c.trainingCredits,
                  0
                ),
                courses: filteredCourses,
              };
            })
            .filter((subGroup) => subGroup.courses.length > 0);

          return {
            ...group,
            courseCount: filteredSubGroups.reduce(
              (sum, sg) => sum + sg.courseCount,
              0
            ),
            totalCredits: filteredSubGroups.reduce(
              (sum, sg) => sum + sg.totalCredits,
              0
            ),
            subGroups: filteredSubGroups,
          };
        })
        .filter((group) => group.subGroups.length > 0);
    }

    return NextResponse.json({
      success: true,
      preset: activeScenario,
      data: groups,
    });
  } catch (error) {
    console.error("API /api/curriculum error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi máy chủ khi lấy dữ liệu CTĐT" },
      { status: 500 }
    );
  }
}
