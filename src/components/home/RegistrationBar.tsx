"use client";

const MAX_CREDITS = 24;
const MIN_CREDITS = 12;

interface RegistrationBarProps {
  totalCredits: number;
  onSubmit: () => void;
}

export default function RegistrationBar({ totalCredits, onSubmit }: RegistrationBarProps) {
  function handleSubmit() {
    if (totalCredits < MIN_CREDITS) {
      alert(
        `Lưu ý: Bạn chưa đủ số tín chỉ tối thiểu (${MIN_CREDITS} TC) theo quy định.\nHiện tại: ${totalCredits} TC.`
      );
      return;
    }
    onSubmit();
  }

  return (
    <div className="bg-gray-100 border-t border-gray-300 px-4 py-2.5 flex items-center justify-between">
      {/* Tổng tín chỉ */}
      <div className="text-xs font-bold text-gray-800 uppercase tracking-wide">
        TỔNG TÍN CHỈ:{" "}
        <span
          id="creditsDisplay"
          className={`font-bold text-sm ${
            totalCredits < MIN_CREDITS ? "text-amber-600" : "text-primary"
          }`}
        >
          {totalCredits}
        </span>{" "}
        / {MAX_CREDITS}
        {totalCredits < MIN_CREDITS && (
          <span className="ml-2 text-[11px] text-amber-600 font-semibold normal-case">
            (Chưa đủ {MIN_CREDITS} TC tối thiểu)
          </span>
        )}
      </div>

      {/* Nút gửi đăng ký */}
      <button
        type="button"
        onClick={handleSubmit}
        className="h-8 px-6 bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
        style={{ borderRadius: 0 }}
      >
        GỬI ĐĂNG KÝ
      </button>
    </div>
  );
}
