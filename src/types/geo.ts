export interface Province {
  id: string;
  name: string;
  name_en: string;
}

export interface District {
  id: string;
  name: string;
  name_en: string;
  province_id: string;
}

export interface Commune {
  id: string;
  name: string;
  name_en: string;
  district_id: string;
}

export interface GeoListParams {
  country_code?: string;
  province_id?: string;
  district_id?: string;
}

export interface Location {
  province_id: string;
  province_name: string;
  district_id: string;
  district_name: string;
  commune_id?: string;
  commune_name?: string;
  address?: string;
  full_address?: string;
  country_code?: string;
  post_code?: string;
}

export interface LocationValidationResult {
  is_valid: boolean;
  errors?: {
    province_id?: string;
    district_id?: string;
    commune_id?: string;
    address?: string;
  };
  normalized_address?: string;
  suggested_locations?: Location[];
}

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface GeocodingResult {
  location: Location;
  coordinates: GeoCoordinate;
  confidence_score: number;
}