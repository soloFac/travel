export const validNumber = ( num: number, min: number, max: number ): boolean => {
  if ( typeof num !== 'number' || num < min || num > max ) {
    return false
  }

  return true
}
