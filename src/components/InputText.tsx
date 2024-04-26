
import { TextInput } from '@mantine/core';
import classes from '../styles/InputText.module.css';

interface InputTextProps {
  label: string
  value: string
  placeholder?: string
  key: string
  props: any
}

export const InputText: React.FC<InputTextProps> = ( { label, value, placeholder = '', key, props } ) => {
  return (
    <TextInput 
      label={label}
      value={value}
      placeholder={placeholder}
      key={key}
      {...props}
      // onChange={( event ) => setValue( event.currentTarget.value )}
      leftSection={<svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-device-mobile' width='44' height='44' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#2c3e50' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none'/>
        <path d='M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z' />
        <path d='M11 4h2' />
        <path d='M12 17v.01' />
      </svg>}
      className={classes.container}
    >
      {`${ label }, ${ value }` }
    </TextInput>
  )
}
