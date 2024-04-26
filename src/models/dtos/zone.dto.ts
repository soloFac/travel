import { validNumber } from '../../helper/validNumber'
import { validString } from '../../helper/validString'
import { ZoneEntity } from '../entities'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ZoneDto {
  private constructor (
    public addresses: string[4],
    public name: string,
    public price: number
    // public image: string
  ) {}

  static create ( zone: ZoneEntity ): [ string?, ZoneEntity? ] {
    const { addresses, name, price } = zone

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if ( !addresses || !name || !price ) {
      return ['Los datos para crear una zona son incorrectos']
    }

    if ( !validString( name, 3, 80 ) ) {
      return ['Name must be at least 4 characters']
    }

    if ( !validNumber( price, 0, 5000 ) ) {
      return ['Price must be higher than 0 and lower than 5000']
    }

    if ( !Array.isArray( addresses ) ) {
      return ['Las direcciones de la zona deben ser un array']
    }

    if ( addresses.length !== 4 ) {
      return ['Las direcciones de la zona deben tener 4 elementos']
    }

    if ( !addresses.every( address => validString( address as string, 5, 60 ) ) ) {
      return ['Las direcciones de la zona deben ser un array de strings, entre 5 y 60 caracteres']
    }

    const zoneDto = new ZoneDto( addresses, name, price )

    return [
      undefined,
      zoneDto
    ]
  }
}
