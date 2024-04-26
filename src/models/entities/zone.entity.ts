export class ZoneEntity {
  public addresses: string[4]
  public name: string
  public price: number

  constructor ( addresses: string[4], name: string, price: number ) {
    if ( addresses.length !== 4 ) {
      throw new Error( 'The addresses must be 4' )
    }

    this.addresses = addresses
    this.name = name
    this.price = price
  }

  // public get getAddresses (): string[4] { return this.addresses }

  // public showAddresses (): string {
  //   return `${ this.addresses[0] }, ${ this.addresses[1] }, ${ this.addresses[2] }, ${ this.addresses[3] }`
  // }

  // public get image(): string { return this.image }
  // public set image(image: string) { this.image = image }
}
