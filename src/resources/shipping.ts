import {
  ShippingPartner,
  ShippingFeeRequest,
  ShippingFeeResponse,
  ShipmentCreationRequest,
  Shipment,
  ShipmentListParams
} from '../types/shipping';
import { BaseResource } from './base';

export class ShippingResource extends BaseResource {
  /**
   * Get list of shipping partners
   */
  async listPartners(shopId: string): Promise<{ data: ShippingPartner[] }> {
    return this.client.get(`/shops/${shopId}/shipping/partners`);
  }

  /**
   * Calculate shipping fee
   */
  async calculateFee(shopId: string, data: ShippingFeeRequest): Promise<ShippingFeeResponse> {
    return this.client.post(`/shops/${shopId}/shipping/calculate`, data);
  }

  /**
   * Create new shipment
   */
  async createShipment(shopId: string, data: ShipmentCreationRequest): Promise<Shipment> {
    return this.client.post(`/shops/${shopId}/shipments`, data);
  }

  /**
   * Get shipment by ID
   */
  async getShipmentById(shopId: string, shipmentId: string): Promise<Shipment> {
    return this.client.get(`/shops/${shopId}/shipments/${shipmentId}`);
  }

  /**
   * List shipments
   */
  async listShipments(shopId: string, params?: ShipmentListParams): Promise<{ data: Shipment[] }> {
    return this.client.get(`/shops/${shopId}/shipments`, params);
  }

  /**
   * Cancel shipment
   */
  async cancelShipment(shopId: string, shipmentId: string, reason?: string): Promise<Shipment> {
    return this.client.post(`/shops/${shopId}/shipments/${shipmentId}/cancel`, { reason });
  }

  /**
   * Print shipping label
   */
  async getShippingLabel(shopId: string, shipmentId: string): Promise<{ url: string }> {
    return this.client.get(`/shops/${shopId}/shipments/${shipmentId}/label`);
  }

  /**
   * Get delivery tracking info
   */
  async getTrackingInfo(shopId: string, shipmentId: string): Promise<{
    status: string;
    tracking_code: string;
    tracking_url?: string;
    status_history: {
      status: string;
      time: string;
      description?: string;
    }[];
  }> {
    return this.client.get(`/shops/${shopId}/shipments/${shipmentId}/tracking`);
  }

  /**
   * Update shipment COD amount
   */
  async updateCOD(shopId: string, shipmentId: string, codAmount: number): Promise<Shipment> {
    return this.client.put(`/shops/${shopId}/shipments/${shipmentId}/cod`, { cod_amount: codAmount });
  }
}