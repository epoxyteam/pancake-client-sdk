export interface MeasurementUnit {
  id: number;
  name: string;
  code: string;
  group_id: number;
  is_base_unit: boolean;
  conversion_rate: number;
  created_at: string;
  updated_at: string;
}

export interface MeasurementGroup {
  id: number;
  name: string;
  description?: string;
  base_unit: MeasurementUnit;
  units: MeasurementUnit[];
  created_at: string;
  updated_at: string;
}

export interface CreateMeasurementGroupRequest {
  name: string;
  description?: string;
  base_unit: {
    name: string;
    code: string;
  };
  units?: {
    name: string;
    code: string;
    conversion_rate: number;
  }[];
}

export interface UpdateMeasurementGroupRequest {
  name?: string;
  description?: string;
}

export interface CreateMeasurementUnitRequest {
  name: string;
  code: string;
  conversion_rate: number;
}

export interface UpdateMeasurementUnitRequest {
  name?: string;
  code?: string;
  conversion_rate?: number;
}

export interface MeasurementConversion {
  from_value: number;
  from_unit_id: number;
  to_unit_id: number;
  to_value: number;
}

export interface MeasurementGroupListParams {
  page_size?: number;
  page_number?: number;
  search?: string;
}

export interface MeasurementConversionBulkRequest {
  from_unit_id: number;
  to_unit_id: number;
  values: number[];
}

export interface MeasurementConversionMatrix {
  group_id: number;
  conversions: {
    from_unit_id: number;
    to_unit_id: number;
    conversion_rate: number;
  }[];
}

export interface MeasurementGroupStatistics {
  total_groups: number;
  total_units: number;
  units_per_group: {
    group_id: number;
    group_name: string;
    unit_count: number;
  }[];
  most_used_units: {
    unit_id: number;
    unit_name: string;
    usage_count: number;
  }[];
}