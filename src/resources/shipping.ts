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
  async listPartners(): Promise<{ data: ShippingPartner[] }> {
    return this.client.get(this.getShopPath('/shipping/partners'));
  }

  /**
   * Calculate shipping fee
   */
  async calculateFee(data: ShippingFeeRequest): Promise<ShippingFeeResponse> {
    return this.client.post(this.getShopPath('/shipping/calculate'), data);
  }

  /**
   * Create new shipment
   */
  async createShipment(data: ShipmentCreationRequest): Promise<Shipment> {
    return this.client.post(this.getShopPath('/shipments'), data);
  }

  /**
   * Get shipment by ID
   */
  async getShipmentById(shipmentId: string): Promise<Shipment> {
    return this.client.get(this.getShopPath(`/shipments/${shipmentId}`));
  }

  /**
   * List shipments
   */
  async listShipments(params?: ShipmentListParams): Promise<{ data: Shipment[] }> {
    return this.client.get(this.getShopPath('/shipments'), params);
  }

  /**
   * Cancel shipment
   */
  async cancelShipment(shipmentId: string, reason?: string): Promise<Shipment> {
    return this.client.post(this.getShopPath(`/shipments/${shipmentId}/cancel`), { reason });
  }

  /**
   * Print shipping label
   */
  async getShippingLabel(shipmentId: string): Promise<{ url: string }> {
    return this.client.get(this.getShopPath(`/shipments/${shipmentId}/label`));
  }

  /**
   * Get delivery tracking info
   */
  async getTrackingInfo(shipmentId: string): Promise<{
    status: string;
    tracking_code: string;
    tracking_url?: string;
    status_history: {
      status: string;
      time: string;
      description?: string;
    }[];
  }> {
    return this.client.get(this.getShopPath(`/shipments/${shipmentId}/tracking`));
  }

  /**
   * Update shipment COD amount
   */
  async updateCOD(shipmentId: string, codAmount: number): Promise<Shipment> {
    return this.client.put(this.getShopPath(`/shipments/${shipmentId}/cod`), { cod_amount: codAmount });
  }
}