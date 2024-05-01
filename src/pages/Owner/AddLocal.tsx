import { Button, TextInput } from '@mantine/core'
import { useLocalActions } from '../Local/hooks'
import { useForm } from '@mantine/form'
import { LocalDto } from '@/models'

import classes from './styles/AddLocal.module.css'

export const AddLocal = () => {
  const { addLocal } = useLocalActions()

  const form = useForm( {
    initialValues: { local: '' }
  } )

  const handleAddLocal = () => {
    if ( form.validate().hasErrors ) return

    const local = JSON.parse( form.getValues().local ) as LocalDto

    addLocal( local )
  }

  return (
    <>
      <TextInput
        className={classes.text}
        label='LocalJSON' placeholder='paste your local JSON here' 
        key={ 'local' }
        {...form.getInputProps( 'local' )}
        required 
        mb={20}
      />

      <Button onClick={handleAddLocal} color='blue'>
        Add Local
      </Button>
    </>
  )
}
