import { useAppSelector } from '@/hooks'
import { Extra, MenuEntity, OrderDto, OrderEntity, VariantEntity } from '@/models'

export function GetValidatedOrder ( menu: MenuEntity, menuName: string, variant: string, dressings: string[], extras: string[], amount: number ): OrderDto | string {

  const { local } = useAppSelector( state => state.localInfo )
  // Todo: en realidad debería recuperar los datos desde la API.

  const extrasSelected: Extra[] = []
  const dressingsSelected: string[] = []
  let total = 0

  if ( menu.name.toLowerCase() !== menuName.toLowerCase() ) {
    return 'No se ha encontrado el menu'
  }

  const variantSelected = menu.variants.find( ( v: VariantEntity ) => v.name.toLowerCase() === variant )
  if ( !variantSelected ) { return 'No se ha encontrado la variante' }

  const category = local?.categories.find( ( c ) => c.name.toLowerCase() === menu.category.toLowerCase() )

  
  extras.forEach( ( extra ) => {
    const extraSelected = category?.extras?.find( ( e ) => e.name.toLowerCase() === extra )
    if ( extraSelected ) {
      extrasSelected.push( extraSelected )
    } else {
      return 'No se ha encontrado el extra'
    }
  } )

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
  
  const order = new OrderEntity( '', menuName, variantSelected, amount, total, dressingsSelected, extrasSelected )

  const [error, orderDto] = OrderDto.create( order )
  if ( !orderDto && error ) { return error }

  return orderDto as OrderDto
}
