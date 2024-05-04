import { Group, Divider, Box, Burger, Drawer, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom'

import classes from '../styles/HeaderMegaMenu.module.css';
import { AuthButtons } from './AuthButtons';
import { LoginStatus } from '@/types';

interface PublicMenuOptions {
  title: string,
  link: string
}

const PublicMenuOptions: PublicMenuOptions[] = [
  {
    title: 'Inicio',
    link: '/inicio',
  }
]

interface PrivateMenuOptions {
  title: string,
  link: string
}

const PrivateMenuOptions: PrivateMenuOptions[] = [
  ...PublicMenuOptions,
  {
    title: 'Menus',
    link: '/menus',
  },
  {
    title: 'Categorias',
    link: '/categories',
  },
  {
    title: 'Horarios',
    link: '/schedules',
  },
  {
    title: 'Zonas',
    link: '/zones',
  }
]

interface HeaderMegaMenuProps {
  children?: React.ReactNode
}

export const HeaderMegaMenu: React.FC<HeaderMegaMenuProps> = ( { children } ) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = 
    useDisclosure( false );
  
  const loginStatus: LoginStatus = 'FAIL' as LoginStatus

  return (
    <Box className={classes.box}>
      <DesktopMenuOptions
        drawerOpened={drawerOpened}
        toggleDrawer={toggleDrawer}
        status={loginStatus}
      >
        {children}
      </DesktopMenuOptions>

      <ResponsiveMenuOptions
        drawerOpened={drawerOpened}
        closeDrawer={closeDrawer}
        status={loginStatus}
      />
    </Box>
  )}
  
const DesktopMenuOptions = ( { drawerOpened, toggleDrawer, status, children }: any ) => {
  
  return (
    <header className={classes.header}>
      <Group justify='space-between' h='100%'>

        <Group h='100%' gap={0} visibleFrom='sm'>
          {
            ( status === LoginStatus.SUCCESS ) ?
              PrivateMenuOptions.map( ( item: any ) => (
                <Link to={item.link} key={item.title} className={classes.link}>
                  {item.title}
                </Link>
              ) )
              :
              PublicMenuOptions.map( ( item: any ) => (
                <Link to={item.link} key={item.title} className={classes.link}>
                  {item.title}
                </Link>
              ) )
          }
        </Group>


        {/* <Group visibleFrom='sm'>
          <AuthButtons />
        </Group> */}

        {/* <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='sm' /> */}

        {children}
      </Group>
    </header>
  )
}

const ResponsiveMenuOptions = ( { drawerOpened, closeDrawer, status, children }: any ) => {
  return (
    <Drawer
      opened={drawerOpened}
      onClose={closeDrawer}
      size='100%'
      padding='md'
      title='Navigation'
      hiddenFrom='sm'
      zIndex={1000000}
    >
      <ScrollArea h={`calc(100vh - ${ rem( 80 ) })`} mx='-md'>
        <Divider my='sm' />
    
        {
          ( status === LoginStatus.SUCCESS ) ?
            PrivateMenuOptions.map( ( item: any ) => (
              <Link to={item.link} key={item.title} className={classes.link}>
                {item.title}
              </Link>
            ) )
            :
            PublicMenuOptions.map( ( item: any ) => (
              <Link to={item.link} key={item.title} className={classes.link}>
                {item.title}
              </Link>
            ) )        
        }
    
        <Divider my='sm' />
    
        <Group justify='center' grow pb='xl' px='md'>
          <AuthButtons />
        </Group>
      </ScrollArea>
    </Drawer>
  )
}