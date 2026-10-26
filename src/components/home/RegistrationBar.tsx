"use client";

import { Send } from "lucide-react";

const MAX_CREDITS = 24;

interface RegistrationBarProps {
  totalCredits: number;
  onSubmit: () => void;
}

export default function RegistrationBar({ totalCredits, onSubmit }: RegistrationBarProps) {
  return (
    <div className="bg-gray-100 border-t border-gray-300 px-4 py-2.5 flex items-center justify-between">
      {/* ── Section: Registration Action Bar ── */}
      <div className="text-xs font-bold text-gray-800 uppercase tracking-wide">
        TỔNG TÍN CHỈ:{" "}
        <span
          id="creditsDisplay"
          className="font-bold text-sm text-primary"
        >
          {totalCredits}
        </span>{" "}
        / {MAX_CREDITS}
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="h-8 px-6 bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
        style={{ borderRadius: 0 }}
      >
        <Send aria-hidden="true" className="size-3.5" />
        GỬI ĐĂNG KÝ
      </button>
    </div>
  );
}
