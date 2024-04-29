import { validString } from '@/helper';
import { DeliveryType, OrderInfoEntity, PaymentType, ZoneEntity } from '../entities';
import { ZoneDto } from './zone.dto';
import { isMemberOfEnum } from '@/utils';

export class OrderInfoDto {
  constructor (
    public name: string,
    public phone: string,
    public deliveryType: DeliveryType,
    public address: string,
    public addressNumber: string,
    public comments: string,
    public zone: ZoneEntity,
    public paymentType: PaymentType,
  ) {}

  static create ( orderInfo: OrderInfoEntity ): [ string?, OrderInfoEntity? ] {
    const { name, phone, deliveryType, address, addressNumber, comments, zone, paymentType } = orderInfo

    if ( !validString( name, 1, 40 ) ) {
      return ['name length must be more than 1 and less than 40']
    }

    if ( !validString( phone, 10, 10 ) ) {
      return ['phone length must be more than 9 and less than 10']
    }

    if ( !validString( address, 1, 50 ) ) {
      return ['address length must be more than 1 and less than 50']
    }

    if ( !validString( addressNumber, 1, 6 ) ) {
      return ['addressNumber length must be more than 1 and less than 6']
    }

    if ( !validString( comments, 1, 100 ) ) {
      return ['comments length must be more than 1 and less than 100']
    }

    const [err, zoneDto] = ZoneDto.create( zone )
    if ( !zoneDto ) { return [err] }

    if ( !isMemberOfEnum( deliveryType, DeliveryType ) ) {
      return ['Delivery must belong to DeliveryType']
    }

    if ( !isMemberOfEnum( paymentType, PaymentType ) ) {
      return ['Payment must belong to PaymentType']
    }

    const orderInfoDto = new OrderInfoEntity( name, phone, deliveryType, address, addressNumber, comments, zone, paymentType )
    return [undefined, orderInfoDto]
  }
}