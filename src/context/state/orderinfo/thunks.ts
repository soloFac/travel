import { OrderInfoDto } from '@/models'
import { saveOrderInfo, startSaving } from './orderInfoSlice'

export const startSavingOrderInfo = ( orderInfo: OrderInfoDto ) => {
  return async ( dispatch: any ) => {
    console.log( 'startSavingOrderInfo', orderInfo )
    dispatch( startSaving() )
    try {
      dispatch( saveOrderInfo( { orderInfo } ) )
    } catch ( error ) {
      console.error( 'Error al guardar datos:', error );
    }
  }
}