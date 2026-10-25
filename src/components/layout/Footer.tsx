export default function Footer() {
  return (
    <footer
      className="w-full h-48.75 m-auto bg-[#aa261b] bg-no-repeat bg-center flex flex-col justify-end pb-4"
      style={{ backgroundImage: "url('/footer-bg.png')" }}
    >
      <div className="max-w-350 mx-auto px-4 w-full flex flex-wrap items-center justify-between text-[11px] text-white/90 drop-shadow">
        <span>
          © 2024 TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI. Phòng Đào tạo &amp; Quản lý Công nghệ Thông tin.
        </span>
        <span>Hỗ trợ kỹ thuật: support@hust.edu.vn</span>
      </div>
    </footer>
  );
}
