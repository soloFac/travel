import { useDisclosure } from '@mantine/hooks';
import { ActionIcon } from '@mantine/core';

import { Cart, HeaderMegaMenu, ModalMantine } from '@/components'
import { LocalCard, Recipe } from './components';
import { Badges } from '@/components/ui/Badges';
import { MenusCategoryCards } from './components/MenusCategoryCards';
import { useAppSelector } from '@/hooks';

import classes from './styles/LocalPage.module.css';
import { useParams } from 'react-router-dom';
import { useLocalInfoActions } from './hooks';
import { useEffect } from 'react';

export const LocalPage = () => {
  // set local to useState
  const { local } = useAppSelector( state => state.localInfo )

  const [openedCart, { open: openCart, close: closeCart }] = useDisclosure( false );

  const { localName } = useParams()
  // set local to useState
  const { getLocal } = useLocalInfoActions()

  useEffect( () => {
    if ( localName ) { getLocal( localName ) }
  }
  , [localName] )

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

      {( local ) ?
        <div className={classes.container}>
          <LocalCard {...local} />

          <div className={classes.badges_container}>
            <Badges categories={local.categories} />
          </div>

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
