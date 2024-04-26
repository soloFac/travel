import { Group, Button } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
// import { CheckIcon } from '@modulz/radix-icons';
import { DottedLoader } from './DottedLoader';

import classes from '../../styles/ShowUpdateNotification.module.css'

export const ShowUpdateNotification = () => {
  return (
    <Group justify='start'>
      <Button className={classes.button}
        variant='outline'
        onClick={() => {
          showNotification( {
            id: 'load-data',
            loading: true,
            title: 'Cargando tus datos',
            message: 'Tus datos serán cargados en 3 segundos, tu no puedes cancelar todavia.',
            autoClose: 3000000,
          } );

          setTimeout( () => {
            updateNotification( {
              id: 'load-data',
              color: 'teal',
              title: 'Datos cargados',
              message: 'Tus datos han sido cargados exitosamente.',
              icon: <DottedLoader />,
              autoClose: 2000,
            } );
          }, 3000 );
        }}
      >
        Show update notification
      </Button>
    </Group>
  );
}