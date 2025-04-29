# API Quản Lý Tệp Tin (Media)

Module Media cung cấp các phương thức để quản lý tệp tin, hình ảnh và thư mục trong hệ thống Pancake POS. Hỗ trợ nhiều định dạng tệp tin và cung cấp các tính năng xử lý hình ảnh.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const mediaApi = client.media;
```

## Quản Lý Tệp Tin

### Lấy Danh Sách Tệp Tin

```typescript
const { data: files } = await client.media.list({
  page_size: 20,
  page_number: 1,
  type: 'image',
  folder_id: 'folder-1',
  order_by: 'created_at',
  order_direction: 'desc'
});
```

#### Tham Số Lọc

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số tệp tin trên trang |
| page_number | number | không | Số trang |
| type | string | không | Loại tệp tin: 'image', 'video', 'document', 'audio' |
| folder_id | string | không | Lọc theo thư mục |
| search | string | không | Tìm kiếm theo tên |
| from_date | string | không | Từ ngày (YYYY-MM-DD) |
| to_date | string | không | Đến ngày (YYYY-MM-DD) |
| order_by | string | không | Sắp xếp theo: 'created_at', 'name', 'size' |
| order_direction | string | không | Hướng sắp xếp: 'asc' hoặc 'desc' |
| tags | string[] | không | Lọc theo tags |

### Tìm Kiếm Tệp Tin

```typescript
const { data: files } = await client.media.search('banner', {
  type: 'image',
  page_size: 20
});
```

### Tải Lên Tệp Tin

```typescript
const file = await client.media.upload({
  file: fileBlob,
  folder_id: 'folder-1',
  tags: ['banner', 'homepage'],
  metadata: {
    alt: 'Banner trang chủ'
  },
  filename: 'banner.jpg',
  content_type: 'image/jpeg'
});
```

### Tải Lên Trực Tiếp

```typescript
// Lấy URL tải lên
const { upload_url, expires_at, fields } = await client.media.getUploadUrl({
  filename: 'large-file.zip',
  content_type: 'application/zip',
  size: 1024 * 1024 * 100 // 100MB
});

// Sử dụng upload_url để tải lên trực tiếp
```

### Cập Nhật Thông Tin

```typescript
const updatedFile = await client.media.update('media-id', {
  name: 'banner-new.jpg',
  folder_id: 'folder-2',
  tags: ['banner', 'promotion'],
  metadata: {
    alt: 'Banner khuyến mãi'
  }
});
```

### Xóa Tệp Tin

```typescript
await client.media.delete('media-id');
```

## Quản Lý Thư Mục

### Lấy Danh Sách Thư Mục

```typescript
const { data: folders } = await client.media.listFolders();
```

### Tạo Thư Mục Mới

```typescript
const newFolder = await client.media.createFolder({
  name: 'Hình ảnh sản phẩm',
  parent_id: 'parent-folder-id'
});
```

### Cập Nhật Thư Mục

```typescript
const updatedFolder = await client.media.updateFolder('folder-id', {
  name: 'Hình ảnh sản phẩm 2024'
});
```

### Xóa Thư Mục

```typescript
// Xóa thư mục rỗng
await client.media.deleteFolder('folder-id');

// Xóa thư mục và toàn bộ nội dung
await client.media.deleteFolder('folder-id', true);
```

## Xử Lý Hình Ảnh

### Xử Lý Hình Ảnh

```typescript
const processedImage = await client.media.processImage('image-id', {
  width: 800,
  height: 600,
  crop: true,
  quality: 80,
  format: 'webp',
  brightness: 1.2,
  contrast: 1.1,
  watermark: {
    text: '© Shop ABC',
    position: 'bottom-right',
    opacity: 0.5
  }
});
```

### Tạo Thumbnail

```typescript
const thumbnail = await client.media.generateThumbnail('image-id', {
  width: 200,
  height: 200,
  format: 'webp'
});
```

## Quản Lý Bảo Mật

### Quét Virus/Malware

```typescript
const scanResult = await client.media.scanMedia('media-id');
```

### Tạo URL Tải Xuống An Toàn

```typescript
const { download_url, expires_at } = await client.media.getDownloadUrl('media-id', {
  expires_in: 3600, // Hết hạn sau 1 giờ
  filename: 'custom-filename.jpg'
});
```

## Thống Kê và Quản Lý Hàng Loạt

### Lấy Thống Kê

```typescript
const stats = await client.media.getStats();
```

### Thao Tác Hàng Loạt

```typescript
const result = await client.media.bulkOperation({
  media_ids: ['id-1', 'id-2', 'id-3'],
  operation: 'move',
  params: {
    folder_id: 'target-folder'
  }
});
```

## Models

### Media

```typescript
interface Media {
  id: string;
  name: string;
  type: MediaType;
  mime_type: string;
  size: number;
  url: string;
  thumbnail_url?: string;
  metadata?: MediaMetadata;
  tags?: string[];
  folder_id?: string;
  created_by: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}
```

### MediaMetadata

```typescript
interface MediaMetadata {
  width?: number;
  height?: number;
  duration?: number;
  format?: string;
  bit_rate?: number;
  frame_rate?: number;
  pages?: number;
  exif?: Record<string, any>;
}
```

### ImageProcessingOptions

```typescript
interface ImageProcessingOptions {
  width?: number;
  height?: number;
  crop?: boolean;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  blur?: number;
  brightness?: number;
  contrast?: number;
  grayscale?: boolean;
  rotate?: number;
  flip?: 'horizontal' | 'vertical';
  watermark?: {
    text?: string;
    image_url?: string;
    position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    opacity?: number;
  };
}
```

## Ví Dụ Sử Dụng

### Tải Lên và Xử Lý Hình Ảnh Sản Phẩm

```typescript
async function uploadAndProcessProductImage(file: File) {
  try {
    // Tải lên hình ảnh gốc
    const media = await client.media.upload({
      file,
      folder_id: 'products-folder',
      tags: ['product', 'original'],
      metadata: {
        product_id: 'product-123'
      }
    });

    // Tạo các phiên bản khác nhau
    const versions = await Promise.all([
      // Phiên bản hiển thị chính
      client.media.processImage(media.id, {
        width: 800,
        height: 800,
        crop: true,
        quality: 85,
        format: 'webp',
        watermark: {
          text: '© Shop ABC',
          position: 'bottom-right',
          opacity: 0.3
        }
      }),

      // Phiên bản thumbnail
      client.media.generateThumbnail(media.id, {
        width: 200,
        height: 200,
        format: 'webp'
      }),

      // Phiên bản zoom
      client.media.processImage(media.id, {
        width: 1600,
        quality: 90,
        format: 'webp'
      })
    ]);

    console.log('Đã xử lý xong hình ảnh sản phẩm:', {
      original: media,
      versions
    });

  } catch (error) {
    console.error('Lỗi khi xử lý hình ảnh:', error);
  }
}
```

### Quản Lý Thư Viện Ảnh

```typescript
async function organizeMediaLibrary() {
  try {
    // Lấy thống kê hiện tại
    const stats = await client.media.getStats();
    console.log('Thống kê thư viện:', stats);

    // Tạo cấu trúc thư mục
    const folders = await Promise.all([
      client.media.createFolder({ name: 'Sản phẩm' }),
      client.media.createFolder({ name: 'Banner' }),
      client.media.createFolder({ name: 'Blog' })
    ]);

    // Tạo thư mục con cho sản phẩm
    const productSubfolders = await Promise.all([
      client.media.createFolder({
        name: 'Ảnh chính',
        parent_id: folders[0].id
      }),
      client.media.createFolder({
        name: 'Ảnh chi tiết',
        parent_id: folders[0].id
      })
    ]);

    // Di chuyển tệp tin vào thư mục tương ứng
    const { data: files } = await client.media.list({
      page_size: 100
    });

    // Phân loại và di chuyển file
    const moveOperations = files.map(file => {
      let targetFolder = null;
      if (file.tags?.includes('product')) {
        targetFolder = productSubfolders[0].id;
      } else if (file.tags?.includes('banner')) {
        targetFolder = folders[1].id;
      } else if (file.tags?.includes('blog')) {
        targetFolder = folders[2].id;
      }

      if (targetFolder) {
        return client.media.update(file.id, {
          folder_id: targetFolder
        });
      }
    });

    await Promise.all(moveOperations.filter(Boolean));
    
    console.log('Đã tổ chức lại thư viện ảnh!');

  } catch (error) {
    console.error('Lỗi khi tổ chức thư viện:', error);
  }
}