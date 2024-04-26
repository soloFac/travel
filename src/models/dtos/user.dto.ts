import { validString } from '../../helper/validString'
import { type UserEntity } from '../entities'
import { UserAuthDto } from './user.auth.dto'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserDto {
  constructor (
    public name: string,
    public email: string,
    public password: string,
    public phone: string
  ) {
  }

  static create = ( user: UserEntity ): [ string?, UserEntity? ] => {
    const { name, email, password, phone } = user

    if ( !validString( name, 3, 25 ) ) {
      return ['Name must be at least 3 characters, and less than 25']
    }

    if ( !validString( phone, 3, 30 ) ) {
      return ['Phone must be at least 3 characters, and less than 30']
    }

    const [error, userAuthDto] = UserAuthDto.create( { email, password } )
    if ( !userAuthDto ) return [error]

    const userDto: UserDto = new UserDto( name, userAuthDto.email, userAuthDto.password, phone )

    return [
      undefined,
      userDto
    ]
  }
}
