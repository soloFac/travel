import { Extra, VariantEntity } from '@/models'

export const createAddaptedOrder = ( menuName: string, variant: VariantEntity, dressings: string[], extras: Extra[], amount: number ) => {
  return (
    {
      menuName: menuName,
      variant: variant,
      dressings: dressings,
      extras: extras,
      amount: amount
    }
  )
}
