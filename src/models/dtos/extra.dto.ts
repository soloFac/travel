import { validNumber } from '../../helper/validNumber'
import { validString } from '../../helper/validString'
import { type Extra } from '../db.types/extra.type'

export class ExtraDto {
  constructor (
    public readonly name: string,
    public readonly price: number
  ) {}

  static create = ( extra: Extra ): [ string?, Extra? ] => {
    const { name, price } = extra

    if ( !validString( name, 3, 30 ) ) {
      return ['Name must be at least 3 characters, and less than 30']
    }

    if ( !validNumber( price, 0, 5000 ) ) {
      return ['Price must be a positive number']
    }

    return [
      undefined,
      new ExtraDto( name, price )
    ]
  }
}
