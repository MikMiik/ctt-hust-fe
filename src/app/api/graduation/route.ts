import { NextRequest, NextResponse } from "next/server";
import {
  getGraduationForScenario,
  mockGraduationFreshman,
} from "@/app/data/graduation.data";
import { getActiveScenario, type ScenarioPreset } from "@/lib/scenario";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const presetParam = searchParams.get("preset");
    const curriculumId = searchParams.get("curriculumId");
    const cookieScenario = request.cookies.get("ctt_scenario")?.value;
    const activeScenario: ScenarioPreset = getActiveScenario(presetParam || cookieScenario);

    if (presetParam === "freshman" || curriculumId === "ctdt-cntt-freshman") {
      return NextResponse.json({
        success: true,
        preset: "freshman",
        data: mockGraduationFreshman,
      });
    }

    const requirements = getGraduationForScenario(activeScenario);

    return NextResponse.json({
      success: true,
      preset: activeScenario,
      data: requirements,
    });
  } catch (error) {
    console.error("API /api/graduation error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi máy chủ khi lấy dữ liệu chuẩn đầu ra" },
      { status: 500 }
    );
  }
}
