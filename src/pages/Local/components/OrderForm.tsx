import { Button, Box, Title, Container } from '@mantine/core';
// import { notifications } from '@mantine/notifications';

import { CheckBoxButtons, ImageMenu, RadioButtons, SectionComponent, Remember } from '@/components';
import { Extra, LocalEntity, MenuEntity, OrderEntity } from '@/models';
import { useAppSelector, useCounter } from '@/hooks';
import { AmountCounter } from './AmountCounter';
import { useOrderActions } from '../hooks';

import classes from '../styles/OrderForm.module.css'
import { useState, useEffect } from 'react';
import { CheckBoxExtraButtons } from './CheckBoxExtraButtons';
import { GetValidatedOrder } from '@/utils';
import { showNotification } from '@mantine/notifications';

const imgPath = `${ import.meta.env.VITE_REACT_IMG_URL }/menus`        

interface OrderFormProps {
  menu: MenuEntity
  dressings?: string[] | null
  extras?: Extra[] | null
}

export const OrderForm: React.FC<OrderFormProps> = ( { menu, dressings, extras } ) => {
  const { name: menuName, image, variants } = menu
  const local: LocalEntity = useAppSelector( ( state: any ) => state.localInfo ).local

  const { addMenu } = useOrderActions()

  const [variant, setVariant] = useState( '' )
  const [dressingsCheckbox, setDressingCheckbox] = useState( [] )
  const [extrasCheckbox, setExtrasCheckbox] = useState( [] )

  const [order, setOrder] = useState( {} as OrderEntity | string )
  const [total, setTotal] = useState( 0 )

  const { counter: amount, increment, decrement } = useCounter( 1 )
  
  // const extrasAddapted = extras?.map( ( { name, price } ) => ( 
  //   <>{ name } <span>${ price }</span></>
  // ) )

  // const form = useForm( {
  //   clearInputErrorOnChange: false,

  //   initialValues: { variant: '', dressing: [], extras: [], amount },

  //   // functions will be used to validate values at corresponding key
  //   validate: {
  //     variant: ( value: string ) => ( !value ? 'Select a variant' : null ),
  //     amount: ( value: number ) => ( value < 1 ? 'Select a valid amount' : null ),
  //   },
  // } );


  // Utilizar un useEffect para que cuando cambien las variables del formulario se actualice se realice la validacion de los datos
  
  const orderValidated = GetValidatedOrder( menu, menuName, variant, dressingsCheckbox, extrasCheckbox, amount )

  useEffect( () => {
    setOrder( orderValidated )
    if ( typeof orderValidated === 'object' ) {
      setTotal( orderValidated.total )
    }
  }, [variant, dressingsCheckbox, extrasCheckbox, amount] )

  const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    if ( typeof order === 'string' ) {
      showNotification( { title: 'Debe revisar que se hayan completado los campos correctamente', message: order, color: 'red' } )
      return
    }
    // todo: ValidateForm
    
    addMenu( order )
    showNotification( {
      title: 'Pedido agregado correctamente',
      message: 'Puedes ver arriba a la derecha el carrito de pedido 🤥',
    } )
  }

 

    
  return (
    <Box maw={340} mx='auto' className={classes.container}>
      {/* <Notifications position='top-center' zIndex={1000} /> */}
      {/* <ShowUpdateNotification /> */}

      <form onSubmit={handleSubmit}>
        <div className={classes.header_container}>
          <Title order={1} className={ classes.main_title }>{ menuName }</Title>
          <ImageMenu path={image} alt={menu.name} />
        </div>

        <SectionComponent title={'Variantes'}>
          <RadioButtons
            variants={variants}
            selectedRadio={variant}
            setSelectedRadio={setVariant}
            error={( variant === '' ) ? 'Selecciona una variante' : ''}
          />
        </SectionComponent>

        { ( dressings ) ?
          <SectionComponent title={'Aderezos'}>
            <CheckBoxButtons values={dressings} setOptionsCheckbox={setDressingCheckbox}/>
          </SectionComponent>
          :<></>
        }

        { ( extras ) ?
          <SectionComponent title={'Extras'}>
            <CheckBoxExtraButtons extras={extras} setOptionsCheckbox={setExtrasCheckbox} />
          </SectionComponent>
          :<></>
        }

        <AmountCounter amount={amount} decrement={decrement} increment={increment} />
        
        <Remember text='La cantidades seleccionadas tendrán los mismos Aderezos y Extras' />

        { ( total >= 0 ) ?
          <Container className={classes.container_total}>
            <Title order={2} className={classes.total_title}>Total: ${total}</Title>
          </Container>
          :<></>
        }

        <Container className={classes.container_add_btn}>
          <Button className={classes.add_btn} type='submit' size='md' variant='outline' color='red'>
            Agregar
          </Button>
        </Container>
      </form>
    </Box>
  )
}
