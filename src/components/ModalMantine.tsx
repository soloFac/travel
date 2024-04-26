import { Modal } from '@mantine/core'

import classes from '../styles/ModalMantine.module.css'

interface ModalMantineProps {
  opened: boolean
  close: () => void
  children: React.ReactNode
}

export const ModalMantine: React.FC<ModalMantineProps> = ( { opened, close, children } ) => {
  return (
    <Modal opened={opened} onClose={close} size={500} className={classes.modal}
      transitionProps={{ transition: 'pop-bottom-left', duration: 160 }}
      overlayProps={{
        color: '#8C8C8C',
        backgroundOpacity: 0.2,
        blur: 1.6,
      }}
    >
      {children}
    </Modal>
  )
}
