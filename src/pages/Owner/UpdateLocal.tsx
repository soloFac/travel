import { LocalService } from '@/services'
import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

export const UpdateLocal = () => {
  const form = useForm( {
    initialValues: { local: '', token: '' },
    validate: {
      token: ( value: string ) => ( value.trim().length !== 9 ? 'Token must be 9 digits' : null ),
    },
  } )

  const handleUpdateLocal = async () => {
    if ( form.validate().hasErrors ) return

    const { local, token } = form.getValues()

    const data = await LocalService.UpdateLocal( JSON.parse( local ), token )
    console.log( '-----------DATA-----------:', data )
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
        label='LocalJSON' placeholder='paste your local JSON here' 
        key={ 'local' }
        {...form.getInputProps( 'local' )}
        required 
        mb={20}
      />

      <Button onClick={handleUpdateLocal} color='blue'>
        Update Local
      </Button>
    </>
  )
}
