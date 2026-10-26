import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { submitRegistration } from "@/lib/db";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    const studentId = session?.user?.studentId || "20210842";

    const result = await submitRegistration(studentId);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      count: result.count,
      totalCredits: result.totalCredits,
    });
  } catch (error) {
    console.error("API POST /api/registrations/submit error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi máy chủ khi nộp đăng ký học phần" },
      { status: 500 }
    );
  }
}
