import React, { useEffect } from 'react';
import { Checkbox } from '@mantine/core'

import classes  from '../styles/CheckBox.module.css'

interface CheckBoxProps {
  text: string,
  setOptionsCheckbox: any
}

export const CheckBox: React.FC<CheckBoxProps> = ( { text, setOptionsCheckbox } ) => {
  const [checked, setChecked] = React.useState( false )
  
  useEffect( () => {
    setOptionsCheckbox( ( prevState:any ) => {
      if ( checked ) { return [...prevState, text.toLowerCase()] } 
      else { return prevState.filter( ( option: string ) => option !== text.toLowerCase() ) }
    } )
  }, [checked] )

  return (
    <Checkbox
      className={`${ classes.checkbox }`}  
      label={
        <div className={( !checked ) ? classes.text : `${ classes.text } ${ classes.colored }`}>
          {text}
        </div>
      }
      variant='outline'
      onChange={() => setChecked( !checked )}
      checked={checked}
    />
  );
}