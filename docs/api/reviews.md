# API Đánh Giá (Reviews)

Module Reviews cung cấp các phương thức để quản lý đánh giá sản phẩm từ khách hàng, bao gồm cả đánh giá nội bộ và đánh giá từ các sàn thương mại điện tử.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const reviewsApi = client.reviews;
```

## Quản Lý Đánh Giá

### Lấy Danh Sách Đánh Giá

```typescript
const { data: reviews } = await client.reviews.list({
  page_size: 20,
  page_number: 1,
  min_rating: 4,
  has_images: true,
  platform: 'shopee'
});
```

#### Tham Số Lọc

| Tên | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|--------|
| page_size | number | không | Số đánh giá trên trang |
| page_number | number | không | Số trang |
| product_id | string | không | Lọc theo sản phẩm |
| customer_id | string | không | Lọc theo khách hàng |
| platform | string | không | Nền tảng: 'internal', 'shopee', 'lazada', 'tiktok' |
| status | string | không | Trạng thái: 'pending', 'approved', 'rejected' |
| min_rating | number | không | Điểm đánh giá tối thiểu (1-5) |
| max_rating | number | không | Điểm đánh giá tối đa (1-5) |
| has_images | boolean | không | Chỉ lấy đánh giá có hình ảnh |
| from_date | string | không | Từ ngày (YYYY-MM-DD) |
| to_date | string | không | Đến ngày (YYYY-MM-DD) |

### Tạo Đánh Giá Mới

```typescript
const newReview = await client.reviews.create({
  product_id: 'product-123',
  customer_id: 'customer-456',
  order_id: 'order-789',
  rating: 5,
  content: 'Sản phẩm rất tốt, đóng gói cẩn thận',
  images: ['image1.jpg', 'image2.jpg']
});
```

### Phản Hồi Đánh Giá

```typescript
const updatedReview = await client.reviews.reply('review-id', 
  'Cảm ơn quý khách đã đánh giá. Chúng tôi rất vui khi sản phẩm đáp ứng được nhu cầu của bạn!'
);
```

### Kiểm Duyệt Đánh Giá

```typescript
const moderatedReview = await client.reviews.moderate('review-id', 'approve');

// Hoặc từ chối với lý do
await client.reviews.moderate('review-id', 'reject', 'Nội dung không phù hợp');
```

## Đánh Giá Theo Sản Phẩm

### Lấy Tổng Quan Đánh Giá Sản Phẩm

```typescript
const summary = await client.reviews.getProductSummary('product-id');
```

### Lấy Đánh Giá Của Sản Phẩm

```typescript
const { data: reviews, summary } = await client.reviews.getProductReviews('product-id', {
  page_size: 20,
  page_number: 1
});
```

## Đánh Giá Theo Khách Hàng

```typescript
const { data: customerReviews } = await client.reviews.getCustomerReviews('customer-id', {
  page_size: 10,
  page_number: 1
});
```

## Đồng Bộ Đánh Giá Từ Sàn TMĐT

### Import Đánh Giá

```typescript
const importResult = await client.reviews.importPlatformReviews('shopee', true);
console.log(`Đã import: ${importResult.success_count}/${importResult.total_imported}`);
```

### Đồng Bộ Tự Động

```typescript
const syncJob = await client.reviews.syncPlatformReviews('lazada');
console.log(`Job ID: ${syncJob.job_id}, Status: ${syncJob.status}`);
```

## Phân Tích và Thống Kê

### Lấy Số Liệu Phân Tích

```typescript
const analytics = await client.reviews.getAnalytics({
  from_date: '2024-01-01',
  to_date: '2024-04-30',
  platform: 'shopee'
});
```

### Xuất Báo Cáo

```typescript
const exportResult = await client.reviews.export({
  from_date: '2024-04-01',
  to_date: '2024-04-30',
  platform: 'all'
});
```

## Models

### Review

```typescript
interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  order_id?: string;
  rating: number;
  content?: string;
  images?: string[];
  platform: 'internal' | 'shopee' | 'lazada' | 'tiktok';
  status: 'pending' | 'approved' | 'rejected';
  reply?: string;
  created_at: string;
  updated_at: string;
  customer_info: {
    name: string;
    avatar_url?: string;
  };
  product_info: {
    name: string;
    image_url?: string;
    variation_name?: string;
  };
}
```

### ReviewSummary

```typescript
interface ReviewSummary {
  product_id: string;
  total_reviews: number;
  average_rating: number;
  rating_distribution: {
    [key: number]: number;  // key: rating (1-5), value: count
  };
  with_images: number;
  with_content: number;
  platform_distribution: {
    [key: string]: number;  // key: platform name, value: count
  };
}
```

### ReviewAnalytics

```typescript
interface ReviewAnalytics {
  total_reviews: number;
  average_rating: number;
  review_distribution: {
    date: string;
    count: number;
    average_rating: number;
  }[];
  top_rated_products: {
    product_id: string;
    product_name: string;
    average_rating: number;
    total_reviews: number;
  }[];
  platform_statistics: {
    platform: string;
    total_reviews: number;
    average_rating: number;
  }[];
}
```

## Ví Dụ Sử Dụng

### Quản Lý Đánh Giá Mới

```typescript
async function handleNewReviews() {
  try {
    // Lấy danh sách đánh giá chờ duyệt
    const { data: pendingReviews } = await client.reviews.list({
      status: 'pending',
      page_size: 50
    });

    for (const review of pendingReviews) {
      // Kiểm tra nội dung
      if (review.content && containsInappropriateContent(review.content)) {
        await client.reviews.moderate(review.id, 'reject', 'Nội dung không phù hợp');
        continue;
      }

      // Duyệt và phản hồi đánh giá tích cực
      if (review.rating >= 4) {
        await client.reviews.moderate(review.id, 'approve');
        await client.reviews.reply(
          review.id, 
          'Cảm ơn bạn đã dành thời gian đánh giá sản phẩm! Rất vui khi sản phẩm đáp ứng được mong đợi của bạn.'
        );
      }
    }
  } catch (error) {
    console.error('Lỗi khi xử lý đánh giá:', error);
  }
}

function containsInappropriateContent(content: string): boolean {
  // Implement kiểm tra nội dung không phù hợp
  return false;
}
```

### Phân Tích Đánh Giá Theo Sản Phẩm

```typescript
async function analyzeProductReviews(productId: string) {
  try {
    // Lấy tổng quan đánh giá
    const summary = await client.reviews.getProductSummary(productId);
    
    // Lấy chi tiết đánh giá
    const { data: reviews } = await client.reviews.getProductReviews(productId, {
      page_size: 100
    });

    // Phân tích điểm đánh giá
    const averageRating = summary.average_rating;
    const totalReviews = summary.total_reviews;
    const imageReviewRate = (summary.with_images / totalReviews) * 100;

    console.log(`
      Tổng quan đánh giá:
      - Điểm trung bình: ${averageRating.toFixed(1)}/5
      - Tổng số đánh giá: ${totalReviews}
      - Tỷ lệ có hình ảnh: ${imageReviewRate.toFixed(1)}%
    `);

    // Phân tích theo nền tảng
    Object.entries(summary.platform_distribution).forEach(([platform, count]) => {
      const percentage = (count / totalReviews) * 100;
      console.log(`${platform}: ${count} đánh giá (${percentage.toFixed(1)}%)`);
    });

  } catch (error) {
    console.error('Lỗi khi phân tích đánh giá:', error);
  }
}