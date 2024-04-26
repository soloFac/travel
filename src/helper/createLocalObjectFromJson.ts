// // eslint-disable-next-line @typescript-eslint/consistent-type-imports
// import { MenuEntity, LocalEntity, ScheduleEntity, UserEntity, ZoneEntity } from '../models/entities'

// /**
//  * Receive a localJson as LocalEntity and returns a LocalEntity created.
//  * @param localJson as LocalEntity
//  * @returns LocalEntity created
//  */
// export const createLocalObjectFromJson = ( localJson: LocalEntity ): LocalEntity => {
//   const { id, user, name, whatsapp, instagram, transfer, schedules, zones, menus, categories } = localJson
//   if ( !zones || !schedules || !menus ) throw new Error( 'Local must have zones, schedules and menus' )
//   const zonesEntity: ZoneEntity[] = createZoneEntityArray( zones )
//   const schedulesEntity: ScheduleEntity[] = createSchedulesEntityArray( schedules )
//   const menusEntity: MenuEntity[] = createMenuEntityArray( menus )

//   const { name: userName, email, password, phone } = user
//   const userEntity: UserEntity = new UserEntity( userName, email, password, phone )

//   return new LocalEntity( id, userEntity, name, whatsapp, instagram, transfer, schedulesEntity, zonesEntity, menusEntity, categories )
// }

// const createZoneEntityArray = ( zone: ZoneEntity[] ): ZoneEntity[] => {
//   const newZones: ZoneEntity[] = [] as ZoneEntity[]

//   for ( let i = 0; i < zone.length; i++ ) {
//     const { addresses, name, price } = zone[i]
//     newZones.push( new ZoneEntity( addresses, name, price ) )
//   }

//   return newZones
// }

// const createSchedulesEntityArray = ( schedules: ScheduleEntity[] ): any => {
//   const newSchedules: ScheduleEntity[] = [] as ScheduleEntity[]

//   for ( let i = 0; i < 7; i++ ) {
//     if ( schedules[i] !== undefined ) {
//       const { day, first, second } = schedules[i]
//       newSchedules.push( new ScheduleEntity( day, first, second ) )
//     }
//   }

//   return schedules
// }

// const createMenuEntityArray = ( menus: MenuEntity[] ): MenuEntity[] => {
//   const newMenu: MenuEntity[] = [] as MenuEntity[]

//   for ( let i = 0; i < menus.length; i++ ) {
//     const { id, name, description, image, category, variants, stock, withoutVariant } = menus[i]
//     newMenu.push( new MenuEntity( id, name, description, image, category, variants, stock, withoutVariant ) )
//   }

//   return newMenu
// }
