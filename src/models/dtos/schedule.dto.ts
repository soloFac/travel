/* eslint-disable no-prototype-builtins */
import { DaysEnum, type ScheduleEntity } from '../entities'
import { type Time } from '../db.types'
import { isEmptyObject, isMemberOfEnum } from '../../utils/checkObject'
import { isValidObjectTime } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ScheduleDto {
  constructor (
    public day: DaysEnum,
    public first: Time,
    public second: Time | null = null
  ) {}

  static create = ( schedule: ScheduleEntity ): [ string?, ScheduleEntity? ] => {
    const { day, first, second } = schedule

    if ( !isMemberOfEnum( day, DaysEnum ) ) {
      return ['Day must belong to DaysEnum']
    }

    if ( !isValidObjectTime( first ) || isEmptyObject( first ) ) {
      return ['First must be a valid Time']
    }

    if ( second !== null ) {
      if ( !isEmptyObject( second ) && !isValidObjectTime( second ) ) return ['Second must be a valid Time']
    }

    const scheduleDto = new ScheduleDto( day, first, second )
    return [
      undefined,
      scheduleDto
    ]
  }
}
