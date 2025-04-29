export interface CustomerNote {
  id: string;
  customer_id: string;
  content: string;
  type: CustomerNoteType;
  attachments?: string[];
  created_by: {
    id: string;
    name: string;
  };
  tags?: string[];
  is_private: boolean;
  mentioned_users?: {
    id: string;
    name: string;
  }[];
  sentiment?: 'positive' | 'neutral' | 'negative';
  follow_up_date?: string;
  created_at: string;
  updated_at: string;
}

export type CustomerNoteType = 
  | 'general'
  | 'call'
  | 'email'
  | 'meeting'
  | 'support'
  | 'complaint'
  | 'feedback'
  | 'other';

export interface CreateCustomerNoteRequest {
  content: string;
  type: CustomerNoteType;
  attachments?: string[];
  tags?: string[];
  is_private?: boolean;
  mentioned_user_ids?: string[];
  follow_up_date?: string;
}

export interface UpdateCustomerNoteRequest {
  content?: string;
  type?: CustomerNoteType;
  attachments?: string[];
  tags?: string[];
  is_private?: boolean;
  follow_up_date?: string;
}

export interface CustomerNoteListParams {
  page_size?: number;
  page_number?: number;
  type?: CustomerNoteType;
  search?: string;
  created_by?: string;
  is_private?: boolean;
  has_attachments?: boolean;
  has_follow_up?: boolean;
  from_date?: string;
  to_date?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface CustomerCommunicationHistory {
  id: string;
  customer_id: string;
  type: CommunicationType;
  direction: 'inbound' | 'outbound';
  status: CommunicationStatus;
  channel: CommunicationChannel;
  content?: string;
  attachments?: string[];
  duration_seconds?: number;
  handled_by?: {
    id: string;
    name: string;
  };
  tags?: string[];
  metadata?: Record<string, any>;
  created_at: string;
}

export type CommunicationType = 
  | 'call'
  | 'email'
  | 'sms'
  | 'chat'
  | 'whatsapp'
  | 'facebook'
  | 'other';

export type CommunicationStatus =
  | 'completed'
  | 'missed'
  | 'no_answer'
  | 'busy'
  | 'failed'
  | 'cancelled';

export type CommunicationChannel =
  | 'phone'
  | 'email'
  | 'sms'
  | 'messenger'
  | 'whatsapp'
  | 'webchat'
  | 'other';

export interface CustomerCommunicationStats {
  total_interactions: number;
  by_type: {
    [key in CommunicationType]?: number;
  };
  by_direction: {
    inbound: number;
    outbound: number;
  };
  by_status: {
    [key in CommunicationStatus]?: number;
  };
  average_response_time?: number;
  average_handling_time?: number;
  missed_interaction_rate: number;
  daily_interaction_trends: {
    date: string;
    count: number;
    by_type: {
      [key in CommunicationType]?: number;
    };
  }[];
}

export interface CreateCommunicationRequest {
  type: CommunicationType;
  direction: 'inbound' | 'outbound';
  status: CommunicationStatus;
  channel: CommunicationChannel;
  content?: string;
  attachments?: string[];
  duration_seconds?: number;
  handled_by?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}