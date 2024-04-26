import { validString } from '../../helper/validString'
import { type TransferEntity } from '../entities/transfer.entity'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TransferDto {
  constructor (
    public name: string,
    public cbu: string,
    public alias: string
  ) {}

  static create ( transfer: TransferEntity ): [ string?, TransferEntity? ] {
    const { name, cbu, alias } = transfer

    if ( !validString( name, 3, 40 ) ) {
      return ['TransferDto: id length must be more than 1 and less than 4']
    }

    if ( !validString( cbu, 5, 15 ) ) {
      return ['TransferDto: cbu length must be more than 5 and less than 15']
    }

    if ( !validString( alias, 3, 50 ) ) {
      return ['TransferDto: description length must be less than 50']
    }

    const transferDto = new TransferDto( name, cbu, alias )

    return [
      undefined,
      transferDto
    ]
  }
}
