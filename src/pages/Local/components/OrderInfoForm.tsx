import { TextInput, Title } from '@mantine/core'
import classes from '../styles/OrderInfoForm.module.css'
import { UseFormReturnType } from '@mantine/form'
import { FormValues } from '@/components'
import { Capitalize } from '@/utils'

interface OrderInfoFormProps {
  form: UseFormReturnType<FormValues>
}

export const OrderInfoForm: React.FC<OrderInfoFormProps> = ( { form } ) => {
  // console.log( ...form.values )
  const values = Object.keys( form.values )
  console.log( 'values: ', values )
  return (
    <div className={classes.last_step_container}>
      <Title className={classes.title}>Realizar Pedido</Title>
      <div className={classes.form_container}>
        { values.map( ( value ) => (
          <TextInput
            label={Capitalize( value )}
            placeholder={value}
            key={ value }
            {...form.getInputProps( value )}
            className={`${ classes.input } ${ classes[value] }`}
          />
        ) ) }
      </div>
    </div>
  )
}
