# API Nhân Viên (Staff)

Module Staff cung cấp các phương thức để quản lý nhân viên, phân quyền và theo dõi hoạt động trong hệ thống Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const staffApi = client.staff;
```

## Quản Lý Nhân Viên

### Lấy Danh Sách Nhân Viên

```typescript
const { data: staffList } = await client.staff.list({
  page_size: 20,
  page_number: 1,
  role_id: 1,
  is_active: true,
  warehouse_id: 'warehouse-1'
});
```

#### Tham Số Lọc

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số nhân viên trên trang |
| page_number | number | không | Số trang |
| role_id | number | không | Lọc theo vai trò |
| is_active | boolean | không | Trạng thái hoạt động |
| search | string | không | Tìm kiếm theo tên hoặc email |
| warehouse_id | string | không | Lọc theo kho hàng được phân công |

### Tạo Nhân Viên Mới

```typescript
const newStaff = await client.staff.create({
  name: 'Nguyễn Văn A',
  email: 'nva@example.com',
  phone_number: '0123456789',
  role_id: 2,
  password: 'secure_password',
  assigned_warehouses: ['warehouse-1', 'warehouse-2']
});
```

### Cập Nhật Thông Tin Nhân Viên

```typescript
const updatedStaff = await client.staff.update('staff-id', {
  name: 'Nguyễn Văn A',
  phone_number: '0987654321',
  role_id: 3,
  assigned_warehouses: ['warehouse-1']
});
```

### Quản Lý Trạng Thái Nhân Viên

```typescript
// Vô hiệu hóa tài khoản
await client.staff.setActive('staff-id', false);

// Kích hoạt lại tài khoản
await client.staff.setActive('staff-id', true);
```

### Đặt Lại Mật Khẩu

```typescript
await client.staff.resetPassword('staff-id', 'new_password');
```

## Quản Lý Vai Trò và Phân Quyền

### Lấy Danh Sách Vai Trò

```typescript
const { data: roles } = await client.staff.listRoles();
```

### Tạo Vai Trò Mới

```typescript
const newRole = await client.staff.createRole({
  name: 'Quản lý kho',
  permissions: [
    'inventory.view',
    'inventory.edit',
    'reports.view'
  ],
  description: 'Quản lý hàng hóa và kho bãi'
});
```

### Cập Nhật Vai Trò

```typescript
const updatedRole = await client.staff.updateRole(1, {
  name: 'Quản lý kho cao cấp',
  permissions: [
    'inventory.view',
    'inventory.edit',
    'reports.view',
    'reports.export'
  ]
});
```

### Xóa Vai Trò

```typescript
await client.staff.deleteRole(1);
```

### Lấy Danh Sách Quyền Hạn

```typescript
const { data: permissions } = await client.staff.listPermissions();
```

## Nhật Ký Hoạt Động

### Lấy Nhật Ký Hoạt Động

```typescript
const { data: logs } = await client.staff.getActivityLogs({
  page_size: 50,
  from_date: '2024-04-01',
  to_date: '2024-04-30',
  action: 'order.create'
});
```

### Lấy Hoạt Động Của Nhân Viên

```typescript
const { data: staffLogs } = await client.staff.getStaffActivityLogs('staff-id', {
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

#### Tham Số Lọc Nhật Ký

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số bản ghi trên trang |
| page_number | number | không | Số trang |
| staff_id | string | không | Lọc theo nhân viên |
| action | string | không | Loại hành động |
| resource_type | string | không | Loại tài nguyên |
| from_date | string | không | Từ ngày (YYYY-MM-DD) |
| to_date | string | không | Đến ngày (YYYY-MM-DD) |

## Báo Cáo Hiệu Suất

### Lấy Báo Cáo Hiệu Suất Tất Cả Nhân Viên

```typescript
const { data: reports } = await client.staff.getPerformanceReports({
  from_date: '2024-04-01',
  to_date: '2024-04-30',
  include_customer_satisfaction: true
});
```

### Lấy Báo Cáo Hiệu Suất Cá Nhân

```typescript
const performance = await client.staff.getStaffPerformance('staff-id', {
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

## Models

### Staff

```typescript
interface Staff {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  avatar_url?: string;
  role: StaffRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  permissions: string[];
  assigned_warehouses?: string[];
}
```

### StaffRole

```typescript
interface StaffRole {
  id: number;
  name: string;
  permissions: string[];
  description?: string;
  is_system_role: boolean;
  created_at: string;
  updated_at: string;
}
```

### Permission

```typescript
interface Permission {
  code: string;
  name: string;
  description: string;
  group: string;
}
```

### StaffPerformanceReport

```typescript
interface StaffPerformanceReport {
  staff_id: string;
  staff_name: string;
  metrics: {
    orders_processed: number;
    total_sales: number;
    average_processing_time: number;
    customer_satisfaction_rate?: number;
    tasks_completed: number;
  };
  period: {
    start_date: string;
    end_date: string;
  };
}
```

## Ví Dụ Sử Dụng

### Thiết Lập Vai Trò Và Phân Quyền

```typescript
async function setupStaffRoles() {
  try {
    // Lấy danh sách quyền hạn có sẵn
    const { data: permissions } = await client.staff.listPermissions();

    // Tạo vai trò quản lý kho
    const warehouseManager = await client.staff.createRole({
      name: 'Quản lý kho',
      permissions: permissions
        .filter(p => p.group === 'inventory' || p.code.startsWith('reports.'))
        .map(p => p.code),
      description: 'Quản lý hàng hóa và kho bãi'
    });

    // Tạo tài khoản nhân viên với vai trò mới
    const newStaff = await client.staff.create({
      name: 'Quản lý kho A',
      email: 'warehouse.a@example.com',
      role_id: warehouseManager.id,
      password: 'secure_password',
      assigned_warehouses: ['warehouse-1']
    });

    console.log('Đã tạo vai trò và tài khoản thành công!');
  } catch (error) {
    console.error('Lỗi khi thiết lập vai trò:', error);
  }
}
```

### Theo Dõi Hiệu Suất Nhân Viên

```typescript
async function analyzeStaffPerformance() {
  try {
    // Lấy báo cáo hiệu suất của tất cả nhân viên
    const { data: reports } = await client.staff.getPerformanceReports({
      from_date: '2024-04-01',
      to_date: '2024-04-30',
      include_customer_satisfaction: true
    });

    // Sắp xếp theo doanh số
    const topPerformers = reports
      .sort((a, b) => b.metrics.total_sales - a.metrics.total_sales)
      .slice(0, 5);

    console.log('Top 5 nhân viên theo doanh số:');
    topPerformers.forEach((report, index) => {
      console.log(`
        ${index + 1}. ${report.staff_name}
        - Doanh số: ${report.metrics.total_sales.toLocaleString()} VND
        - Đơn hàng xử lý: ${report.metrics.orders_processed}
        - Độ hài lòng KH: ${report.metrics.customer_satisfaction_rate}%
      `);
    });

    // Kiểm tra nhân viên cần cải thiện
    const needImprovement = reports.filter(
      report => report.metrics.customer_satisfaction_rate < 90
    );

    if (needImprovement.length > 0) {
      console.log('\nNhân viên cần cải thiện dịch vụ khách hàng:');
      needImprovement.forEach(report => {
        console.log(`
          ${report.staff_name}
          - Độ hài lòng KH: ${report.metrics.customer_satisfaction_rate}%
          - Thời gian xử lý TB: ${report.metrics.average_processing_time} phút
        `);
      });
    }
  } catch (error) {
    console.error('Lỗi khi phân tích hiệu suất:', error);
  }
}