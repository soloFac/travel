/* eslint-disable no-unused-vars */
import { isEmptyObject } from '@/utils';
import { OrderEntity, VariantEntity } from '../entities';
import { type Extra } from '../db.types'
import { validNumber, validString } from '@/helper';
import { isExtra, isVariant } from '@/types';


export class OrderDto {
  constructor (
    public id: string,
    public menu: string,
    public amount: number,
    public total: number,
    public variant: VariantEntity,
    public dressing?: string[] | undefined,
    public extras?: Extra[] | undefined
  ) {}

  static create ( order: OrderEntity ): [ string?, OrderEntity? ] {
    const { id, dressing, extras, menu, amount, total, variant } = order

    if ( !validString( id, 1, 36 ) ) {
      return ['id length must be more than 1 and less than 4']
    }

    if ( !validString( menu, 1, 60 ) ) {
      return ['name length must be more than 1 and less than 60']
    }

    if ( !validNumber( amount, 1, 100 ) ) {
      return ['amount must be type number']
    }

    if ( !validNumber( total, 0, 10000000 ) ) {
      return ['total must be type number']
    }

    if ( !isVariant( variant ) ) {
      return ['variant must be a Variant']
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

    const orderDto = new OrderDto( id, menu, amount, total, variant, dressing, extras )
    return [
      undefined,
      orderDto
    ]
  }
}

