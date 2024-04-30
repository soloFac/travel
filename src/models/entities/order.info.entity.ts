import { ZoneEntity } from './zone.entity';

export enum DeliveryType {
  PICKUP = 'retiro',
  DELIVERY = 'delivery'
}

export enum PaymentType {
  CASH = 'efectivo',
  TRANSFER = 'transferencia'
}

export class OrderInfoEntity {
  public name: string
  public phone: string
  public comments: string
  public paymentType: PaymentType
  public deliveryType: DeliveryType
  public address?: string
  public addressNumber?: string
  public zone?: ZoneEntity

  constructor ( name: string, phone: string, comments: string, paymentType: PaymentType, deliveryType: DeliveryType, address: string | undefined, addressNumber: string | undefined, zone: ZoneEntity | undefined ) {
    this.name = name
    this.phone = phone
    this.deliveryType = deliveryType
    this.address = address
    this.addressNumber = addressNumber
    this.comments = comments
    this.zone = zone
    this.paymentType = paymentType
  }


}