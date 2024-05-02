import { startAddMenu, startDeleteAllOrders, startDeletingOrder } from '@/context'
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
  
  const deleteOrders = (  ) => {
    dispatch( startDeleteAllOrders( ) )
  }

  return { addMenu, deleteMenu, deleteOrders }
}