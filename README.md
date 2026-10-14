# React Todo App

Ứng dụng Todo viết bằng React và Vite, bám theo đề bài: ba tab **All / Active / Completed**, thêm task, đổi trạng thái hoàn thành, xóa từng task hoàn thành và xóa tất cả task đã hoàn thành. Dữ liệu được lưu bằng `localStorage`.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal. Để kiểm tra bản production:

```bash
npm run build
npm run preview
```

## Tương tác

- **All:** hiển thị toàn bộ task và cho phép thêm task.
- **Active:** chỉ hiển thị task chưa hoàn thành và cho phép thêm task.
- **Completed:** chỉ hiển thị task đã hoàn thành; có thể xóa từng task hoặc chọn **delete all**.
- Nhấn checkbox để chuyển task qua lại giữa trạng thái Active và Completed.
