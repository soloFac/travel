import { useEffect, useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { OrderCart, OrderInfoForm } from '@/pages/Local/components';

import { isMemberOfEnum } from '@/utils';
import { DeliveryType, PaymentType, ZoneEntity } from '@/models';
import { useAppSelector } from '@/hooks';
import { WhatsappIcon } from '@/components';

import classes from '../../styles/Recipe.module.css';
import { showNotification } from '@mantine/notifications';

export interface FormValues {
  name: string
  phone: string
  coments: string
  paymentType: string
  deliveryType: string
  address?: string
  addressNumber?: string
  zone?: string
}

export interface RadioSetStates {
  setZoneRadio: ( zone: string ) => void
  deliveryRadio: string
  setDeliveryRadio: ( delivery: DeliveryType ) => void
  setPaymentRadio: ( payment: PaymentType ) => void
}

export const Recipe = () => {
  const zones: ZoneEntity[] = useAppSelector( ( state: any ) => state.localInfo.local.zones )
  
  const [active, setActive] = useState( 0 );


  // const [deliveryRadio, setDeliveryRadio] = useState( DeliveryType.PICKUP )
  // const [zoneRadio, setZoneRadio] = useState( firstZone )
  // console.log( `---- zoneRadio: ${ zoneRadio } ----` )
  const [paymentRadio, setPaymentRadio] = useState( PaymentType.CASH )

  const initialValues = {
    name: '',
    phone: '',
    comments: '',
    paymentType: PaymentType.CASH,
    deliveryType: DeliveryType.PICKUP,
    zone: undefined,
    address: undefined,
    addressNumber: undefined,
  }

  const orderValidation = ( values: any ) => {
    return {
      name: ( values.name.trim().length < 3 || values.name.trim().length > 40 ) ? 'Nombre debería tener al menos 3 caracteres y ser menor a 40 caracteres' : null,
      phone: /^\d{10}$/.test( values.phone ) ? null : 'Número de telefono invalido, debería tener 10 dígitos ejemplo: 3815668899',
      deliveryType: ( !isMemberOfEnum( values.deliveryType, DeliveryType ) ? 'Tipo de entrega invalido' : null ),
      comments: values.comments.trim().length > 100 ? 'Comentarios deberían ser menores a 100 caracteres' : null,
      paymentType: ( !isMemberOfEnum( values.paymentType, PaymentType ) ? 'Tipo de pago invalido' : null ),
    }
  }

  const zoneValidation = ( values: any ) => {
    return {
      address: ( values.address.trim().length < 3 || values.address.trim().length > 50 ) ? 'Dirección debería tener al menos 5 caracteres y ser menor a 50' : null,
      // addressNumber debería ser menor a 5 caracteres y solo números
      addressNumber: /^\d{1,6}$/.test( values.addressNumber ) ? null : 'Número de dirección puede contener solo números y debería ser menor a 6 caracteres',
      // Cambiar, hacer que compruebe que pertenece al array de zonas
      zone: ( !values.zone ) ? 'Por favor selecciona una zona' : null,
    }
  }

  // - Agrego propiedades al form para realizar las validaciones cuando seleccionan Delivery!
  if ( zones.length > 0 ) {
    Object.defineProperty( initialValues, 'zone', { value: '', writable: true } );
    Object.defineProperty( initialValues, 'address', { value: '', writable: true } );
    Object.defineProperty( initialValues, 'addressNumber', { value: '', writable: true } );
  }

  const form = useForm( {
    mode: 'controlled',
    initialValues: initialValues,

    validate: ( values ): any => {
      if ( active === 1 ) {
        if ( values.deliveryType === DeliveryType.DELIVERY && zones.length > 0 ) {
          const validation = Object.assign( orderValidation( values ), zoneValidation( values ) )
          return validation
        }
        return orderValidation( values )
      }

      return {};
    },
  } );

  const nextStep = () =>
    setActive( ( current ) => {
      if ( form.validate().hasErrors ) {
        if ( !form.isValid( 'zone' ) ) { 
          showNotification( { title: 'Zona invalida', message: 'Por favor selecciona una zona', color: 'red' } ) 
        }
        return current;
      }
      return current < 2 ? current + 1 : current;
    } );

  const prevStep = () => setActive( ( current ) => ( current > 0 ? current - 1 : current ) );

  const handleContinue = () => {
    // Verify if the orders are valid
    nextStep();
  }


  const handleSendOrder = () => {
    // console.log( 'handleSendOrder' )
    console.log( form.getValues() )
    nextStep()
    // sendWhatsappMessage( orders, local )
    // todo: clean orders
  }

  return (
    <div className={classes.receipe_container}>
      <Stepper active={active} color='red' iconSize={32}>
        <Stepper.Step label='Primer Paso'  description='Confirmar Pedido'>
          <OrderCart handleContinue={nextStep} />
        </Stepper.Step>

        <Stepper.Step display={'flex'} label='Ultimo Paso' description='Realizar pedido'>
          <OrderInfoForm form={form} />
        </Stepper.Step>

        <Stepper.Completed >
          <div className={classes.step_completed_container}>
            <WhatsappIcon size={35} extraClasses={classes.step_whatsapp_icon}/>
            <p>Serás redireccionado a Whatsapp para completar tu pedido.</p>
          </div>
        </Stepper.Completed>
      </Stepper>

      <Group justify='flex-end' mt='xl'>
        { ( active !== 0 ) && (
          <div className={classes.btn_step_container}>
            {( active !== 2 ) && <Button variant='default' className={classes.btn} onClick={prevStep}> Atrás </Button>}
            {( active < 2 ) && <Button onClick={handleContinue} className={classes.submit_btn} variant={'filled'} color='white'>Continuar</Button>}
            {( active === 2 ) && <Button onClick={handleSendOrder} className={classes.submit_btn} variant={'filled'} color='white'>Finalizar Pedido</Button>}
          </div>
        )}
      </Group>
    </div>
  );
}