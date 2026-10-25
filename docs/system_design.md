## 1. Scope (Phạm vi dự án)

### 1.1. In-Scope (Phạm vi bao gồm)

Phân hệ **Đăng ký học phần (ĐKHP)** thuộc Cổng thông tin đào tạo HUST (CTT HUST) tập trung tối ưu hóa quy trình xác định nguyện vọng học tập của sinh viên thông qua các tính năng:

- **Tích hợp & Hiển thị dữ liệu (Top Section):**
  - Tích hợp dữ liệu Chương trình đào tạo (CTĐT) hiển thị theo chiều dọc (Top-Bottom Layout) ngay trên cùng một trang, loại bỏ thao tác chuyển tab.
  - Bảng CTĐT giữ nguyên cấu trúc phân cấp truyền thống (Mã loại HP $\rightarrow$ Loại HP $\rightarrow$ Môn học).
  - Bảng CTĐT có thể cuộn nội bộ (Scrollable Container) với tiêu đề dính chặt (sticky header).

- **Thanh công cụ & Bộ lọc thông minh:**
  - Ô tìm kiếm (Search input).
  - Dropdown lọc "Chế độ hiển thị / Sắp xếp" bao gồm: \_Mặc định (Theo Mã loại HP), Theo kỳ đề xuất, Ưu tiên: Môn đang nợ, Ưu tiên: Môn cải thiện (Điểm $\le D+$).

- **Cảnh báo & Chỉ báo trực quan (UX/UI):**
  - Dán nhãn lịch mở môn (`[Mở 2 Kỳ]`, `[Chỉ mở Kỳ 1]`, `[Chỉ mở Kỳ 2]`) tại cột KỲ MỞ MÔN.
  - Hiển thị thông tin môn tiên quyết bằng chữ in nghiêng nhỏ ngay dưới TÊN HP.
  - Biểu tượng icon trên nền vàng cho các học phần BẮT BUỘC.
  - Hiển thị điểm số cũ tại cột ĐIỂM CHỮ khi chọn lọc môn cải thiện.

- **Trực quan hóa Tiến độ & Điều kiện tốt nghiệp (Middle Section):**
  - Hiển thị các khối kiến thức (LLCT, TKHCB, CSCLN, CNTC) dưới dạng thẻ (Cards) độc lập.
  - Cung cấp thanh tiến trình (Progress Bar) động, phản hồi theo thời gian thực dựa trên các môn đã tích lũy và các môn vừa được thêm vào giỏ hàng.
  - Hiển thị rõ trạng thái hoàn thành (VD: "Đủ điều kiện" hoặc "Cần thêm X TC").

- **Quản lý chọn môn (Giỏ hàng - Bottom Section):**
  - Nút thao tác `[+]` màu xanh lục để thêm môn; chuyển thành chữ xanh in đậm `✓ Đã thêm` khi môn đã được chọn.
  - Tự động khóa nút thêm (màu xám, ghi `[Không mở]`) nếu học phần không tổ chức trong học kỳ hiện tại.
  - Bảng "Học phần đã chọn" hiển thị bên dưới với các cột: MÃ HP, TÊN LỚP, NGÀY ĐĂNG KÝ, TT ĐĂNG KÝ, SỐ TC, THAO TÁC (Nút Xóa màu đỏ).
  - Tự động tính tổng số tín chỉ tích lũy ở footer.
  - Nút gửi đăng ký kèm cảnh báo nếu sinh viên vượt quá giới hạn 24 tín chỉ.

### 1.2. Out-of-Scope (Phạm vi không bao gồm)

- **Đăng ký lớp học phần (ĐKLHP):** Thao tác chọn thời khóa biểu, lịch học, giảng viên và cạnh tranh suất vào lớp theo thời gian thực.

## 2. Main Workflows (Các luồng quy trình chính)

### 2.1. WF-01: Tra cứu & Lọc Chương trình đào tạo

Sinh viên sử dụng thanh công cụ để tra cứu hoặc lọc các học phần trong bảng CTĐT theo chế độ mặc định, theo kỳ đề xuất, lọc môn đang nợ hoặc môn cải thiện.

### 2.2. WF-02: Thêm Học phần vào Giỏ hàng

Sinh viên xem thông tin học phần (kỳ mở môn, điều kiện tiên quyết, tính bắt buộc) trên bảng CTĐT và nhấn nút `[+]` để thêm vào danh sách đăng ký. Hệ thống kiểm tra điều kiện (môn có mở trong kỳ hay không, giới hạn tín chỉ, trùng lặp), cập nhật hiển thị bảng giỏ hàng, và tính toán lại thanh tiến trình mô phỏng ở khu vực Tiến độ Tốt nghiệp.

### 2.3. WF-03: Rà soát & Hủy Học phần khỏi Giỏ hàng

Sinh viên kiểm tra lại danh sách môn đã chọn ở bảng dưới và nhấn "Xóa" nếu muốn gỡ môn học khỏi giỏ hàng. Hệ thống cập nhật lại trạng thái nút bấm ở bảng CTĐT, giảm tổng số tín chỉ và cập nhật lùi thanh tiến trình ở khu vực Tiến độ Tốt nghiệp.

### 2.4. WF-04: Xác nhận & Gửi Đăng ký Học phần

Sinh viên kiểm tra tổng số tín chỉ hiện tại và nhấn nút "GỬI ĐĂNG KÝ". Hệ thống xác nhận và hoàn tất thao tác ĐKHP.

## 3. Functional Requirements Details

### 3.1. Tra cứu & Lọc Chương trình đào tạo (Top Section)

| **FR ID** | **Feature**                       | **Description**                                                                                                                                                                                                          |
| --------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FR-01     | Hiển thị CTĐT toàn khóa           | Hệ thống hiển thị bảng Chương trình đào tạo với khả năng cuộn nội bộ (Scrollable Container) và tiêu đề dính (Sticky Header). Dữ liệu được gom nhóm phân cấp mô phỏng cấu trúc cũ: Cấp 1 (Mã loại HP) và Cấp 2 (Loại HP). |
| FR-02     | Bộ lọc thông minh (Smart Filters) | Hệ thống cung cấp Dropdown cho phép thay đổi chế độ hiển thị bảng CTĐT gồm 4 tùy chọn: Mặc định (Theo Mã loại HP), Theo kỳ đề xuất, Ưu tiên: Môn đang nợ, Ưu tiên: Môn cải thiện (Điểm $\le D+$).                        |
| FR-03     | Tìm kiếm học phần                 | Hệ thống cho phép sinh viên nhập từ khóa vào ô tìm kiếm để tra cứu nhanh học phần trong danh sách CTĐT.                                                                                                                  |
| FR-04     | Chỉ báo Kỳ mở môn                 | Hệ thống dán nhãn trực quan (Badge) tại cột KỲ MỞ MÔN để chỉ rõ thời điểm tổ chức học phần: `[Mở 2 Kỳ]`, `[Chỉ mở Kỳ 1]`, `[Chỉ mở Kỳ 2]`.                                                                               |
| FR-05     | Hiển thị Kỳ đề xuất               | Hệ thống có cột "Kỳ đề xuất" nằm bên phải cột "Kỳ mở môn" trong bảng CTĐT, hiển thị học kỳ định hướng theo khung chương trình chuẩn (chỉ mang tính chất gợi ý).                                                          |
| FR-06     | Cảnh báo Môn tiên quyết           | Hệ thống tự động hiển thị thông tin môn điều kiện (tiên quyết/song hành) bằng văn bản in nghiêng nhỏ, màu xám ngay bên dưới tên học phần.                                                                                |
| FR-07     | Chỉ báo Môn bắt buộc              | Hệ thống sử dụng một biểu tượng nổi bật (ví dụ: dấu sao/chấm than) đặt trong ô nền vàng để đánh dấu các học phần bắt buộc thay cho văn bản thông thường.                                                                 |
| FR-08     | Hiển thị Điểm cũ                  | Khi kích hoạt bộ lọc "Môn cải thiện", hệ thống tự động truy xuất và hiển thị điểm chữ của các học phần có mức điểm $\le D+$ tại cột ĐIỂM CHỮ.                                                                            |

### 3.2. Trực quan hóa Tiến độ & Điều kiện Tốt nghiệp (Middle Section)

| **FR ID** | **Feature**                | **Description**                                                                                                                                                                                              |
| --------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FR-09     | Thẻ Khối kiến thức (Cards) | Hệ thống phân rã các điều kiện tốt nghiệp thành các thẻ độc lập (Ví dụ: Lý luận chính trị & Pháp luật, Toán & Khoa học cơ bản, Cơ sở cốt lõi ngành, Kiến thức chuyên ngành & Tự chọn) đặt ngang nhau.        |
| FR-10     | Thanh Tiến trình động      | Mỗi thẻ hiển thị 2 mốc dữ liệu qua thanh tiến trình: "Đạt" (số TC đã tích lũy thực tế) và "Sau thêm" (Dự kiến tổng TC sau khi cộng các môn đang chọn trong Giỏ hàng). Tỷ lệ % hoàn thành hiển thị tương ứng. |
| FR-11     | Cảnh báo Trạng thái Khối   | Dưới mỗi thanh tiến trình có dòng trạng thái. Nếu đã đủ/vượt số TC yêu cầu, hiển thị "Đủ điều kiện" (màu xanh, icon check). Nếu chưa đủ, tính toán và hiển thị "Cần thêm X TC" (màu cam).                    |

### 3.3. Quản lý Giỏ hàng & Thao tác chọn môn (Bottom Section)

| **FR ID** | **Feature**                 | **Description**                                                                                                                                                         |
| --------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-12     | Thêm học phần (1-Click Add) | Hệ thống cho phép sinh viên bấm nút `[+]` màu xanh lục tại cột Thêm để đưa môn học vào giỏ hàng. Sau khi thêm, nút chuyển trạng thái thành `✓ Đã thêm`.                 |
| FR-13     | Khóa thao tác Thêm môn      | Hệ thống tự động vô hiệu hóa nút `[+]`, chuyển sang màu xám và đổi text thành `[Không mở]` đối với các học phần không được tổ chức trong học kỳ hiện tại.               |
| FR-14     | Hiển thị danh sách ĐKHP     | Hệ thống render bảng Học phần đã chọn phía dưới bảng CTĐT, bao gồm các cột: MÃ HP, TÊN LỚP, NGÀY ĐĂNG KÝ, TT ĐĂNG KÝ, SỐ TC, THAO TÁC.                                  |
| FR-15     | Hủy học phần đã chọn        | Hệ thống cho phép sinh viên gỡ bỏ môn học khỏi giỏ hàng thông qua nút `Xóa` màu đỏ. Nút của học phần tương ứng trên bảng CTĐT sẽ khôi phục về trạng thái `[+]` ban đầu. |

### 3.4. Rà soát & Xác nhận Đăng ký

| **FR ID** | **Feature**              | **Description**                                                                                                                                                              |
| --------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-16     | Bộ đếm Tổng tín chỉ      | Hệ thống tự động tính toán tổng số tín chỉ của các môn trong giỏ hàng theo thời gian thực và hiển thị tại góc trái Footer (Ví dụ: "Tổng tín chỉ: 13 / 24").                  |
| FR-17     | Xác thực quy chế Tín chỉ | Khi sinh viên nhấn "GỬI ĐĂNG KÝ", hệ thống thực hiện kiểm tra ràng buộc. Nếu giỏ hàng trống hoặc vượt quá 24 tín chỉ, hệ thống chặn thao tác và hiển thị cảnh báo. |
| FR-18     | Ghi nhận nguyện vọng     | Nếu vượt qua bước kiểm tra tín chỉ, hệ thống lưu danh sách ĐKHP vào cơ sở dữ liệu, hiển thị thông báo thành công.                                                            |

### 3.5. Business Rules and Constraints

| **Rule ID** | **Name**                        | **Constraint & System Validation**                                                                                                                                                                                                  |
| ----------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BR-01       | Ràng buộc Tín chỉ Tối đa        | Sinh viên không được phép đăng ký vượt quá 24 tín chỉ trong một học kỳ để đảm bảo chất lượng học tập. Nếu thao tác Thêm môn làm tổng số TC vượt mốc 24, hệ thống từ chối Thêm và xuất Alert cảnh báo.                               |
| BR-02       | Ràng buộc Môn không mở trong kỳ | Hệ thống tự động vô hiệu hóa nút bấm (chuyển sang màu xám, ghi `[Không mở]`) tại cột THÊM đối với những học phần có lịch mở môn trái với học kỳ hiện tại (Ví dụ: Đang là Học kỳ 1, nhưng môn dán nhãn `[Chỉ mở Kỳ 2]`).             |
| BR-03       | Chống Trùng lặp Học phần        | Mỗi mã học phần (MÃ HP) chỉ được phép tồn tại duy nhất một lần trong Giỏ hàng ĐKHP (Bảng Học phần đã chọn). Nếu sinh viên cố tình thêm lại, hệ thống cảnh báo _"Học phần [Mã HP] đã có trong danh sách đăng ký!"_ và chặn thao tác. |

## 5. Use Case Descriptions

#### UC-01: Tra cứu & Lọc Chương trình đào tạo (Top Section)

| **Field**                       | **Specification**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Primary Actors**              | Sinh viên                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Secondary Actors**            | Hệ thống (Truy xuất dữ liệu CTĐT và Bảng điểm cá nhân)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Description**                 | Cho phép sinh viên xem, tra cứu và lọc dữ liệu học phần từ CTĐT toàn khóa thông qua thanh công cụ (Tìm kiếm & Dropdown Chế độ hiển thị) để dễ dàng xác định môn học cần đăng ký.                                                                                                                                                                                                                                                                                                                                                                 |
| **Preconditions**               | Sinh viên đã đăng nhập và truy cập phân hệ Đăng ký học phần trên CTT HUST.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Postconditions**              | Bảng CTĐT (Top Section) render lại danh sách môn học khớp với điều kiện lọc. Trạng thái của các nút `[+]` và nhãn hiển thị được cập nhật tương ứng với kết quả lọc.                                                                                                                                                                                                                                                                                                                                                                              |
| **Normal Sequence/Flow**        | 1. Hệ thống mặc định load bảng CTĐT toàn khóa, phân nhóm theo _Mã loại HP_.<br><br>2. Sinh viên nhập từ khóa vào ô tìm kiếm hoặc click vào Dropdown "Chế độ hiển thị / Sắp xếp" và chọn một tùy chọn (VD: "Theo kỳ đề xuất", "Ưu tiên: Môn đang nợ",...).<br><br>3. Sinh viên chọn một tùy chọn bộ lọc (VD: "Ưu tiên: Môn cải thiện (Điểm $\le D+$)"). <br><br>4. Hệ thống truy xuất bảng điểm cá nhân, lọc các môn có điểm cũ $\le D+$ và load lại bảng CTĐT.<br><br>5. Bảng hiển thị danh sách môn cải thiện kèm điểm chữ cũ ở cột _ĐIỂM CHỮ_. |
| **Alternative Sequences/Flows** | 3a. Sinh viên chọn "Ưu tiên: Môn đang nợ":<br><br>3a1. Hệ thống truy vấn lịch sử học tập, lọc các học phần bắt buộc của kỳ trước mà sinh viên chưa tích lũy và hiển thị ưu tiên lên đầu danh sách.<br><br>3b. Sinh viên chọn "Theo kỳ đề xuất":<br><br>3b1. Hệ thống tự động cấu trúc và gom nhóm lại bảng CTĐT dựa trên dữ liệu của cột "Kỳ đề xuất". Bảng sẽ hiển thị danh sách các học phần được phân tách theo từng học kỳ của lộ trình chuẩn (VD: Học kỳ 1, Học kỳ 2,...) thay vì theo Mã loại học phần.                                    |

#### UC-02: Thêm Học phần vào Giỏ hàng (1-Click Add)

| **Field**                       | **Specification**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary Actors**              | Sinh viên                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Secondary Actors**            | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Description**                 | Cho phép sinh viên chọn học phần trực tiếp từ bảng CTĐT bằng cách nhấn nút `[+]` và đưa học phần đó vào Bảng Học phần đã chọn (Giỏ hàng) ở phần dưới (Bottom Section).                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Preconditions**               | Học phần đang có trạng thái mở trong học kỳ hiện tại (Nút `[+]` màu xanh lục đang active).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Postconditions**              | Học phần được bổ sung vào Bảng Học phần đã chọn. Nút thao tác trên CTĐT chuyển sang `✓ Đã thêm`. Bộ đếm tổng TC và các thanh tiến trình điều kiện tốt nghiệp (Middle Section) được cập nhật tương ứng.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Normal Sequence/Flow**        | 1. Sinh viên cuộn (scroll) bảng CTĐT để rà soát các môn cần học (kiểm tra môn tiên quyết, nhãn kỳ mở môn, tính bắt buộc).<br><br>2. Nhấn nút `[+]` màu xanh lục tại cột _THÊM_.<br> <br>3. Hệ thống kiểm tra các ràng buộc: Chống trùng lặp (BR-04) và Giới hạn tín chỉ tối đa (BR-02).<br><br>4. Thêm một hàng dữ liệu chứa thông tin môn học vào Bảng Học phần đã chọn (Bottom Section).<br><br>5. Chuyển đổi trạng thái nút vừa click thành chữ in đậm màu xanh lục `✓ Đã thêm`.<br><br>6. Cập nhật lại số tín chỉ ở góc trái Footer và cập nhật trạng thái "Sau thêm" trên thẻ Khối kiến thức tương ứng ở Middle Section. |
| **Alternative Sequences/Flows** | 3a. Vi phạm ràng buộc Tín chỉ tối đa (BR-02):<br><br>3a1. Tổng số tín chỉ dự kiến vượt 24 TC.<br><br>3a2. Hệ thống hiển thị Alert cảnh báo lỗi vi phạm.<br><br>3a3. Hủy bỏ thao tác thêm môn.<br><br>3b. Vi phạm ràng buộc Chống trùng lặp (BR-04):<br><br>3b1. Hệ thống phát hiện mã học phần đã tồn tại trong giỏ hàng.<br><br>3b2. Hệ thống hiển thị Alert cảnh báo môn học đã tồn tại.<br><br>3b3. Hủy bỏ thao tác thêm môn.                                                                                                                                                                                              |

#### UC-03: Rà soát & Hủy Học phần khỏi Giỏ hàng

| **Field**                | **Specification**                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary Actors**       | Sinh viên                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Secondary Actors**     | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Description**          | Cho phép sinh viên kiểm tra danh sách ĐKHP dự kiến và xóa các môn học không mong muốn khỏi Bảng Học phần đã chọn.                                                                                                                                                                                                                                                                                                                                                      |
| **Preconditions**        | Bảng Học phần đã chọn (Bottom Section) có chứa ít nhất 1 học phần hợp lệ.                                                                                                                                                                                                                                                                                                                                                                                              |
| **Postconditions**       | Hàng dữ liệu của môn học bị xóa khỏi Bảng Học phần đã chọn. Trạng thái của môn học đó trên bảng CTĐT khôi phục về nút `[+]`. Bộ đếm tổng TC và thanh tiến trình điều kiện tốt nghiệp được giảm đi tương ứng.                                                                                                                                                                                                                                                           |
| **Normal Sequence/Flow** | 1. Sinh viên kiểm tra Bảng Học phần đã chọn ở phần Bottom Section.<br><br>2. Nhấn vào nút (text link) `Xóa` màu đỏ tại cột _THAO TÁC_.<br><br>3. Hệ thống tiến hành xóa hàng dữ liệu tương ứng khỏi bảng.<br><br>4. Trừ đi số tín chỉ của học phần bị xóa, cập nhật bộ đếm Tổng TC và cập nhật lùi thanh tiến trình ở khu vực Tiến độ Tốt nghiệp.<br><br>5. Khôi phục lại trạng thái của học phần tương ứng trên bảng CTĐT (từ `✓ Đã thêm` trở về nút `[+]` xanh lục). |

#### UC-04: Xác nhận & Gửi Đăng ký Học phần

| **Field**                       | **Specification**                                                                                                                                                                                                                                                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary Actors**              | Sinh viên                                                                                                                                                                                                                                                                                                                     |
| **Secondary Actors**            | Hệ thống                                                                                                                                                                                                                                                                                                                      |
| **Description**                 | Quá trình chốt danh sách môn học trong giỏ hàng, xác thực ràng buộc quy chế và ghi nhận nguyện vọng ĐKHP vào cơ sở dữ liệu của CTT HUST.                                                                                                                                                                                      |
| **Preconditions**               | Bảng Học phần đã chọn có chứa danh sách các môn sinh viên muốn đăng ký.                                                                                                                                                                                                                                                       |
| **Postconditions**              | Yêu cầu ĐKHP được lưu vào hệ thống, thông báo thành công và cấp Mã giao dịch điện tử.                                                                                                                                                                                                                                         |
| **Normal Sequence/Flow**        | 1. Sinh viên kiểm tra lại Tổng tín chỉ tại Footer (đảm bảo không vượt quá 24 TC).<br><br>2. Nhấn nút "GỬI ĐĂNG KÝ" ở góc phải Footer.<br><br>3. Hệ thống ghi nhận dữ liệu đăng ký vào CSDL.<br><br>4. Hệ thống hiển thị thông báo thành công. |
| **Alternative Sequences/Flows** | 3a. Giỏ hàng trống:<br><br>3a1. Hệ thống xác định chưa có học phần nào trong giỏ hàng.<br><br>3a2. Hệ thống hiển thị cảnh báo yêu cầu chọn học phần trước khi gửi.<br><br>3a3. Hủy bỏ quá trình gửi đăng ký. |
