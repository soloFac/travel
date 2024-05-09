import { startSavingOrderInfo } from '@/context/state/orderinfo'
import { useAppDispatch } from '@/hooks'
import { OrderInfoDto } from '@/models'

export const useOrderInfoActions = () => {
  const dispatch = useAppDispatch()

  const addOrderInfo = ( orderInfo: OrderInfoDto ) => {
    try {
      console.log( 'addOrderInfo', orderInfo )
      dispatch( startSavingOrderInfo( orderInfo ) )
      // Almacenarlo en firebase también
    } catch ( error ) {
      console.error( error )
    }
  }
  
  return {
    addOrderInfo
  }
}
