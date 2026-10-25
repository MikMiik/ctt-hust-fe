import { mockStudent } from "@/app/data";

export default function Header() {
  return (
    <header className="w-full bg-white border-b-2 border-primary">
      <div className="max-w-350 mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* ── Section: Brand & Portal Logo ── */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border border-gray-300 bg-gray-50 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <div>
            <span className="block text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
              CỔNG THÔNG TIN ĐÀO TẠO ĐẠI HỌC
            </span>
            <span className="block text-[15px] text-primary uppercase font-bold tracking-tight">
              ĐẠI HỌC BÁCH KHOA&nbsp;
            </span>
          </div>
        </div>

        {/* ── Section: Student Info & Actions ── */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-gray-900 font-bold uppercase">{mockStudent.fullName}</div>
            <div className="text-[11px] text-gray-600 font-mono">MSSV: {mockStudent.studentId}</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
          <a
            href="#"
            title="Đăng xuất"
            className="text-gray-500 hover:text-primary transition-colors ml-1"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </a>
        </div>
      </div>
    </header>
  );
}
