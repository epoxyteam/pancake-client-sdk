# API Khách Hàng Thân Thiết (Loyalty)

Module Loyalty cung cấp các phương thức để quản lý chương trình khách hàng thân thiết, bao gồm tích điểm, đổi thưởng và phân cấp thành viên trong hệ thống Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const loyaltyApi = client.loyalty;
```

## Quản Lý Chương Trình

### Xem Chi Tiết Chương Trình

```typescript
const program = await client.loyalty.getProgram();
```

### Thiết Lập Chương Trình

```typescript
const newProgram = await client.loyalty.setupProgram({
  name: 'Chương trình thành viên',
  points_currency_ratio: 1000, // 1000 VND = 1 điểm
  min_points_to_redeem: 100,
  point_expiry_months: 12
});
```

### Cập Nhật Chương Trình

```typescript
const updatedProgram = await client.loyalty.updateProgram({
  points_currency_ratio: 500,
  min_points_to_redeem: 50
});
```

## Quản Lý Cấp Độ Thành Viên

### Lấy Danh Sách Cấp Độ

```typescript
const { data: tiers } = await client.loyalty.listTiers();
```

### Tạo Cấp Độ Mới

```typescript
const newTier = await client.loyalty.createTier({
  name: 'Hạng Vàng',
  min_points: 1000,
  benefits: [
    {
      type: 'discount_percent',
      value: 10,
      description: 'Giảm 10% cho mọi đơn hàng',
      conditions: {
        min_order_value: 500000
      }
    },
    {
      type: 'bonus_points',
      value: 20,
      description: 'Tặng thêm 20% điểm thưởng'
    }
  ],
  color: '#FFD700'
});
```

### Cập Nhật Cấp Độ

```typescript
const updatedTier = await client.loyalty.updateTier('tier-id', {
  benefits: [
    {
      type: 'discount_percent',
      value: 15,
      description: 'Giảm 15% cho mọi đơn hàng'
    }
  ]
});
```

### Xóa Cấp Độ

```typescript
await client.loyalty.deleteTier('tier-id');
```

## Quản Lý Điểm Thưởng

### Xem Thông Tin Tích Lũy

```typescript
const customerLoyalty = await client.loyalty.getCustomerLoyalty('customer-id');
```

### Điều Chỉnh Điểm

```typescript
const adjustment = await client.loyalty.adjustPoints({
  customer_id: 'customer-id',
  points: 100,
  reason: 'Điểm thưởng sinh nhật',
  expiry_date: '2025-04-29'
});
```

### Đổi Điểm Thưởng

```typescript
const redemption = await client.loyalty.redeemPoints({
  customer_id: 'customer-id',
  points: 500,
  order_id: 'order-123'
});
```

### Tính Toán Điểm Cho Đơn Hàng

```typescript
const calculation = await client.loyalty.calculateOrderPoints('order-id');
console.log(`
  Điểm cơ bản: ${calculation.breakdown.base_points}
  Điểm thưởng hạng: ${calculation.breakdown.tier_bonus || 0}
  Điểm thưởng khuyến mãi: ${calculation.breakdown.promotion_bonus || 0}
  Tổng điểm: ${calculation.points}
`);
```

## Quản Lý Giao Dịch

### Lấy Danh Sách Giao Dịch

```typescript
const { data: transactions } = await client.loyalty.listTransactions({
  page_size: 20,
  page_number: 1,
  type: 'earn',
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

### Lấy Giao Dịch Của Khách Hàng

```typescript
const { data: customerTransactions } = await client.loyalty.getCustomerTransactions('customer-id', {
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

## Phân Tích Và Thống Kê

### Lấy Số Liệu Phân Tích

```typescript
const analytics = await client.loyalty.getAnalytics({
  from_date: '2024-04-01',
  to_date: '2024-04-30'
});
```

### Kiểm Tra Điểm Sắp Hết Hạn

```typescript
const expiringPoints = await client.loyalty.getExpiringPoints({
  days_threshold: 30,
  min_points: 100
});
```

## Models

### LoyaltyProgram

```typescript
interface LoyaltyProgram {
  id: string;
  name: string;
  is_active: boolean;
  points_currency_ratio: number;  // VD: 1000 VND = 1 điểm
  min_points_to_redeem: number;
  point_expiry_months?: number;
  created_at: string;
  updated_at: string;
}
```

### LoyaltyTier

```typescript
interface LoyaltyTier {
  id: string;
  name: string;
  min_points: number;
  benefits: LoyaltyBenefit[];
  color?: string;
  icon_url?: string;
}

interface LoyaltyBenefit {
  type: 'discount_percent' | 'discount_amount' | 'free_shipping' | 'bonus_points' | 'custom';
  value: number;
  description?: string;
  conditions?: {
    min_order_value?: number;
    max_discount_value?: number;
    product_ids?: string[];
    category_ids?: number[];
  };
}
```

### CustomerLoyalty

```typescript
interface CustomerLoyalty {
  customer_id: string;
  total_points: number;
  tier_id: string;
  tier_info: LoyaltyTier;
  points_history: {
    valid_points: number;
    expiring_points: number;
    next_expiry_date?: string;
    next_expiry_points?: number;
  };
  lifetime_points: number;
  year_to_date_points: number;
}
```

### LoyaltyTransaction

```typescript
interface LoyaltyTransaction {
  id: string;
  customer_id: string;
  type: 'earn' | 'redeem' | 'expire' | 'adjust';
  points: number;
  order_id?: string;
  reason?: string;
  expiry_date?: string;
  created_at: string;
  created_by?: {
    id: string;
    name: string;
  };
}
```

### LoyaltyAnalytics

```typescript
interface LoyaltyAnalytics {
  total_active_members: number;
  points_statistics: {
    total_points_issued: number;
    total_points_redeemed: number;
    total_points_expired: number;
    total_active_points: number;
  };
  tier_distribution: {
    tier_id: string;
    tier_name: string;
    member_count: number;
  }[];
  monthly_activity: {
    month: string;
    points_earned: number;
    points_redeemed: number;
    new_members: number;
  }[];
}
```

## Ví Dụ Sử Dụng

### Thiết Lập Chương Trình Khách Hàng Thân Thiết

```typescript
async function setupLoyaltyProgram() {
  try {
    // Tạo chương trình tích điểm
    const program = await client.loyalty.setupProgram({
      name: 'Chương trình thành viên XYZ',
      points_currency_ratio: 1000,
      min_points_to_redeem: 100,
      point_expiry_months: 12
    });

    // Tạo các cấp độ thành viên
    const silverTier = await client.loyalty.createTier({
      name: 'Hạng Bạc',
      min_points: 1000,
      benefits: [
        {
          type: 'discount_percent',
          value: 5,
          description: 'Giảm 5% mọi đơn hàng'
        },
        {
          type: 'bonus_points',
          value: 10,
          description: 'Tặng thêm 10% điểm thưởng'
        }
      ]
    });

    const goldTier = await client.loyalty.createTier({
      name: 'Hạng Vàng',
      min_points: 5000,
      benefits: [
        {
          type: 'discount_percent',
          value: 10,
          description: 'Giảm 10% mọi đơn hàng'
        },
        {
          type: 'bonus_points',
          value: 20,
          description: 'Tặng thêm 20% điểm thưởng'
        },
        {
          type: 'free_shipping',
          value: 0,
          description: 'Miễn phí vận chuyển',
          conditions: {
            min_order_value: 500000
          }
        }
      ]
    });

    console.log('Đã thiết lập chương trình thành công!');
  } catch (error) {
    console.error('Lỗi khi thiết lập chương trình:', error);
  }
}
```

### Quản Lý Điểm Sắp Hết Hạn

```typescript
async function handleExpiringPoints() {
  try {
    // Kiểm tra điểm sắp hết hạn trong 30 ngày tới
    const { customers } = await client.loyalty.getExpiringPoints({
      days_threshold: 30,
      min_points: 100
    });

    for (const customer of customers) {
      // Tự động gửi thông báo hoặc tạo chiến dịch khuyến khích sử dụng điểm
      console.log(`
        Khách hàng: ${customer.customer_id}
        Điểm sắp hết hạn: ${customer.expiring_points}
        Ngày hết hạn: ${customer.expiry_date}
      `);
    }

    // Phân tích tỷ lệ sử dụng điểm
    const analytics = await client.loyalty.getAnalytics({
      from_date: '2024-04-01',
      to_date: '2024-04-30'
    });

    const redemptionRate = (
      analytics.points_statistics.total_points_redeemed /
      analytics.points_statistics.total_points_issued
    ) * 100;

    console.log(`Tỷ lệ sử dụng điểm: ${redemptionRate.toFixed(2)}%`);

  } catch (error) {
    console.error('Lỗi khi xử lý điểm hết hạn:', error);
  }
}