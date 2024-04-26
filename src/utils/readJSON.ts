// Leer un json en ESModules
import fs from 'node:fs'

/**
 * hola
 * @param path from ./utils folder
 * @returns json parse data
*/
export const readJSON = ( path: string ): any => JSON.parse( fs.readFileSync( path, 'utf8' ) )

// Otra forma que no me funciona. Todo: ver por qué
// import { createRequire } from 'node:module'
// const requires = createRequire(import.meta.url)

// export const readJSON = ( path: any ) => require(path)
