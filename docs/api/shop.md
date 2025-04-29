# API Cửa Hàng (Shop)

Module Shop cung cấp các phương thức để quản lý thông tin cửa hàng và các tích hợp mạng xã hội trong hệ thống Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const shopApi = client.shop;
```

## Quản Lý Cửa Hàng

### Lấy Danh Sách Cửa Hàng

```typescript
const { shops, success } = await client.shop.list();
```

### Lấy Chi Tiết Cửa Hàng

```typescript
const shopDetail = await client.shop.getById('shop-id');
```

### Lấy Thông Tin Cơ Bản

```typescript
const basicInfo = await client.shop.getBasicInfo('shop-id');
```

### Cập Nhật Thông Tin Cửa Hàng

```typescript
const updatedShop = await client.shop.update('shop-id', {
  name: 'Tên Cửa Hàng Mới',
  phone: '0123456789',
  address: '123 Đường ABC',
  province_id: 'province-1',
  district_id: 'district-1',
  commune_id: 'commune-1',
  tax_code: '0123456789',
  email: 'shop@example.com',
  avatar: 'avatar-url.jpg'
});
```

## Quản Lý Trang Mạng Xã Hội

### Lấy Danh Sách Trang

```typescript
const { pages } = await client.shop.getPages('shop-id');
```

## Models

### Shop

```typescript
interface Shop {
  avatar_url?: string;
  name: string;
  pages?: ShopPage[];
}
```

### ShopBasicInfo

```typescript
interface ShopBasicInfo {
  id: string;
  name: string;
  phone: string;
  address: string;
  province_id: string;
  district_id: string;
  commune_id: string;
  tax_code?: string;
  email?: string;
}
```

### ShopPage

```typescript
interface ShopPage {
  id: string;
  name: string;
  platform: string;
  settings: {
    auto_create_order: boolean;
  };
  shop_id: number;
}
```

## Ví Dụ Sử Dụng

### Cập Nhật Thông Tin Cửa Hàng

```typescript
async function updateShopInformation() {
  try {
    // Lấy thông tin hiện tại
    const currentInfo = await client.shop.getBasicInfo('shop-id');

    // Cập nhật thông tin mới
    const updatedShop = await client.shop.update('shop-id', {
      ...currentInfo,
      name: 'Cửa hàng ABC - Chi nhánh 1',
      phone: '0987654321',
      email: 'abc.branch1@example.com'
    });

    console.log('Đã cập nhật thông tin cửa hàng:', updatedShop);

  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin:', error);
  }
}
```

### Kiểm Tra Tích Hợp Mạng Xã Hội

```typescript
async function checkSocialIntegrations() {
  try {
    const { pages } = await client.shop.getPages('shop-id');

    // Kiểm tra từng nền tảng
    const platforms = {
      facebook: pages.filter(p => p.platform === 'facebook'),
      instagram: pages.filter(p => p.platform === 'instagram'),
      tiktok: pages.filter(p => p.platform === 'tiktok')
    };

    console.log('Tổng quan tích hợp mạng xã hội:');
    Object.entries(platforms).forEach(([platform, pages]) => {
      console.log(`
        ${platform.toUpperCase()}:
        - Số trang kết nối: ${pages.length}
        - Các trang: ${pages.map(p => p.name).join(', ')}
        - Tự động tạo đơn: ${
          pages.some(p => p.settings.auto_create_order) ? 'Có' : 'Không'
        }
      `);
    });

    // Kiểm tra các trang chưa kết nối
    const missingPlatforms = Object.entries(platforms)
      .filter(([_, pages]) => pages.length === 0)
      .map(([platform]) => platform);

    if (missingPlatforms.length > 0) {
      console.log('Các nền tảng cần kết nối:', missingPlatforms.join(', '));
    }

  } catch (error) {
    console.error('Lỗi khi kiểm tra tích hợp:', error);
  }
}
```

### Quản Lý Nhiều Cửa Hàng

```typescript
async function manageMutipleShops() {
  try {
    // Lấy danh sách cửa hàng
    const { shops } = await client.shop.list();

    // Lấy thông tin chi tiết cho mỗi cửa hàng
    const shopDetails = await Promise.all(
      shops.map(async (shop) => {
        const basicInfo = await client.shop.getBasicInfo(shop.id);
        const { pages } = await client.shop.getPages(shop.id);
        
        return {
          ...basicInfo,
          social_pages: pages
        };
      })
    );

    // Tạo báo cáo tổng quan
    const report = shopDetails.map(shop => ({
      id: shop.id,
      name: shop.name,
      contact: {
        phone: shop.phone,
        email: shop.email
      },
      location: {
        address: shop.address,
        province_id: shop.province_id,
        district_id: shop.district_id
      },
      social_integration: {
        total_pages: shop.social_pages.length,
        platforms: [...new Set(shop.social_pages.map(p => p.platform))]
      }
    }));

    console.log('Báo cáo tổng quan cửa hàng:', JSON.stringify(report, null, 2));

  } catch (error) {
    console.error('Lỗi khi quản lý cửa hàng:', error);
  }
}