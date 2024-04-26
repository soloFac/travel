import { FoodCategoryEntity } from '@/models'

export const GetDressingsByCategory = ( categories: FoodCategoryEntity[], categoryName: string ): string[] | null => {
  const category = categories.find( cat => cat.name === categoryName )

  if ( category && category.dressing ) {
    return category.dressing
  } return null
}
