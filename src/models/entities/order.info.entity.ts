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
  public deliveryType: DeliveryType
  public address: string
  public addressNumber: string
  public comments: string
  public zone: ZoneEntity
  public paymentType: PaymentType

  constructor ( name: string, phone: string, deliveryType: DeliveryType, address: string, addressNumber: string, comments: string, zone: ZoneEntity, paymentType: PaymentType ) {
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