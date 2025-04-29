# API Quản Lý Quan Hệ Khách Hàng (CRM)

Module CRM cung cấp các phương thức để quản lý dữ liệu khách hàng với cấu trúc linh hoạt, cho phép tạo các bảng dữ liệu tùy chỉnh và theo dõi lịch sử tương tác.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const crmApi = client.crm;
```

## Quản Lý Bảng Dữ Liệu

### Lấy Danh Sách Bảng

```typescript
const { data: tables } = await client.crm.listTables();
```

### Tạo Bảng Mới

```typescript
const newTable = await client.crm.createTable({
  name: 'Cơ Hội Bán Hàng',
  description: 'Theo dõi cơ hội bán hàng và tiến độ',
  fields: [
    {
      name: 'Tên cơ hội',
      type: 'text',
      required: true
    },
    {
      name: 'Giá trị',
      type: 'number',
      required: true
    },
    {
      name: 'Trạng thái',
      type: 'select',
      required: true,
      options: ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại']
    },
    {
      name: 'Ngày dự kiến',
      type: 'date',
      required: false
    },
    {
      name: 'Ghi chú',
      type: 'textarea',
      required: false
    }
  ]
});
```

### Cập Nhật Bảng

```typescript
const updatedTable = await client.crm.updateTable('table-id', {
  name: 'Cơ Hội Bán Hàng 2024',
  fields: [
    // Cập nhật cấu trúc trường dữ liệu
  ]
});
```

### Xóa Bảng

```typescript
await client.crm.deleteTable('table-id');
```

## Quản Lý Bản Ghi

### Lấy Danh Sách Bản Ghi

```typescript
const { data: records, total } = await client.crm.listRecords('table-id', {
  page_size: 20,
  page_number: 1,
  search: 'keyword',
  filters: [
    {
      field_id: 'status',
      operator: 'eq',
      value: 'Đang xử lý'
    }
  ],
  sort_by: 'created_at',
  sort_direction: 'desc'
});
```

#### Tham Số Lọc

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số bản ghi trên trang |
| page_number | number | không | Số trang |
| search | string | không | Từ khóa tìm kiếm |
| filters | array | không | Điều kiện lọc |
| sort_by | string | không | Trường sắp xếp |
| sort_direction | string | không | Hướng sắp xếp ('asc' hoặc 'desc') |

### Tạo Bản Ghi Mới

```typescript
const newRecord = await client.crm.createRecord('table-id', {
  values: {
    opportunity_name: 'Dự án XYZ',
    value: 50000000,
    status: 'Mới',
    expected_date: '2024-06-30',
    notes: 'Khách hàng quan tâm giải pháp ABC'
  }
});
```

### Cập Nhật Bản Ghi

```typescript
const updatedRecord = await client.crm.updateRecord('table-id', 'record-id', {
  values: {
    status: 'Đang xử lý',
    notes: 'Đã gửi báo giá, chờ phản hồi'
  }
});
```

### Xóa Bản Ghi

```typescript
await client.crm.deleteRecord('table-id', 'record-id');
```

## Lịch Sử và Bình Luận

### Xem Lịch Sử Bản Ghi

```typescript
const { data: history } = await client.crm.getRecordHistory('table-id', 'record-id');
```

### Quản Lý Bình Luận

```typescript
// Lấy danh sách bình luận
const { data: comments } = await client.crm.listComments('table-id', 'record-id');

// Thêm bình luận mới
const newComment = await client.crm.createComment('table-id', 'record-id', {
  content: 'Đã liên hệ khách hàng, hẹn gặp tuần sau',
  attachments: ['meeting-notes.pdf']
});

// Xóa bình luận
await client.crm.deleteComment('table-id', 'record-id', 'comment-id');
```

## Hồ Sơ CRM

### Lấy Danh Sách Hồ Sơ

```typescript
const { data: profiles } = await client.crm.listProfiles();
```

## Models

### CRMTable

```typescript
interface CRMTable {
  id: string;
  name: string;
  description?: string;
  fields: CRMField[];
  created_at: string;
  updated_at: string;
}

interface CRMField {
  id: string;
  name: string;
  type: CRMFieldType;
  required: boolean;
  options?: string[];
  default_value?: any;
  order?: number;
}
```

### CRMFieldType

Các loại trường dữ liệu hỗ trợ:
- `text`: Văn bản ngắn
- `textarea`: Văn bản dài
- `number`: Số
- `date`: Ngày
- `datetime`: Ngày giờ
- `boolean`: True/False
- `select`: Lựa chọn một giá trị
- `multiselect`: Lựa chọn nhiều giá trị
- `url`: Đường dẫn
- `email`: Email
- `phone`: Số điện thoại
- `file`: Tập tin đính kèm

### CRMRecord

```typescript
interface CRMRecord {
  id: string;
  table_id: string;
  values: Record<string, any>;
  created_by: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}
```

### CRMRecordHistory

```typescript
interface CRMRecordHistory {
  id: string;
  record_id: string;
  action: 'create' | 'update' | 'delete';
  changes?: {
    field_id: string;
    old_value: any;
    new_value: any;
  }[];
  created_by: {
    id: string;
    name: string;
  };
  created_at: string;
}
```

### CRMProfile

```typescript
interface CRMProfile {
  id: string;
  name: string;
  description?: string;
  fields: CRMProfileField[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}
```

## Ví Dụ Sử Dụng

### Tạo Bảng và Quản Lý Cơ Hội Bán Hàng

```typescript
async function setupSalesOpportunities() {
  try {
    // Tạo bảng cơ hội bán hàng
    const table = await client.crm.createTable({
      name: 'Cơ Hội Bán Hàng',
      description: 'Theo dõi và quản lý cơ hội bán hàng',
      fields: [
        {
          name: 'Tên khách hàng',
          type: 'text',
          required: true
        },
        {
          name: 'Số điện thoại',
          type: 'phone',
          required: true
        },
        {
          name: 'Giá trị dự kiến',
          type: 'number',
          required: true
        },
        {
          name: 'Giai đoạn',
          type: 'select',
          required: true,
          options: ['Tiềm năng', 'Liên hệ', 'Đàm phán', 'Chốt deal', 'Hủy bỏ']
        },
        {
          name: 'Ngày liên hệ',
          type: 'date',
          required: true
        },
        {
          name: 'Ghi chú',
          type: 'textarea',
          required: false
        }
      ]
    });

    // Thêm cơ hội mới
    const opportunity = await client.crm.createRecord(table.id, {
      values: {
        customer_name: 'Công ty ABC',
        phone: '0123456789',
        expected_value: 100000000,
        stage: 'Tiềm năng',
        contact_date: '2024-04-29',
        notes: 'Khách hàng quan tâm giải pháp XYZ'
      }
    });

    // Thêm bình luận theo dõi
    await client.crm.createComment(table.id, opportunity.id, {
      content: 'Đã gửi email giới thiệu sản phẩm'
    });

    console.log('Đã tạo cơ hội bán hàng mới!');
  } catch (error) {
    console.error('Lỗi khi tạo cơ hội bán hàng:', error);
  }
}
```

### Theo Dõi Tiến Độ Cơ Hội Bán Hàng

```typescript
async function trackSalesProgress(tableId: string) {
  try {
    // Lấy danh sách cơ hội đang đàm phán
    const { data: opportunities } = await client.crm.listRecords(tableId, {
      filters: [
        {
          field_id: 'stage',
          operator: 'eq',
          value: 'Đàm phán'
        }
      ],
      sort_by: 'expected_value',
      sort_direction: 'desc'
    });

    // Theo dõi tiến độ từng cơ hội
    for (const opp of opportunities) {
      // Lấy lịch sử thay đổi
      const { data: history } = await client.crm.getRecordHistory(tableId, opp.id);
      
      // Lấy bình luận gần nhất
      const { data: comments } = await client.crm.listComments(tableId, opp.id);
      
      console.log(`
        Cơ hội: ${opp.values.customer_name}
        Giá trị: ${opp.values.expected_value.toLocaleString()} VND
        Số thay đổi: ${history.length}
        Bình luận gần nhất: ${comments[0]?.content || 'Chưa có'}
      `);
    }
  } catch (error) {
    console.error('Lỗi khi theo dõi tiến độ:', error);
  }
}