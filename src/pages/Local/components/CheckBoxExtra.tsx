import React, { useEffect } from 'react';
import { Checkbox } from '@mantine/core'

import classes from '../../../styles/CheckBox.module.css'
import { Extra } from '@/models';

interface CheckBoxProps {
  extra: Extra,
  setOptionsCheckbox: any
}

export const CheckBoxExtra: React.FC<CheckBoxProps> = ( { extra, setOptionsCheckbox } ) => {
  const [checked, setChecked] = React.useState( false )
  
  useEffect( () => {
    setOptionsCheckbox( ( prevState:any ) => {
      if ( checked ) { return [...prevState, extra.name.toLowerCase()] } 
      else { return prevState.filter( ( option: string ) => option !== extra.name.toLowerCase() ) }
    } )
  }, [checked] )

  return (
    <Checkbox
      className={`${ classes.checkbox }`}  
      label={
        <div className={( !checked ) ? classes.text : `${ classes.text } ${ classes.colored }`}>
          <>{ extra.name } <span>${ extra.price }</span></>
        </div>
      }
      variant='outline'
      onChange={() => setChecked( !checked )}
      checked={checked}
    />
  );
}