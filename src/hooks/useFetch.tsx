import { useEffect, useRef, useState } from 'react'

// Por defecto va a tener un estado
export const useFetch = ( url: string ) => {
  const isMounted = useRef( true )
  const [state, setState] = useState( { data: null, loading: true, error: null } )

  useEffect( () => {
    return () => {
      isMounted.current = false
    }
  }, [] )

  useEffect( () => {
    setState( { data: null, loading: true, error: null } )

    fetch( url )
      .then( resp => resp.json() )
      .then( data => {
        if ( isMounted.current ) {
          setState( {
            loading: false,
            error: null,
            data
          } )
        }
      } )
  }, [url] )

  // En este caso solo estoy retornando el objeto del state
  return state
}
