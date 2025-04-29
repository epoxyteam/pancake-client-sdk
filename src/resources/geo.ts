import {
  Province,
  District,
  Commune,
  GeoListParams,
  Location,
  LocationValidationResult,
  GeocodingResult
} from '../types/geo';
import { BaseResource } from './base';

export class GeoResource extends BaseResource {
  /**
   * Get list of provinces
   */
  async listProvinces(params?: { country_code?: string }): Promise<{ data: Province[] }> {
    return this.client.get('/geo/provinces', params);
  }

  /**
   * Get province by ID
   */
  async getProvince(provinceId: string): Promise<Province> {
    return this.client.get(`/geo/provinces/${provinceId}`);
  }

  /**
   * Get list of districts in a province
   */
  async listDistricts(provinceId: string): Promise<{ data: District[] }> {
    return this.client.get('/geo/districts', { province_id: provinceId });
  }

  /**
   * Get district by ID
   */
  async getDistrict(districtId: string): Promise<District> {
    return this.client.get(`/geo/districts/${districtId}`);
  }

  /**
   * Get list of communes in a district
   */
  async listCommunes(districtId: string): Promise<{ data: Commune[] }> {
    return this.client.get('/geo/communes', { district_id: districtId });
  }

  /**
   * Get commune by ID
   */
  async getCommune(communeId: string): Promise<Commune> {
    return this.client.get(`/geo/communes/${communeId}`);
  }

  /**
   * Validate address
   */
  async validateLocation(location: Location): Promise<LocationValidationResult> {
    return this.client.post('/geo/validate', location);
  }

  /**
   * Get full address details
   */
  async getFullLocation(params: {
    province_id?: string;
    district_id?: string;
    commune_id?: string;
  }): Promise<Location> {
    return this.client.get('/geo/location', params);
  }

  /**
   * Format address to standard format
   */
  async formatAddress(address: string, includePostalCode?: boolean): Promise<{
    formatted_address: string;
    postal_code?: string;
  }> {
    return this.client.post('/geo/format-address', { 
      address,
      include_postal_code: includePostalCode 
    });
  }

  /**
   * Get coordinates from address (forward geocoding)
   */
  async geocodeAddress(address: string): Promise<GeocodingResult[]> {
    return this.client.post('/geo/geocode', { address });
  }

  /**
   * Get address from coordinates (reverse geocoding)
   */
  async reverseGeocode(latitude: number, longitude: number): Promise<GeocodingResult> {
    return this.client.get('/geo/reverse-geocode', { latitude, longitude });
  }

  /**
   * Calculate distance between two locations
   */
  async calculateDistance(
    fromLocation: Location | { latitude: number; longitude: number },
    toLocation: Location | { latitude: number; longitude: number }
  ): Promise<{
    distance_km: number;
    duration_minutes: number;
  }> {
    return this.client.post('/geo/calculate-distance', {
      from: fromLocation,
      to: toLocation
    });
  }

  /**
   * Search locations by keyword
   */
  async searchLocations(keyword: string, params?: {
    country_code?: string;
    province_id?: string;
    limit?: number;
  }): Promise<Location[]> {
    return this.client.get('/geo/search', {
      keyword,
      ...params
    });
  }
}