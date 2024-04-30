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
  public instagram: string | null = null
  public icon: string | null = null
  public transfer: TransferEntity
  public schedules: ScheduleEntity[]
  public menus: MenuEntity[]
  public categories: FoodCategoryEntity[]
  public active: boolean = true
  public zones?: ZoneEntity[] 

  constructor (
    id: string, name: string, address: string, whatsapp: string, instagram: string | null, icon: string | null, transfer: TransferEntity, schedules: ScheduleEntity[], zones: ZoneEntity[], menus: MenuEntity[], categories: FoodCategoryEntity[], active: boolean
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
    this.active = active
  }
}
