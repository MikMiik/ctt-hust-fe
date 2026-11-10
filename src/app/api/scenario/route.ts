import { NextRequest, NextResponse } from "next/server";
import {
  getActiveScenario,
  setMemoryScenario,
  type ScenarioPreset,
} from "@/lib/scenario";

export async function GET(request: NextRequest) {
  const cookieScenario = request.cookies.get("ctt_scenario")?.value;
  const current = getActiveScenario(cookieScenario);
  return NextResponse.json({
    success: true,
    scenario: current,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const scenario: ScenarioPreset =
      body.scenario === "warning" ? "warning" : "normal";

    setMemoryScenario(scenario);

    const response = NextResponse.json({
      success: true,
      scenario,
      message:
        scenario === "warning"
          ? "Đã chuyển sang kịch bản Cảnh báo học tập (Nợ F Tin học đại cương IT1110)"
          : "Đã chuyển sang kịch bản Sinh viên giỏi (CPA cao, qua hết môn)",
    });

    response.cookies.set("ctt_scenario", scenario, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("API /api/scenario error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi chuyển đổi kịch bản" },
      { status: 500 }
    );
  }
}
