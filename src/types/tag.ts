export interface Tag {
  id: string;
  name: string;
  color?: string;
  type: TagType;
  description?: string;
  created_by: {
    id: string;
    name: string;
  };
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export type TagType =
  | 'order'
  | 'customer'
  | 'product'
  | 'return'
  | 'task'
  | 'note';

export interface TagGroup {
  id: string;
  name: string;
  type: TagType;
  description?: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface CreateTagRequest {
  name: string;
  type: TagType;
  color?: string;
  description?: string;
  group_id?: string;
}

export interface UpdateTagRequest {
  name?: string;
  color?: string;
  description?: string;
  group_id?: string;
}

export interface CreateTagGroupRequest {
  name: string;
  type: TagType;
  description?: string;
}

export interface TagListParams {
  page_size?: number;
  page_number?: number;
  type?: TagType;
  search?: string;
  group_id?: string;
}

export interface TagAssignment {
  id: string;
  tag_id: string;
  resource_type: TagType;
  resource_id: string;
  created_by: {
    id: string;
    name: string;
  };
  created_at: string;
}

export interface TagStats {
  total_tags: number;
  by_type: {
    [key in TagType]: number;
  };
  most_used: {
    tag_id: string;
    tag_name: string;
    usage_count: number;
    type: TagType;
  }[];
  recent_assignments: {
    tag_id: string;
    tag_name: string;
    resource_type: TagType;
    resource_id: string;
    assigned_at: string;
  }[];
}

export interface BulkTagRequest {
  tag_ids: string[];
  resource_type: TagType;
  resource_ids: string[];
}

export interface BulkTagResponse {
  success_count: number;
  failed_count: number;
  errors?: {
    resource_id: string;
    tag_id: string;
    error: string;
  }[];
}

export interface TagSuggestion {
  tag_id: string;
  tag_name: string;
  type: TagType;
  confidence_score: number;
  reason?: string;
}

export interface AutoTagRule {
  id: string;
  name: string;
  type: TagType;
  conditions: {
    field: string;
    operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'regex';
    value: string;
  }[];
  tag_ids: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}