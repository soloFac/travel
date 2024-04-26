export class UserEntity {
  public name: string
  public email: string
  public password: string
  public phone: string

  constructor ( name: string, email: string, password: string, phone: string ) {
    this.name = name
    this.email = email
    this.password = password
    this.phone = phone
  }
}
