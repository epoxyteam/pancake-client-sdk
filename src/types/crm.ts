export interface CRMTable {
  id: string;
  name: string;
  description?: string;
  fields: CRMField[];
  created_at: string;
  updated_at: string;
}

export interface CRMField {
  id: string;
  name: string;
  type: CRMFieldType;
  required: boolean;
  options?: string[];
  default_value?: any;
  order?: number;
}

export type CRMFieldType = 
  | 'text'
  | 'number'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'multiselect'
  | 'url'
  | 'email'
  | 'phone'
  | 'textarea'
  | 'file';

export interface CRMRecord {
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

export interface CreateTableRequest {
  name: string;
  description?: string;
  fields: Omit<CRMField, 'id'>[];
}

export interface UpdateTableRequest {
  name?: string;
  description?: string;
  fields?: CRMField[];
}

export interface CreateRecordRequest {
  values: Record<string, any>;
}

export interface UpdateRecordRequest {
  values: Record<string, any>;
}

export interface CRMProfile {
  id: string;
  name: string;
  description?: string;
  fields: CRMProfileField[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CRMProfileField {
  field_id: string;
  is_visible: boolean;
  is_required: boolean;
  order?: number;
}

export interface CRMRecordHistory {
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

export interface CRMListParams {
  page_size?: number;
  page_number?: number;
  search?: string;
  filters?: {
    field_id: string;
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'not_contains';
    value: any;
  }[];
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
}

export interface CRMRecordComment {
  id: string;
  record_id: string;
  content: string;
  attachments?: string[];
  created_by: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateCommentRequest {
  content: string;
  attachments?: string[];
}