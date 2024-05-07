import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import encodeUrl from 'encodeurl'

import { OrderCart, OrderInfoForm } from '@/pages/Local/components';
import { GetValidatedOrderInfo, getWhatsappMessage, isMemberOfEnum } from '@/utils';
import { DeliveryType, LocalInfoEntity, OrderInfoDto, OrderInfoEntity, PaymentType, ZoneEntity } from '@/models';
import { useAppSelector } from '@/hooks';
import { WhatsappIcon } from '@/components';

import classes from '../../styles/Recipe.module.css';
import { showNotification } from '@mantine/notifications';
import { useOrderActions } from '../../hooks';

export interface FormValues {
  name: string
  phone: string
  comments: string
  paymentType: string
  deliveryType?: string
  address?: string
  addressNumber?: string
  zone?: string
}

export const Recipe = () => {
  const { deleteOrders } = useOrderActions()

  const local: LocalInfoEntity = useAppSelector( ( state: any ) => state.localInfo.local )
  const zones: ZoneEntity[] = ( local.zones !== undefined ) ? local.zones : []
  
  const [active, setActive] = useState( 0 );

  const orders = useAppSelector( ( state: any ) => state.order.orders )

  const initialValues: FormValues = {
    name: '',
    phone: '',
    comments: '',
    paymentType: PaymentType.CASH,
    deliveryType: DeliveryType.PICKUP,
    zone: '',
    address: '',
    addressNumber: '',
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
      address: ( values.address === undefined || values.address.trim().length < 3 || values.address.trim().length > 50 ) ? 'Dirección debería tener al menos 5 caracteres y ser menor a 50' : null,
      // addressNumber debería ser menor a 5 caracteres y solo números
      addressNumber: /^\d{1,6}$/.test( values?.addressNumber ) ? null : 'Número de dirección puede contener solo números y debería ser menor a 6 caracteres',
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
        return current;
      }
      return current < 2 ? current + 1 : current;
    } );

  const prevStep = () => setActive( ( current ) => ( current > 0 ? current - 1 : current ) );

  const handleContinue = () => {
    // Verify if the orders are valid
    console.log( 'VALUES: ', form.getValues() )
    if ( form.validate().hasErrors ) {
      if ( !form.isValid( 'zone' ) ) { 
        showNotification( { title: 'Zona invalida', message: 'Por favor selecciona una zona', color: 'red' } ) 
      }
    }
    nextStep();
  }


  const handleSendOrder = () => {
    const orderInfo: OrderInfoEntity | string = GetValidatedOrderInfo( form.getValues(), zones )
    if ( typeof orderInfo === 'string' ) {
      showNotification( { title: 'Error', message: orderInfo, color: 'red' } )
      return
    }

    const message = getWhatsappMessage( orders, orderInfo as OrderInfoDto )
    const encodedMessage = encodeUrl( message )
    window.open( `https://api.whatsapp.com/send/?phone=${ local.whatsapp }&text=${ encodedMessage }`, '_blank' )

    deleteOrders()
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
            <p>Serás redireccionado a Whatsapp para finalizar tu pedido.</p>
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