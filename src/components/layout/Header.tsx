import Image from "next/image";
import { mockStudent } from "@/app/data";

export default function Header() {
  return (
    <header
      className="w-full shadow-[0_1px_5px_rgba(0,0,0,0.1)] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/header-bg.png')" }}
    >
      <div className="max-w-350 mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* ── Section: Brand & Portal Logo ── */}
        <div className="flex items-center gap-3">
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
              ĐẠI HỌC BÁCH KHOA HÀ NỘI;
            </span>
            <span className="block text-[11px] text-black/90 uppercase tracking-wider font-semibold drop-shadow">
              HANOI UNIVERSITY OF SCIENCE AND TECHNOLOGY
            </span>
          </div>
        </div>

        {/* ── Section: Student Info & Actions ── */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-black font-bold uppercase drop-shadow">
              {mockStudent.fullName}
            </div>
            <div className="text-[11px] text-black/80 font-mono drop-shadow">
              MSSV: {mockStudent.studentId}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-black/20 border border-black/40 flex items-center justify-center text-black shrink-0">
            <span className="material-symbols-outlined text-[18px]">
              person
            </span>
          </div>
          <a
            href="#"
            title="Đăng xuất"
            className="text-black/80 hover:text-black transition-colors ml-1"
          >
            <span className="material-symbols-outlined text-[20px]">
              logout
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
