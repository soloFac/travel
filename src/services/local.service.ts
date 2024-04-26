import { LocalEntity, LocalInfoEntity } from '@/models';

const API_URL = 'https://tuspedidos-backend.netlify.app/api'

export class LocalService {
  static async GetLocalByName ( localName: string | undefined ): Promise<LocalInfoEntity | null> {

    if ( !localName ) return null
    
    try {
      const response = await fetch( `${ API_URL }/local?localName=${ localName }`, {
        method: 'GET',
        headers: {
          mode: 'no-cors',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      } );
      const data = await response.json();
      return data;
    } catch ( error ) {
      return null
    }
  }

  static async UpdateLocal ( local: LocalEntity, token: string ): Promise<LocalEntity | null> {
    try {
      const response = await fetch( `${ API_URL }/local`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'owner': token,
          'x-token': localStorage.getItem( 'x-token' ) || ''
        },
        body: JSON.stringify( local )
      } );
      const data = await response.json();
      return data;
    } catch ( error ) {
      return null
    }
  }
}