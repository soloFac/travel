import { getPlainString } from './getPlainString'
import { Extra, FoodCategoryEntity } from '@/models'

export const GetExtrasSelected = ( extras: string[], category: FoodCategoryEntity ): Extra[] => {
  const extrasSelected: Extra[] = []
  extras.forEach( ( extra: string ) => {
    const extraSelected = category?.extras?.find( ( e: Extra ) => getPlainString( e.name ) === getPlainString( extra ) )
    if ( extraSelected ) {
      extrasSelected.push( extraSelected )
    } else {
      return 'No se ha encontrado el extra'
    }
  } )
  return extrasSelected
}
