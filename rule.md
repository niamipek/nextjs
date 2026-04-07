# TÀI LIỆU HƯỚNG DẪN CODE NEXT.JS (APP ROUTER) DÀNH CHO AI AGENT - V5 (ARCHITECT GRADE)

**Mục tiêu:** Đóng vai trò là một Principal/Software Architect. Bắt buộc áp dụng nghiêm ngặt các quy tắc dưới đây khi khởi tạo, viết mới hoặc refactor code Next.js để tối ưu hóa hiệu suất, Kiến trúc dự án, SEO, Khả năng mở rộng, Tính bền vững và tuân thủ chuẩn mực cao nhất của App Router.

---

## 1. Phân định ranh giới Server và Client Component
*Tư duy chủ đạo: "Mặc định là Server, chỉ chuyển sang Client khi bị ép buộc".*

- **BẮT BUỘC dùng `"use client"`:** Khi UI có tương tác người dùng (`onClick`, `onChange`), quản lý trạng thái (`useState`, `useEffect`), hoặc gọi Browser APIs (`window`, `localStorage`).
- **MẶC ĐỊNH dùng Server Component:** Không ghi `"use client"` khi fetch data, cần bảo mật (secret keys), hoặc chỉ hiển thị giao diện tĩnh chuẩn SEO.
- **Nguyên tắc lồng ghép hợp lệ:** Server Component CÓ THỂ import trực tiếp Client Component.
- **Nguyên tắc lồng ghép nghiêm cấm:** Client Component KHÔNG THỂ import trực tiếp Server Component. Bắt buộc phải truyền Server Component dưới dạng `children` prop.
- **Chiến lược tối ưu:** Đẩy thẻ `"use client"` xuống mức sâu nhất, chia nhỏ component (ví dụ: tách riêng nút Submit) thay vì biến toàn bộ trang thành Client Component.

---

## 2. Quản lý Trạng thái qua URL (URL State Management)
- **Quy tắc cốt lõi:** Bắt buộc ưu tiên sử dụng URL Search Parameters (`?color=red&size=M`) thay cho `useState` đối với tính năng Lọc, Tìm kiếm, Phân trang, Tabs.
- **Mục đích:** Giúp chia sẻ link giữ nguyên trạng thái, đồng thời Server Component fetch data chuẩn xác ngay lập tức hỗ trợ SEO.
- **Công cụ áp dụng:** Dùng hook `useSearchParams`, `useRouter`, và `usePathname` từ `next/navigation`.

---

## 3. Định tuyến và Tổ chức Thư mục (Routing & Folder Structure)
- **Private Folders:** Sử dụng tiền tố `_` (ví dụ: `_components`, `_lib`, `_services`) cho các thư mục chứa code không dùng để tạo Route.
- **Route Groups:** Sử dụng `(folderName)` (ví dụ: `(admin)`, `(shop)`) để gom nhóm trang dùng chung Layout mà không làm thay đổi URL.
- **Dynamic Routes:** Đặt tên thư mục trong ngoặc vuông `[id]` cho các trang chi tiết.
- **Not Found:** Bắt buộc có file `not-found.tsx` để xử lý giao diện lỗi 404 tùy chỉnh.

---

## 4. Bảo mật và Biến môi trường (Security & Env)
- **Strict Server:** Bắt buộc import package `server-only` ở dòng đầu tiên của các file chứa logic Database/mã hóa.
- **Biến môi trường:** Tuyệt đối không dùng tiền tố `NEXT_PUBLIC_` cho chuỗi kết nối Database hoặc API Secret Keys. Định nghĩa type rõ ràng cho các biến môi trường (ví dụ bằng Zod) để báo lỗi ngay lúc build nếu thiếu biến.

---

## 5. Tối ưu Hiệu suất & Bundle Size
- **Dynamic Imports:** BẮT BUỘC dùng `next/dynamic` để lazy-load các thư viện Client nặng (như thư viện biểu đồ, rich-text editor).
- **Tối ưu Hình ảnh:** Tuyệt đối KHÔNG dùng thẻ `<img>`. Bắt buộc dùng `<Image>` (`next/image`) với prop `priority` cho các ảnh LCP ở màn hình đầu tiên.
- **Tối ưu Chuyển trang:** Tuyệt đối KHÔNG dùng thẻ `<a>`. Bắt buộc dùng `<Link>` (`next/link`).

---

## 6. Data Fetching, Caching & Mutations
- **Fetch Data:** Bắt buộc fetch trực tiếp trong Server Component.
- **Quản lý Cache:** Chủ động thiết lập chiến lược: `force-cache` (Mặc định), `no-store` (Realtime), hoặc `revalidate` (Theo thời gian).
- **Mutations (Server Actions):** Bắt buộc dùng `"use server"`.
- **Cập nhật UI sau Mutation:** Bắt buộc dùng `revalidatePath` hoặc `revalidateTag` để xóa cache và tải lại dữ liệu mới.
- **Xử lý Loading Form:** Bắt buộc dùng hook `useFormStatus` hoặc `useActionState` từ `react-dom`.

---

## 7. Typing & TypeScript
- **Khai báo Strict:** Bắt buộc khai báo TypeScript interface/type rõ ràng cho toàn bộ Props, API Responses. Cấm dùng type `any`. Bật `strict: true` trong cấu hình.

---

## 8. Middleware & Authentication
- **Kiểm soát truy cập:** Logic kiểm tra session phân quyền BẮT BUỘC đặt trong `middleware.ts`.
- **Edge Runtime:** Tuyệt đối KHÔNG sử dụng các thư viện Node.js thuần (như `bcrypt`, `fs`) bên trong Middleware.

---

## 9. Cấu hình Styling & CSS
- **Framework Khuyến nghị:** Ưu tiên dùng Tailwind CSS kết hợp `clsx` và `tailwind-merge`.
- **Cấm CSS-in-JS Runtime:** Tuyệt đối KHÔNG sử dụng `styled-components` hoặc `emotion` trong App Router để tránh mất hiệu suất Server.

---

## 10. Global State Management
- **Vị trí Provider:** KHÔNG đặt `"use client"` vào file `layout.tsx` gốc.
- **Bọc Provider:** BẮT BUỘC tạo file `Providers.tsx` chứa các Client Providers (Zustand, NextThemes), sau đó import vào `layout.tsx` và bọc xung quanh `{children}`.

---

## 11. SEO Chuyên sâu (Advanced SEO)
- **Metadata Động:** Dynamic Route (`[id]`) bắt buộc export hàm `generateMetadata` để render title, description và Open Graph (OG).
- **Files Chuẩn hóa:** Bắt buộc dùng `sitemap.ts` và `robots.ts` bằng TypeScript để tự động generate cấu trúc SEO.

---

## 12. Kỹ thuật Định tuyến Nâng cao (Advanced Routing)
- **Parallel Routes:** Bắt buộc dùng Parallel Routes (`@folder`) cho UI phức tạp cần hiển thị song song, chia nhỏ trạng thái loading riêng biệt.
- **Intercepting Routes:** Bắt buộc dùng Intercepting Routes (`(..)`) kết hợp Parallel Routes khi làm tính năng Modal thay vì tự viết bằng `useState` và `z-index`.

---

## 13. Tối ưu Hiển thị với Streaming & Suspense
- **Granular Suspense:** KHÔNG bắt toàn bộ trang chờ dữ liệu. Bắt buộc bọc các Server Component gọi API chậm vào `<Suspense fallback={<Skeleton />}>` để stream UI dần xuống trình duyệt.

---

## 14. Tương tác Cơ sở dữ liệu (Database & ORM)
- **Connection Pooling:** Bắt buộc cấu hình Connection Pooling khi dùng Database Serverless (Supabase, Vercel Postgres) để tránh lỗi Max Connections.
- **Data Access Layer:** KHÔNG viết logic query database trực tiếp dính chặt vào UI Component. Bắt buộc tạo thư mục `_services` chứa các hàm truy xuất dữ liệu riêng biệt.

---

## 15. Xử lý Lỗi Toàn cục & Observability
- **Expected Errors:** Quản lý lỗi nghiệp vụ bằng cách trả về object từ Server Action (ví dụ `{ error: "Hết hàng" }`).
- **Unexpected Errors:** Lỗi crash 500 phải được bắt tự động bởi `error.tsx`. Yêu cầu tích hợp Sentry hoặc Datadog để ghi log.

---

## 16. Tiêu chuẩn Trợ năng (Accessibility - a11y)
- **Hình ảnh:** Mọi `<Image>` bắt buộc có thuộc tính `alt`.
- **Tương tác phím:** Các element tự chế (Dropdown, Modal) bắt buộc hỗ trợ điều hướng bàn phím (Tab, Enter) và tuân thủ chuẩn WAI-ARIA. Ưu tiên sử dụng Radix UI.

---

## 17. Clean Code & Khử mùi mã
- **Độ dài file:** Không viết component quá 200 dòng. Tách logic thành pure functions ở file riêng.
- **Validation:** Cấm lạm dụng Optional Chaining (`?.`) quá sâu. Phải validate dữ liệu ngay từ đầu vào bằng Zod.

---

## 18. Đa ngôn ngữ (Internationalization - i18n)
- **Kiến trúc Routing:** Sử dụng Dynamic Segments cho ngôn ngữ (ví dụ `[locale]/page.tsx`).
- **Xử lý Dịch thuật:** Tách biệt toàn bộ chuỗi text cứng trên UI ra file JSON (dictionaries). Server Component BẮT BUỘC dùng dictionary để render HTML tĩnh đa ngôn ngữ, không dùng Client side translation gây giật màn hình.

---

## 19. Chiến lược Kiểm thử (Testing Strategy)
- **Unit Testing:** Bắt buộc viết test bằng Jest và React Testing Library cho các UI Components (như Nút bấm, Form) và các pure functions logic.
- **E2E Testing:** Các luồng cốt lõi (ví dụ: Đăng nhập, Thêm vào giỏ hàng, Thanh toán) BẮT BUỘC phải được cover bởi Playwright hoặc Cypress.

---

## 20. Xử lý Thời gian thực (Real-time & WebSockets)
- **Polling vs Push:** Hạn chế dùng `setInterval` ở Client để gọi API liên tục làm nghẽn server. 
- **Công nghệ thay thế:** Bắt buộc sử dụng Server-Sent Events (SSE) cho các cập nhật một chiều (như trạng thái tồn kho thực tế), hoặc WebSockets/Pusher cho luồng hai chiều.

---

## 21. Kiến trúc Hệ thống UI (UI Component Architecture)
- **Atomic Design:** Bắt buộc thiết kế Component theo nguyên lý chia nhỏ: Atoms (Nút, Input), Molecules (Form Search), Organisms (Header, Product Card).
- **Tránh ràng buộc nghiệp vụ (Decoupling):** Các component UI dùng chung (trong thư mục `_components/ui`) TUYỆT ĐỐI không được chứa logic gọi Database hay API. Logic này phải được đẩy lên Component Cha.