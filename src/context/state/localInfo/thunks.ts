import { CustomError } from '@/models'
import { fetchLocalError, fetchLocalInfo, fetchLocalInfoSuccess } from './localInfoSlice'
import { LocalService } from '@/services'

// const API_URL = 'https://api.example.com/orders'

export const startFetchLocal = ( localName: string ) => {
  return async ( dispatch: any ) => {
    dispatch( fetchLocalInfo() )
    
    const local = await LocalService.GetLocalByName( localName )
    if ( local === null ) throw CustomError.notFound( 'Local not found' )

    try {
      dispatch( fetchLocalInfoSuccess( { local } ) )
    } catch ( error ) {
      dispatch( fetchLocalError( error ) )
    }
  }
}