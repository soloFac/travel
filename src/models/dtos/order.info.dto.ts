import { validString } from '@/helper';
import { DeliveryType, OrderInfoEntity, PaymentType, ZoneEntity } from '../entities';
import { ZoneDto } from './zone.dto';
import { isMemberOfEnum } from '@/utils';

export class OrderInfoDto {
  constructor (
    public name: string,
    public phone: string,
    public comments: string,
    public paymentType: PaymentType,
    public deliveryType: DeliveryType,
    public address?: string,
    public addressNumber?: string,
    public zone?: ZoneEntity,
  ) {}

  static create ( orderInfo: OrderInfoEntity ): [ string?, OrderInfoEntity? ] {
    const { name, phone, deliveryType, address, addressNumber, comments, zone, paymentType } = orderInfo

    if ( !validString( name, 3, 40 ) ) {
      return ['name length must be more than 1 and less than 40']
    }

    if ( !validString( phone, 10, 10 ) ) {
      return ['phone length must be equal to 10']
    }

    if ( !validString( comments, 1, 100 ) ) {
      return ['comments length must be more than 1 and less than 100']
    }

    if ( !isMemberOfEnum( deliveryType, DeliveryType ) ) {
      return ['Delivery must belong to DeliveryType']
    }

    if ( deliveryType === DeliveryType.DELIVERY ) {
      if ( !address || !addressNumber || !zone ) {
        return ['Delivery address, number and zone are required']
      }

      if ( !validString( address, 3, 50 ) ) {
        return ['address length must be more than 1 and less than 50']
      }
  
      if ( !validString( addressNumber, 1, 6 ) ) {
        return ['addressNumber length must be more than 1 and less than 6']
      }

      const [err, zoneDto] = ZoneDto.create( zone )
      if ( !zoneDto ) { return [err] }
    }

    if ( !isMemberOfEnum( paymentType, PaymentType ) ) {
      return ['Payment must belong to PaymentType']
    }

    const orderInfoDto = new OrderInfoEntity( name, phone, comments, paymentType, deliveryType, address, addressNumber, zone )
    return [undefined, orderInfoDto]
  }
}