import Image from "next/image";
import Footer from "@/components/layout/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <header
        className="w-full shadow-sm bg-cover bg-center bg-no-repeat border-b border-red-900/10"
        style={{ backgroundImage: "url('/header-bg.png')" }}
      >
        <div className="max-w-350 mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.webp"
              alt="Logo Đại học Bách khoa Hà Nội"
              width={60}
              height={60}
              className="h-13 w-auto object-contain shrink-0"
              priority
            />
            <div>
              <span className="block text-[15px] text-black uppercase font-bold tracking-tight">
                ĐẠI HỌC BÁCH KHOA HÀ NỘI
              </span>
              <span className="block text-[11px] text-black/90 uppercase tracking-wider font-semibold">
                HANOI UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white/70 px-3 py-1.5 rounded border border-gray-300">
            <span className="material-symbols-outlined text-[16px] text-primary">
              school
            </span>
            <span>CỔNG THÔNG TIN ĐÀO TẠO</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
