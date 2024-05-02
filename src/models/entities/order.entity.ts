import { Extra } from '../db.types'
import { VariantEntity } from './variant.entity'

export class OrderEntity {
  id: string
  menu: string
  amount: number
  total: number
  variant: VariantEntity
  dressing?: string[]
  extras?: Extra[]

  constructor ( id: string, menu: string, amount: number, total: number, variante: VariantEntity, dressing?: string[], extras?: Extra[] ) {
    if ( id !== '' && id !== undefined && id !== null ) {
      this.id = id
    } else {
      this.id = crypto.randomUUID()
    }
    this.menu = menu
    this.variant = variante
    this.amount = amount
    this.total = total
    this.dressing = dressing
    this.extras = extras
  }
}