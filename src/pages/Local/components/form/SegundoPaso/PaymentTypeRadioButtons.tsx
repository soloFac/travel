import React from 'react'
import { Group, Radio } from '@mantine/core'
import { Capitalize, GetEnumValues } from '@/utils'
import { PaymentType } from '@/models'

import classes from '../../../styles/form/SegundoPaso/PaymentTypeRadioButtons.module.css'

interface DeliveryRadioButtonsProps {
  paymentType: any
  setPaymentType: any
}

export const PaymentTypeRadioButtons: React.FC<DeliveryRadioButtonsProps> = ( { paymentType, setPaymentType } ) => {
  return (
    <Radio.Group
      label='Forma de pago:'
      onChange={( value ) => setPaymentType( value ) }
      className={classes.radio_group}
      defaultValue={paymentType}
      name='paymentType'
      withAsterisk
      required
    >
      <Group mt='xs' className={classes.container}>
        {
          GetEnumValues( PaymentType ).map( ( value: string, index: number ) => (
            <Radio key={index}
              color='red.4'
              value={value}
              label={Capitalize( value )}
              className={classes.radio}
            />
          ) )
        }
      </Group>
    </Radio.Group>
  )
}

