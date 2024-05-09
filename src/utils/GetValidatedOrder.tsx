import { useAppSelector } from '@/hooks'
import { Extra, FoodCategoryEntity, MenuEntity, OrderDto, OrderEntity, VariantEntity } from '@/models'
import { getPlainString } from './getPlainString'
import { GetVariantSelected } from './GetVariantSelected'
import { GetExtrasSelected } from './GetExtrasSelected'
import { GetDressingsSelected } from './GetDressingsSelected'
import { CalculateTotalOrder } from './CalculateTotalOrder'

export function GetValidatedOrder ( menu: MenuEntity, menuName: string, variant: string, dressings: string[], extras: string[], amount: number ): OrderDto | string {

  const { local } = useAppSelector( state => state.localInfo )
  // Todo: en realidad debería recuperar los datos desde la API.

  if ( menu.name.toLowerCase() !== menuName.toLowerCase() ) {
    return 'No se ha encontrado el menu'
  }

  const category: FoodCategoryEntity | undefined = 
  local?.categories.find( ( _category ) => 
    getPlainString( _category.name ) === getPlainString( menu.category ) )
  
  console.log( 'category', category )
  if ( !category ) { return 'No se ha encontrado la categoría' }
  
  const variantSelected: VariantEntity | string = GetVariantSelected( menu, variant )
  if ( typeof variantSelected === 'string' ) { return variantSelected }
  const extrasSelected: Extra[] | string = GetExtrasSelected( extras, category )
  if ( typeof extrasSelected === 'string' ) { return extrasSelected }
  const dressingsSelected: string[] = GetDressingsSelected( dressings, category )
  
  const total = CalculateTotalOrder( variantSelected, extrasSelected, amount )
  
  const order = new OrderEntity( '', menuName, amount, total, variantSelected, dressingsSelected, extrasSelected )

  const [error, orderDto] = OrderDto.create( order )
  if ( !orderDto && error ) { return error }

  return orderDto as OrderDto 
}

export const calculateTotalOrders = ( orders: OrderDto[] ): number => {
  let total = 0
  orders.forEach( order => {
    total += order.total
  } )
  return total
}