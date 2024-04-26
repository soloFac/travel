import { getValidatedDtos } from '@/types'
import { validString } from '../../helper/validString'
import { LocalEntity, type FoodCategoryEntity, type MenuEntity, type ScheduleEntity, type UserEntity, type ZoneEntity } from '../entities'
import { CustomError } from '../errors'
import { FoodCategoryDto } from './foodcategory.dto'
import { MenuDto } from './menu.dto'
import { ScheduleDto } from './schedule.dto'
import { TransferDto } from './transfer.dto'
import { UserDto } from './user.dto'
import { ZoneDto } from './zone.dto'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class LocalDto {
  constructor (
    public id: string | null,
    public user: UserEntity, //*
    public name: string, //*
    public address: string, //*
    public whatsapp: string, //*
    public instagram: string | null,
    public icon: string | null,
    public transfer: TransferDto | null,
    public schedules: ScheduleEntity[] | null,
    public zones: ZoneEntity[] | null,
    public menus: MenuEntity[] | null,
    public categories: FoodCategoryEntity[] | null,
    public active: boolean = true
  ) { }

  static createForAuth = ( local: LocalEntity ): [ string?, LocalEntity? ] => {
    const { id, user, name, address, whatsapp } = local

    if ( !validString( name, 3, 25 ) ) { throw CustomError.notFound( 'LocalDto: Local name is not a ValidString' ) }
    if ( !validString( whatsapp, 3, 25 ) ) { throw CustomError.notFound( 'LocalDto: Local whatsapp is not a ValidString' ) }
    if ( !validString( address, 3, 25 ) ) { throw CustomError.notFound( 'LocalDto: Local whatsapp is not a ValidString' ) }

    // - Validaciones de Entitidades pasadas por sus Dtos
    // # Simples
    const [errUserDto, userDto] = UserDto.create( user )
    if ( !userDto ) { return [errUserDto] }

    return [
      undefined,
      new LocalEntity(
        id, userDto, name, address, whatsapp, null, null,
        null, null, null, null, null
      )
    ]
  }

  static create = ( localDto: LocalEntity ): [ string?, LocalEntity? ] => {
    const { id, instagram, icon, transfer, schedules, zones, menus, categories } = localDto

    if ( !validString( id, 3, 36 ) ) { throw CustomError.notFound( 'LocalDto: Local name is not a ValidString' ) }
    if ( !validString( icon, 3, 36 ) ) { throw CustomError.notFound( 'LocalDto: Local icon is not a ValidString' ) }

    const [error, localEntity] = this.createForAuth( localDto )
    if ( !localEntity ) return [error]

    if ( !transfer ) return ['LocalDto: Transfer is required']
    const [errorTransferDto, transferDto] = TransferDto.create( transfer )
    if ( !transferDto ) return [errorTransferDto]

    // - Completos
    const schedulesArrayDto: ScheduleEntity[] = getValidatedDtos( schedules, ScheduleDto )
    const zonesArrayDto: ZoneEntity[] = getValidatedDtos( zones, ZoneDto )
    const menusArrayDto: MenuEntity[] = getValidatedDtos( menus, MenuDto )
    const categoriesArrayDto: FoodCategoryEntity[] = getValidatedDtos( categories, FoodCategoryDto )

    const { user, name, address, whatsapp } = localEntity

    return [
      undefined,
      new LocalEntity(
        id, user, name, address, whatsapp, instagram, icon,
        transfer, schedulesArrayDto, zonesArrayDto,
        menusArrayDto, categoriesArrayDto
      )
    ]
  }

  static ValidId = ( id: string ): boolean => {
    if ( !validString( id, 3, 36 ) ) { return false }
    return true
  }
}


