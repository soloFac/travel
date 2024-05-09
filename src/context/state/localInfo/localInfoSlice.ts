import { getPersistedStateLocalStorage } from '@/hooks'
import { LocalInfoEntity } from '@/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LocalInfoState {
  local: LocalInfoEntity | null
  loading: boolean
  error: any
}

const DEFAULT_STATE: LocalInfoState = {
  local: null,
  loading: false,
  error: null,
}

const initialState: LocalInfoState = getPersistedStateLocalStorage( 'localInfo', DEFAULT_STATE )

export const localInfoSlice = createSlice( {
  name: 'localinfo',
  initialState,
  reducers: {
    fetchLocalInfo: ( state ) => {
      state.loading = true
    },
    fetchLocalInfoSuccess: ( state, action: PayloadAction<{local: LocalInfoEntity}> ) => {
      state.local = action.payload.local
      state.loading = false
    },
    fetchLocalError: ( state, action ) => {
      state.error = action.payload
      state.loading = false
    },
  },
} )

export const { fetchLocalInfo, fetchLocalInfoSuccess, fetchLocalError } = localInfoSlice.actions

export const selectLocalInfo = ( state: any ) => state.local

export default localInfoSlice.reducer