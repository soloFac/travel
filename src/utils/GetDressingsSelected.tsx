import { FoodCategoryEntity } from '@/models'

export const GetDressingsSelected = ( dressings: string[], category: FoodCategoryEntity ) => {
  const dressingsSelected: string[] = []
  dressings.forEach( ( dressing ) => {
    if ( category?.dressing?.includes( dressing ) ) {
      dressingsSelected.push( dressing )
    } else {
      return 'No se ha encontrado el aderezo' 
    }
  } )

  return dressingsSelected
}
