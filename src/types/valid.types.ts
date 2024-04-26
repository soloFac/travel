import { validNumber, validString } from '@/helper'
import { CustomError, Extra, Time, VariantDto, VariantEntity } from '@/models'

export const isValidObjectTime = ( time: Time ): boolean => {
  if ( !isValidTime( time.start ) || !isValidTime( time.end ) ) { return false }
  return true
}

export const isValidTime = ( time: string ): boolean => {
  const [hour, minute] = time.split( ':' )

  if ( hour.length !== 2 || minute.length !== 2 ) { return false }

  if ( Number( hour ) < 0 || Number( hour ) > 23 ) { return false }

  if ( Number( minute ) < 0 || Number( minute ) > 59 ) { return false }

  return true
}

export const isExtra = ( extra: Extra ): boolean => {
  const { name, price } = extra

  if ( !validString( name, 3, 30 ) ) {
    return false
  }

  if ( !validNumber( price, 0, 5000 ) ) {
    return false
  }

  return true
}

export const isVariant = ( variant: VariantEntity ): boolean => {
  const _variant: VariantEntity | undefined = VariantDto.create( variant )[1]
  if ( _variant === undefined ) { return false }
  return true
}

export const getValidatedDtos = ( array: any, Dto: any ): any => {
  return array.map( ( value: any ) => {
    const [error, dto] = Dto.create( value )
    if ( error ?? !dto ) { throw CustomError.badRequest( error as string ) }
    return dto
  } )
}