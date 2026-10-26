import { NextResponse } from "next/server";
import { getGraduationRequirements } from "@/lib/db";

export async function GET() {
  try {
    const requirements = await getGraduationRequirements();
    return NextResponse.json({
      success: true,
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
