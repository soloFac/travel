import { getPlainString } from './getPlainString'
import { MenuEntity, VariantEntity } from '@/models'

export const GetVariantSelected = ( menu: MenuEntity, variant: string ): VariantEntity | string => {
  const variantSelected = menu.variants.find( ( _variant: VariantEntity ) => 
    getPlainString( _variant.name ) === getPlainString( variant ) )
  if ( !variantSelected ) { return 'No se ha encontrado la variante' }
  return variantSelected
}
