import { useState } from 'react';
import { Button, Group } from '@mantine/core';

import { OrderInfoForm } from '@/pages/Local/components';
import { ShowHideComponent, WhatsappIcon } from '@/components';

import classes from '../../styles/Recipe.module.css';
// import { useOrderActions } from '../../hooks';
import { showNotification } from '@mantine/notifications';
import { OrderCart } from '../form/PrimerPaso';


export const Recipe = () => {
  const [showCart, setShowCart] = useState( true )
  const [showOrderInfo, setShowOrderInfo] = useState( false )
  const [showFinalStep, setShowFinalStep] = useState( false )
  // const { deleteOrders } = useOrderActions()

  const [active, setActive] = useState( 0 );

  const [formValid, setFormValid] = useState( false )

  // const orders = useAppSelector( ( state: any ) => state.order.orders )


  // - Agrego propiedades al form para realizar las validaciones cuando seleccionan Delivery!

  const nextStep = () => {
    if ( active === 0 ) {
      setShowCart( false )
      setShowOrderInfo( true )
      setActive( active + 1 )
    }

    if ( active === 1 ) {
      if ( !formValid ) {
        showNotification( { title: 'Error en los datos del formulario', message: 'Varifique que los datos hayan sido completados correctamente', color: 'red' } ) 
        return
      }
      setShowOrderInfo( false )
      setShowFinalStep( true )
      setActive( active + 1 )
    }
  }

  const prevStep = () => {
    if ( active === 1 ) {
      setShowCart( true )
      setShowOrderInfo( false )
      setActive( active - 1 )
    }
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
      <ShowHideComponent showComponent={showCart}>
        <OrderCart handleContinue={nextStep} />
      </ShowHideComponent>

      <ShowHideComponent showComponent={showOrderInfo}>
        <OrderInfoForm setFormValid={setFormValid} />
      </ShowHideComponent>

      <ShowHideComponent showComponent={showFinalStep}>
        <div className={classes.step_completed_container}>
          <WhatsappIcon size={35} extraClasses={classes.step_whatsapp_icon}/>
          <p>Serás redireccionado a Whatsapp para finalizar tu pedido.</p>
        </div>
      </ShowHideComponent>

     

      {/* <Stepper active={active} color='red' iconSize={32}>
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
      </Stepper> */}

      <Group justify='flex-end' mt='xl'>
        <div className={classes.btn_step_container}>
          { ( active === 1 ) && <Button variant='default' className={classes.btn} onClick={prevStep}> Atrás </Button>}
          { ( active === 1 ) && <Button onClick={nextStep} className={classes.submit_btn} variant={'filled'} color='white'>Continuar</Button>}
          { ( active === 2 ) && <Button onClick={handleSendOrder} className={classes.submit_btn} variant={'filled'} color='white'>Finalizar Pedido</Button>}
        </div>
      </Group>
    </div>
  );
} 