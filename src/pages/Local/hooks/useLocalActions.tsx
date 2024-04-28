import { startNewLocal } from '@/context/state/local';
import { useAppDispatch } from '@/hooks';
import { LocalDto } from '@/models';
import { startUpdateLocal } from '../../../context/state/local/local';

export const useLocalActions = () => {
  const dispatch = useAppDispatch();

  const addLocal = ( local: LocalDto ) => {
    console.log( 'dispatch( startNewLocal( local ) );' )
    dispatch( startNewLocal( local ) );
  };

  const updateLocal = ( local: LocalDto ) => {
    console.log( 'dispatch( startUpdateLocal( local ) );' )

    dispatch( startUpdateLocal( local ) );
  }

  return { addLocal, updateLocal };
}