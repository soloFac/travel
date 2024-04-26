export const validString = ( str: string | null, min: number, max: number ): boolean => {
  if ( typeof str !== 'string' || str.length < min || str.length > max ) {
    return false
  }

  return true
}
