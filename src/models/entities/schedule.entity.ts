import { type Time } from '../db.types/time.type'

export enum DaysEnum {
  LUNES = 'LUNES',
  MARTES = 'MARTES',
  MIERCOLES = 'MIERCOLES',
  JUEVES = 'JUEVES',
  VIERNES = 'VIERNES',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO',
}

export class ScheduleEntity {
  public day: DaysEnum
  public first: Time
  public second: Time | null

  constructor ( day: DaysEnum, first: Time, second: Time | null = null
  ) {
    this.day = day
    this.first = first
    this.second = second
  }
}
