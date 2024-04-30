export const GetEnumValues = ( enumObject: any ) => {
  return Object.keys( enumObject ).map( ( key ) => enumObject[key] )
}