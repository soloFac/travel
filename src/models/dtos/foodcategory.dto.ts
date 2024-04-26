/* eslint-disable no-unused-vars */
import { validString } from '../../helper/validString'
import { type FoodCategoryEntity } from '../entities'
import { type Extra } from '../db.types'
import { isEmptyObject } from '../../utils/checkObject'
import { isExtra } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class FoodCategoryDto {
  constructor (
    public name: string,
    public dressing: string[] | null,
    public extras: Extra[] | null
  ) {}

  static create = ( foodCategory: FoodCategoryEntity ): [ string?, FoodCategoryEntity? ] => {
    const { name, dressing, extras } = foodCategory

    if ( !validString( name, 3, 80 ) ) {
      return ['name must be at least 3 characters, and less than 80']
    }

    if ( dressing !== null && dressing !== undefined ) {
      if ( !isEmptyObject( dressing ) && !Array.isArray( dressing ) ) {
        return ['dressign must be an array']
      }
      if ( !dressing.every( dressing => validString( dressing, 3, 30 ) ) ) {
        return ['Las dressing debe ser un array de strings']
      }
    }

    if ( extras !== null && extras !== undefined ) {
      if ( !isEmptyObject( extras ) && !Array.isArray( extras ) ) {
        return ['extras must be an array']
      }
      if ( !extras.every( extra => isExtra( extra ) ) ) {
        return ['extras must be an array of Extra']
      }
    }

    const foodCategoryDto = new FoodCategoryDto( name, dressing, extras )
    return [
      undefined,
      foodCategoryDto
    ]
  }
}
