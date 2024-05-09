import { startSavingOrderInfo } from '@/context'
import { useAppDispatch } from '@/hooks'
import { OrderInfoDto } from '@/models'

export const useOrderInfoActions = () => {
  const dispatch = useAppDispatch()

  const addOrderInfo = ( orderInfo: OrderInfoDto ) => {
    try {
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
