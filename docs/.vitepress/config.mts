import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/pancake-client-sdk/",
  title: "Pancake Client SDK",
  description: "Tài liệu hướng dẫn chính thức cho Pancake POS API",
  lang: "vi-VN",
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://avatars.githubusercontent.com/u/129583893' }]
  ],
  vite: {
    publicDir: "public",
  },
  themeConfig: {
    nav: [
      { text: "Trang Chủ", link: "/" },
      { text: "Hướng Dẫn", link: "/guide/" },
      { text: "API", link: "/api/" },
      { text: "Ví Dụ", link: "/examples/" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Giới Thiệu",
          items: [
            { text: "Tổng Quan", link: "/guide/" },
            { text: "Cài Đặt & Cấu Hình", link: "/guide/#cài-đặt-cấu-hình" },
            { text: "Use Cases Phổ Biến", link: "/guide/#use-cases-phổ-biến" },
          ],
        },
        {
          text: "Tính Năng Cơ Bản",
          items: [
            { text: "Xử Lý Lỗi", link: "/guide/#xử-lý-lỗi" },
            { text: "Best Practices", link: "/guide/#best-practices" },
          ],
        },
      ],
      "/api/": [
        {
          text: "Giới Thiệu",
          items: [
            { text: "Bắt Đầu Sử Dụng", link: "/api/" },
          ],
        },
        {
          text: "Tài Nguyên Cơ Bản",
          items: [
            { text: "Đơn Hàng", link: "/api/orders" },
            { text: "Sản Phẩm", link: "/api/products" },
            { text: "Khách Hàng", link: "/api/customers" },
            { text: "Báo Cáo", link: "/api/reports" },
            { text: "Thanh Toán", link: "/api/payments" },
            { text: "Kho Hàng", link: "/api/warehouses" },
          ],
        },
        {
          text: "Quản Lý Tài Chính",
          items: [
            { text: "Tài Chính", link: "/api/finance" },
            { text: "Hóa Đơn Điện Tử", link: "/api/einvoice" },
            { text: "Đơn Vị Đo Lường", link: "/api/measurement" },
          ],
        },
        {
          text: "Tương Tác Khách Hàng",
          items: [
            { text: "Khách Hàng Thân Thiết", link: "/api/loyalty" },
            { text: "Đánh Giá", link: "/api/reviews" },
          ],
        },
        {
          text: "Quản Lý Tài Sản",
          items: [
            { text: "Tệp Tin & Hình Ảnh", link: "/api/media" },
            { text: "Trả Hàng", link: "/api/return" },
          ],
        },
        {
          text: "Quản Lý Hệ Thống",
          items: [
            { text: "Nhân Viên", link: "/api/staff" },
            { text: "Cài Đặt", link: "/api/settings" },
            { text: "Webhook", link: "/api/webhooks" },
            { text: "Cửa Hàng", link: "/api/shop" },
          ],
        },
      ],
      "/examples/": [
        {
          text: "Ứng Dụng Thực Tế",
          items: [
            {
              text: "Express.js Server",
              link: "/examples/#quản-lý-đơn-hàng-expressjs",
            },
            { text: "Đồng Bộ Sàn TMĐT", link: "/examples/#đồng-bộ-sàn-tmđt" },
            {
              text: "Tích Hợp Thanh Toán",
              link: "/examples/#tích-hợp-thanh-toán",
            },
            {
              text: "Quản Lý Kho",
              link: "/examples/#quản-lý-kho-thời-gian-thực",
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/epoxyteam/pancake-client-sdk",
      },
    ],
  },
});
