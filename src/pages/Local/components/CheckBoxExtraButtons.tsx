import { Extra } from '@/models'

import classes from '../../../styles/CheckBoxButtons.module.css'
import { CheckBoxExtra } from './CheckBoxExtra'

interface CheckboxExtrasProps {
  extras: Extra[],
  setOptionsCheckbox: any
}

export const CheckBoxExtraButtons: React.FC<CheckboxExtrasProps> = ( { extras, setOptionsCheckbox } ) => {
  return (
    <div className={classes.container}>
      {
        extras.map( ( extra, index ) => (
          <CheckBoxExtra
            key={index} 
            extra={extra}
            setOptionsCheckbox={setOptionsCheckbox}
          />
        ) )
      }
    </div>
  )
}
