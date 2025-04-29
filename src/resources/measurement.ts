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
  async listGroups(params?: MeasurementGroupListParams): Promise<{
    data: MeasurementGroup[]
  }> {
    return this.client.get(this.getShopPath('/measurement-groups'), params);
  }

  /**
   * Get measurement group by ID
   */
  async getGroup(groupId: number): Promise<MeasurementGroup> {
    return this.client.get(this.getShopPath(`/measurement-groups/${groupId}`));
  }

  /**
   * Create new measurement group
   */
  async createGroup(data: CreateMeasurementGroupRequest): Promise<MeasurementGroup> {
    return this.client.post(this.getShopPath('/measurement-groups'), data);
  }

  /**
   * Update measurement group
   */
  async updateGroup(groupId: number, data: UpdateMeasurementGroupRequest): Promise<MeasurementGroup> {
    return this.client.put(this.getShopPath(`/measurement-groups/${groupId}`), data);
  }

  /**
   * Delete measurement group
   */
  async deleteGroup(groupId: number): Promise<void> {
    return this.client.delete(this.getShopPath(`/measurement-groups/${groupId}`));
  }

  /**
   * Add unit to group
   */
  async addUnit(groupId: number, data: CreateMeasurementUnitRequest): Promise<MeasurementUnit> {
    return this.client.post(this.getShopPath(`/measurement-groups/${groupId}/units`), data);
  }

  /**
   * Update unit
   */
  async updateUnit(
    groupId: number,
    unitId: number,
    data: UpdateMeasurementUnitRequest
  ): Promise<MeasurementUnit> {
    return this.client.put(
      this.getShopPath(`/measurement-groups/${groupId}/units/${unitId}`),
      data
    );
  }

  /**
   * Remove unit from group
   */
  async removeUnit(groupId: number, unitId: number): Promise<void> {
    return this.client.delete(
      this.getShopPath(`/measurement-groups/${groupId}/units/${unitId}`)
    );
  }

  /**
   * Convert measurement
   */
  async convert(data: {
    value: number;
    from_unit_id: number;
    to_unit_id: number;
  }): Promise<MeasurementConversion> {
    return this.client.post(this.getShopPath('/measurements/convert'), data);
  }

  /**
   * Bulk convert measurements
   */
  async bulkConvert(data: MeasurementConversionBulkRequest): Promise<{
    values: number[];
  }> {
    return this.client.post(this.getShopPath('/measurements/bulk-convert'), data);
  }

  /**
   * Get conversion matrix for a group
   */
  async getConversionMatrix(groupId: number): Promise<MeasurementConversionMatrix> {
    return this.client.get(this.getShopPath(`/measurement-groups/${groupId}/conversion-matrix`));
  }

  /**
   * Update conversion matrix
   */
  async updateConversionMatrix(
    groupId: number,
    data: MeasurementConversionMatrix
  ): Promise<MeasurementConversionMatrix> {
    return this.client.put(
      this.getShopPath(`/measurement-groups/${groupId}/conversion-matrix`),
      data
    );
  }

  /**
   * Get measurement group statistics
   */
  async getStatistics(): Promise<MeasurementGroupStatistics> {
    return this.client.get(this.getShopPath('/measurement-groups/statistics'));
  }

  /**
   * Validate conversions in a group
   */
  async validateConversions(groupId: number): Promise<{
    is_valid: boolean;
    errors?: {
      unit_id: number;
      message: string;
    }[];
  }> {
    return this.client.post(
      this.getShopPath(`/measurement-groups/${groupId}/validate-conversions`),
      {}
    );
  }
}