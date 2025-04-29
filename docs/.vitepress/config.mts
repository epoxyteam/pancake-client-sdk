import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/pancake-client-sdk/",
  title: "Pancake POS SDK",
  description: "Tài liệu hướng dẫn chính thức cho Pancake POS SDK",
  lang: "vi-VN",
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
            { text: "Products", link: "/api/orders#products" },
            { text: "Customers", link: "/api/orders#customers" },
          ],
        },
        {
          text: "Advanced Features",
          items: [
            {
              text: "Marketplace",
              link: "/api/orders#marketplace-integration",
            },
            { text: "Payments", link: "/api/orders#payment-processing" },
            { text: "Inventory", link: "/api/orders#inventory-management" },
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
