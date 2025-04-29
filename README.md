# Pancake POS SDK

Official TypeScript SDK for the Pancake POS API. This SDK provides a simple and type-safe way to interact with the Pancake POS platform.

## Installation

```bash
npm install pancake-client-sdk
# or
yarn add pancake-client-sdk
```

## Quick Start

```typescript
import { PancakeClient } from 'pancake-client-sdk';

// Initialize the client with shop ID
const client = new PancakeClient('your-api-key', 'your-shop-id');

// Example: Get list of orders
const getOrders = async () => {
  const orders = await client.orders.list({
    page_size: 10,
    page_number: 1
  });
  console.log(orders);
};

// Example: Create a product
const createProduct = async () => {
  const product = await client.products.create({
    name: 'Test Product',
    price: 100,
    description: 'A test product'
  });
  console.log(product);
};
```

## Features

- Full TypeScript support with complete type definitions
- Comprehensive coverage of all Pancake POS API endpoints
- Built-in request/response typing
- Automatic error handling
- Clean and intuitive API interface

## Available Resources

- Customers & CRM
- Orders & Returns
- Products & Inventory 
- Warehouses & Logistics
- Promotions & Loyalty
- Payments & Finance
- Staff & Permissions
- Media & Files
- Reports & Analytics
- Settings & Preferences
- And more...

## Error Handling

The SDK throws typed errors that you can catch and handle:

```typescript
try {
  const order = await client.orders.getById('order-id');
} catch (error) {
  if (error.status === 404) {
    console.log('Order not found');
  } else {
    console.error('Something went wrong:', error);
  }
}
```

## Resource Examples

### Orders

```typescript
// List orders
const orders = await client.orders.list({
  status: 'pending',
  from_date: '2025-01-01'
});

// Get order details
const order = await client.orders.getById('order-id');

// Create order
const newOrder = await client.orders.create({
  customer_id: 'customer-id',
  items: [{
    product_id: 'product-id',
    quantity: 1
  }]
});
```

### Products

```typescript
// List products
const products = await client.products.list();

// Create product
const product = await client.products.create({
  name: 'New Product',
  price: 100
});

// Update product
await client.products.update('product-id', {
  price: 120
});
```

### Customers

```typescript
// List customers
const customers = await client.customers.list();

// Get customer details
const customer = await client.customers.getById('customer-id');

// Create customer
const newCustomer = await client.customers.create({
  name: 'John Doe',
  email: 'john@example.com'
});
```

## Advanced Usage

### Marketplace Integration

```typescript
// Connect marketplace account
const account = await client.marketplace.connect({
  platform: 'shopee',
  auth_code: 'auth-code'
});

// Sync orders
await client.marketplace.startSync(account.id, 'orders');
```

### Payment Processing

```typescript
// Create payment
const payment = await client.payments.createPayment({
  order_id: 'order-id',
  amount: 100,
  currency: 'USD',
  gateway_code: 'stripe'
});
```

### File Management

```typescript
// Upload file
const media = await client.media.upload({
  file: fileBlob,
  folder_id: 'folder-id'
});

// Process image
await client.media.processImage(media.id, {
  width: 800,
  height: 600,
  format: 'webp'
});
```

## Documentation

### Local Development Documentation

Để chạy documentation trên môi trường local:

```bash
# Cài đặt dependencies
npm install

# Chạy documentation server
npm run docs:dev
```

Documentation server sẽ chạy tại http://localhost:5173

### Cấu Trúc Documentation

- `/docs/guide/` - Hướng dẫn sử dụng cơ bản
- `/docs/api/` - Chi tiết API reference
- `/docs/examples/` - Các ví dụ tích hợp

Để build documentation cho production:

```bash
npm run docs:build
```

## License

MIT License - see LICENSE file for details