import { fetchLocalError, fetchLocalInfo, fetchLocalInfoSuccess } from './localInfoSlice'
import { FirebaseDB, FirebaseStorage } from '@/services';
import { doc, getDoc } from 'firebase/firestore/lite';
import { LocalInfoDto, LocalInfoEntity } from '@/models';
import { getDownloadURL, ref } from 'firebase/storage';

// const API_URL = 'https://api.example.com/orders'

export const startFetchLocal = ( localName: string ) => {
  return async ( dispatch: any ) => {
    dispatch( fetchLocalInfo() )
    console.log( 'localName: ', localName )
    
    try {
      const docRef = doc( FirebaseDB, 'locals', localName );
      const docSnap = await getDoc( docRef )

      if ( docSnap.exists() ) {
        const [error, localDto] = LocalInfoDto.create( docSnap.data() as LocalInfoEntity )
        if ( !localDto ) return dispatch( fetchLocalError( error ) )
        const local = await getLocalWithImage( localDto )
        dispatch( fetchLocalInfoSuccess( { local } ) )
      } else {
        console.log( 'Documento no encontrado' )
      }
    } catch ( error ) {
      console.error( 'Error al obtener datos:', error );
    }
  }
}

// Todo: revisar que cuando se actualice la página, la imagen no se vuelva a cargar
const getLocalWithImage = async ( local: LocalInfoEntity ) => {
  const storageRef = ref( FirebaseStorage, `images/local/${ local.icon }` )
  getDownloadURL( storageRef )
    .then( ( url: any ) => {
      local.icon = url
    } )
    .catch( ( error ) => {
      console.error( 'Error al obtener la imagen:', error )
    } )

  local.menus = await Promise.all( local.menus.map( async ( menu ) => {
    const storageRef = ref( FirebaseStorage, `images/menus/${ local.name.replace( / /g, '' ) }/${ menu.image }` );
    menu.image = await getDownloadURL( storageRef );

    return menu;
  } )
  )

  return local
}