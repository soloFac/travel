import { getPersistedStateLocalStorage } from '@/hooks'
import { LocalDto } from '@/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LocalState {
  local: LocalDto | null
  saving: boolean
}

const initialState: LocalState = {
  local: null,
  saving: false
}

export const localSlice = createSlice( {
  name: 'local',
  initialState,
  reducers: {
    savingNewLocal: ( state ) => {
      state.saving = true
    },
    addNewLocal: ( state, action: PayloadAction<{local: LocalDto}> ) => {
      state.local = action.payload.local
    }
  },
} )

export const { savingNewLocal, addNewLocal } = localSlice.actions

export const selectLocal = ( state: any ) => state.local

export const localReducer = localSlice.reducer