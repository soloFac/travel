import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { authSlice, listSlice } from './states'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

import { orderSlice } from './state/order'
import { orderInfoSlice } from './state/orderInfo'

import { localInfoSlice } from './state'

const persistConfig = {
  key: 'root', // Clave de persistencia
  storage, // Almacenamiento local del navegador
  // Puedes configurar aquí qué partes del estado deseas persistir
  // Por ejemplo, 'auth' para persistir solo el estado de usuario
  whitelist: ['order', 'localinfo', 'orderinfo']
}

const rootReducer = combineReducers( {
  order: orderSlice.reducer,
  localInfo: localInfoSlice.reducer,
  orderInfo: orderInfoSlice.reducer,
  // vocabulary: listSlice.reducer
} )

const persistedReducer = persistReducer( persistConfig, rootReducer )

const persistanceLocalStorageMiddleware = ( store: any ) => ( next: any ) => ( action: any ) => {
  const result = next( action )
  localStorage.setItem( '__redux__state__', JSON.stringify( store.getState() ) )
  return result
}

// Internamente configureStore hace el llamado al combine reducer, que combina todos los reducers en uno solo
export const store = configureStore( {
  reducer: persistedReducer,
  middleware: ( getDefaultMiddleware ) =>
    getDefaultMiddleware()
      // prepend and concat calls can be chained
      .concat( persistanceLocalStorageMiddleware ),
} )

export const persistor = persistStore( store )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// import { User } from '@/models'
// import { configureStore } from '@reduxjs/toolkit'
// import { userSlice } from './states/user'

// export interface AppStore {
//   user: User;
// }

// export default configureStore<AppStore>( {
//   reducer: {
//     user: userSlice.reducer
//   }
// } )