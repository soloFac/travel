import { ArrowButton } from '@/components'
import { ActionIcon, Container, Flex, Text } from '@mantine/core'

import classes from '../styles/AmountCounter.module.css'

interface AmountCounterProps {
  amount: number
  decrement: () => void
  increment: () => void
}

export const AmountCounter: React.FC<AmountCounterProps> = ( { amount, decrement, increment } ) => {
  return (
    <Container className={classes.container_amount}>
      <Text className={classes.amount_text}>Cantidad: </Text>
      <Flex className={classes.flex_amount}>
        <ActionIcon type='button' onClick={ () => decrement()} className={classes.decrement_action} >
          <ArrowButton/>
        </ActionIcon>
        <Text className={classes.amount_value}>{ amount }</Text>
        <ActionIcon type='button' onClick={ () => increment() } className={classes.increment_action} >
          <ArrowButton/>
        </ActionIcon>
      </Flex>
    </Container>
  )
}
