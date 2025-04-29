# API Products

Module Products cung cấp các phương thức để quản lý sản phẩm và danh mục sản phẩm trong hệ thống Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const productsApi = client.products;
```

## Quản Lý Sản Phẩm

### Lấy Danh Sách Sản Phẩm

```typescript
const { data: products } = await client.products.list({
  page_size: 20,
  page_number: 1,
  search: 'áo thun',
  category_id: [1, 2],
  is_published: true,
  has_variations: true,
  in_stock: true
});
```

#### Tham Số

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số sản phẩm trên một trang |
| page_number | number | không | Số trang |
| search | string | không | Tìm kiếm theo tên sản phẩm |
| category_id | number[] | không | Lọc theo danh mục |
| is_published | boolean | không | Lọc sản phẩm đã xuất bản |
| has_variations | boolean | không | Lọc sản phẩm có biến thể |
| in_stock | boolean | không | Lọc sản phẩm còn hàng |

### Lấy Chi Tiết Sản Phẩm

```typescript
const product = await client.products.getById('product-id');
```

### Tạo Sản Phẩm Mới

```typescript
const newProduct = await client.products.create({
  name: 'Áo thun nam',
  category_ids: [1], // Danh mục quần áo nam
  weight: 200, // gram
  is_published: true,
  variations: [
    {
      fields: [
        { name: 'Size', value: 'M' },
        { name: 'Màu', value: 'Đen' }
      ],
      retail_price: 199000,
      weight: 200,
      stock: 100,
      sku: 'AT-NAM-M-DEN'
    }
  ],
  description: 'Áo thun nam chất liệu cotton',
  images: ['https://example.com/image1.jpg'],
  tags: ['áo thun', 'nam'],
  measure_unit: 'cái',
  specifications: [
    { name: 'Chất liệu', value: '100% cotton' },
    { name: 'Xuất xứ', value: 'Việt Nam' }
  ]
});
```

#### Model CreateProductRequest

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| name | string | có | Tên sản phẩm |
| category_ids | number[] | không | ID các danh mục |
| note_product | string | không | Ghi chú nội bộ |
| weight | number | có | Khối lượng (gram) |
| custom_id | string | không | Mã tự định nghĩa |
| is_published | boolean | không | Trạng thái xuất bản |
| variations | ProductVariation[] | có | Danh sách biến thể |
| description | string | không | Mô tả sản phẩm |
| images | string[] | không | URL hình ảnh |
| tags | string[] | không | Thẻ/nhãn |
| measure_unit | string | không | Đơn vị tính |
| specifications | ProductSpecification[] | không | Thông số kỹ thuật |

### Cập Nhật Sản Phẩm

```typescript
const updatedProduct = await client.products.update('product-id', {
  name: 'Áo thun nam (Cập nhật)',
  description: 'Mô tả mới'
});
```

### Cập Nhật Tồn Kho

#### Cập nhật tồn kho một biến thể

```typescript
await client.products.updateStock('product-id', {
  warehouse_id: 'warehouse-1',
  variation_id: 'variation-1',
  stock: 100
});
```

#### Cập nhật tồn kho nhiều biến thể

```typescript
await client.products.updateBulkStock('product-id', [
  {
    warehouse_id: 'warehouse-1',
    variation_id: 'variation-1',
    stock: 100
  },
  {
    warehouse_id: 'warehouse-1',
    variation_id: 'variation-2',
    stock: 150
  }
]);
```

## Quản Lý Danh Mục

### Lấy Danh Sách Danh Mục

```typescript
const { data: categories } = await client.products.listCategories();
```

### Tạo Danh Mục Mới

```typescript
const newCategory = await client.products.createCategory({
  name: 'Quần áo nam',
  parent_id: 1, // Danh mục cha
  image_url: 'https://example.com/category.jpg',
  is_visible: true
});
```

### Cập Nhật Danh Mục

```typescript
const updatedCategory = await client.products.updateCategory(1, {
  name: 'Quần áo nam (Cập nhật)',
  is_visible: false
});
```

### Xóa Danh Mục

```typescript
await client.products.deleteCategory(1);
```

## Lịch Sử Tồn Kho

```typescript
const history = await client.products.getInventoryHistory('product-id', {
  from_date: '2025-01-01',
  to_date: '2025-12-31',
  page_size: 20,
  page_number: 1
});
```

## Models

### Product

```typescript
interface Product {
    id: string;
    name: string;
    category_ids: number[];
    note_product?: string;
    weight: number;
    custom_id?: string;
    is_published: boolean;
    variations: ProductVariation[];
    stock?: number;
    description?: string;
    images?: string[];
    tags?: string[];
    measure_unit?: string;
    wholesale_price?: number;
    retail_price: number;
    warranty_info?: string;
    specifications?: ProductSpecification[];
}
```

### ProductVariation

```typescript
interface ProductVariation {
    id?: string;
    fields?: ProductField[];
    images?: string[];
    last_imported_price?: number;
    retail_price: number;
    price_at_counter?: number;
    weight: number;
    barcode?: string;
    custom_id?: string;
    is_hidden?: boolean;
    stock?: number;
    sku?: string;
    wholesale_price?: number;
}
```

### ProductCategory

```typescript
interface ProductCategory {
    id: number;
    name: string;
    parent_id?: number;
    image_url?: string;
    is_visible: boolean;
    children?: ProductCategory[];
}