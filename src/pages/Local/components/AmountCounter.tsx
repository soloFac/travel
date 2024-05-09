import { ArrowButton } from '@/components'
import { ActionIcon, Container, Flex, Text } from '@mantine/core'

import classes from '../styles/AmountCounter.module.css'

interface AmountCounterProps {
  amount: number
  decrement: () => void
  increment: () => void
}

export const AmountCounter: React.FC<AmountCounterProps> = ( { amount, decrement, increment } ) => {
  const handleDecrement = () => {
    if ( amount > 1 ) {
      decrement()
    }
  }

  return (
    <Container className={classes.container_amount}>
      <Text className={classes.amount_text}>Cantidad: </Text>
      <Flex className={classes.flex_amount}>
        <ActionIcon type='button' onClick={ () => handleDecrement()} className={classes.decrement_action} >
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
