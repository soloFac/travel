import { Container, Text } from '@mantine/core'
import { ArrowButton } from './ArrowButton';

import classes from '../../styles/Remember.module.css'

interface RememberProps {
  text: string
}

export const Remember: React.FC<RememberProps> = ( { text } ) => {
  return (
    <Container className={classes.container}>
      <ArrowButton />
      <ArrowButton />
      <Text className={classes.text}>{ text }</Text>
    </Container>
  )
}
