import { getValidatedDtos } from '@/types';
import { FoodCategoryEntity, LocalInfoEntity, MenuEntity, ScheduleEntity, TransferEntity, ZoneEntity } from '../entities';
import { TransferDto } from './transfer.dto';
import { CustomError } from '../errors';
import { validString } from '@/helper';
import { ScheduleDto } from './schedule.dto';
import { ZoneDto } from './zone.dto';
import { MenuDto } from './menu.dto';
import { FoodCategoryDto } from './foodcategory.dto';

export class LocalInfoDto {
  constructor (
    public id: string,
    public name: string, //*
    public address: string,
    public whatsapp: string, //*
    public instagram: string | null = null,
    public icon: string | null = null,
    public transfer: TransferEntity,
    public schedules: ScheduleEntity[],
    public menus: MenuEntity[],
    public categories: FoodCategoryEntity[],
    public active: boolean = true,
    public zones?: ZoneEntity[] 
  ) {}

  static create = ( localInfo: LocalInfoEntity ): [ string?, LocalInfoEntity? ] => {
    const { id, name, address, whatsapp, instagram, icon, transfer, schedules, zones, menus, categories, active } = localInfo

    if ( !validString( id, 3, 36 ) ) { throw CustomError.notFound( 'LocalDto: Local name is not a ValidString' ) }
    if ( !validString( name, 3, 25 ) ) { throw CustomError.notFound( 'LocalDto: Local name is not a ValidString' ) }
    if ( !validString( whatsapp, 3, 25 ) ) { throw CustomError.notFound( 'LocalDto: Local whatsapp is not a ValidString' ) }
    if ( !validString( address, 3, 25 ) ) { throw CustomError.notFound( 'LocalDto: Local whatsapp is not a ValidString' ) }
    if ( !validString( icon, 3, 36 ) ) { throw CustomError.notFound( 'LocalDto: Local icon is not a ValidString' ) }
    
    if ( instagram && !validString( instagram, 3, 25 ) ) { throw CustomError.notFound( 'LocalDto: Local instagram is not a ValidString' ) }

    if ( !transfer ) return ['LocalDto: Transfer is required']
    const [errorTransferDto, transferDto] = TransferDto.create( transfer )
    if ( !transferDto ) return [errorTransferDto]

    // - Completos
    const schedulesArrayDto: ScheduleEntity[] = getValidatedDtos( schedules, ScheduleDto )
    const zonesArrayDto: ZoneEntity[] = getValidatedDtos( zones, ZoneDto )
    const menusArrayDto: MenuEntity[] = getValidatedDtos( menus, MenuDto )
    const categoriesArrayDto: FoodCategoryEntity[] = getValidatedDtos( categories, FoodCategoryDto )


    return [
      undefined,
      new LocalInfoEntity(
        id, name, address, whatsapp, instagram, icon, transferDto,
        schedulesArrayDto, zonesArrayDto, menusArrayDto, categoriesArrayDto, active
      )
    ]
  }
}