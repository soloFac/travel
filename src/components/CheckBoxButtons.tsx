import React from 'react';
import { CheckBox } from './CheckBox';

import classes from '../styles/CheckBoxButtons.module.css'

interface CheckBoxButtonsProps {
  values: any[],
  setOptionsCheckbox: any
}

export const CheckBoxButtons: React.FC<CheckBoxButtonsProps> = ( { values, setOptionsCheckbox } ) => {
  return (
    <div className={classes.container}>
      {
        values.map( ( text, index ) => (
          <CheckBox 
            key={index} 
            text={text}
            setOptionsCheckbox={setOptionsCheckbox}
          />
        ) )
      }
    </div>
  )
}
