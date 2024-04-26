import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Provider } from 'react-redux'

import { store, persistor } from '@/context'
import { PersistGate } from 'redux-persist/integration/react'
import { Notifications } from '@mantine/notifications'


// const localContext = createContext( null );

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider defaultColorScheme='auto'>
          <BrowserRouter>
            <App />
            <Notifications position='top-center' zIndex={-1} />;
          </BrowserRouter>
        </MantineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
