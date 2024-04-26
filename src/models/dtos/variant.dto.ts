import { validNumber } from '../../helper/validNumber'
import { validString } from '../../helper/validString'
import { type VariantEntity } from '../entities/variant.entity'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class VariantDto {
  constructor (
    public name: string,
    public price: number
  ) {
  }

  static create = ( variant: VariantEntity ): [ string?, VariantEntity? ] => {
    const { name, price } = variant

    if ( !validString( name, 3, 30 ) ) {
      return ['Name must be at least 3 characters, and less than 30']
    }

    if ( !validNumber( price, 0, 150000 ) ) {
      return ['Price must be a positive number']
    }

    const variantDto = new VariantDto( name, price )
    return [
      undefined,
      variantDto
    ]
  }
}
