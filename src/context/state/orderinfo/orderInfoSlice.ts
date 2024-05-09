import { getPersistedStateLocalStorage } from '@/hooks'
import { OrderInfoEntity } from '@/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OrderState {
  orderinfo: OrderInfoEntity
  loading?: boolean
  error?: any
}

const DEFAULT_STATE: OrderState = {
  orderinfo: {} as OrderInfoEntity,
}

const initialState: OrderState = getPersistedStateLocalStorage( 'orderinfo', DEFAULT_STATE )


export const orderInfoSlice = createSlice( {
  name: 'orderinfo',
  initialState,
  reducers: {
    startSaving: ( state ) => {
      state.loading = true
    },
    saveOrderInfo: ( state, action: PayloadAction<{orderInfo: OrderInfoEntity}> ) => {
      state.orderinfo = action.payload.orderInfo
      state.loading = false
    },
    fetchOrderInfoError: ( state, action ) => {
      state.error = action.payload
      state.loading = false
    },
  },
} )

export const { startSaving, saveOrderInfo, fetchOrderInfoError } = orderInfoSlice.actions

export const selectLocal = ( state: any ) => state.orderinfo

export default orderInfoSlice.reducer