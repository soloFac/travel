import { Button, TextInput } from '@mantine/core'
import { useLocalActions } from '../Local/hooks'
import { useForm } from '@mantine/form'
import { LocalDto } from '@/models'

import classes from './styles/AddLocal.module.css'

export const AddLocal = () => {
  const { addLocal } = useLocalActions()

  const form = useForm( {
    initialValues: { local: '', token: '' },
    validate: {
      token: ( value: string ) => ( value.trim().length !== 9 ? 'Token must be 9 digits' : null ),
    },
  } )

  const handleAddLocal = () => {
    if ( form.validate().hasErrors ) return

    const { local, token } = form.getValues()

    if ( token !== 'MI-TOK3N_' ) {
      alert( 'Invalid token' )
      return
    }

    addLocal( JSON.parse( local ) as LocalDto )
  }

  return (
    <>
      <TextInput
        label='Token'
        placeholder='your token'
        key={ 'token' }
        {...form.getInputProps( 'token' )}
        required
      />
      
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
