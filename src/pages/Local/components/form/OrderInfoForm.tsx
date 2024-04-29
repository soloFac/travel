import { TextInput, Title } from '@mantine/core'
import classes from '../../styles/OrderInfoForm.module.css'
import { UseFormReturnType } from '@mantine/form'
import { FormValues } from '@/components'

interface OrderInfoFormProps {
  form: UseFormReturnType<FormValues>
}

export const OrderInfoForm: React.FC<OrderInfoFormProps> = ( { form } ) => {
  // console.log( ...form.values )
  // console.log( 'values: ', values )
  return (
    <div className={classes.last_step_container}>
      <Title className={classes.title}>Realizar Pedido</Title>
      <div className={classes.form_container}>
        <TextInput
          label='Nombre'
          placeholder='Ej: Juan Perez'
          {...form.getInputProps( 'name' )}
          className={`${ classes.input } ${ classes.name }`}
        />
        <TextInput
          label='Teléfono'
          placeholder='Ej: 3815794360'
          {...form.getInputProps( 'phone' )}
          className={`${ classes.input } ${ classes.phone }`}
        />
        <TextInput
          label='Dirección'
          placeholder='Ej: Av. Siempre Viva'
          {...form.getInputProps( 'address' )}
          className={`${ classes.input } ${ classes.address }`}
        />
        <TextInput
          label='Nro'
          placeholder='Ej: 123'
          {...form.getInputProps( 'addressNumber' )}
          className={`${ classes.input } ${ classes.addressNumber }`}
        />
        <TextInput
          label='Comentarios'
          placeholder='Ej: Sin cebolla'
          {...form.getInputProps( 'comments' )}
          className={`${ classes.input } ${ classes.comments }`}
        />
      </div>
    </div>
  )
}


// { values.map( ( value ) => (
//   <TextInput
//     label={Capitalize( value )}
//     placeholder={( value === 'telefono' ) ? 'Ej: 1234567890' : value }
//     key={ value }
//     {...form.getInputProps( value )}
//     className={`${ classes.input } ${ classes[value] }`}
//   />
// ) ) }