import { TextInput, Title } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { FormValues } from '@/components'
import { useAppSelector } from '@/hooks'
import { DeliveryType, ZoneEntity } from '@/models'
import { ZonesRadioButtons } from './ZonesRadioButtons'

import classes from '../../../styles/OrderInfoForm.module.css'
import { DeliveryRadioButtons } from './DeliveryRadioButtons'

interface OrderInfoFormProps {
  form: UseFormReturnType<FormValues>
}

// Todo: cuando ya se realizo el pedido y se quiere realizar otro, los valores del formulario deberían permanecer (excepto los de los pedidos)

export const OrderInfoForm: React.FC<OrderInfoFormProps> = ( { form } ) => {
  // console.log( ...form.values )
  // console.log( 'values: ', values )
  const zones: ZoneEntity[] = useAppSelector( ( state: any ) => state.localInfo.local.zones )

  return (
    <div className={classes.last_step_container}>
      <Title className={classes.title}>Realizar Pedido</Title>
      <form className={classes.form_container}>
        <TextInput
          label='Nombre'
          autoComplete='name'
          placeholder='Ej: Juan Perez'
          {...form.getInputProps( 'name' )}
          className={`${ classes.input } ${ classes.name }`}
          key={ 'name' }
          required
        />
        <TextInput
          label='Teléfono'
          autoComplete='tel-local'
          placeholder='Ej: 3815794360'
          {...form.getInputProps( 'phone' )}
          className={`${ classes.input } ${ classes.telefono }`}
          key={ 'phone' }
          required
        />

        {( zones.length > 0 ) ? <DeliveryRadioButtons form={form} /> : null}

        { ( form.getValues().deliveryType === DeliveryType.DELIVERY ) && (
          <>
            <TextInput
              label='Dirección'
              placeholder='Ej: Av. Siempre Viva'
              {...form.getInputProps( 'address' )}
              className={`${ classes.input } ${ classes.address }`}
              key={ 'address' }
              autoComplete='street-address'
              required
            />
            <TextInput
              label='Nro'
              placeholder='Ej: 123'
              {...form.getInputProps( 'addressNumber' )}
              className={`${ classes.input } ${ classes.addressNumber }`}
              key={ 'addressNumber' }
              
              required
            />
        
            <ZonesRadioButtons form={form} />          
          </>
        ) }

        <TextInput
          label='Comentarios'
          placeholder='Ej: Sin cebolla'
          {...form.getInputProps( 'comments' )}
          className={`${ classes.input } ${ classes.comments }`}
          key={ 'comments' }
        />
      </form>
    </div>
  )
}