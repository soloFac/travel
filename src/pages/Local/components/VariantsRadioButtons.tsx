import { Group, Radio } from '@mantine/core'
import classes from '../styles/VariantsRadioButtons.module.css'
import { VariantEntity } from '@/models'

interface VariantsRadioButtonsProps {
  variants: VariantEntity[],
  selectedRadio: string,
  setSelectedRadio: ( value: string ) => void,
  error: string
}

export const VariantsRadioButtons: React.FC<VariantsRadioButtonsProps> = ( { variants, selectedRadio, setSelectedRadio, error = '' } ) => {
  return (
    <Radio.Group
      className={classes.radioGroup}
      // label='Selecciona tu opción:'
      value={selectedRadio}
      onChange={( value ) => setSelectedRadio( value.toLowerCase() )}
      withAsterisk
      required
    >
      <Group mt='xs' className={classes.container}>
        {variants.map( ( variant, index ) => (
          <Radio key={index} 
            className={classes.radio}
            color='red.4'
            value={variant.name}
            error={error}
            label={
              <div className={classes.text}>{variant.name}
                <span className={classes.price}> ${variant.price} </span>
              </div>}
          />
        ) )}
      </Group>
    </Radio.Group>
  )
}
