/* eslint-disable dot-notation */
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore/lite'

import { LocalDto } from '@/models'
import { FirebaseDB } from '@/services'
import { addNewLocal, savingNewLocal } from './localSlice'

export const startNewLocal = ( local: LocalDto ) => {
  return async ( dispatch: any ) => {
    try {
      console.log( 'thunk startNewLocal' )
      dispatch( savingNewLocal() )

      // const docId = `${ crypto.randomUUID() }`
      const newDoc = doc( collection( FirebaseDB, 'locals' ), local.name.replace( /\s/g, '' ) as string )

      await setDoc( newDoc, local )

      dispatch( addNewLocal( { local } ) )
    // console.log( 'New list created' )
    } catch ( error ) {
      console.error( error )
    }
  }
}

export const startDeletingList = ( local: LocalDto ) => {
  return async ( dispatch: any ) => {
    const docRef = doc( FirebaseDB, `locals/${ local.id }` )

    dispatch( savingNewLocal() )
    try {
      await deleteDoc( docRef )
    } catch ( error ) {
      console.log( error )
    }
  }
}

export const startUpdateLocal = ( local: LocalDto ) => {
  return async ( dispatch: any ) => {
    try {
      console.log( 'thunk startUpdateLocal' )
      dispatch( savingNewLocal() )

      const docRef = doc( FirebaseDB, `locals/${ local.id }` )
      await updateDoc( docRef, local as any )
    } catch ( error ) {
      console.log( error )
    }
  }
}
