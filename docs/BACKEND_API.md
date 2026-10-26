# TÀI LIỆU BACKEND & HỆ THỐNG API - CỔNG THÔNG TIN ĐÀO TẠO (CTT HUST)

Dự án sử dụng kiến trúc **Fullstack Next.js App Router (Node.js)** kết hợp **Database Service** có cơ chế lưu trữ bền vững (Persistent JSON Database) và sẵn sàng mở rộng sang PostgreSQL/MySQL/SQLite.

---

## 1. Kiến trúc tổng quan (Architecture)

```
[ Frontend: React 19 / Next.js Client Components ]
                       │
             HTTP REST API Requests
                       ▼
[ Backend: Next.js Route Handlers (src/app/api/...) ]
                       │
       Business Logic & Data Validation
                       ▼
[ Database Layer: src/lib/db.ts ]
                       │
       Read / Write with Auto-seed
                       ▼
[ Storage: data/db.json ]
```

- **Branch backend**: `be`
- **Thư mục cơ sở dữ liệu**: `ctt-hust-fe/data/db.json` (tự động khởi tạo và seed dữ liệu ban đầu khi chạy server).
- **Authentication**: NextAuth với JWT strategy, xác thực trực tiếp qua CSDL người dùng.

---

## 2. Thiết kế Cơ sở dữ liệu (Database Schema)

### Bảng 1: `users` (Tài khoản người dùng / Sinh viên)
| Trường | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `id` | String (PK) | Mã định danh duy nhất (UUID) |
| `studentId` | String (Unique) | Mã số sinh viên (VD: `"20210842"`) |
| `username` | String (Unique) | Tên đăng nhập |
| `password` | String | Mật khẩu xác thực |
| `fullName` | String | Họ và tên sinh viên |
| `email` | String | Email HUST (VD: `"20210842@sis.hust.edu.vn"`) |
| `major` | String | Chuyên ngành đào tạo |
| `majorCode` | String | Mã ngành (VD: `"IT-VJ"`) |
| `cohort` | String | Khóa (VD: `"K66"`) |
| `curriculumId` | String | Mã CTĐT theo dõi |
| `status` | String | Trạng thái tài khoản (`"active"`) |
| `role` | String | Phân quyền (`"student"` / `"admin"`) |

### Bảng 2: `curriculumGroups` & `courses` (Chương trình đào tạo & Học phần)
- **`categoryCode`**: Mã khối kiến thức (VD: `210` - LLCT, `220` - Toán & KHCB, `230` - Cơ sở ngành, `240` - Chuyên ngành...).
- **`courses`**:
  - `courseCode`: Mã học phần (VD: `SSH1110`, `IT3080`).
  - `courseName`: Tên học phần.
  - `trainingCredits`: Số tín chỉ học tập.
  - `tuitionCredits`: Số tín chỉ học phí.
  - `semesterTerm`: Kỳ học đề xuất (`"Kỳ 1"`, `"Kỳ 2"`...).
  - `recommendedSemester`: Thứ tự kỳ học (1, 2, 3...).
  - `isRequired`: Học phần bắt buộc hay tự chọn.
  - `prerequisiteCode`: Mã học phần tiên quyết (nếu có).

### Bảng 3: `graduationRequirements` (Chuẩn đầu ra & Tiến độ tốt nghiệp)
- `categoryCode`: Mã khối kiến thức đối chiếu.
- `name`: Tên khối chuẩn đầu ra.
- `requiredCredits`: Tổng số tín chỉ yêu cầu của khối.
- `completedCredits`: Số tín chỉ sinh viên đã tích lũy.
- `missingCourses`: Danh sách các môn còn thiếu để đạt chuẩn.

### Bảng 4: `registrations` (Giỏ đăng ký học phần)
- `studentId`: Mã sinh viên đăng ký.
- `courseCode`: Mã học phần đã chọn.
- `className`: Tên học phần.
- `credits`: Số tín chỉ của học phần.
- `registeredDate`: Ngày thực hiện đăng ký.
- `registrationStatus`: Trạng thái (`"Thành công"`, `"Chờ duyệt"`).

---

## 3. Danh sách API Endpoints

### 3.1. Xác thực người dùng (Authentication)
- **Endpoint**: `POST /api/auth/callback/credentials`
- **Mô tả**: Đăng nhập hệ thống bằng MSSV / Username và Mật khẩu.
- **Request Body**:
  ```json
  {
    "username": "20210842",
    "password": "your_password"
  }
  ```

### 3.2. Lấy dữ liệu Chương trình đào tạo (Curriculum)
- **Endpoint**: `GET /api/curriculum`
- **Query Params**:
  - `semester` *(tùy chọn)*: Lọc theo số kỳ học (VD: `?semester=2`).
  - `search` *(tùy chọn)*: Tìm kiếm theo mã môn hoặc tên môn (VD: `?search=giải tích`).
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "categoryCode": "210",
        "categoryName": "Lý luận chính trị & Pháp luật đại cương",
        "courseCount": 6,
        "totalCredits": 13,
        "subGroups": [...]
      }
    ]
  }
  ```

### 3.3. Xem tiến độ tốt nghiệp (Graduation Progress)
- **Endpoint**: `GET /api/graduation`
- **Response**: Danh sách các nhóm điều kiện tốt nghiệp, số tín chỉ đạt được và các môn còn thiếu.

### 3.4. Giỏ đăng ký học phần (Registrations)
#### a) Lấy danh sách học phần đã chọn:
- **Endpoint**: `GET /api/registrations`
- **Response**:
  ```json
  {
    "success": true,
    "studentId": "20210842",
    "totalCredits": 14,
    "count": 4,
    "data": [...]
  }
  ```

#### b) Thêm học phần vào giỏ đăng ký:
- **Endpoint**: `POST /api/registrations`
- **Request Body**:
  ```json
  {
    "courseCode": "IT3080"
  }
  ```
- **Xử lý nghiệp vụ Backend**:
  - Kiểm tra xem môn có trong CTĐT không.
  - Kiểm tra xem môn đã có trong giỏ chưa (tránh đăng ký trùng).
  - Kiểm tra giới hạn tối đa **24 tín chỉ/học kỳ**. Nếu tổng tín chỉ vượt quá 24, trả về lỗi HTTP 400.
  - Lưu vào CSDL `data/db.json`.

#### c) Hủy học phần khỏi giỏ đăng ký:
- **Endpoint**: `DELETE /api/registrations?courseCode=IT3080`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Đã hủy học phần IT3080 thành công!",
    "removedCourseCode": "IT3080"
  }
  ```

#### d) Xác nhận gửi đăng ký học phần:
- **Endpoint**: `POST /api/registrations/submit`
- **Mô tả**: Lưu chính thức toàn bộ giỏ đăng ký học phần vào CSDL.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Gửi đăng ký học phần thành công!",
    "count": 5,
    "totalCredits": 17
  }
  ```

---

## 4. Cách chạy và kiểm tra dự án

1. Đứng tại thư mục `ctt-hust-fe`:
   ```bash
   cd ctt-hust-fe
   ```
2. Chạy môi trường phát triển:
   ```bash
   npm run dev
   ```
3. Mở trình duyệt tại [http://localhost:3000](http://localhost:3000):
   - Đăng nhập với tài khoản:
     - **Tài khoản**: `20210842`
     - **Mật khẩu**: `hust2021`
   - Kiểm tra các chức năng: Xem CTĐT, Thêm môn vào giỏ, Hủy môn, Nộp phiếu đăng ký học phần. Tất cả thao tác đều gọi API Backend và cập nhật trực tiếp vào file CSDL `data/db.json`.
