import { OrderInfoEntity } from '@/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OrderDataState {
  orderInfo: OrderInfoEntity | null
  loading: boolean
  error: any
}

const DEFAULT_STATE: OrderDataState = {
  orderInfo: null,
  loading: false,
  error: null,
}

// const initialState: OrderDataState = getPersistedStateLocalStorage( 'orderInfo', DEFAULT_STATE )

// - Tal vez el nombre orderDetails sería más adecuado
export const orderDataSlice = createSlice( {
  name: 'orderinfo',
  initialState: DEFAULT_STATE,
  reducers: {
    startSaving: ( state ) => {
      state.loading = true
    },
    saveOrderInfo: ( state, action: PayloadAction<{orderInfo: OrderInfoEntity}> ) => {
      state.orderInfo = action.payload.orderInfo
      state.loading = false
    },
    fetchOrderInfoError: ( state, action ) => {
      state.error = action.payload
      state.loading = false
    },
  },
} )

export const { startSaving, saveOrderInfo, fetchOrderInfoError } = orderDataSlice.actions

export const selectOrderInfo = ( state: any ) => state.orderInfo

export default orderDataSlice.reducer