import { type FoodCategoryEntity } from './foodcategory.entity'
import { type MenuEntity } from './menu.entity'
import { type ScheduleEntity } from './schedule.entity'
import { type TransferEntity } from './transfer.entity'
import { type UserEntity } from './user.entity'
import { type ZoneEntity } from './zone.entity'

export class LocalEntity {
  public id: string | null = null
  public user: UserEntity //*
  public name: string //*
  public address: string //*
  public whatsapp: string //*
  public instagram: string | null = null
  public icon: string | null = null
  public transfer: TransferEntity | null = null
  public schedules: ScheduleEntity[] | null = null
  public zones: ZoneEntity[] | null = null
  public menus: MenuEntity[] | null = null
  public categories: FoodCategoryEntity[] | null = null
  public active: boolean = true

  constructor (
    id: string | null, user: UserEntity, name: string, address: string, whatsapp: string,
    instagram: string | null, icon: string | null, transfer: TransferEntity | null, schedules: ScheduleEntity[] | null,
    zones: ZoneEntity[] | null, menus: MenuEntity[] | null, categories: FoodCategoryEntity[] | null
  ) {
    this.id = id
    this.user = user
    this.name = name
    this.address = address
    this.whatsapp = whatsapp
    this.instagram = instagram
    this.icon = icon
    this.transfer = transfer
    this.schedules = schedules
    this.zones = zones
    this.menus = menus
    this.categories = categories
  }

  /**
   * @description Get all the categories names from the local or return an empty array if there are no categories
   */
  public get allCategoriesNames ( ): string[] {
    if ( this.categories === null ) return []

    const categoriesNameSet = new Set<string>()

    for ( let i = 0; i < this.categories.length; i++ ) {
      categoriesNameSet.add( this.categories[i].name )
    }

    return Array.from( categoriesNameSet )
  }
}
