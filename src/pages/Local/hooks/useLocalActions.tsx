import { startFetchLocal } from '@/context'
import { useAppDispatch } from '@/hooks'

export const useLocalActions = () => {
  const dispatch = useAppDispatch()
  
  const getLocal = ( localName: string ) => {
    dispatch( startFetchLocal( localName ) )
  }

  return { getLocal }
}