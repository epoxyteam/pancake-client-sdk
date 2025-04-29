import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/pancake-client-sdk/",
  title: "Pancake Client SDK",
  description: "Tài liệu hướng dẫn chính thức cho Pancake POS API",
  lang: "vi-VN",
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
          text: "Core Resources",
          items: [
            { text: "Orders", link: "/api/orders" },
            { text: "Products", link: "/api/products" },
            { text: "Customers", link: "/api/customers" },
            { text: "Reports", link: "/api/reports" },
            { text: "Payments", link: "/api/payments" },
            { text: "Warehouses", link: "/api/warehouses" },
          ],
        },
        {
          text: "Financial Management",
          items: [
            { text: "Finance", link: "/api/finance" },
            { text: "E-Invoice", link: "/api/einvoice" },
            { text: "Measurement", link: "/api/measurement" },
          ],
        },
        {
          text: "Customer Engagement",
          items: [
            { text: "Loyalty", link: "/api/loyalty" },
            { text: "Reviews", link: "/api/reviews" },
          ],
        },
        {
          text: "Asset Management",
          items: [
            { text: "Media", link: "/api/media" },
            { text: "Return", link: "/api/return" },
          ],
        },
        {
          text: "System Management",
          items: [
            { text: "Staff", link: "/api/staff" },
            { text: "Settings", link: "/api/settings" },
            { text: "Webhooks", link: "/api/webhooks" },
            { text: "Shop", link: "/api/shop" },
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
