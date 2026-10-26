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

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="w-full max-w-md bg-white border border-gray-300 shadow-md">
      <div className="bg-[#aa261b] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold uppercase tracking-wide">
            Đăng nhập hệ thống
          </h1>
          <p className="text-xs text-red-100 mt-0.5">
            Cổng thông tin đào tạo sinh viên
          </p>
        </div>
        <LockKeyhole aria-hidden="true" className="size-8 text-red-200" />
      </div>

      <div className="p-6 space-y-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-[#aa261b] p-3 text-xs text-red-700 flex items-start gap-2">
            <CircleAlert aria-hidden="true" className="size-[18px] shrink-0 text-[#aa261b]" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-bold text-gray-700 uppercase mb-1"
            >
              Mã số sinh viên / Tên đăng nhập{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ví dụ: 20210842"
                className="w-full h-9 pl-9 pr-3 text-xs border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#aa261b]"
              />
              <User
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 size-[18px] text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold text-gray-700 uppercase mb-1"
            >
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full h-9 pl-9 pr-9 text-xs border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#aa261b]"
              />
              <LockKeyhole
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 size-[18px] text-gray-400 pointer-events-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" className="size-[18px]" />
                ) : (
                  <Eye aria-hidden="true" className="size-[18px]" />
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
                className="rounded border-gray-300 text-[#aa261b] focus:ring-[#aa261b]"
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-9.5 bg-[#aa261b] hover:bg-[#8f1f15] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-sm"
          >
            {loading ? (
              <>
                <LoaderCircle aria-hidden="true" className="size-[18px] animate-spin" />
                <span>Đang xác thực...</span>
              </>
            ) : (
              <>
                <LogIn aria-hidden="true" className="size-[18px]" />
                <span>ĐĂNG NHẬP</span>
              </>
            )}
          </button>
        </form>
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
