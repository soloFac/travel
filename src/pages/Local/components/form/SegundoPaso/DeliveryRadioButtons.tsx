import { DeliveryType } from '@/models'
import { Capitalize, GetEnumValues } from '@/utils'
import { Group, Radio } from '@mantine/core'

import classes from '../../../styles/form/SegundoPaso/DeliveryRadioButtons.module.css'

interface DeliveryRadioButtonsProps {
  deliveryType: DeliveryType
  setDeliveryType: any
}

export const DeliveryRadioButtons: React.FC<DeliveryRadioButtonsProps> = ( { deliveryType, setDeliveryType } ) => {
  return (
    <Radio.Group
      label='Tipo de entrega:'
      onChange={( value ) => setDeliveryType( value )}
      className={classes.radio_group}
      defaultValue={deliveryType}
      name='deliveryType'
      withAsterisk
      required
    >
      <Group mt='xs' className={classes.container}>
        {
          GetEnumValues( DeliveryType ).map( ( value: string, index: number ) => (
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
