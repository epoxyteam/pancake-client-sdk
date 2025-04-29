# API Loyalty

Module Loyalty cung cấp các phương thức để quản lý chương trình khách hàng thân thiết trong Pancake POS.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const loyaltyApi = client.loyalty;
```

## Chương Trình Tích Điểm

### Lấy Thông Tin Chương Trình

```typescript
const program = await client.loyalty.getProgram();
```

### Thiết Lập Chương Trình

```typescript
const program = await client.loyalty.setupProgram({
  name: 'Chương Trình Khách Hàng Thân Thiết',
  points_currency_ratio: 1000, // 1000 VND = 1 điểm
  min_points_to_redeem: 100,   // Tối thiểu 100 điểm để đổi
  point_expiry_months: 12      // Điểm hết hạn sau 12 tháng
});
```

#### Model CreateLoyaltyProgramRequest

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| name | string | có | Tên chương trình |
| points_currency_ratio | number | có | Tỷ lệ tiền/điểm |
| min_points_to_redeem | number | có | Số điểm tối thiểu để đổi |
| point_expiry_months | number | không | Thời hạn điểm (tháng) |

### Cập Nhật Chương Trình

```typescript
const updated = await client.loyalty.updateProgram({
  points_currency_ratio: 2000,
  min_points_to_redeem: 200
});
```

## Hạng Thành Viên

### Lấy Danh Sách Hạng

```typescript
const { data: tiers } = await client.loyalty.listTiers();
```

### Tạo Hạng Mới

```typescript
const tier = await client.loyalty.createTier({
  name: 'Khách Hàng VIP',
  min_points: 1000,
  benefits: [
    {
      type: 'discount_percent',
      value: 10,
      description: 'Giảm 10% tất cả đơn hàng',
      conditions: {
        min_order_value: 500000
      }
    },
    {
      type: 'bonus_points',
      value: 50,
      description: 'Tặng 50% điểm thưởng'
    }
  ],
  color: '#FFD700',
  icon_url: 'https://example.com/vip-icon.png'
});
```

#### Model LoyaltyBenefit

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| type | string | có | Loại ưu đãi: 'discount_percent', 'discount_amount', 'free_shipping', 'bonus_points', 'custom' |
| value | number | có | Giá trị ưu đãi |
| description | string | không | Mô tả ưu đãi |
| conditions | object | không | Điều kiện áp dụng |

### Cập Nhật Hạng

```typescript
const updated = await client.loyalty.updateTier('tier-id', {
  min_points: 2000,
  benefits: [/* ... */]
});
```

## Quản Lý Điểm Thưởng

### Xem Thông Tin Tích Điểm Khách Hàng

```typescript
const loyalty = await client.loyalty.getCustomerLoyalty('customer-id');
console.log('Tổng điểm:', loyalty.total_points);
console.log('Hạng hiện tại:', loyalty.tier_info.name);
```

#### Response: CustomerLoyalty

```typescript
interface CustomerLoyalty {
  customer_id: string;
  total_points: number;        // Tổng điểm hiện có
  tier_id: string;            // ID hạng thành viên
  tier_info: LoyaltyTier;     // Thông tin hạng
  points_history: {
    valid_points: number;      // Điểm có thể sử dụng
    expiring_points: number;   // Điểm sắp hết hạn
    next_expiry_date?: string; // Ngày hết hạn tiếp theo
    next_expiry_points?: number; // Số điểm sẽ hết hạn
  };
  lifetime_points: number;     // Tổng điểm tích lũy
  year_to_date_points: number; // Điểm tích lũy trong năm
}
```

### Điều Chỉnh Điểm

```typescript
const adjustment = await client.loyalty.adjustPoints({
  customer_id: 'customer-id',
  points: 100,      // Số dương: cộng điểm, số âm: trừ điểm
  reason: 'Điều chỉnh thủ công',
  expiry_date: '2025-12-31'
});
```

### Đổi Điểm

```typescript
const redemption = await client.loyalty.redeemPoints({
  customer_id: 'customer-id',
  points: 500,
  order_id: 'order-123'
});
```

### Tính Điểm Cho Đơn Hàng

```typescript
const calculation = await client.loyalty.calculateOrderPoints('order-id');
console.log('Điểm cơ bản:', calculation.breakdown.base_points);
console.log('Điểm thưởng hạng:', calculation.breakdown.tier_bonus);
console.log('Tổng điểm:', calculation.points);
```

### Xem Lịch Sử Giao Dịch Điểm

```typescript
const { data: transactions } = await client.loyalty.listTransactions({
  customer_id: 'customer-id',
  type: 'earn',
  from_date: '2025-01-01',
  to_date: '2025-12-31'
});
```

## Phân Tích & Báo Cáo

### Thống Kê Chương Trình

```typescript
const analytics = await client.loyalty.getAnalytics({
  from_date: '2025-01-01',
  to_date: '2025-12-31'
});
```

#### Response: LoyaltyAnalytics

```typescript
interface LoyaltyAnalytics {
  total_active_members: number;
  points_statistics: {
    total_points_issued: number;
    total_points_redeemed: number;
    total_points_expired: number;
    total_active_points: number;
  };
  tier_distribution: Array<{
    tier_id: string;
    tier_name: string;
    member_count: number;
  }>;
  monthly_activity: Array<{
    month: string;
    points_earned: number;
    points_redeemed: number;
    new_members: number;
  }>;
}
```

### Điểm Sắp Hết Hạn

```typescript
const expiring = await client.loyalty.getExpiringPoints({
  days_threshold: 30,  // Cảnh báo trước 30 ngày
  min_points: 100     // Chỉ cảnh báo nếu từ 100 điểm
});
```

## Ví Dụ Tích Hợp

### Xử Lý Tích Điểm Tự Động

```typescript
async function handleOrderCompletion(orderId: string, customerId: string) {
  try {
    // Tính điểm cho đơn hàng
    const { points, breakdown } = await client.loyalty.calculateOrderPoints(orderId);

    // Cộng điểm cho khách hàng
    const transaction = await client.loyalty.adjustPoints({
      customer_id: customerId,
      points: points,
      reason: `Tích điểm đơn hàng #${orderId}`,
      expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    });

    // Kiểm tra và cập nhật hạng thành viên
    const loyalty = await client.loyalty.getCustomerLoyalty(customerId);
    
    console.log('Điểm tích lũy:', points);
    console.log('Tổng điểm hiện tại:', loyalty.total_points);
    console.log('Hạng thành viên:', loyalty.tier_info.name);

    return transaction;
  } catch (error) {
    console.error('Lỗi xử lý tích điểm:', error);
    throw error;
  }
}
```

### Gửi Thông Báo Điểm Sắp Hết Hạn

```typescript
async function notifyExpiringPoints() {
  try {
    // Lấy danh sách điểm sắp hết hạn trong 30 ngày
    const { customers } = await client.loyalty.getExpiringPoints({
      days_threshold: 30,
      min_points: 100
    });

    // Xử lý thông báo cho từng khách hàng
    for (const customer of customers) {
      const loyalty = await client.loyalty.getCustomerLoyalty(customer.customer_id);
      
      // Tính toán ưu đãi có thể đổi
      const availableRewards = calculateAvailableRewards(
        customer.expiring_points,
        loyalty.tier_info.benefits
      );

      // Gửi thông báo (triển khai riêng)
      await sendNotification({
        customer_id: customer.customer_id,
        points: customer.expiring_points,
        expiry_date: customer.expiry_date,
        available_rewards: availableRewards
      });
    }
  } catch (error) {
    console.error('Lỗi xử lý thông báo điểm hết hạn:', error);
    throw error;
  }
}

function calculateAvailableRewards(points: number, benefits: LoyaltyBenefit[]) {
  // Logic tính toán ưu đãi có thể đổi với số điểm sắp hết hạn
  return benefits.filter(benefit => {
    if (benefit.type === 'discount_amount') {
      return points >= benefit.value;
    }
    return true;
  });
}