import { useState } from 'react';
import { Button, Group } from '@mantine/core';

import { OrderInfoForm } from '@/pages/Local/components';
import { ShowHideComponent, WhatsappIcon } from '@/components';

import classes from '../../styles/Recipe.module.css';
// import { useOrderActions } from '../../hooks';
import { showNotification } from '@mantine/notifications';
import { OrderCart } from '../form/PrimerPaso';
import { useAppSelector } from '@/hooks';
import { getWhatsappMessage } from '@/utils';
import { OrderInfoDto } from '@/models';
import encodeUrl from 'encodeurl';
import { useOrderActions } from '../../hooks';

export const Recipe = () => {
  const { orderInfo } = useAppSelector( ( state: any ) => state.orderInfo )
  const { orders } = useAppSelector( ( state: any ) => state.order )
  const { local } = useAppSelector( ( state: any ) => state.localInfo )

  const { deleteOrders } = useOrderActions()

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
    console.log( 'orderInfo', orderInfo )
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