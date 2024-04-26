import { UserDto } from '@/models';

const token = ''

const API_URL = 'https://tupedido-backend.netlify.app/api'

export class UserService {
  static async getUserByName ( name: string ) {
    const response = await fetch( `${ API_URL }/user?name=${ name }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      }
    } );
    const data = await response.json();
    return data;
  }

  static async getUserByEmail ( email: string ) {
    const response = await fetch( `${ API_URL }/user?email=${ email }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      }
    } );
    const data = await response.json();
    return data;
  }

  static async modifyUser ( localId: string, user: UserDto ) {
    const response = await fetch( `${ API_URL }/user/modify?localId=${ localId }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify( user )
    } );
    const data = await response.json();
    return data;
  }

  static async deleteUser ( localId: string ) {
    const response = await fetch( `${ API_URL }/user/delete?localId=${ localId }`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      }
    } );
    const data = await response.json();
    return data;
  }
}