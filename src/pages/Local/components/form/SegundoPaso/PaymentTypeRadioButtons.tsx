import { UseFormReturnType } from '@mantine/form'
import React from 'react'
import { FormValues } from '../../modals/Recipe'
import { Group, Radio } from '@mantine/core'
import { Capitalize, GetEnumValues } from '@/utils'
import { PaymentType } from '@/models'

import classes from '../../../styles/form/SegundoPaso/PaymentTypeRadioButtons.module.css'

interface DeliveryRadioButtonsProps {
  form: UseFormReturnType<FormValues>
}

export const PaymentTypeRadioButtons: React.FC<DeliveryRadioButtonsProps> = ( { form } ) => {
  return (
    <Radio.Group
      label='Forma de pago:'
      onChange={( value ) => form.setFieldValue( 'paymentType', value as PaymentType )}
      className={classes.radio_group}
      defaultValue={form.getValues().paymentType}
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

