import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

import { OrderCart, OrderInfoForm } from '@/pages/Local/components';
import { LocalInfoEntity, ZoneEntity } from '@/models';
import { useAppSelector } from '@/hooks';
import { WhatsappIcon } from '@/components';

import classes from '../../styles/Recipe.module.css';
// import { useOrderActions } from '../../hooks';
import { showNotification } from '@mantine/notifications';


export const Recipe = () => {
  // const { deleteOrders } = useOrderActions()

  const local: LocalInfoEntity = useAppSelector( ( state: any ) => state.localInfo.local )
  const zones: ZoneEntity[] = ( local.zones !== undefined ) ? local.zones : []
  
  const [active, setActive] = useState( 0 );

  const [formValid, setFormValid] = useState( false )

  // const orders = useAppSelector( ( state: any ) => state.order.orders )


  // - Agrego propiedades al form para realizar las validaciones cuando seleccionan Delivery!

  const nextStep = () =>
    setActive( ( current ) => {
      // Validate Form
      if ( zones.length < 0 ) {
        alert( 'The form has errors' )
        return current;
      }
      return current < 2 ? current + 1 : current;
    } );

  const prevStep = () => setActive( ( current ) => ( current > 0 ? current - 1 : current ) );

  const handleContinue = () => {
    // Verify if the orders are valid
    // Validar formulario
    console.log( 'formValid', formValid )
    if ( !formValid ) {
      showNotification( { title: 'Error en los datos del formulario', message: 'Varifique que los datos hayan sido completados correctamente', color: 'red' } ) 
      alert( 'Formulario invalido' )
      return
    }
    nextStep();
  }


  const handleSendOrder = () => {
    // const orderInfo: OrderInfoEntity | string = GetValidatedOrderInfo( form.getValues(), zones )
    // if ( typeof orderInfo === 'string' ) {
    //   showNotification( { title: 'Error', message: orderInfo, color: 'red' } )
    //   return
    // }

    // const message = getWhatsappMessage( orders, orderInfo as OrderInfoDto )
    // const encodedMessage = encodeUrl( message )
    // window.open( `https://api.whatsapp.com/send/?phone=${ local.whatsapp }&text=${ encodedMessage }`, '_blank' )

    // deleteOrders()
  }

  return (
    <div className={classes.receipe_container}>
      <Stepper active={active} color='red' iconSize={32}>
        <Stepper.Step label='Primer Paso'  description='Confirmar Pedido'>
          <OrderCart handleContinue={nextStep} />
        </Stepper.Step>

        <Stepper.Step display={'flex'} label='Ultimo Paso' description='Realizar pedido'>
          <OrderInfoForm setFormValid={setFormValid} />
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