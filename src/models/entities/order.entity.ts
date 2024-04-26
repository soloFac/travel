import { Extra } from '../db.types'
import { VariantEntity } from './variant.entity'

export class OrderEntity {
  id: string
  menu: string
  amount: number
  total: number
  variant: VariantEntity
  dressing?: string[] | undefined
  extras?: Extra[] | undefined

  constructor ( id: string, menu: string, variante: VariantEntity, cantidad: number, total: number, aderezos: string[], extras: Extra[] ) {
    if ( id !== '' && id !== undefined && id !== null ) {
      this.id = id
    } else {
      this.id = crypto.randomUUID()
    }
    this.menu = menu
    this.variant = variante
    this.amount = cantidad
    this.total = total
    this.dressing = aderezos
    this.extras = extras
  }
}