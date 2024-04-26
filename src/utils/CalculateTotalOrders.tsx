import { OrderEntity } from '@/models'

export const CalculateTotalOrders = ( orders: OrderEntity[] ): number => {
  if ( orders.length === 0 ) return 0
  
  let sum = 0
  for ( const order of orders ) {    
    sum += order.total
  }
  return sum
}
