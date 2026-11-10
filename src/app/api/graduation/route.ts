import { NextRequest, NextResponse } from "next/server";
import { getGraduationForScenario } from "@/app/data/graduation.data";
import { getActiveScenario, type ScenarioPreset } from "@/lib/scenario";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const presetParam = searchParams.get("preset");
    const cookieScenario = request.cookies.get("ctt_scenario")?.value;
    const activeScenario: ScenarioPreset = getActiveScenario(presetParam || cookieScenario);

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
