"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  CircleAlert,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  User,
} from "lucide-react";
import { DEMO_CREDENTIALS } from "@/app/data";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [username, setUsername] = useState<string>(DEMO_CREDENTIALS.username);
  const [password, setPassword] = useState<string>(DEMO_CREDENTIALS.password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username: username.trim(),
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setError("Tài khoản hoặc mật khẩu không chính xác.");
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("Đã xảy ra lỗi khi kết nối máy chủ. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-sm overflow-hidden">
      {/* ── Card Header ── */}
      <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-bold uppercase tracking-wide">
            Đăng nhập hệ thống
          </h1>
          <p className="text-xs text-primary-200 mt-0.5">
            Cổng thông tin đào tạo sinh viên
          </p>
        </div>
        <LockKeyhole aria-hidden="true" className="size-7 text-primary-300 shrink-0" />
      </div>

      <div className="p-6 space-y-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-primary p-3 text-xs text-red-700 flex items-start gap-2 rounded-r-sm">
            <CircleAlert aria-hidden="true" className="size-[18px] shrink-0 text-primary mt-px" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5"
            >
              Mã số sinh viên / Tên đăng nhập{" "}
              <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={`Ví dụ: ${DEMO_CREDENTIALS.username}`}
                className="w-full h-9 pl-9 pr-3 text-sm border border-gray-300 bg-white text-gray-900 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
              <User
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5"
            >
              Mật khẩu <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={`Ví dụ: ${DEMO_CREDENTIALS.password}`}
                className="w-full h-9 pl-9 pr-9 text-sm border border-gray-300 bg-white text-gray-900 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
              <LockKeyhole
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-primary hover:bg-primary-hover text-white text-sm font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-sm rounded-sm"
          >
            {loading ? (
              <>
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                <span>Đang xác thực...</span>
              </>
            ) : (
              <>
                <LogIn aria-hidden="true" className="size-4" />
                <span>Đăng nhập</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-gray-100 text-xs text-gray-500">
          <p>
            Tài khoản mẫu:{" "}
            <span className="font-mono font-bold text-gray-700">
              {DEMO_CREDENTIALS.username}
            </span>
            {" / "}
            <span className="font-mono font-bold text-gray-700">
              {DEMO_CREDENTIALS.password}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="text-xs text-gray-500 py-8 text-center">
          Đang tải trang đăng nhập...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
