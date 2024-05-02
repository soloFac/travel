import { OrderInfoDto, OrderInfoEntity, ZoneEntity } from '@/models';

export const GetValidatedOrderInfo = ( values: any, zones: ZoneEntity[] ): OrderInfoEntity | string => {
  const { name, phone, comments, paymentType, deliveryType, address, addressNumber, zone } = values;

  console.log( 'GetValidatedOrderInfo-- ', values )

  const zoneSelected: ZoneEntity | undefined = ( zones.length > 0 ) ? zones.find( ( z: ZoneEntity ) => z.name === zone ) : undefined;
  
  console.log( 'zoneSelected-- ', zoneSelected )
  
  if ( typeof zoneSelected === 'string' ) return 'Zona invalida'

  const [error, orderInfoDto] = OrderInfoDto.create( { name, phone, comments, paymentType, deliveryType, address, addressNumber, zone: zoneSelected } as OrderInfoEntity );
  if ( orderInfoDto === undefined ) {
    if ( error ) { return error }
    return 'Error al crear el pedido'
  }

  console.log( 'orderInfoDto-- ', orderInfoDto )

  return orderInfoDto
}