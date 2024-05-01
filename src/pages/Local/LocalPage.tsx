import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Cart, HeaderMegaMenu, ModalMantine } from '@/components'

import { LocalCard } from './components';
import classes from './styles/LocalPage.module.css';
import { Badges } from '@/components/ui/Badges';
import { MenusCategoryCards } from './components/MenusCategoryCards';
import { useAppSelector } from '@/hooks';
import { useLocalInfoActions } from './hooks';
import { ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Recipe } from '@/components';

export const LocalPage = () => {
  const { localName } = useParams()
  // set local to useState
  const { getLocal } = useLocalInfoActions()
  const { local } = useAppSelector( state => state.localInfo )

  const [openedCart, { open: openCart, close: closeCart }] = useDisclosure( false );

  return (
    <section className={classes.section}>
      <HeaderMegaMenu>
        <ActionIcon onClick={openCart} variant='transparent' className={classes.action_icon_cart}>
          <Cart classes={classes.cart} />
        </ActionIcon>
      </HeaderMegaMenu>

      <ModalMantine opened={openedCart} close={closeCart}>
        <Recipe />
      </ModalMantine>

      {/* <ModalMantine opened={openedPersonalForm} close={closePersonalForm}>
        <OrderPersonalForm />
      </ModalMantine> */}

      {( local ) ?
        <div className={classes.container}>
          <LocalCard {...local} />

          <Badges categories={local.categories} />

          <article className={classes.article}>
            {local.categories.map( ( menu, i ) => (
              <MenusCategoryCards key={i} category={menu.name} local={local} />
            ) )}
          </article>
        </div>
        : 'Loading'}
    </section>
  )
}
