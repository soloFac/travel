import { Extra, FoodCategoryEntity } from '@/models'

export const GetExtrasByCategory = ( categories: FoodCategoryEntity[], categoryName: string ): Extra[] | null => {
  const category = categories.find( cat => cat.name === categoryName )

  if ( category && category.dressing ) {
    return category.extras
  } return null
}
