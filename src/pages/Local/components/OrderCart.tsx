import { ActionIcon, Button, Title } from '@mantine/core';
import classes from '../styles/OrderCart.module.css';
import { useAppSelector } from '@/hooks';
import { ImageMenu, DeleteIcon } from '@/components';
import { OptionsMenuCard } from './OptionsMenuCard';
import { MenuEntity, OrderEntity } from '@/models';
import { CalculateTotalOrders } from '@/utils';
import { useOrderActions } from '../hooks';
import React from 'react';
import { LocalEntity } from '../../../models/entities/local.entity';


interface OrderCartProps {
  handleSendOrder: () => void
}

export const OrderCart: React.FC<OrderCartProps> = ( { handleSendOrder } ) => {
  const { orders } = useAppSelector( ( state: any ) => state.order )
  const local: LocalEntity = useAppSelector( ( state: any ) => state.localInfo ).local

  const { deleteMenu } = useOrderActions()

  const deleteOrder = ( id: string ) => { deleteMenu( id ) }

  return (
    <div className={classes.container}>
      <Title className={classes.title}>Pedido</Title>

      {( orders.length === 0 ) 
        ? 
        <p className={classes.empty_order}>No hay pedidos</p> 
        : 
        orders.map( ( order: OrderEntity, index: string ) => {
          const menu = local?.menus?.find( ( menu: MenuEntity ) => menu.name === order.menu )
          if ( menu ) {
            const { image, name } = menu
            const { id, menu: menuOrder, amount, dressing, extras } = order
            return (
              <div key={name}>
                <div className={classes.divider}/>
                <div key={index} className={classes.order_container}>
                  <ImageMenu path={`${ image }`} alt={name} extraClasses={classes.image} />

                  <div className={classes.info_container}>
                    <Title className={classes.secondary_title}>{menuOrder}</Title>

                    <p className={classes.amount}>
                      <span className={classes.amount_value}>x{amount}</span> <span className={classes.price}>${order.total}</span>
                    </p>
                    <div className={classes.options_container}>
                      <OptionsMenuCard text='Aderezos' options={dressing} extraClasses={classes.text} />
                      <OptionsMenuCard text='Extras' options={extras} extraClasses={classes.text} />
                    </div>
                  </div>
                  <ActionIcon onClick={() => deleteOrder( id )} variant='transparent' className={classes.delete_actionicon}>
                    <DeleteIcon classes={classes.delete_icon} />
                  </ActionIcon>
                </div>
              </div>
            )
          } else {
            return <p key={index}>Hubo un error</p>
          }
        } )}
      <div className={classes.divider_submit_btn}/>

      <div className={classes.total_container}>
        <Title className={classes.total_title}>Total:</Title>
        <p className={classes.total_value}>${CalculateTotalOrders( orders )}</p>
      </div>
      <Button onClick={handleSendOrder} className={classes.submit_btn} variant={'filled'} color='white'>Continuar</Button>
    </div>
  )
}
