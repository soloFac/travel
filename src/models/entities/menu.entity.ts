import { type VariantEntity } from './variant.entity'

export class MenuEntity {
  public id: string
  public name: string
  public price: number = 0
  public description: string
  public image: string
  public category: string
  public variants: VariantEntity[]
  public stock: boolean
  public withoutVariant: boolean

  constructor ( id: string, name: string, price: number, description: string, image: string, category: string, variants: VariantEntity[], stock: boolean, withoutVariant: boolean
  ) {
    this.id = id
    this.name = name
    this.price = price
    this.description = description
    this.image = image
    this.category = category
    this.variants = variants
    this.stock = stock
    this.withoutVariant = withoutVariant
  }
}
