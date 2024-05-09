import { useState, useEffect } from 'react';
import { Button, Box, Title, Container } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
// import { notifications } from '@mantine/notifications';

import { CheckBoxButtons, ImageMenu, SectionComponent, Remember } from '@/components';
import { Extra, MenuEntity, OrderEntity } from '@/models';
import { useAppSelector, useCounter } from '@/hooks';
import { AmountCounter } from '../AmountCounter';

import { CheckBoxExtraButtons } from '../CheckBoxExtraButtons';
import { GetValidatedOrder } from '@/utils';
import { useOrderActions } from '../../hooks';

import classes from '../../styles/OrderForm.module.css'
import { VariantsRadioButtons } from '../VariantsRadioButtons';
import { GetVariantSelected } from '@/utils/GetVariantSelected';
import { GetExtrasSelected } from '@/utils/GetExtrasSelected';
import { GetCategorySelected } from '@/utils/GetCategorySelected';
import { CalculateTotalOrder } from '@/utils/CalculateTotalOrder';

interface OrderFormProps {
  menu: MenuEntity
  dressings?: string[] | null
  extras?: Extra[] | null
  closeModal: () => void
}

export const OrderForm: React.FC<OrderFormProps> = ( { menu, dressings, extras, closeModal } ) => {
  const { name: menuName, image, variants } = menu

  const { local } = useAppSelector( state => state.localInfo )

  const { addMenu } = useOrderActions()

  const [variant, setVariant] = useState( '' )
  const [dressingsCheckbox, setDressingCheckbox] = useState( [] )
  const [extrasCheckbox, setExtrasCheckbox] = useState( [] )

  const [order, setOrder] = useState( {} as OrderEntity | string )
  const [total, setTotal] = useState( 0 )

  const { counter: amount, increment, decrement } = useCounter( 1 )

  // Utilizar un useEffect para que cuando cambien las variables del formulario se actualice se realice la validacion de los datos
  
  const orderValidated = GetValidatedOrder( menu, menuName, variant, dressingsCheckbox, extrasCheckbox, amount )

  useEffect( () => {
    if ( typeof orderValidated === 'object' ) {
      setOrder( orderValidated )
    }
    const variantSelected = GetVariantSelected( menu, variant )
    if ( typeof variantSelected === 'string' ) { return }
    if ( local ) {
      const categorySelected = GetCategorySelected( menu.category, local?.categories )
      if ( typeof categorySelected === 'string' ) {
        showNotification( { title: 'Error al seleccionar la categoría', message: categorySelected, color: 'red' } )
        return
      }
      const extrasSelected = GetExtrasSelected( extrasCheckbox, categorySelected )
      setTotal( CalculateTotalOrder( variantSelected, extrasSelected, amount ) )
    }

    // setTotal( orderValidated.total )
  }, [variant, extrasCheckbox, dressingsCheckbox, amount] )

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
      message: 'Puedes ver arriba a la izquierda el carrito de pedido con el total de tu compra',
    } )
    // close modal
    closeModal()
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
          <VariantsRadioButtons
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
