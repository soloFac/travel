import { type FoodCategoryEntity } from './foodcategory.entity'
import { type MenuEntity } from './menu.entity'
import { type ScheduleEntity } from './schedule.entity'
import { type TransferEntity } from './transfer.entity'
import { type ZoneEntity } from './zone.entity'

export class LocalInfoEntity {
  public id: string
  public name: string //*
  public address: string
  public whatsapp: string //*
  public instagram: string
  public icon: string | null = null
  public transfer: TransferEntity
  public schedules: ScheduleEntity[]
  public zones: ZoneEntity[]
  public menus: MenuEntity[]
  public categories: FoodCategoryEntity[]
  public active: boolean = true

  constructor (
    id: string, name: string, address: string, whatsapp: string,
    instagram: string, icon: string | null, transfer: TransferEntity, schedules: ScheduleEntity[],
    zones: ZoneEntity[], menus: MenuEntity[], categories: FoodCategoryEntity[]
  ) {
    if ( icon ) {
      this.icon = icon
    } else {
      this.icon = 'foodcompanyicon.png'
    }
    this.id = id
    this.name = name
    this.address = address
    this.whatsapp = whatsapp
    this.instagram = instagram
    this.transfer = transfer
    this.schedules = schedules
    this.zones = zones
    this.menus = menus
    this.categories = categories
  }
}
