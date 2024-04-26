import { startAddMenu, startDeletingOrder } from '@/context'
import { useAppDispatch } from '@/hooks'
import { OrderEntity } from '@/models'

export const useOrderActions = () => {
  const dispatch = useAppDispatch()
  
  const addMenu = ( order: OrderEntity ) => {
    dispatch( startAddMenu( order ) )
  }

  const deleteMenu = ( id: string ) => {
    dispatch( startDeletingOrder( id ) )
  }

  return { addMenu, deleteMenu }
}