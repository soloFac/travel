import { useAppSelector } from '@/hooks'
import { ZoneEntity } from '@/models'
import { Group, Radio } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import classes from '../../../styles/form/SegundoPaso/ZonesRadioButtons.module.css'
import { getPlainString } from '@/utils'

interface ZonesRadioButtonsProps {
  zone: string
  setZone: any
}

export const ZonesRadioButtons: React.FC<ZonesRadioButtonsProps> = ( { zone, setZone } ) => {
  const zones: ZoneEntity[] = useAppSelector( ( state: any ) => state.localInfo.local.zones )

  const handleSetZone = ( value: string ) => {
    const zoneSelected = zones.find( ( zone: ZoneEntity ) => zone.name === value )
    if ( !zoneSelected ) return
    setZone( getPlainString( zoneSelected.name ) )

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
      onChange={( value ) => handleSetZone( value )}
      className={classes.radio_group}
      defaultValue={zone}
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
