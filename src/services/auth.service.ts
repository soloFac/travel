import { UserAuthDto } from '../models/dtos/user.auth.dto';

const API_URL = 'https://kf1lnjzw-8000.brs.devtunnels.ms/api'

export class AuthService {
  // constructor () {}
    
  static async login ( userAuthDto: UserAuthDto ) {
    const response = await fetch( `${ API_URL }/auth/login`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'owner': 'MI-TOK3N_'
      },
      body: JSON.stringify( userAuthDto )
    } );
    const data = await response.json();
    return data;
  }

  static async register ( userAuthDto: UserAuthDto ) {
    const response = await fetch( `${ API_URL }/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( userAuthDto )
    } );
    const data = await response.json();
    return data;
  }
}