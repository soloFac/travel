import { OrderInfoEntity } from '@/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OrderInfoState {
  orderInfo: OrderInfoEntity | null
  loading: boolean
  error: any
}

const DEFAULT_STATE: OrderInfoState = {
  orderInfo: null,
  loading: false,
  error: null,
}

// const initialState: OrderInfoState = getPersistedStateLocalStorage( 'orderInfo', DEFAULT_STATE )

export const orderInfoSlice = createSlice( {
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

export const { startSaving, saveOrderInfo, fetchOrderInfoError } = orderInfoSlice.actions

export const selectOrderInfo = ( state: any ) => state.orderInfo

export default orderInfoSlice.reducer