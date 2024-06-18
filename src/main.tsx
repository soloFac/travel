import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css'
// const localContext = createContext( null );

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <PersistGate loading={null} persistor={persistor}> */}
    {/* <MantineProvider theme={theme} defaultColorScheme='auto'> */}
    <BrowserRouter>
      <App />
      {/* <Notifications position='top-center' zIndex={-1} />; */}
    </BrowserRouter>
    {/* </MantineProvider> */}
    {/* </PersistGate> */}
    {/* </Provider> */}
  </React.StrictMode>
)
