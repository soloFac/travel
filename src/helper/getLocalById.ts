// // import { type LocalEntity } from '../domain/entities'
// import { LocalEntity } from '../models/entities'
// import { readJSON } from '../utils/readJSON'
// // import { createLocalObjectFromJson } from './createLocalObjectFromJson'

// /**
//  * Receive an id and returned the giving LocalEntity.
//  * @param id del local
//  * @returns a LocalEntity
//  */
// export const getLocalById = ( id: string ): LocalEntity => {
//   // const localJson = readJSON( `./src/data/${id}.json` )
//   const data: LocalEntity[] = readJSON( './src/domain/db/db.json' ).data as LocalEntity[]

//   const info = data?.find( ( local: any ) => local.id === id )
//   if ( !info ) { throw new Error( `Local not found by id${ id }` ) }

//   const local: LocalEntity = createLocalObjectFromJson( info )

//   return local
// }
