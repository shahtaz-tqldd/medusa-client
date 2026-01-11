export interface VisitorData {
  visitor_id: string;
  ip_address: string;
  device_name: string;
  device_type: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface VisitorSession {
  visitor_id: string;
  initialized_at: number;
  visit_count: number;
}

export interface LocationData {
  ip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface DeviceInfo {
  device_name: string;
  device_type: 'Mobile' | 'Tablet' | 'Desktop';
}


export interface NewVisitorPayload {
  ip_address: string;
  device_name: string;
  device_type: string;
  longitude: number;
  latitude: number;
  country: string;
  city: string;
}

export interface ExistingVisitorPayload {
  visitor_id: string;
}

export type VisitorPayload = NewVisitorPayload | ExistingVisitorPayload;

export interface VisitorInitResponse {
  success: boolean;
  data: {
    visitor_id: string;
    visit_count: number;
  };
}