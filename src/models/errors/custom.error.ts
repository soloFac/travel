export class CustomError extends Error {
  constructor (
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super( message ) // Como extiende de Error, se debe llamar al constructor de la clase padre
  }

  static badRequest ( message: string ): CustomError {
    return new CustomError( 400, message )
  }

  static unauthorized ( message: string ): CustomError {
    return new CustomError( 401, message )
  }

  static notFound ( message: string ): CustomError {
    return new CustomError( 404, message )
  }

  static internalServerError ( message: string = 'Internal Server Error' ): CustomError {
    return new CustomError( 500, message )
  }
}
