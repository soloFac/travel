import { Extra, VariantEntity } from '@/models'

export const CalculateTotalOrder = ( variant: VariantEntity, extrasSelected: Extra[], amount: number ) => {
  let total = 0

  if ( amount < 1 || amount > 6000 ) { throw new Error( 'Select a valid amount' ) }
  
  if ( extrasSelected.length > 0 ) {
    extrasSelected.forEach( ( extra ) => {
      total += extra.price * amount
    } )
  }
  
  total += variant.price * amount

  return total
}
