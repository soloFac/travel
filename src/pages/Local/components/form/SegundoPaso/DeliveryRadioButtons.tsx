import { DeliveryType } from '@/models'
import { Capitalize, GetEnumValues } from '@/utils'
import { Group, Radio } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormValues } from '../../modals/Recipe'

import classes from '../../../styles/form/SegundoPaso/DeliveryRadioButtons.module.css'

interface DeliveryRadioButtonsProps {
  form: UseFormReturnType<FormValues>
  setDeliveryRadio: ( delivery: DeliveryType ) => void
}

export const DeliveryRadioButtons: React.FC<DeliveryRadioButtonsProps> = ( { form, setDeliveryRadio } ) => {
  return (
    <Radio.Group
      label='Tipo de entrega:'
      onChange={( value ) => setDeliveryRadio( value as DeliveryType )}
      className={classes.radio_group}
      defaultValue={DeliveryType.PICKUP}
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
