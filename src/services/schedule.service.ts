import { ScheduleDto, DaysEnum } from '@/models';

const token = ''

const API_URL = 'https://tupedido-backend.netlify.app/api'

export class ScheduleService {
  static async getScheduleByDay ( idLocal: string, day: DaysEnum ) {
    const response = await fetch( `${ API_URL }/schedule?idLocal=${ idLocal }&day=${ day }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      }
    } );
    const data = await response.json();
    return data;
  }
  
  static async createSchedule ( idLocal: string, schedule: ScheduleDto ) {
    const response = await fetch( `${ API_URL }/schedule/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify( { idLocal, schedule } )
    } );
    const data = await response.json();
    return data;
  }

  static async updateSchedule ( idLocal: string, schedule: ScheduleDto ) {
    const response = await fetch( `${ API_URL }/schedule/modify`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify( { idLocal, schedule } )
    } );
    const data = await response.json();
    return data;
  }

  static async deleteSchedule ( idLocal: string, day: DaysEnum ) {
    const response = await fetch( `${ API_URL }/schedule/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify( { idLocal, day } )
    } );
    const data = await response.json();
    return data;
  }
}