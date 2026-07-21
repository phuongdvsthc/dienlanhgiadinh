# Thiết kế Cơ sở dữ liệu Firestore - Điện lạnh Gia Định

Tài liệu này mô tả cấu trúc dữ liệu cho dự án Điện lạnh Gia Định trên Firebase Firestore.

## Quy ước chung
- **Slug**: Chuỗi không dấu, chữ thường, cách nhau bằng dấu gạch ngang (`-`), duy nhất trong từng collection.
- **Tiền tệ**: Lưu ở định dạng `number`, đơn vị VNĐ.
- **Thời gian**: Sử dụng kiểu `Firestore Timestamp`. Ưu tiên server timestamp cho thời điểm tạo (`createdAt`) và cập nhật (`updatedAt`).
- **Bảo mật**: KHÔNG lưu mật khẩu, private key, hay dữ liệu thẻ thanh toán.
- **Nội dung**: Ưu tiên sử dụng content blocks thay vì lưu HTML không kiểm soát.

---

## 1. Collection: `categories`
- **Mục đích**: Lưu trữ danh mục sản phẩm.
- **Document ID**: Tự động tạo (Auto-generated ID) hoặc sử dụng `slug` làm ID nếu đảm bảo tính duy nhất.
- **Quyền đọc/ghi**:
  - Đọc: Public (Mọi người)
  - Ghi: Chỉ Admin
- **Fields**:
  - `name` (string, bắt buộc): Tên danh mục.
  - `slug` (string, bắt buộc): Đường dẫn thân thiện SEO (duy nhất).
  - `description` (string, tùy chọn): Mô tả danh mục.
  - `icon` (string, tùy chọn): Tên icon hoặc URL ảnh đại diện cho danh mục.
  - `image` (string, tùy chọn): URL ảnh bìa danh mục.
  - `parentId` (string, tùy chọn): ID của danh mục cha (nếu có phân cấp).
  - `order` (number, tùy chọn): Thứ tự hiển thị.
  - `status` (string, bắt buộc): Trạng thái hiển thị (`published`, `draft`).
  - `createdAt` (timestamp, bắt buộc)
  - `updatedAt` (timestamp, bắt buộc)
- **Quan hệ**: 1 danh mục có nhiều sản phẩm (`products`). Danh mục có thể có danh mục con (`parentId`).
- **Query dự kiến**:
  - Lấy tất cả danh mục đang hoạt động, sắp xếp theo `order`.
  - Lấy danh mục con dựa trên `parentId`.
- **Index**: 
  - `status` (ASC) + `order` (ASC)

## 2. Collection: `products`
- **Mục đích**: Lưu trữ thông tin sản phẩm, linh kiện điện lạnh.
- **Document ID**: Auto-generated ID.
- **Quyền đọc/ghi**:
  - Đọc: Public (chỉ đọc các sản phẩm `status: 'published'`)
  - Ghi: Chỉ Admin
- **Fields**:
  - `name` (string, bắt buộc): Tên sản phẩm.
  - `slug` (string, bắt buộc): Slug (duy nhất).
  - `categoryId` (string, bắt buộc): ID của danh mục sản phẩm (`categories`).
  - `price` (number, bắt buộc): Giá sản phẩm (đơn vị VNĐ, 0 nếu muốn hiển thị "Liên hệ").
  - `originalPrice` (number, tùy chọn): Giá gốc (nếu có giảm giá).
  - `excerpt` (string, tùy chọn): Mô tả ngắn.
  - `content` (array/string, tùy chọn): Nội dung chi tiết (Nên dùng array of blocks).
  - `images` (array of strings, bắt buộc): Danh sách URL hình ảnh.
  - `stockStatus` (string, bắt buộc): Tình trạng kho (`in_stock`, `out_of_stock`, `contact`).
  - `features` (array of strings, tùy chọn): Các tính năng/thông số kỹ thuật nổi bật.
  - `status` (string, bắt buộc): Trạng thái (`published`, `draft`, `archived`).
  - `isFeatured` (boolean, tùy chọn): Đánh dấu sản phẩm nổi bật.
  - `createdAt` (timestamp, bắt buộc)
  - `updatedAt` (timestamp, bắt buộc)
- **Quan hệ**: Thuộc về 1 danh mục (`categoryId`).
- **Query dự kiến**:
  - Lấy sản phẩm nổi bật (`isFeatured: true`, `status: 'published'`).
  - Lấy sản phẩm theo danh mục (`categoryId`, `status: 'published'`).
  - Lấy chi tiết sản phẩm theo `slug`.
- **Index**:
  - `status` (ASC) + `isFeatured` (DESC)
  - `categoryId` (ASC) + `status` (ASC) + `createdAt` (DESC)
  - `slug` (ASC)

## 3. Collection: `postCategories`
- **Mục đích**: Phân loại bài viết blog/kiến thức.
- **Document ID**: Auto-generated ID.
- **Quyền đọc/ghi**:
  - Đọc: Public
  - Ghi: Chỉ Admin
- **Fields**:
  - `name` (string, bắt buộc): Tên danh mục bài viết.
  - `slug` (string, bắt buộc): Slug (duy nhất).
  - `description` (string, tùy chọn): Mô tả danh mục.
  - `order` (number, tùy chọn): Thứ tự hiển thị.
  - `status` (string, bắt buộc): Trạng thái (`published`, `draft`).
  - `createdAt` (timestamp, bắt buộc)
  - `updatedAt` (timestamp, bắt buộc)
- **Quan hệ**: 1 danh mục bài viết có nhiều bài viết (`posts`).
- **Query dự kiến**:
  - Lấy danh sách danh mục blog hiển thị.
- **Index**: `status` (ASC) + `order` (ASC)

## 4. Collection: `posts`
- **Mục đích**: Lưu trữ bài viết blog, chia sẻ kinh nghiệm, kiến thức.
- **Document ID**: Auto-generated ID.
- **Quyền đọc/ghi**:
  - Đọc: Public (chỉ `status: 'published'`)
  - Ghi: Chỉ Admin
- **Fields**:
  - `title` (string, bắt buộc): Tiêu đề bài viết.
  - `slug` (string, bắt buộc): Slug (duy nhất).
  - `categoryId` (string, tùy chọn): ID của danh mục bài viết (`postCategories`).
  - `excerpt` (string, bắt buộc): Mô tả ngắn gọn.
  - `content` (array/string, bắt buộc): Nội dung bài viết (array of blocks).
  - `image` (string, bắt buộc): URL ảnh đại diện.
  - `authorId` (string, tùy chọn): ID người viết (`admins`).
  - `views` (number, tùy chọn): Số lượt xem.
  - `status` (string, bắt buộc): Trạng thái (`published`, `draft`, `archived`).
  - `isFeatured` (boolean, tùy chọn): Bài viết nổi bật.
  - `publishedAt` (timestamp, tùy chọn): Thời gian xuất bản.
  - `createdAt` (timestamp, bắt buộc)
  - `updatedAt` (timestamp, bắt buộc)
- **Quan hệ**: Thuộc về danh mục bài viết (`categoryId`), được viết bởi admin (`authorId`).
- **Query dự kiến**:
  - Lấy bài viết mới nhất (`status: 'published'`, sắp xếp theo `publishedAt` hoặc `createdAt` DESC).
  - Lấy bài viết theo danh mục (`categoryId`, `status: 'published'`).
  - Lấy chi tiết theo `slug`.
  - Lấy bài nổi bật (`isFeatured: true`, `status: 'published'`).
- **Index**:
  - `status` (ASC) + `publishedAt` (DESC)
  - `categoryId` (ASC) + `status` (ASC) + `publishedAt` (DESC)
  - `slug` (ASC)

## 5. Collection: `services`
- **Mục đích**: Lưu trữ thông tin các dịch vụ cung cấp (sửa chữa, bảo trì...).
- **Document ID**: Auto-generated ID.
- **Quyền đọc/ghi**:
  - Đọc: Public (chỉ `status: 'published'`)
  - Ghi: Chỉ Admin
- **Fields**:
  - `title` (string, bắt buộc): Tên dịch vụ.
  - `slug` (string, bắt buộc): Slug (duy nhất).
  - `excerpt` (string, bắt buộc): Mô tả ngắn.
  - `content` (array/string, bắt buộc): Chi tiết dịch vụ.
  - `image` (string, tùy chọn): URL ảnh đại diện.
  - `icon` (string, tùy chọn): Icon đại diện.
  - `priceRange` (string, tùy chọn): Khoảng giá (VD: "Từ 150.000đ").
  - `order` (number, tùy chọn): Thứ tự hiển thị.
  - `status` (string, bắt buộc): (`published`, `draft`).
  - `createdAt` (timestamp, bắt buộc)
  - `updatedAt` (timestamp, bắt buộc)
- **Quan hệ**: Thường hiển thị độc lập. Có thể dẫn link đặt lịch hẹn (`contacts` / `orders`).
- **Query dự kiến**:
  - Lấy danh sách dịch vụ đang cung cấp (`status: 'published'`, sắp xếp theo `order`).
- **Index**: `status` (ASC) + `order` (ASC)

## 6. Collection: `orders`
- **Mục đích**: Lưu trữ thông tin đơn hàng/yêu cầu mua hàng.
- **Document ID**: Auto-generated ID.
- **Quyền đọc/ghi**:
  - Đọc: Chỉ Admin.
  - Ghi: Public (Chỉ được tạo mới), Admin (đọc/sửa trạng thái).
- **Fields**:
  - `customerName` (string, bắt buộc): Tên khách hàng.
  - `customerPhone` (string, bắt buộc): Số điện thoại.
  - `customerAddress` (string, tùy chọn): Địa chỉ giao hàng.
  - `customerEmail` (string, tùy chọn): Email khách hàng.
  - `items` (array of objects, bắt buộc): Danh sách sản phẩm đặt mua.
    - `productId` (string)
    - `productName` (string)
    - `quantity` (number)
    - `price` (number)
  - `totalAmount` (number, bắt buộc): Tổng giá trị đơn hàng (VNĐ).
  - `note` (string, tùy chọn): Ghi chú của khách hàng.
  - `status` (string, bắt buộc): Trạng thái đơn hàng (`pending`, `processing`, `completed`, `cancelled`).
  - `createdAt` (timestamp, bắt buộc)
  - `updatedAt` (timestamp, bắt buộc)
- **Quan hệ**: Tham chiếu `products`.
- **Query dự kiến**:
  - Admin lấy danh sách đơn hàng mới (`status: 'pending'`, sắp xếp `createdAt` DESC).
- **Index**: `status` (ASC) + `createdAt` (DESC)

## 7. Collection: `contacts`
- **Mục đích**: Lưu trữ thông tin liên hệ, yêu cầu tư vấn, yêu cầu dịch vụ sửa chữa từ khách hàng.
- **Document ID**: Auto-generated ID.
- **Quyền đọc/ghi**:
  - Đọc: Chỉ Admin.
  - Ghi: Public (Chỉ tạo mới), Admin (đọc/sửa trạng thái).
- **Fields**:
  - `name` (string, bắt buộc): Tên người liên hệ.
  - `phone` (string, bắt buộc): Số điện thoại.
  - `email` (string, tùy chọn): Email.
  - `subject` (string, tùy chọn): Tiêu đề / Loại yêu cầu.
  - `message` (string, bắt buộc): Nội dung chi tiết.
  - `status` (string, bắt buộc): Trạng thái xử lý (`new`, `in_progress`, `resolved`).
  - `createdAt` (timestamp, bắt buộc)
  - `updatedAt` (timestamp, bắt buộc)
- **Quan hệ**: Độc lập.
- **Query dự kiến**:
  - Admin xem yêu cầu liên hệ chưa xử lý.
- **Index**: `status` (ASC) + `createdAt` (DESC)

## 8. Collection: `siteSettings`
- **Mục đích**: Lưu trữ cấu hình website, thông tin liên hệ chung, SEO metadata mặc định.
- **Document ID**: `global` (Sử dụng 1 document duy nhất).
- **Quyền đọc/ghi**:
  - Đọc: Public
  - Ghi: Chỉ Admin
- **Fields**:
  - `name` (string, bắt buộc): Tên website.
  - `shortName` (string, tùy chọn): Tên viết tắt.
  - `description` (string, tùy chọn): SEO description.
  - `logo` (string, tùy chọn): URL logo.
  - `favicon` (string, tùy chọn): URL favicon.
  - `contact` (object, tùy chọn):
    - `hotline` (string)
    - `zalo` (string)
    - `email` (string)
    - `address` (string)
    - `mapUrl` (string)
    - `workingHours` (string)
  - `socialLinks` (array of objects, tùy chọn): Liên kết mạng xã hội (Facebook, YouTube).
  - `footerText` (string, tùy chọn): Chữ ký chân trang.
  - `updatedAt` (timestamp, bắt buộc)
- **Quan hệ**: Không.
- **Query dự kiến**:
  - Lấy document `global` khi khởi tạo ứng dụng để hiển thị thông tin cấu hình.
- **Index**: Không (lấy theo ID `global`).

## 9. Collection: `admins`
- **Mục đích**: Lưu thông tin, phân quyền cho người quản trị website.
- **Document ID**: Trùng với Firebase Auth UID.
- **Quyền đọc/ghi**:
  - Đọc: Chỉ Admin.
  - Ghi: Chỉ Super Admin hoặc Admin đó sửa profile.
- **Fields**:
  - `email` (string, bắt buộc): Email quản trị viên.
  - `displayName` (string, bắt buộc): Tên hiển thị.
  - `avatar` (string, tùy chọn): Ảnh đại diện.
  - `role` (string, bắt buộc): Vai trò (`super_admin`, `editor`).
  - `isActive` (boolean, bắt buộc): Trạng thái tài khoản.
  - `createdAt` (timestamp, bắt buộc)
  - `updatedAt` (timestamp, bắt buộc)
- **Quan hệ**: Liên kết với `posts` qua `authorId`.
- **Query dự kiến**:
  - Kiểm tra quyền truy cập khi đăng nhập.
- **Index**: Không đặc biệt.

## 10. Collection: `redirects`
- **Mục đích**: Lưu trữ các quy tắc chuyển hướng URL (hỗ trợ SEO).
- **Document ID**: Auto-generated ID.
- **Quyền đọc/ghi**:
  - Đọc: Public.
  - Ghi: Chỉ Admin.
- **Fields**:
  - `source` (string, bắt buộc): URL gốc.
  - `destination` (string, bắt buộc): URL đích.
  - `type` (number, bắt buộc): Loại (`301` hoặc `302`).
  - `isActive` (boolean, bắt buộc): Trạng thái kích hoạt.
  - `createdAt` (timestamp, bắt buộc)
  - `updatedAt` (timestamp, bắt buộc)
- **Quan hệ**: Không.
- **Query dự kiến**:
  - Middleware/App check `source` khi điều hướng.
- **Index**: `source` (ASC) + `isActive` (ASC)
