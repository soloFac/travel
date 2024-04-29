import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { OrderCart } from '@/pages/Local/components';

import classes from '../styles/Recipe.module.css';
import { WhatsappIcon } from './ui';
import { OrderInfoForm } from '@/pages/Local/components/form/OrderInfoForm';

export interface FormValues {
  name: string
  phone: string
  address: string
  addressNumber: string
  coments: string
}

export const Recipe = () => {
  const [active, setActive] = useState( 0 );



  const form = useForm( {
    mode: 'controlled',
    initialValues: {
      name: '',
      phone: '',
      address: '',
      addressNumber: '',
      comments: '',
    },

    validate: ( values ) => {
      if ( active === 0 ) {
        console.log( 'active', active, 'values', values )
        return {};
      }

      if ( active === 1 ) {
        console.log( 'active', active, 'values', values )
        return {
          name: values.name.trim().length < 3 ? 'Nombre debería tener al menos 3 caracteres' : null,
          phone: /^\d{10}$/.test( values.phone ) ? null : 'Número de telefono invalido',
          address: values.address.trim().length < 5 ? 'Dirección debería tener al menos 5 caracteres' : null,
          // addressNumber debería ser menor a 5 caracteres y solo números
          addressNumber: /^\d{1,5}$/.test( values.addressNumber ) ? null : 'Número de dirección invalido',

        };
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
    nextStep();
  }

  const handleSendOrder = () => {
    // console.log( 'handleSendOrder' )
    nextStep()
    // sendWhatsappMessage( orders, local )
  }

  return (
    <div className={classes.receipe_container}>
      <Stepper active={active} color='red' iconSize={32}>
        <Stepper.Step label='Primer Paso'  description='Confirmar Pedido'>
          <OrderCart handleSendOrder={nextStep} />
        </Stepper.Step>

        <Stepper.Step display={'flex'} label='Ultimo Paso' description='Realizar pedido'>
          <OrderInfoForm form={form} />
        </Stepper.Step>

        <Stepper.Completed >
          <div className={classes.step_completed_container}>
            <p>Completado!</p>
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