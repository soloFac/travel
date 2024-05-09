import { OrderInfoDto } from '@/models'
import { saveOrderInfo, startSaving } from './orderDataSlice'

export const startSavingOrderInfo = ( orderInfo: OrderInfoDto ) => {
  return async ( dispatch: any ) => {
    dispatch( startSaving() )
    try {
      dispatch( saveOrderInfo( { orderInfo } ) )
    } catch ( error ) {
      console.error( 'Error al guardar datos:', error );
    }
  }
}