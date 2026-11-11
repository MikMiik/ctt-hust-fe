"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useSyncExternalStore } from "react";
import { mockStudent } from "@/app/data";
import { LogIn, LogOut, RefreshCw } from "lucide-react";

type ScenarioMode = "normal" | "warning";

const subscribeNoop = () => () => {};

function getScenarioSnapshot(): ScenarioMode {
  const match = document.cookie.match(/ctt_scenario=([^;]+)/);
  return match?.[1] === "warning" ? "warning" : "normal";
}

function getServerScenarioSnapshot(): ScenarioMode {
  return "normal";
}

/** Lấy chữ viết tắt tên (tối đa 2 ký tự) */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Header() {
  const { data: session } = useSession();
  const [loggingOut, setLoggingOut] = useState(false);
  const cookieScenario = useSyncExternalStore(
    subscribeNoop,
    getScenarioSnapshot,
    getServerScenarioSnapshot,
  );
  const [optimisticScenario, setOptimisticScenario] =
    useState<ScenarioMode | null>(null);
  const [switching, setSwitching] = useState(false);

  const scenario = optimisticScenario ?? cookieScenario;

  async function handleToggleScenario() {
    if (switching) return;
    setSwitching(true);
    const nextScenario: ScenarioMode =
      scenario === "normal" ? "warning" : "normal";
    try {
      await fetch("/api/scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: nextScenario }),
      });
      document.cookie = `ctt_scenario=${nextScenario}; path=/; max-age=604800`;
      setOptimisticScenario(nextScenario);
      window.location.reload();
    } catch (e) {
      console.error("Lỗi khi chuyển kịch bản:", e);
      setSwitching(false);
    }
  }

  // Tự động gán thông tin sinh viên mặc định để bypass đăng nhập cho demo
  const studentName =
    session?.user?.fullName ||
    mockStudent.fullName;
  const studentId =
    session?.user?.studentId ||
    mockStudent.studentId;

  const initials = studentName ? getInitials(studentName) : null;

  return (
    <header
      className="w-full shadow-[0_1px_5px_rgba(0,0,0,0.1)] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/header-bg.png')" }}
    >
      <div className="max-w-350 mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* ── Brand & Portal Logo ── */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="Logo Cổng thông tin đào tạo Đại học Bách khoa Hà Nội"
            width={60}
            height={60}
            className="h-13 w-auto object-contain shrink-0"
            priority
          />
          <div>
            <span className="block text-[15px] text-black uppercase font-bold tracking-tight drop-shadow">
              ĐẠI HỌC BÁCH KHOA HÀ NỘI
            </span>
            <span className="block text-[11px] text-black/90 uppercase tracking-wider font-semibold drop-shadow">
              HANOI UNIVERSITY OF SCIENCE AND TECHNOLOGY
            </span>
          </div>
        </Link>

        {/* ── Student Info & Actions ── */}
        <div className="flex items-center gap-3">
          {/* Nút Toggle chuyển đổi kịch bản Demo */}
          <button
            type="button"
            disabled={switching}
            onClick={handleToggleScenario}
            title="Nhấp để chuyển đổi kịch bản demo giữa CPA Giỏi và Cảnh báo nợ F IT1110"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded border transition-colors shadow-xs cursor-pointer ${
              scenario === "normal"
                ? "bg-green-50 text-green-800 border-green-300 hover:bg-green-100"
                : "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
            }`}
          >
            <span
              className={`size-2 rounded-full shrink-0 ${
                scenario === "normal" ? "bg-green-500 animate-pulse" : "bg-red-500 animate-pulse"
              }`}
            />
            <span>
              {switching
                ? "Đang tải..."
                : scenario === "normal"
                ? "Preset: CPA Giỏi"
                : "Preset: Cảnh báo nợ F"}
            </span>
            <RefreshCw className={`size-3 text-gray-500 ${switching ? "animate-spin" : ""}`} />
          </button>

          {studentName ? (
            <>
              <div className="text-right">
                <div className="text-xs text-black font-bold uppercase drop-shadow leading-tight">
                  {studentName}
                </div>
                <div className="text-[11px] text-black/70 font-mono drop-shadow">
                  MSSV: {studentId}
                </div>
              </div>

              {/* Avatar với initials */}
              <div
                title={studentName}
                className="w-8 h-8 rounded-full bg-white/30 border border-black/25 flex items-center justify-center text-black shrink-0 text-[11px] font-bold select-none"
              >
                {initials}
              </div>

              <button
                type="button"
                disabled={loggingOut}
                onClick={async () => {
                  setLoggingOut(true);
                  try {
                    await signOut({ redirect: false });
                    window.location.replace("/login");
                  } catch {
                    setLoggingOut(false);
                  }
                }}
                title="Đăng xuất khỏi hệ thống"
                aria-label="Đăng xuất"
                className="text-black/70 hover:text-primary transition-colors p-1 cursor-pointer disabled:cursor-wait disabled:opacity-50 flex items-center rounded hover:bg-black/10"
              >
                <LogOut aria-hidden="true" className="size-5" />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wide transition-colors shadow-sm rounded-sm"
            >
              <LogIn aria-hidden="true" className="size-4" />
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
