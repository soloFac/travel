import { validString } from "../../helper/validString"

export class UserAuthDto {
  constructor (
    public email: string,
    public password: string
  ) {}

  static create = ( userAuthDto: UserAuthDto ): [ string?, UserAuthDto? ] => {
    const { email, password } = userAuthDto
    if ( !validString( email, 3, 25 ) ) {
      return ['Email must be at least 3 characters, and less than 25']
    }

    if ( !validString( password, 3, 62 ) ) {
      return ['Password must be at least 3 characters, and less than 15']
    }

    return [
      undefined,
      new UserAuthDto( email, password )
    ]
  }
}
