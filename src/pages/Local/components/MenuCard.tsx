import { useState } from 'react';
import { Card, Image, Text, Badge, Button, Title, ActionIcon, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Extra, MenuEntity } from '@/models';
import { ModalMantine } from '@/components';
import { OrderForm } from './form/OrderForm';
import { AddIcon } from './AddIcon';

import classes from '../styles/MenuCard.module.css';

interface MenuCardProps {
  menu: MenuEntity
  dressings?: string[] | null
  extras?: Extra[] | null
}

export const MenuCard: React.FC<MenuCardProps> = ( { menu, dressings, extras } ) => {
  const { name, image, variants, description } = menu;

  const [opened, { open, close }] = useDisclosure( false );

  const [resizeImg, setResizeImg] = useState( '' );
  // const features = variants.map( ( variant, index ) => (
  //   <Badge className={classes.badge} variant='filled' color='red' key={index}>
  //     {variant.name} ${variant.price}
  //   </Badge>
  // ) );

  return (
    <Card withBorder radius='md' className={classes.card} onMouseEnter={() => setResizeImg( classes.increase )} onMouseLeave={() => setResizeImg( '.decrease' )}>
      <ModalMantine opened={opened} close={close}>
        <OrderForm
          menu={menu}
          dressings={dressings}
          extras={extras}
          closeModal={close}
        />
      </ModalMantine>

      <Tooltip label={'Agregar :)'} color='red.8' transitionProps={{ transition: 'pop', duration: 300 }}>
        <section className={classes.agregar_btn}>
          <ActionIcon onClick={open} variant='hover' color='white' size={'xl'} radius={'xl'} className={classes.icon}>
            <AddIcon />
          </ActionIcon>
        </section>
      </Tooltip>

      <section className={classes.section}>
        <Title fz='lg' fw={500} className={classes.title}>
          {name}
        </Title>
        
        <Tooltip multiline w={250} withArrow  label={description} color='red.8' transitionProps={{ transition: 'skew-up', duration: 300 }}>
          <Text fz='sm' mt='xs'className={classes.text}>
            {description}
          </Text>
        </Tooltip>
        <Button onClick={open} variant='outline' className={classes.btn} >
          Ver más
        </Button>
      </section>

      {( variants.length > 1 ) ? 
        <Badge className={classes.badge} variant='filled' color='dark'>
        Variantes
        </Badge>
        : null}
      
      <div className={classes.price}>
        ${variants[0].price}
      </div>
      
      {/* <Badge color='white' size='sm' variant='light' className={classes.badge}>
        {category}np
      </Badge> */}
      
      {/* <Group className={classes.variants}>
        {features}
      </Group> */}

      <section className={`${ classes.img } ${ resizeImg }`}>
        <Image src={`${ image }`} alt={name}/>
      </section>
    </Card>
  );
}