import { ZoneDto } from '@/models';

const token = ''

const API_URL = import.meta.env.VITE_REACT_API_URL

export class ZoneService {
  static async getZoneByName ( name: string ) {
    const response = await fetch( `${ API_URL }/zone?name=${ name }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      }
    } );
    const data = await response.json();
    return data;
  }

  static async createZone ( zone: ZoneDto ) {
    const response = await fetch( `${ API_URL }/zone/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify( zone )
    } );
    const data = await response.json();
    return data;
  }

  static async updateZone ( zone: ZoneDto ) {
    const response = await fetch( `${ API_URL }/zone/modify`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify( zone )
    } );
    const data = await response.json();
    return data;
  }

  static async deleteZone ( id: string ) {
    const response = await fetch( `${ API_URL }/zone/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify( { id } )
    } );
    const data = await response.json();
    return data;
  }
}