import { DeliveryType, OrderInfoDto, OrderInfoEntity, PaymentType, ZoneEntity } from '@/models';
import { getPlainString } from './getPlainString';

interface GetValidatedOrderInfoProps {
  name: string
  phone: string
  comments: string
  paymentType: PaymentType
  deliveryType: DeliveryType
  address?: string
  addressNumber?: string
  zone?: string
}

export const GetValidatedOrderInfo = ( values: GetValidatedOrderInfoProps, zones: ZoneEntity[] ): OrderInfoEntity | string => {

  const { name, phone, comments, paymentType, deliveryType, address, addressNumber, zone } = values;
  console.log( 'zone: ', zone )

  const zoneSelected: ZoneEntity | undefined = ( zones.length > 0 ) ? zones.find( ( z: ZoneEntity ) => getPlainString( z.name ) === zone ) : undefined;

  if ( !zoneSelected && deliveryType === DeliveryType.DELIVERY ) return 'Zona invalida'

  const [error, orderInfoDto] = OrderInfoDto.create( { name, phone, comments, paymentType, deliveryType, address, addressNumber, zone: zoneSelected } as OrderInfoEntity );
  if ( orderInfoDto === undefined ) {
    if ( error ) { return error }
    return 'Error al crear el pedido'
  }

  return orderInfoDto
}