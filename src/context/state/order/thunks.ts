import { OrderEntity } from '@/models'
import { deleteOrder, fetchOrders, fetchOrdersError, fetchOrdersSuccess } from './orderSlice'

// const API_URL = 'https://api.example.com/orders'

export const startAddMenu = ( order: OrderEntity ) => {
  return async ( dispatch: any ) => {
    dispatch( fetchOrders() )

    try {
      dispatch( fetchOrdersSuccess( { order } ) )
    } catch ( error ) {
      dispatch( fetchOrdersError( error ) )
    }
  }
}

export const startDeletingOrder = ( id: string ) => {
  return async ( dispatch: any ) => {
    dispatch( fetchOrders() )

    try {
      dispatch( deleteOrder( { id } ) )
    } catch ( error ) {
      dispatch( fetchOrdersError( error ) )
    }
  }
}