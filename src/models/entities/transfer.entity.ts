export class TransferEntity {
  public name: string
  public cbu: string
  public alias: string

  constructor ( name: string, cbu: string, alias: string ) {
    this.name = name
    this.cbu = cbu
    this.alias = alias
  }
}
