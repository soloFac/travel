import { LocalInfoEntity } from '@/models'
import { Button, Container, Divider, Image, Text, Title } from '@mantine/core'

import classes from '../styles/LocalCard.module.css'
import { Instagram, Location, ModalMantine, Whatsapp } from '@/components'
import { useDisclosure } from '@mantine/hooks'

const imgPath = `${ import.meta.env.VITE_REACT_IMG_URL }/local`

export const LocalCard: React.FC<LocalInfoEntity> = ( local: LocalInfoEntity  ) => {
  const { name, instagram, whatsapp, schedules, address, icon } = local
  const [opened, { open, close }] = useDisclosure( false );

  // Todo: agregar el logo en el backend
  return (
    <div className={classes.container}>
      <div className={classes.image_container}>
        <Image className={classes.image} src={`${ imgPath }/${ icon }`} alt='Logo' width={150} height={150}/>
      </div>
      <div className={classes.header}>
        <Whatsapp whatsapp={whatsapp} size={30}/>
        <Title className={classes.title}>{name}</Title>
        <Instagram instagram={instagram} size={29}/>
      </div>
      
      <div className={classes.divider}/>

      <div className={classes.address}>
        <Location size={15}/>
        <Text className={classes.address_text}>{address}</Text>
      </div>

      <ModalMantine opened={opened} close={close}>
        <Title className={classes.title}>Horarios</Title>
        <Divider className={classes.divider}/>
        {schedules.map( ( schedule, index ) => (
          <Container key={index} className={classes.schedule}>
            <Text>{schedule.day}</Text>
            <Text>{schedule.first.start} - {schedule.first.end}</Text>
          </Container>
        ) )}
      </ModalMantine>

      <Button onClick={open} type='button' size='md' className={classes.schedules_btn}>Horarios</Button>
    </div>
  )
}
