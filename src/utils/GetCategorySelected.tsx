import { FoodCategoryEntity } from '@/models'
import { getPlainString } from './getPlainString'

export const GetCategorySelected = ( categorySelected: string, categories: FoodCategoryEntity[] ) => {

  const category: FoodCategoryEntity | undefined = 
  categories.find( ( _category: FoodCategoryEntity ) => {
    console.log( `${ getPlainString( _category.name ) } === ${ getPlainString( categorySelected ) }` )
    return getPlainString( _category.name ) === getPlainString( categorySelected )
  } )

  console.log( 'category', category )

  if ( !category ) { return 'No se ha encontrado la categoría' }

  return category
}
