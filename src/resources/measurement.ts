import {
  MeasurementGroup,
  MeasurementUnit,
  CreateMeasurementGroupRequest,
  UpdateMeasurementGroupRequest,
  CreateMeasurementUnitRequest,
  UpdateMeasurementUnitRequest,
  MeasurementConversion,
  MeasurementGroupListParams,
  MeasurementConversionBulkRequest,
  MeasurementConversionMatrix,
  MeasurementGroupStatistics
} from '../types/measurement';
import { BaseResource } from './base';

export class MeasurementResource extends BaseResource {
  /**
   * Get list of measurement groups
   */
  async listGroups(shopId: string, params?: MeasurementGroupListParams): Promise<{
    data: MeasurementGroup[]
  }> {
    return this.client.get(`/shops/${shopId}/measurement-groups`, params);
  }

  /**
   * Get measurement group by ID
   */
  async getGroup(shopId: string, groupId: number): Promise<MeasurementGroup> {
    return this.client.get(`/shops/${shopId}/measurement-groups/${groupId}`);
  }

  /**
   * Create new measurement group
   */
  async createGroup(shopId: string, data: CreateMeasurementGroupRequest): Promise<MeasurementGroup> {
    return this.client.post(`/shops/${shopId}/measurement-groups`, data);
  }

  /**
   * Update measurement group
   */
  async updateGroup(shopId: string, groupId: number, data: UpdateMeasurementGroupRequest): Promise<MeasurementGroup> {
    return this.client.put(`/shops/${shopId}/measurement-groups/${groupId}`, data);
  }

  /**
   * Delete measurement group
   */
  async deleteGroup(shopId: string, groupId: number): Promise<void> {
    return this.client.delete(`/shops/${shopId}/measurement-groups/${groupId}`);
  }

  /**
   * Add unit to group
   */
  async addUnit(shopId: string, groupId: number, data: CreateMeasurementUnitRequest): Promise<MeasurementUnit> {
    return this.client.post(`/shops/${shopId}/measurement-groups/${groupId}/units`, data);
  }

  /**
   * Update unit
   */
  async updateUnit(
    shopId: string,
    groupId: number,
    unitId: number,
    data: UpdateMeasurementUnitRequest
  ): Promise<MeasurementUnit> {
    return this.client.put(
      `/shops/${shopId}/measurement-groups/${groupId}/units/${unitId}`,
      data
    );
  }

  /**
   * Remove unit from group
   */
  async removeUnit(shopId: string, groupId: number, unitId: number): Promise<void> {
    return this.client.delete(
      `/shops/${shopId}/measurement-groups/${groupId}/units/${unitId}`
    );
  }

  /**
   * Convert measurement
   */
  async convert(shopId: string, data: {
    value: number;
    from_unit_id: number;
    to_unit_id: number;
  }): Promise<MeasurementConversion> {
    return this.client.post(`/shops/${shopId}/measurements/convert`, data);
  }

  /**
   * Bulk convert measurements
   */
  async bulkConvert(shopId: string, data: MeasurementConversionBulkRequest): Promise<{
    values: number[];
  }> {
    return this.client.post(`/shops/${shopId}/measurements/bulk-convert`, data);
  }

  /**
   * Get conversion matrix for a group
   */
  async getConversionMatrix(shopId: string, groupId: number): Promise<MeasurementConversionMatrix> {
    return this.client.get(`/shops/${shopId}/measurement-groups/${groupId}/conversion-matrix`);
  }

  /**
   * Update conversion matrix
   */
  async updateConversionMatrix(
    shopId: string,
    groupId: number,
    data: MeasurementConversionMatrix
  ): Promise<MeasurementConversionMatrix> {
    return this.client.put(
      `/shops/${shopId}/measurement-groups/${groupId}/conversion-matrix`,
      data
    );
  }

  /**
   * Get measurement group statistics
   */
  async getStatistics(shopId: string): Promise<MeasurementGroupStatistics> {
    return this.client.get(`/shops/${shopId}/measurement-groups/statistics`);
  }

  /**
   * Validate conversions in a group
   */
  async validateConversions(shopId: string, groupId: number): Promise<{
    is_valid: boolean;
    errors?: {
      unit_id: number;
      message: string;
    }[];
  }> {
    return this.client.post(
      `/shops/${shopId}/measurement-groups/${groupId}/validate-conversions`,
      {}
    );
  }
}