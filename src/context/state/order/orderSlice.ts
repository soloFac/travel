import { getPersistedStateLocalStorage } from '@/hooks'
import { OrderEntity } from '@/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OrderState {
  orders: OrderEntity[]
  loading: boolean
  error: any
}

const DEFAULT_STATE: OrderState = {
  orders: [],
  loading: false,
  error: null,
}

const initialState: OrderState = getPersistedStateLocalStorage( 'order', DEFAULT_STATE )

export const orderSlice = createSlice( {
  name: 'order',
  initialState,
  reducers: {
    fetchOrders: ( state ) => {
      state.loading = true
    },
    fetchOrdersSuccess: ( state, action: PayloadAction<{order: OrderEntity}> ) => {
      state.orders.push( action.payload.order )
      state.loading = false
    },
    deleteOrder: ( state, action: PayloadAction<{id: string}> ) => {
      state.orders = state.orders.filter( ( order ) => order.id !== action.payload.id )
      state.loading = false
    },
    deleteAllOrders: ( state ) => {
      state.orders = []
      state.loading = false
    },
    fetchOrdersError: ( state, action ) => {
      state.error = action.payload
      state.loading = false
    },
  },
} )

export const { fetchOrders, fetchOrdersSuccess, deleteOrder, deleteAllOrders, fetchOrdersError } = orderSlice.actions

export const selectOrders = ( state: any ) => state.order.orders

export default orderSlice.reducer