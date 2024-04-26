
export const getPersistedStateLocalStorage = ( ( state: string, DEFAULT_STATE: any ) => {
  const persistedState = localStorage.getItem( '__redux__state__' )
  return ( persistedState ) ? JSON.parse( persistedState )[state] : DEFAULT_STATE
} )
