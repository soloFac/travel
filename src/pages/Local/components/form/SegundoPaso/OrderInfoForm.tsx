import { TextInput, Title } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { FormValues } from '@/components'
import { useAppSelector } from '@/hooks'
import { DeliveryType, OrderEntity, PaymentType, TransferEntity, ZoneEntity } from '@/models'
import { ZonesRadioButtons } from './ZonesRadioButtons'

import classes from '../../../styles/OrderInfoForm.module.css'
import { DeliveryRadioButtons } from './DeliveryRadioButtons'
import { calculateTotalOrders } from '@/utils'
import { useEffect, useState } from 'react'
import { PaymentTypeRadioButtons } from './PaymentTypeRadioButtons'

interface OrderInfoFormProps {
  form: UseFormReturnType<FormValues>
}

// Todo: cuando ya se realizo el pedido y se quiere realizar otro, los valores del formulario deberían permanecer (excepto los de los pedidos)

export const OrderInfoForm: React.FC<OrderInfoFormProps> = ( { form } ) => {
  // console.log( ...form.values )
  // console.log( 'values: ', values )
  const zones: ZoneEntity[] = useAppSelector( ( state: any ) => state.localInfo.local.zones )
  const orders: OrderEntity[] = useAppSelector( ( state: any ) => state.order.orders )
  const transfer: TransferEntity = useAppSelector( ( state: any ) => state.localInfo.local.transfer )


  const [totalOrder, setTotalOrder] = useState( 0 )

  const orderTotal = calculateTotalOrders( orders )

  const [hasUpdatedValues, setHasUpdatedValues] = useState( false );

  useEffect( () => {
    console.log( form.values )
    const zoneSelected = zones.find( ( z: ZoneEntity ) => z.name === form.getValues().zone )
    if ( zoneSelected && form.getValues().deliveryType === DeliveryType.DELIVERY ) {
      setTotalOrder( orderTotal + zoneSelected.price )
    } 
    else if ( form.getValues().deliveryType === DeliveryType.PICKUP && !hasUpdatedValues ) {
      form.setValues( { zone: undefined, address: undefined, addressNumber: undefined } )
      setHasUpdatedValues( true );
      setTotalOrder( orderTotal )
    } else {
      setTotalOrder( orderTotal )
    }
  }, [form, hasUpdatedValues] )

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

        <PaymentTypeRadioButtons form={form} />

        { ( form.getValues().paymentType === PaymentType.TRANSFER ) ? 
          ( <div className={classes.transfer}>
            <p className={classes.name}>Nombre: <span className={classes.transfer_info}>{transfer.name}</span></p>
            <p className={classes.alias}>Alias: <span className={classes.transfer_info}>{transfer.alias}</span></p>
            <p className={classes.cbu}>CBU: <span className={classes.transfer_info}>{transfer.cbu}</span></p>
          </div> )
          : null
        }

        <TextInput
          label='Comentarios'
          placeholder='Ej: Sin cebolla'
          {...form.getInputProps( 'comments' )}
          className={`${ classes.input } ${ classes.comments }`}
          key={ 'comments' }
        />
      </form>

      <div className={classes.total_container}>
        <Title className={classes.total_title}>Total:</Title>
        <p className={classes.total_value}>${totalOrder}</p>
      </div>
    </div>
  )
}