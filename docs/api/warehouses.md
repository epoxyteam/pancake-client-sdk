# API Warehouses

Module Warehouses cung cấp các phương thức để quản lý kho hàng, chuyển kho và kiểm kho trong Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const warehousesApi = client.warehouses;
```

## Quản Lý Kho Hàng

### Lấy Danh Sách Kho

```typescript
const { data: warehouses } = await client.warehouses.list({
  page_size: 20,
  page_number: 1,
  is_active: true
});
```

#### Tham Số

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số kho trên một trang |
| page_number | number | không | Số trang |
| is_active | boolean | không | Lọc theo trạng thái hoạt động |

### Tạo Kho Mới

```typescript
const newWarehouse = await client.warehouses.create({
  name: 'Kho Hà Nội',
  phone_number: '0123456789',
  province_id: 'HN',
  district_id: 'HD',
  commune_id: 'BTL',
  address: '123 Đường ABC',
  is_default: false
});
```

#### Model CreateWarehouseRequest

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| name | string | có | Tên kho |
| phone_number | string | có | Số điện thoại |
| province_id | string | có | ID tỉnh/thành phố |
| district_id | string | có | ID quận/huyện |
| commune_id | string | có | ID phường/xã |
| address | string | có | Địa chỉ chi tiết |
| is_default | boolean | không | Đặt làm kho mặc định |

### Cập Nhật Kho

```typescript
const updatedWarehouse = await client.warehouses.update('warehouse-id', {
  name: 'Kho Hà Nội (Cập nhật)',
  phone_number: '0987654321'
});
```

## Chuyển Kho

### Tạo Phiếu Chuyển Kho

```typescript
const transfer = await client.warehouses.createTransfer({
  from_warehouse_id: 'warehouse-1',
  to_warehouse_id: 'warehouse-2',
  items: [
    {
      product_id: 'product-1',
      variation_id: 'var-1',
      quantity: 10
    }
  ],
  note: 'Chuyển hàng về kho chính'
});
```

#### Model CreateStockTransferRequest

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| from_warehouse_id | string | có | ID kho xuất |
| to_warehouse_id | string | có | ID kho nhận |
| items | StockTransferItem[] | có | Danh sách sản phẩm |
| note | string | không | Ghi chú |

### Xác Nhận Nhận Hàng

```typescript
const completedTransfer = await client.warehouses.completeTransfer('transfer-id', [
  {
    product_id: 'product-1',
    variation_id: 'var-1',
    received_quantity: 9 // Nhận thiếu 1 sản phẩm
  }
]);
```

### Hủy Chuyển Kho

```typescript
const cancelledTransfer = await client.warehouses.cancelTransfer(
  'transfer-id',
  'Hàng bị lỗi không thể chuyển'
);
```

### Danh Sách Phiếu Chuyển Kho

```typescript
const { data: transfers } = await client.warehouses.listTransfers({
  status: 'pending',
  from_warehouse_id: 'warehouse-1',
  from_date: '2025-01-01',
  to_date: '2025-12-31'
});
```

#### Tham Số Lọc Chuyển Kho

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| status | string | không | Trạng thái: 'pending', 'completed', 'cancelled' |
| from_warehouse_id | string | không | Lọc theo kho xuất |
| to_warehouse_id | string | không | Lọc theo kho nhận |
| from_date | string | không | Từ ngày |
| to_date | string | không | Đến ngày |

## Kiểm Kho

### Tạo Phiếu Kiểm Kho

```typescript
const stockCheck = await client.warehouses.createStockCheck({
  warehouse_id: 'warehouse-1',
  items: [
    {
      product_id: 'product-1',
      variation_id: 'var-1',
      actual_quantity: 95,
      note: 'Thiếu 5 sản phẩm'
    }
  ],
  note: 'Kiểm kho cuối tháng'
});
```

#### Model CreateStockCheckRequest

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| warehouse_id | string | có | ID kho kiểm |
| items | StockCheckItem[] | có | Danh sách sản phẩm |
| note | string | không | Ghi chú |

### Hoàn Thành Kiểm Kho

```typescript
const completed = await client.warehouses.completeStockCheck('check-id');
```

### Danh Sách Phiếu Kiểm Kho

```typescript
const { data: checks } = await client.warehouses.listStockChecks({
  status: 'completed',
  warehouse_id: 'warehouse-1',
  from_date: '2025-01-01',
  to_date: '2025-12-31'
});
```

## Báo Cáo Tồn Kho

### Xem Tồn Kho Theo Kho

```typescript
const { data: inventory } = await client.warehouses.getInventoryReport('warehouse-id', {
  category_ids: [1, 2],
  page_size: 20,
  page_number: 1
});
```

#### Response

```typescript
{
  data: Array<{
    product_id: string;
    variation_id?: string;
    stock: number;         // Tổng tồn kho
    reserved_stock: number; // Đã đặt hàng
    available_stock: number; // Có thể bán
  }>;
}
```

## Ví Dụ Tích Hợp

### Quản Lý Đa Kho

```typescript
async function manageMultipleWarehouses() {
  try {
    // Lấy danh sách kho
    const { data: warehouses } = await client.warehouses.list({
      is_active: true
    });

    // Kiểm tra tồn kho ở tất cả các kho
    const inventoryPromises = warehouses.map(warehouse =>
      client.warehouses.getInventoryReport(warehouse.id)
    );
    
    const inventoryResults = await Promise.all(inventoryPromises);

    // Tổng hợp tồn kho
    const totalInventory = inventoryResults.reduce((acc, { data }) => {
      data.forEach(item => {
        const key = `${item.product_id}:${item.variation_id || 'default'}`;
        if (!acc[key]) {
          acc[key] = {
            product_id: item.product_id,
            variation_id: item.variation_id,
            total_stock: 0,
            total_available: 0
          };
        }
        acc[key].total_stock += item.stock;
        acc[key].total_available += item.available_stock;
      });
      return acc;
    }, {});

    return Object.values(totalInventory);
  } catch (error) {
    console.error('Lỗi quản lý tồn kho:', error);
    throw error;
  }
}
```

### Cân Bằng Tồn Kho Giữa Các Kho

```typescript
async function balanceInventory(productId: string, threshold: number) {
  try {
    // Lấy danh sách kho
    const { data: warehouses } = await client.warehouses.list({
      is_active: true
    });

    // Kiểm tra tồn kho ở mỗi kho
    const inventoryPromises = warehouses.map(async warehouse => {
      const { data } = await client.warehouses.getInventoryReport(warehouse.id);
      const productStock = data.find(item => item.product_id === productId);
      return {
        warehouse_id: warehouse.id,
        stock: productStock?.available_stock || 0
      };
    });

    const stocks = await Promise.all(inventoryPromises);

    // Tìm kho thừa và kho thiếu
    const excessWarehouses = stocks.filter(s => s.stock > threshold);
    const deficitWarehouses = stocks.filter(s => s.stock < threshold);

    // Tạo phiếu chuyển kho để cân bằng
    for (const deficit of deficitWarehouses) {
      const excess = excessWarehouses.find(w => w.stock > threshold);
      if (excess) {
        const transferAmount = Math.min(
          excess.stock - threshold,
          threshold - deficit.stock
        );

        if (transferAmount > 0) {
          await client.warehouses.createTransfer({
            from_warehouse_id: excess.warehouse_id,
            to_warehouse_id: deficit.warehouse_id,
            items: [
              {
                product_id: productId,
                quantity: transferAmount
              }
            ],
            note: 'Cân bằng tồn kho tự động'
          });
        }
      }
    }
  } catch (error) {
    console.error('Lỗi cân bằng tồn kho:', error);
    throw error;
  }
}