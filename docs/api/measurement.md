# API Đơn Vị Đo Lường (Measurement)

Module Measurement cung cấp các phương thức để quản lý và chuyển đổi đơn vị đo lường trong hệ thống Pancake POS. Hỗ trợ tạo nhóm đơn vị đo lường và định nghĩa tỷ lệ chuyển đổi giữa các đơn vị.

## Khởi Tạo

```typescript
import { PancakeClient } from 'pancake-client-sdk';

const client = new PancakeClient('your-api-key', 'your-shop-id');
const measurementApi = client.measurement;
```

## Quản Lý Nhóm Đo Lường

### Lấy Danh Sách Nhóm

```typescript
const { data: groups } = await client.measurement.listGroups({
  page_size: 20,
  page_number: 1,
  search: 'khối lượng'
});
```

### Tạo Nhóm Mới

```typescript
const weightGroup = await client.measurement.createGroup({
  name: 'Khối lượng',
  description: 'Đơn vị đo khối lượng',
  base_unit: {
    name: 'Gram',
    code: 'g'
  },
  units: [
    {
      name: 'Kilogram',
      code: 'kg',
      conversion_rate: 1000
    },
    {
      name: 'Miligram',
      code: 'mg',
      conversion_rate: 0.001
    }
  ]
});
```

### Cập Nhật Nhóm

```typescript
const updatedGroup = await client.measurement.updateGroup(1, {
  name: 'Đơn vị khối lượng',
  description: 'Các đơn vị đo khối lượng'
});
```

### Xóa Nhóm

```typescript
await client.measurement.deleteGroup(1);
```

## Quản Lý Đơn Vị

### Thêm Đơn Vị Mới

```typescript
const newUnit = await client.measurement.addUnit(1, {
  name: 'Tấn',
  code: 't',
  conversion_rate: 1000000  // 1 tấn = 1,000,000 gram
});
```

### Cập Nhật Đơn Vị

```typescript
const updatedUnit = await client.measurement.updateUnit(1, 2, {
  name: 'Kilogram',
  code: 'kg',
  conversion_rate: 1000
});
```

### Xóa Đơn Vị

```typescript
await client.measurement.removeUnit(1, 2);
```

## Chuyển Đổi Đơn Vị

### Chuyển Đổi Đơn Lẻ

```typescript
const conversion = await client.measurement.convert({
  value: 5,
  from_unit_id: 1,  // gram
  to_unit_id: 2     // kilogram
});

console.log(`${conversion.from_value}g = ${conversion.to_value}kg`);
```

### Chuyển Đổi Hàng Loạt

```typescript
const { values: convertedValues } = await client.measurement.bulkConvert({
  from_unit_id: 1,  // gram
  to_unit_id: 2,    // kilogram
  values: [100, 200, 300, 400, 500]
});
```

## Ma Trận Chuyển Đổi

### Lấy Ma Trận Chuyển Đổi

```typescript
const matrix = await client.measurement.getConversionMatrix(1);
```

### Cập Nhật Ma Trận Chuyển Đổi

```typescript
const updatedMatrix = await client.measurement.updateConversionMatrix(1, {
  group_id: 1,
  conversions: [
    {
      from_unit_id: 1,
      to_unit_id: 2,
      conversion_rate: 1000
    },
    {
      from_unit_id: 2,
      to_unit_id: 3,
      conversion_rate: 1000
    }
  ]
});
```

## Thống Kê và Kiểm Tra 

### Lấy Thống Kê

```typescript
const stats = await client.measurement.getStatistics();
```

### Kiểm Tra Chuyển Đổi

```typescript
const validation = await client.measurement.validateConversions(1);
if (!validation.is_valid) {
  console.error('Lỗi chuyển đổi:', validation.errors);
}
```

## Models

### MeasurementUnit

```typescript
interface MeasurementUnit {
  id: number;
  name: string;
  code: string;
  group_id: number;
  is_base_unit: boolean;
  conversion_rate: number;
  created_at: string;
  updated_at: string;
}
```

### MeasurementGroup

```typescript
interface MeasurementGroup {
  id: number;
  name: string;
  description?: string;
  base_unit: MeasurementUnit;
  units: MeasurementUnit[];
  created_at: string;
  updated_at: string;
}
```

### MeasurementConversion

```typescript
interface MeasurementConversion {
  from_value: number;
  from_unit_id: number;
  to_unit_id: number;
  to_value: number;
}
```

### MeasurementConversionMatrix

```typescript
interface MeasurementConversionMatrix {
  group_id: number;
  conversions: {
    from_unit_id: number;
    to_unit_id: number;
    conversion_rate: number;
  }[];
}
```

## Ví Dụ Sử Dụng

### Thiết Lập Nhóm Đơn Vị Đo Lường

```typescript
async function setupMeasurementGroups() {
  try {
    // Tạo nhóm đơn vị khối lượng
    const weightGroup = await client.measurement.createGroup({
      name: 'Khối lượng',
      description: 'Đơn vị đo khối lượng',
      base_unit: {
        name: 'Gram',
        code: 'g'
      },
      units: [
        {
          name: 'Kilogram',
          code: 'kg',
          conversion_rate: 1000
        },
        {
          name: 'Miligram',
          code: 'mg',
          conversion_rate: 0.001
        }
      ]
    });

    // Tạo nhóm đơn vị thể tích
    const volumeGroup = await client.measurement.createGroup({
      name: 'Thể tích',
      description: 'Đơn vị đo thể tích',
      base_unit: {
        name: 'Mililít',
        code: 'ml'
      },
      units: [
        {
          name: 'Lít',
          code: 'l',
          conversion_rate: 1000
        }
      ]
    });

    // Kiểm tra tính hợp lệ của chuyển đổi
    for (const group of [weightGroup, volumeGroup]) {
      const validation = await client.measurement.validateConversions(group.id);
      if (!validation.is_valid) {
        console.error(`Lỗi chuyển đổi trong nhóm ${group.name}:`, validation.errors);
      }
    }

    console.log('Đã thiết lập xong các nhóm đơn vị đo lường!');

  } catch (error) {
    console.error('Lỗi khi thiết lập đơn vị đo lường:', error);
  }
}
```

### Chức Năng Chuyển Đổi Đơn Vị

```typescript
async function createUnitConverter(groupId: number) {
  try {
    // Lấy thông tin nhóm đơn vị
    const group = await client.measurement.getGroup(groupId);
    
    // Lấy ma trận chuyển đổi
    const matrix = await client.measurement.getConversionMatrix(groupId);

    // Tạo hàm chuyển đổi
    return async function convert(value: number, fromCode: string, toCode: string) {
      const fromUnit = group.units.find(u => u.code === fromCode);
      const toUnit = group.units.find(u => u.code === toCode);

      if (!fromUnit || !toUnit) {
        throw new Error('Đơn vị không hợp lệ');
      }

      const conversion = await client.measurement.convert({
        value,
        from_unit_id: fromUnit.id,
        to_unit_id: toUnit.id
      });

      return {
        value: conversion.to_value,
        from: `${conversion.from_value} ${fromCode}`,
        to: `${conversion.to_value} ${toCode}`
      };
    };
  } catch (error) {
    console.error('Lỗi khi tạo converter:', error);
    throw error;
  }
}

// Sử dụng
async function example() {
  const weightConverter = await createUnitConverter(1); // ID của nhóm khối lượng
  
  const result = await weightConverter(1.5, 'kg', 'g');
  console.log(result.from, '=', result.to); // "1.5 kg = 1500 g"
}
```

### Kiểm Tra và Báo Cáo Sử Dụng

```typescript
async function analyzeMeasurementUsage() {
  try {
    const stats = await client.measurement.getStatistics();

    console.log(`
      Thống kê sử dụng đơn vị đo lường:
      - Tổng số nhóm: ${stats.total_groups}
      - Tổng số đơn vị: ${stats.total_units}
      
      Phân bố đơn vị theo nhóm:
    `);

    stats.units_per_group.forEach(group => {
      console.log(`${group.group_name}: ${group.unit_count} đơn vị`);
    });

    console.log('\nĐơn vị được sử dụng nhiều nhất:');
    stats.most_used_units.forEach(unit => {
      console.log(`${unit.unit_name}: ${unit.usage_count} lần sử dụng`);
    });

  } catch (error) {
    console.error('Lỗi khi phân tích sử dụng:', error);
  }
}