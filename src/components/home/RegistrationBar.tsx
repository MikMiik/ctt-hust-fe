"use client";

import { Clock, Send } from "lucide-react";

const MAX_CREDITS = 24;

interface RegistrationBarProps {
  totalCredits: number;
  pendingCount?: number;
  onSubmit: () => void;
}

export default function RegistrationBar({
  totalCredits,
  pendingCount = 0,
  onSubmit,
}: RegistrationBarProps) {
  const isNearMax = totalCredits >= MAX_CREDITS * 0.85;
  const isFull = totalCredits >= MAX_CREDITS;
  const isEmpty = totalCredits === 0;

  return (
    <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
      {/* ── Credit counter & Pending status ── */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Tổng tín chỉ
          </span>
          <span
            id="creditsDisplay"
            className={`text-2xl font-bold leading-none ${
              isFull
                ? "text-status-danger"
                : isNearMax
                ? "text-status-warning"
                : "text-gray-900"
            }`}
          >
            {totalCredits}
          </span>
          <span className="text-sm text-gray-400 font-medium">
            / {MAX_CREDITS} TC
          </span>
        </div>

        {pendingCount > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <Clock aria-hidden="true" className="size-3 text-amber-600" />
            <span>
              Có <strong>{pendingCount}</strong> học phần chờ gửi đăng ký
            </span>
          </span>
        )}
      </div>

      {/* ── Submit button ── */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isEmpty}
        className={`h-9 px-6 bg-primary text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 rounded-sm shadow-sm ${
          isEmpty
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-primary-hover cursor-pointer active:scale-[0.98]"
        }`}
        title={isEmpty ? "Chưa có học phần nào để gửi đăng ký" : "Gửi đăng ký các học phần"}
      >
        <Send aria-hidden="true" className="size-3.5" />
        Gửi đăng ký
      </button>
    </div>
  );
}
