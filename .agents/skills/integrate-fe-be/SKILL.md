---
name: integrate-fe-be
description: Quy trình, bộ câu hỏi bắt buộc và các nguyên tắc để tích hợp Frontend (Next.js) và Backend (Express.js) chuẩn xác và nhất quán.
---

# Tích Hợp Frontend (Next.js) - API Backend (Express.js)

Tài liệu này định nghĩa ngữ cảnh, bộ câu hỏi bắt buộc, quy trình tích hợp API từng bước và các nguyên tắc lập trình khi làm việc giữa Frontend Next.js và Backend Express.js.

---

## Context & Kiến Trúc Cần Nắm Vững

Trước khi thực hiện bất kỳ công việc tích hợp hoặc kiểm tra API nào giữa FE và BE, Agent **bắt buộc phải đọc và nắm vững cấu trúc chung của cả dự án FE và BE** được định nghĩa trong các skill quy chuẩn:
- [nextjs-skill](../nextjs-skill/SKILL.md): Quy chuẩn kiến trúc Frontend Next.js App Router.
- [i18n-skill](../i18n-skill/SKILL.md): Cấu hình và quản lý hệ thống đa ngôn ngữ (Bilingual vi/en) với next-intl.
- [seo-nextjs-skill](../seo-nextjs-skill/SKILL.md): Quy chuẩn cấu hình SEO (Metadata, JSON-LD, Sitemap, Robots, Open Graph).
- [microservice-nodejs-skill](../microservice-nodejs-skill/SKILL.md): Quy chuẩn kiến trúc Backend (Microservices / Monolith Node.js, Express 5, Sequelize).
- [react-hook-form-zod](../react-hook-form-zod/SKILL.md): Hướng dẫn xây dựng Form type-safe chuẩn với React Hook Form và Zod Schema.
- [sequelize-models](../sequelize-models/SKILL.md): Quy chuẩn định nghĩa, liên kết và chỉnh sửa Sequelize Models ở Backend.

---

## I. Bộ Câu Hỏi Khởi Đầu (Bắt Buộc Phải Hỏi User)

Ngay từ đầu phiên làm việc khi nhận nhiệm vụ tích hợp/kiểm tra API, Agent **bắt buộc phải gộp toàn bộ các câu hỏi dưới đây thành một bộ câu hỏi** để hỏi User trước khi bắt đầu thực hiện các bước truy vết:

1. **Xác định Dự án**: Dự án FE và dự án BE cụ thể cần tích hợp/kiểm tra lần này là dự án nào? (Tên/đường dẫn thư mục FE và BE).
2. **Kiến trúc Backend**: Kiến trúc dự án Backend hiện tại là **Microservices** hay **Monolith**?
3. **Cách thức sử dụng Service phía FE**: Đối với endpoint/chức năng này, phía FE đang/sẽ tổ chức hàm gọi API trong `services` như thế nào? (Ví dụ: gọi qua `httpRequest.ts` hay `fetchApi.ts`).
4. **Quyết định Filter & Search (nếu UI có Filter/Search)**: Nếu màn hình UI có thành phần Filter hoặc SearchBar, bạn muốn thực hiện Filter/Search **Server-side ở BE** (truyền query params lên DB query) hay **Client-side ở FE** (lọc trực tiếp trên mảng dữ liệu trong component/page)?

---

## II. Quy Trình Tích Hợp API Từng Bước (Nội Dung Chính)

### Bước 1: Đọc Hàm Service Phía FE & Lấy URL API Đầy Đủ
1. Khi nhận yêu cầu kiểm tra một hàm gọi API bất kỳ, truy cập thư mục `src/services/` ở FE để đọc mã nguồn hàm đó.
2. **Phân loại Utils gọi API phía FE**:
   - `httpRequest.ts`: Dùng `axios`, phục vụ cho các trang/component client (`use client`), thường áp dụng cho các hàm gọi API cần xác thực (authenticated requests). Trong FE dành cho **Admin**, thường sử dụng toàn bộ `httpRequest.ts`.
   - `fetchApi.ts`: Dùng cho các Server Components/Pages, chủ yếu áp dụng cho các hàm gọi API public (đặc biệt là phương thức `GET`). Trong FE dành cho **User thông thường**, thường kết hợp cả `httpRequest` và `fetchApi`.
3. **Đọc file cấu hình môi trường `.env` ở FE**: Đọc phần tiền tố URL (baseURL / API_URL) trong `.env` trước, sau đó ghép với đường dẫn tương đối trong hàm service để thu được **Full URL API** và phương thức HTTP (`GET`, `POST`, `PUT`, `DELETE`).

### Bước 2: Chuyển Sang BE & Truy Vết qua Gateway, Router, Controller, Service, Model
1. **Xác định Service xử lý ở BE**:
   - Từ **Full URL API** lấy từ FE ở Bước 1, tra API đó trong file `gateway/server.js` (hoặc router gateway) để tìm dịch vụ BE trỏ tới.
   - Vào chính xác Service đó trong thư mục `services/` ở BE, đọc file `server.js` của service để biết API trỏ tới Router nào.
2. **Truy vết mã nguồn qua các tầng BE & Ưu tiên Refactor**:
   - Mở và đọc Router tương ứng $\rightarrow$ Truy vết đến Controller $\rightarrow$ Mở các thư mục `validators/`, `services/`, `models/` tương ứng.
   - **Ưu tiên Refactor BE**: Trong quá trình tích hợp, chủ động sửa đổi và làm gọn (refactor & clean code) phía Backend theo các nguyên tắc (xóa code dư thừa, bỏ defensive check không cần thiết, tối ưu query Sequelize).
   - Nếu phát hiện Model cần điều chỉnh hoặc tạo mới thuộc tính, tuân thủ đúng quy chuẩn tại [sequelize-models](../sequelize-models/SKILL.md).
3. **Kiểm tra Định dạng & Ràng buộc Dữ liệu**:
   - Dữ liệu từ `validators` phải khớp với dữ liệu nhận vào và cách xử lý trong hàm `service`.
   - Các thuộc tính mà hàm `service` xử lý phải **tồn tại trong `models`** (không bắt buộc service phải xử lý tất cả các trường của model, nhưng các trường service đụng tới phải có sẵn trong model).
   - **Xử lý Upload Service**: Đối với các hàm/service liên quan đến upload hình ảnh hoặc tệp tin, bắt buộc phải truyền tham số `folder` (chỉ định rõ thư mục lưu trữ tương ứng với loại dữ liệu hoặc trang đang xử lý, ví dụ: `folder: "avatars"`, `folder: "properties"`).
4. **YÊU CẦU BẮT BUỘC**: Agent phải chắc chắn xác định chính xác dạng dữ liệu trả về (Object/Response shape) từ hàm service/controller ở BE.

### Bước 3: Quay Lại FE - Đối Chiếu Schema, Cập Nhật Types & Render UI
1. **Tìm vị trí gọi Service phía FE**: Từ hàm service ở FE, tìm tất cả những nơi sử dụng hàm này trong file `page.tsx` hoặc `component.tsx`.
2. **Xây dựng Form với React Hook Form & Zod**:
   - Tất cả các Form ở FE **bắt buộc phải sử dụng `react-hook-form` kết hợp với `zod` validation schema** (tham khảo chi tiết tại [react-hook-form-zod](../react-hook-form-zod/SKILL.md)).
   - Mở file Zod schema phía FE để đối chiếu trực tiếp với `validators` ở BE đã đọc ở Bước 2.
   - Sau khi các quy tắc validation khớp hoàn toàn, định nghĩa/cập nhật TypeScript interface vào file `type.ts` tương ứng trong thư mục `src/types/` phía FE cho cả **Request DTO** (nếu có) và **Response** chính xác từ BE.
3. **Sử dụng Filter & Search Component phía FE**:
   - Nếu xử lý Filter/Search phía FE hoặc BE, sử dụng các component chuẩn:
     - `@/components/Internal/common/Filter.tsx` cho dropdown lọc (tự động quản lý `searchParams` URL).
     - `@/components/Internal/common/SearchBar.tsx` cho ô tìm kiếm (tự động debounce 300ms và quản lý `searchParams` URL).
4. **Cập nhật Logic & Render UI**:
   - Quay lại xử lý dữ liệu nhận về tại `page.tsx` hoặc `component.tsx` đang gọi hàm service.
   - **TUYỆT ĐỐI KHÔNG DÙNG FALLBACK KHÔNG CẦN THIẾT**: Vì Agent đã truy vết trực tiếp mã nguồn BE và biết chắc chắn dạng dữ liệu trả về, tuyệt đối **KHÔNG** viết các kiểm tra phòng thủ/fallback thừa (như `return response.data ?? []` hay `|| []`, `Array.isArray()`, ternary type checking ngầm định). Trả về trực tiếp `response.data`.
   - Render lại giao diện UI phía FE chính xác theo dữ liệu đó, sử dụng các màu sắc được định nghĩa trong `globals.css`.
5. **Đa Ngôn Ngữ Hóa Giao Diện (Bilingual / i18n)**:
   - Mọi văn bản hiển thị trên UI (nhãn form, placeholder, tiêu đề bảng, nút bấm, thông báo toast) không được hardcode mà phải đưa vào file từ điển `src/messages/vi.json` và `src/messages/en.json` với namespace rõ ràng.

---

## III. Các Nguyên Tắc Bắt Buộc (Principles)

### 1. Quy tắc Form với React Hook Form & Zod Validation
- Tất cả các Form phía FE **bắt buộc phải sử dụng `react-hook-form` kết hợp `zod`** để đảm bảo validation type-safe đồng bộ từ Client đến Server (tham khảo [react-hook-form-zod](../react-hook-form-zod/SKILL.md)).

### 2. Quy tắc Xử lý Upload Service
- Tất cả các hàm/dịch vụ upload tệp/ảnh phải luôn đính kèm/truyền tham số `folder` để phân loại chính xác vị trí lưu trữ theo module/dữ liệu trang (ví dụ: `folder: "avatars"`, `folder: "products"`, `folder: "documents"`).

### 3. Quy tắc Filter & Search Component
- Phía FE ưu tiên tái sử dụng 2 component dùng chung:
  - `Filter.tsx` (`@/components/Internal/common/Filter.tsx`): Nhận `options`, `paramName`, `placeholder`. Chọn `"all"` sẽ tự động xóa query parameter khỏi URL.
  - `SearchBar.tsx` (`@/components/Internal/common/SearchBar.tsx`): Nhận `paramName` (mặc định `"search"`), `placeholder`. Tự động debounce 300ms và đẩy query param vào URL.
- **Bắt buộc hỏi User**: Khi màn hình có Filter/Search, Agent phải đặt câu hỏi hỏi User quyết định xử lý Filter/Search ở **Server-side (BE)** hay **Client-side (FE)** trước khi thực hiện logic.

### 4. Ưu Tiên Refactor & Sửa Code BE
- Trong quá trình tích hợp API, luôn ưu tiên xem xét, làm gọn và refactor lại code phía Backend theo đúng các nguyên tắc (bỏ code dư thừa, bỏ defensive checking thừa, tối ưu query DB, chuẩn hóa DTO trả về).

### 5. Quy tắc Viết Code Sạch & Ăn Khớp Hoàn Toàn FE - BE
- **Không viết code thừa / fallback ngẫu hứng**: Do Agent đã nắm rõ cấu trúc dữ liệu BE trả về, không viết các đoạn code fallback thừa ngắt ngẫu hứng. **Fallback duy nhất được phép ở FE là `[]`** (ví dụ: `response.data ?? []` dành riêng cho các hàm service trả về mảng dữ liệu).
- **Ăn khớp hoàn toàn**: Tên biến, kiểu dữ liệu, DTO giữa FE và BE phải khớp chính xác 100%.

### 6. Quy tắc Màu Sắc UI (globals.css)
- Giao diện UI phía FE bắt buộc phải sử dụng các biến màu sắc (CSS Color Variables / Design Tokens) được định nghĩa trong `globals.css` (ví dụ: `var(--primary)`, `var(--background)`, `var(--foreground)`...) để đảm bảo sự đồng bộ theme trên toàn ứng dụng.

### 7. Quy tắc Lập Trình với React Compiler (React 19)
Dự án sử dụng `babel-plugin-react-compiler` giúp tự động memoize fine-grained:
- **Bỏ Memoization thủ công**: KHÔNG sử dụng `useMemo`, `useCallback`, hoặc `React.memo`.
- **Tập trung vào Code khai báo (Declarative)**: Tách logic ra các hàm thuần hoặc custom hooks chuẩn.
- **Tuân thủ nghiêm ngặt Rules of React**: Không mutate props/state trực tiếp; không gọi hooks có điều kiện.

### 8. Nhất Quán UI/UX
- Không để khoảng trống dư thừa trong layout bảng hoặc form (ví dụ: khoảng hở không hợp lý dưới nút phân trang).
- Đảm bảo mọi thông báo lỗi từ Backend được catch và hiển thị rõ ràng qua `toast.error()`.

### 9. Quy tắc Ngôn Ngữ Phản Hồi Từ Backend (English Only Response Messages)
- Mọi chuỗi thông báo phản hồi (`message`) và thông báo lỗi validation từ Backend **bắt buộc phải sử dụng Tiếng Anh**. Nếu phát hiện bất kỳ chuỗi thông báo nào ở Backend đang sử dụng Tiếng Việt, phải tiến hành chỉnh sửa và chuẩn hóa lại thành Tiếng Anh.

### 10. Quy tắc Loại Bỏ Hàm Trùng Lặp Phía FE (Eliminate Redundant Service Functions)
- **Loại bỏ hàm trùng lặp/dư thừa**: Khi một hàm service ở FE đã có hàm trùng tên/chức năng chuẩn hơn (ví dụ: `lockAccount` / `unlockAccount` đã có `lockSubordinate` / `unlockSubordinate`), Agent **bắt buộc phải xóa bỏ các hàm dư thừa đó** khỏi file service.
- **Cập nhật nơi sử dụng**: Đồng thời kiểm tra toàn bộ giao diện UI/components phía FE và refactor/thay thế lại tên hàm chuẩn nếu còn sử dụng hàm dư thừa đã bị xóa.

### 11. Quy tắc Đa Ngôn Ngữ Phía Frontend (Bilingual / i18n với next-intl)
- **100% Key Parity**: Mọi khóa văn bản (translation keys) trong `src/messages/vi.json` và `src/messages/en.json` bắt buộc phải trùng khớp cấu trúc và số lượng 1:1.
- **Client Components (`"use client"`)**: Sử dụng hook `useTranslations("namespace")` từ `next-intl`.
- **Server Components / Server Pages**: Sử dụng `getTranslations("namespace")` hoặc `getTranslations({ locale, namespace })` từ `next-intl/server`.
- **Điều hướng & Routing**: Bắt buộc import `Link`, `useRouter`, `usePathname`, `redirect` từ `@/i18n/navigation` (thay vì `next/navigation` hay `next/link`) để tự động bảo toàn locale và đồng bộ tiền tố URL.
- **Toasts & Feedback UI**: Tuyệt đối không hardcode text tiếng Anh/tiếng Việt trực tiếp trong JSX/TSX; mọi text hiển thị, placeholder, nhãn form, modal title, toast message (`toast.success()`, `toast.error()`) đều phải lấy qua `t("key")`.
- **Dynamic Metadata theo ngôn ngữ**: Sử dụng `generateMetadata` kết hợp `getTranslations` để sinh `title` và `description` chuẩn theo từng ngôn ngữ.
- Tham khảo hướng dẫn cấu hình chi tiết tại [i18n-skill](../i18n-skill/SKILL.md).

### 12. Quy tắc SEO (Search Engine Optimization)
- Toàn bộ quy chuẩn về cấu hình Metadata tĩnh/động, Open Graph, Twitter Cards, cấu trúc JSON-LD (Organization, WebSite, FAQPage, Product), Sitemap đa ngôn ngữ, Robots.txt và Web Manifest **bắt buộc tham khảo chi tiết tại [seo-nextjs-skill](../seo-nextjs-skill/SKILL.md)**.

### 13. Quy tắc Dọn Dẹp & Xóa Import Thừa Phía FE (Clean Up Unused Imports)
- **Bắt buộc dọn dẹp sau khi chỉnh sửa**: Sau khi hoàn thành tạo mới, sửa đổi hoặc refactor bất kỳ file nào phía Frontend (`page.tsx`, `component.tsx`, `service.ts`, `type.ts`, `hook.ts`), Agent **bắt buộc phải kiểm tra và xóa toàn bộ các câu lệnh import thư viện, icons, components, utils hoặc types thừa không còn được sử dụng** trong file đó.
- **Không import React mặc định khi không dùng**: Với cơ chế JSX Transform hiện đại trong Next.js / React 19, **tuyệt đối không viết `import React from "react";`** nếu file không trực tiếp sử dụng đối tượng `React` (chỉ import cụ thể các hook như `{ useState, useEffect }` hoặc type khi thực sự có dùng).
- **Không để lại import rác**: Tuyệt đối không để lại các module/icons không dùng (ví dụ: các icon thừa từ `lucide-react`, `radix-ui`, các utils/hooks đã thay thế, import `next/link` cũ) nhằm giữ bundle gọn nhẹ, code sạch, tránh lints warning và đảm bảo chất lượng codebase.

