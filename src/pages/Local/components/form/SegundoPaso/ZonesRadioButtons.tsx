import { FormValues } from '@/components'
import { useAppSelector } from '@/hooks'
import { ZoneEntity } from '@/models'
import { Group, Radio } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { showNotification } from '@mantine/notifications'

import classes from '../../../styles/form/SegundoPaso/ZonesRadioButtons.module.css'

interface ZonesRadioButtonsProps {
  form: UseFormReturnType<FormValues>
}

export const ZonesRadioButtons: React.FC<ZonesRadioButtonsProps> = ( { form } ) => {
  const zones: ZoneEntity[] = useAppSelector( ( state: any ) => state.localInfo.local.zones )

  const setZone = ( value: string ) => {
    const zoneSelected = zones.find( ( zone: ZoneEntity ) => zone.name === value )
    if ( !zoneSelected ) return
    form.setFieldValue( 'zone', zoneSelected.name )

    showNotification( { 
      title: `Zona de envio ${ zoneSelected.name }: `, message: ` ${ zoneSelected.addresses[0] } - ${ zoneSelected.addresses[1] } - ${ zoneSelected.addresses[2] } - ${ zoneSelected.addresses[3] }`,
      autoClose: 20000,
      color: 'red',
      icon: '🚚',
      withIcon: true,
      withCloseButton: true,
      withTimings: true
    } )
  }

  return (
    <Radio.Group
      label='Zona de envio:'
      onChange={( value ) => setZone( value )}
      className={classes.radio_group}
      defaultValue={form.getValues().zone}
      withAsterisk
      required
    >
      <Group mt='xs' className={classes.container}>
        { ( zones.length > 0 ) ? zones.map( ( zone: ZoneEntity, index: number ) => {
          return (
            <Radio key={index} 
              color='red.4'
              value={ zone.name }
              label={
                <div>{zone.name}
                  <span> ${zone.price}</span>
                </div>}
              className={classes.radio}
            />
          )
        } ) : null}
      </Group>
    </Radio.Group>
  )
}
