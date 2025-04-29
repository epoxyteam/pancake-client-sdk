# API Cài Đặt (Settings)

Module Settings cung cấp các phương thức để quản lý cài đặt hệ thống và tùy chọn người dùng trong Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const settingsApi = client.settings;
```

## Quản Lý Cài Đặt

### Lấy Cài Đặt Cửa Hàng

```typescript
const settings = await client.settings.getShopSettings();
```

### Cập Nhật Cài Đặt Chung

```typescript
const updatedSettings = await client.settings.updateGeneralSettings({
  shop_name: 'Shop ABC',
  time_zone: 'Asia/Ho_Chi_Minh',
  currency: 'VND',
  language: 'vi',
  tax_info: {
    tax_number: '0123456789',
    company_name: 'Công ty ABC',
    address: '123 Đường XYZ'
  },
  business_hours: {
    monday: {
      open: '08:00',
      close: '22:00',
      is_closed: false
    }
    // ... các ngày khác
  }
});
```

### Cập Nhật Cài Đặt POS

```typescript
const posSettings = await client.settings.updatePOSSettings({
  default_warehouse_id: 'warehouse-1',
  auto_print_receipt: true,
  receipt_template_id: 'template-1',
  receipt_printer: {
    type: 'thermal',
    name: 'EPSON TM-T82',
    ip_address: '192.168.1.100'
  },
  cash_drawer: {
    enabled: true,
    open_on_payment: true
  }
});
```

### Cập Nhật Cài Đặt Hóa Đơn

```typescript
const invoiceSettings = await client.settings.updateInvoiceSettings({
  auto_generate: true,
  template_id: 'template-1',
  prefix: 'INV',
  starting_number: 1000,
  tax_inclusive: true,
  default_tax_rate: 10,
  company_info: {
    logo_url: 'https://example.com/logo.png',
    bank_accounts: [
      {
        bank_name: 'VietcomBank',
        account_number: '1234567890',
        account_name: 'CONG TY ABC'
      }
    ]
  }
});
```

### Cập Nhật Cài Đặt Thông Báo

```typescript
const notificationSettings = await client.settings.updateNotificationSettings({
  email: {
    enabled: true,
    recipients: ['admin@example.com'],
    events: ['order.created', 'low_stock_alert']
  },
  sms: {
    enabled: true,
    recipients: ['0123456789'],
    events: ['order.completed']
  },
  slack: {
    enabled: true,
    webhook_url: 'https://hooks.slack.com/...',
    channel: '#orders'
  }
});
```

### Cập Nhật Cài Đặt Hiển Thị

```typescript
const displaySettings = await client.settings.updateDisplaySettings({
  theme: 'light',
  primary_color: '#1890ff',
  accent_color: '#13c2c2',
  date_format: 'DD/MM/YYYY',
  time_format: 'HH:mm',
  currency_format: {
    symbol: '₫',
    position: 'after',
    separator: ',',
    decimal: '.',
    precision: 0
  }
});
```

### Cập Nhật Cài Đặt Tự Động Hóa

```typescript
const automationSettings = await client.settings.updateAutomationSettings({
  order_status: {
    auto_confirm: {
      enabled: true,
      conditions: {
        payment_status: 'paid'
      }
    },
    auto_cancel: {
      enabled: true,
      after_hours: 24
    }
  },
  inventory: {
    low_stock_alert: {
      enabled: true,
      threshold: 10
    }
  }
});
```

### Cập Nhật Cài Đặt Mạng Xã Hội

```typescript
const socialSettings = await client.settings.updateSocialSettings({
  facebook: {
    page_id: 'page-id',
    access_token: 'access-token',
    enabled_features: ['messenger', 'product_catalog']
  },
  instagram: {
    account_id: 'account-id',
    access_token: 'access-token'
  }
});
```

### Cập Nhật Cài Đặt Nâng Cao

```typescript
const advancedSettings = await client.settings.updateAdvancedSettings({
  api: {
    enabled: true,
    rate_limit: 100,
    allowed_ips: ['192.168.1.0/24']
  },
  security: {
    two_factor_auth: true,
    password_policy: {
      min_length: 8,
      require_numbers: true,
      require_symbols: true
    }
  }
});
```

## Quản Lý Tùy Chọn Người Dùng

### Lấy Tùy Chọn

```typescript
const preferences = await client.settings.getUserPreferences('user-id');
```

### Cập Nhật Tùy Chọn

```typescript
const updatedPreferences = await client.settings.updateUserPreferences('user-id', {
  notifications: {
    email: true,
    push: true,
    desktop: false
  },
  display: {
    theme: 'dark',
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh'
  }
});
```

## Quản Lý Cài Đặt Hệ Thống

### Khôi Phục Cài Đặt Mặc Định

```typescript
// Khôi phục tất cả cài đặt
await client.settings.resetToDefault();

// Khôi phục một phần cài đặt
await client.settings.resetToDefault('display');
```

### Xuất/Nhập Cài Đặt

```typescript
// Xuất cài đặt
const exportedSettings = await client.settings.exportSettings([
  'general',
  'pos',
  'invoice'
]);

// Nhập cài đặt
await client.settings.importSettings(exportedSettings);
```

### Kiểm Tra Cài Đặt

```typescript
const validation = await client.settings.validateSettings({
  general: {
    shop_name: 'New Shop Name'
  }
});

if (!validation.is_valid) {
  console.error('Lỗi cài đặt:', validation.errors);
}
```

### Xem Lịch Sử Thay Đổi

```typescript
const { data: auditLog } = await client.settings.getAuditLog({
  page_size: 20,
  page_number: 1,
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

## Models

### ShopSettings

```typescript
interface ShopSettings {
  id: string;
  shop_id: string;
  general: GeneralSettings;
  pos: POSSettings;
  invoice: InvoiceSettings;
  notification: NotificationSettings;
  display: DisplaySettings;
  automation: AutomationSettings;
  social: SocialSettings;
  advanced: AdvancedSettings;
  created_at: string;
  updated_at: string;
}
```

### UserPreferences

```typescript
interface UserPreferences {
  id: string;
  user_id: string;
  shop_id: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    date_format: string;
    time_format: string;
  };
  dashboard: {
    widgets: {
      id: string;
      position: number;
      enabled: boolean;
    }[];
  };
  table_settings: Record<string, {
    visible_columns: string[];
    sort_by?: string;
    sort_direction?: 'asc' | 'desc';
  }>;
  shortcuts?: Record<string, string>;
}
```

## Ví Dụ Sử Dụng

### Thiết Lập Ban Đầu

```typescript
async function initialSetup() {
  try {
    // Cập nhật thông tin cơ bản
    await client.settings.updateGeneralSettings({
      shop_name: 'Shop ABC',
      time_zone: 'Asia/Ho_Chi_Minh',
      currency: 'VND',
      language: 'vi',
      tax_info: {
        tax_number: '0123456789',
        company_name: 'Công ty ABC',
        address: '123 Đường XYZ'
      }
    });

    // Cài đặt POS
    await client.settings.updatePOSSettings({
      auto_print_receipt: true,
      receipt_template_id: 'template-1',
      receipt_printer: {
        type: 'thermal',
        name: 'EPSON TM-T82'
      }
    });

    // Cài đặt hóa đơn
    await client.settings.updateInvoiceSettings({
      auto_generate: true,
      tax_inclusive: true,
      default_tax_rate: 10
    });

    // Cài đặt thông báo
    await client.settings.updateNotificationSettings({
      email: {
        enabled: true,
        recipients: ['admin@example.com'],
        events: ['order.created', 'low_stock_alert']
      }
    });

    // Cài đặt tự động hóa
    await client.settings.updateAutomationSettings({
      inventory: {
        low_stock_alert: {
          enabled: true,
          threshold: 10
        }
      }
    });

    console.log('Đã hoàn thành thiết lập cơ bản!');

  } catch (error) {
    console.error('Lỗi khi thiết lập:', error);
  }
}
```

### Quản Lý Giao Diện Người Dùng

```typescript
async function setupUserInterface(userId: string) {
  try {
    // Lấy tùy chọn hiện tại
    const preferences = await client.settings.getUserPreferences(userId);

    // Cập nhật tùy chọn hiển thị
    await client.settings.updateUserPreferences(userId, {
      display: {
        ...preferences.display,
        theme: 'system',
        date_format: 'DD/MM/YYYY',
        time_format: 'HH:mm'
      },
      dashboard: {
        widgets: [
          {
            id: 'sales_chart',
            position: 1,
            enabled: true
          },
          {
            id: 'top_products',
            position: 2,
            enabled: true
          },
          {
            id: 'recent_orders',
            position: 3,
            enabled: true
          }
        ]
      },
      table_settings: {
        orders: {
          visible_columns: ['id', 'customer', 'total', 'status'],
          sort_by: 'created_at',
          sort_direction: 'desc'
        },
        products: {
          visible_columns: ['name', 'sku', 'price', 'stock'],
          sort_by: 'name',
          sort_direction: 'asc'
        }
      }
    });

    console.log('Đã cập nhật giao diện người dùng!');

  } catch (error) {
    console.error('Lỗi khi cập nhật giao diện:', error);
  }
}