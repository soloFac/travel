export const isEmptyObject = ( obj: object ): boolean => {
  return Object.keys( obj ).length === 0
}

export const isMemberOfEnum = ( enumValue: string, enumObject: any ): boolean => {
  for ( const enumKey in enumObject ) {
    if ( enumObject[enumKey] === enumValue ) {
      return true
    }
  }
  return false
}
