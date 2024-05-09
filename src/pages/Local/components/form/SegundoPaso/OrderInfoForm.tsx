import { TextInput, Title } from '@mantine/core'

import { useAppSelector, useForm } from '@/hooks'
import { DeliveryType, PaymentType, TransferEntity, ZoneEntity } from '@/models'

import classes from '../../../styles/OrderInfoForm.module.css'
import { calculateTotalOrders, getPlainString, GetValidatedOrderInfo } from '@/utils'
import { useEffect, useState } from 'react'
import { PaymentTypeRadioButtons } from './PaymentTypeRadioButtons'
import { DeliveryRadioButtons } from './DeliveryRadioButtons'
import { ZonesRadioButtons } from './ZonesRadioButtons'
import { useOrderInfoActions } from '@/pages/Local/hooks'

export interface FormValues {
  name: string
  phone: string
  comments: string
}

interface FormValidations {
  [key: string]: [( value: any ) => boolean, string]
}
 
const formData: FormValues = {
  name: '',
  phone: '',
  comments: ''
}

const formValidations: FormValidations = {
  name: [( value: any ) => value.trim().length >= 3 && value.trim().length <= 40, 'El nombre debe tener al menos 3 caracteres y ser menor a 40 caracteres'],
  phone: [( value: any ) => /^\d{10}$/.test( value ), 'Número de telefono invalido, debería tener 10 dígitos ejemplo: 3815668899'],
  comments: [( value: any ) => value.trim().length <= 100, 'Comentarios deberían ser menores a 100 caracteres'],
}

// --------- DELIVERY FORM

export interface FormDeliveryValues {
  address: string
  addressNumber: string
  zone: string
}

const formDeliveryData: FormDeliveryValues = {
  address: '',
  addressNumber: '',
  zone: ''
}

const formDeliveryValidations: FormValidations = {
  address: [( value: any ) => value.trim().length >= 3 && value.trim().length <= 50, 'Dirección debería tener al menos 5 caracteres y ser menor a 50'],
  addressNumber: [( value: any ) => /^\d{1,6}$/.test( value ), 'Número de dirección puede contener solo números y debería ser menor a 6 caracteres'],
  zone: [( value: any ) => value.trim().length === 0, 'Debe seleccionar una zona']
}

// Todo: cuando ya se realizo el pedido y se quiere realizar otro, los valores del formulario deberían permanecer (excepto los de los pedidos)

interface OrderInfoFormProps {
  setFormValid: ( value: boolean ) => void
}

export const OrderInfoForm: React.FC<OrderInfoFormProps> = ( { setFormValid } ) => {
  const { addOrderInfo } = useOrderInfoActions()

  const { orders } = useAppSelector( ( state: any ) => state.order )
  
  // - STATE VALUES
  const zones: ZoneEntity[] = useAppSelector( ( state: any ) => state.localInfo.local.zones )
  // const orders: OrderEntity[] = useAppSelector( ( state: any ) => state.order.orders )
  const transfer: TransferEntity = useAppSelector( ( state: any ) => state.localInfo.local.transfer )

  const [paymentType, setPaymentType] = useState( PaymentType.CASH )
  const [deliveryType, setDeliveryType] = useState( DeliveryType.PICKUP )

  const [zone, setZone] = useState( '' )

  const orderTotal = calculateTotalOrders( orders )
  const [totalOrder, setTotalOrder] = useState( 0 )
  
  // const [totalOrder, setTotalOrder] = useState( 0 )
  // const orderTotal = calculateTotalOrders( orders )

  const {
    formState: { name, phone, comments },
    formValidation: { nameValid, phoneValid, commentsValid },
    onInputChange,
    // errors
    isFormValid
  } = useForm( formData, formValidations )

  const {
    formState: { address, addressNumber },
    formValidation: { addressValid, addressNumberValid },
    // errors
    onInputChange: onInputChangeDelivery,
    isFormValid: isFormValidDelivery
  } = useForm( formDeliveryData, formDeliveryValidations )

  
  useEffect( () => {
    if ( deliveryType === DeliveryType.DELIVERY ) {
      setFormValid( isFormValid() && isFormValidDelivery() )
    } else {
      setFormValid( isFormValid() )
    }

    // setInfoState
    const orderInfo = GetValidatedOrderInfo( { name, phone, comments, paymentType, deliveryType, address, addressNumber, zone }, zones )
    if ( typeof orderInfo === 'string' ) {
      console.error( orderInfo )
      return
    }
    addOrderInfo( orderInfo )
  }, [nameValid, phoneValid, commentsValid, paymentType, deliveryType, address, zone] )

  useEffect( () => {
    if ( deliveryType === DeliveryType.PICKUP ) {
      setTotalOrder( orderTotal )
      setZone( '' )
    } else {
      const zonePrice = zones.find( ( _zone ) => getPlainString( _zone.name ) === getPlainString( zone ) )?.price
      if ( !zonePrice ) return
      setTotalOrder( orderTotal + zonePrice )
    }    
  }, [zone, deliveryType] )

  return (
    <div className={classes.last_step_container}>
      <Title className={classes.title}>Realizar Pedido</Title>
      <form className={classes.form_container}>
        <TextInput
          label='Nombre'
          autoComplete='name'
          placeholder='Ej: Juan Perez'
          className={`${ classes.input } ${ classes.name }`}
          name='name'
          error={nameValid}
          value={name}
          onChange={onInputChange}
          required
        />
        <TextInput
          label='Teléfono'
          autoComplete='tel-local'
          placeholder='Ej: 3815794360'
          className={`${ classes.input } ${ classes.telefono }`}
          name='phone'
          error={phoneValid}
          value={phone}
          onChange={onInputChange}
          required
        />

        
        {( zones.length > 0 ) ? 
          <DeliveryRadioButtons
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
          /> 
          : null
        }

        { ( deliveryType === DeliveryType.DELIVERY ) ? (
          <>
            <TextInput
              label='Dirección'
              placeholder='Ej: Av. Siempre Viva'
              className={`${ classes.input } ${ classes.address }`}
              autoComplete='street-address'
              name='address'
              error={addressValid}
              value={address}
              onChange={onInputChangeDelivery}
              required
            />
            <TextInput
              label='Nro'
              placeholder='Ej: 123'
              className={`${ classes.input } ${ classes.addressNumber }`}
              name='addressNumber'
              error={addressNumberValid}
              value={addressNumber}
              onChange={onInputChangeDelivery}
              required
            />
            <ZonesRadioButtons
              zone={zone} 
              setZone={setZone}
            />
          </>
        ) 
          : null
        }
        
        <PaymentTypeRadioButtons 
          paymentType={paymentType}
          setPaymentType={setPaymentType} 
        />
        
        { ( paymentType === PaymentType.TRANSFER ) ? (
          <div className={classes.transfer}>
            <p className={classes.name}>Nombre: <span className={classes.transfer_info}>{transfer.name}</span></p>
            <p className={classes.alias}>Alias: <span className={classes.transfer_info}>{transfer.alias}</span></p>
            <p className={classes.cbu}>CBU: <span className={classes.transfer_info}>{transfer.cbu}</span></p>
          </div>
        ) : null}

        <TextInput
          label='Comentarios'
          placeholder='Ej: comentario adicional para el pedido...'
          className={`${ classes.input } ${ classes.comments }`}
          error={commentsValid}
          name='comments'
          value={comments}
          onChange={onInputChange}
        />
      </form>

      <div className={classes.total_container}>
        <Title className={classes.total_title}>Total:</Title>
        <p className={classes.total_value}>${totalOrder}</p>
      </div>
    </div>
  )
}