import { MenuDto } from '../../models/dtos/menu.dto';

// const idLocal = 234
// const idMenu = 2

const API_URL = import.meta.env.VITE_REACT_API_URL

const token = 'eyJ'

export class MenuService {

  static async getMenuById ( idLocal: string, idMenu: string ) {
    const response = await fetch( `${ API_URL }/menu?idLocal=${ idLocal }&idMenu=${ idMenu }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      }
    } );
    const data = await response.json();
    return data;
  }
  
  static async getAllMenus ( idLocal: string ) {
    const response = await fetch( `${ API_URL }/menu?idLocal=${ idLocal }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      }
    } );
    const data = await response.json();
    return data;
  }

  static async createMenu ( idLocal: string, menu: MenuDto ) {
    const response = await fetch( `${ API_URL }/menu?idLocal=${ idLocal }`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify( menu )
    } );
    const data = await response.json();
    return data;
  }

  static async updateMenu ( idLocal: string, menu: MenuDto ) {
    const response = await fetch( `${ API_URL }/menu?idLocal=${ idLocal }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify( menu )
    } );
    const data = await response.json();
    return data;
  }

  static async deleteMenu ( idLocal: string, idMenu: string ) {
    const response = await fetch( `${ API_URL }/menu?idLocal=${ idLocal }&idMenu=${ idMenu }`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      }
    } );
    const data = await response.json();
    return data;
  }
}