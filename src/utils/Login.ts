import { LoginStatus } from '@/types'

export class Login {
  constructor () {}
  static isLogged ( status: LoginStatus ): boolean {
    if( status === LoginStatus.SUCCESS ) return true
    return false
  }
}