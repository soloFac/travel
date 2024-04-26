/* eslint-disable no-unused-vars */
import { validNumber } from '@/helper/validNumber'
import { validString } from '../../helper/validString'
import { type MenuEntity } from '../entities'
import { type VariantEntity } from '../entities/variant.entity'
import { isVariant } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MenuDto {
  constructor (
    public id: string,
    public name: string,
    public price: number,
    public description: string,
    public image: string,
    public category: string,
    public variants: VariantEntity[],
    public stock: boolean,
    public withoutVariant: boolean
  ) {}

  static create ( menu: MenuEntity ): [ string?, MenuEntity? ] {
    const { id, name, price, description, image, category, variants, stock, withoutVariant } = menu

    if ( !validString( id, 1, 4 ) ) {
      return ['id length must be more than 1 and less than 4']
    }

    if ( !validString( name, 1, 60 ) ) {
      return ['name length must be more than 1 and less than 60']
    }

    if ( !validNumber( price, 0, 1000000 ) ) {
      return ['price must be type number']
    }

    if ( !validString( description, 0, 500 ) ) {
      return ['description length must be less than 500']
    }

    if ( !validString( image, 10, 80 ) ) {
      return ['image length must be more than 10 and less than 80']
    }

    if ( !validString( category, 3, 15 ) ) {
      return ['category length must be more than 3 and less than 15']
    }

    if ( typeof stock !== 'boolean' || typeof withoutVariant !== 'boolean' ) {
      return ['stock or withoutVariant must be type boolean']
    }

    // Todo: review is right if I control in this way
    if ( !Array.isArray( variants ) ) {
      return ['variants must be an array']
    }

    if ( variants.length > 15 ) {
      return ['variants length must be lower than 15']
    }

    const isVariantArray = variants.every( variant => isVariant( variant ) )
    if ( !isVariantArray ) { return ['variants must be an array of VariantEntity'] }

    const menuDto = new MenuDto( id, name, price, description, image, category, variants, stock, withoutVariant )
    return [
      undefined,
      menuDto
    ]
  }

  static ValidId = ( id: string ): boolean => {
    if ( !validString( id, 1, 4 ) ) { return false }
    return true
  }
}


