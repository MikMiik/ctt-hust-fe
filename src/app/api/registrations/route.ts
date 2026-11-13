import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getRegistrationsStore,
  addRegistrationStore,
  removeRegistrationStore,
} from "@/lib/registrations-store";
import { getActiveScenario } from "@/lib/scenario";

async function getCurrentStudentId(): Promise<string> {
  const session = await getServerSession(authOptions);
  return session?.user?.studentId || "202400000";
}

// GET: Lấy danh sách học phần đã chọn trong giỏ đăng ký (In-Memory 0ms)
export async function GET() {
  try {
    const studentId = await getCurrentStudentId();
    const courses = getRegistrationsStore();
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);

    return NextResponse.json({
      success: true,
      studentId,
      totalCredits,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("API GET /api/registrations error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi máy chủ khi lấy danh sách đăng ký" },
      { status: 500 }
    );
  }
}

// POST: Thêm học phần vào danh sách đăng ký
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseCode } = body;

    if (!courseCode || typeof courseCode !== "string") {
      return NextResponse.json(
        { success: false, message: "Mã học phần không hợp lệ!" },
        { status: 400 }
      );
    }

    const studentId = await getCurrentStudentId();
    const scenario = getActiveScenario(request.cookies.get("ctt_scenario")?.value);
    const result = addRegistrationStore(courseCode.trim(), scenario);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      studentId,
      message: result.message,
      data: result.course,
      totalCredits: result.totalCredits,
    });
  } catch (error) {
    console.error("API POST /api/registrations error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi máy chủ khi thêm học phần" },
      { status: 500 }
    );
  }
}

// DELETE: Hủy học phần khỏi danh sách đăng ký
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let courseCode = searchParams.get("courseCode");

    if (!courseCode) {
      try {
        const body = await request.json();
        courseCode = body.courseCode;
      } catch {
        // body not provided
      }
    }

    if (!courseCode || typeof courseCode !== "string") {
      return NextResponse.json(
        { success: false, message: "Vui lòng cung cấp mã học phần cần hủy!" },
        { status: 400 }
      );
    }

    const studentId = await getCurrentStudentId();
    const result = removeRegistrationStore(courseCode.trim());

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 404 }
      );
    }

    const currentList = getRegistrationsStore();
    const totalCredits = currentList.reduce((sum, c) => sum + c.credits, 0);

    return NextResponse.json({
      success: true,
      studentId,
      message: result.message,
      removedCourseCode: result.removedCourseCode,
      totalCredits,
      remainingCount: currentList.length,
    });
  } catch (error) {
    console.error("API DELETE /api/registrations error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi máy chủ khi hủy học phần" },
      { status: 500 }
    );
  }
}
