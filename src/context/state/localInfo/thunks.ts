import { getDatabase, ref, onValue } from 'firebase/database';

import { fetchLocalError, fetchLocalInfo, fetchLocalInfoSuccess } from './localInfoSlice'
import { FirebaseDB } from '@/services';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore/lite';
import { LocalDto, LocalInfoDto, LocalInfoEntity } from '@/models';

// const API_URL = 'https://api.example.com/orders'

export const startFetchLocal = ( localName: string ) => {
  return async ( dispatch: any ) => {
    dispatch( fetchLocalInfo() )
    console.log( 'localName: ', localName )
    
    
    try {
      const docRef = doc( FirebaseDB, 'locals', localName );
      const docSnap = await getDoc( docRef )

      if ( docSnap.exists() ) {
        const [error, local] = LocalInfoDto.create( docSnap.data() as LocalInfoEntity )
        if ( !local ) return dispatch( fetchLocalError( error ) )
        dispatch( fetchLocalInfoSuccess( { local } ) )
      } else {
        console.log( 'Documento no encontrado' )
      }
    } catch ( error ) {
      console.error( 'Error al obtener datos:', error );
    }
  }
}