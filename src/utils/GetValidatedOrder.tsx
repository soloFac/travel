import { useAppSelector } from '@/hooks'
import { Extra, MenuEntity, OrderDto, OrderEntity, VariantEntity } from '@/models'
import { getPlainString } from './getPlainString'

export function GetValidatedOrder ( menu: MenuEntity, menuName: string, variant: string, dressings: string[], extras: string[], amount: number ): OrderDto | string {

  const { local } = useAppSelector( state => state.localInfo )
  // Todo: en realidad debería recuperar los datos desde la API.

  const extrasSelected: Extra[] = []
  const dressingsSelected: string[] = []
  
  if ( menu.name.toLowerCase() !== menuName.toLowerCase() ) {
    return 'No se ha encontrado el menu'
  }
  
  const variantSelected = menu.variants.find( ( _variant: VariantEntity ) => 
    getPlainString( _variant.name ) === getPlainString( variant ) )
  if ( !variantSelected ) { return 'No se ha encontrado la variante' }

  const category = local?.categories.find( ( _category ) => 
    getPlainString( _category.name ) === getPlainString( menu.category ) )

  extras.forEach( ( extra ) => {
    const extraSelected = category?.extras?.find( ( e ) => getPlainString( e.name ) === getPlainString( extra ) )
    if ( extraSelected ) {
      extrasSelected.push( extraSelected )
    } else {
      return 'No se ha encontrado el extra'
    }
  } )
  
  let total = 0
  
  dressings.forEach( ( dressing ) => {
    if ( category?.dressing?.includes( dressing ) ) {
      dressingsSelected.push( dressing )
    } else {
      return 'No se ha encontrado el aderezo'
    }
  } )
  
  if ( amount < 1 || amount > 6000 ) { return 'Select a valid amount' }
  
  if ( extrasSelected.length > 0 ) {
    extrasSelected.forEach( ( extra ) => {
      total += extra.price * amount
    } )
  }
  
  total += variantSelected.price * amount
  
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