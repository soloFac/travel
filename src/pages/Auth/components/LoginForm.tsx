import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from '../styles/AuthenticationTitle.module.css';
import { useForm } from '@mantine/form';
import { UserAuthDto } from '@/models';
import { AuthService } from '@/services';

export const LoginForm = () =>  {
  const form = useForm( {
    clearInputErrorOnChange: false,
    initialValues: { email: '', password: '' },
    validate: {
      email: ( value: string ) => ( value.trim().length < 3 || value.trim().length > 20 ? 'Min lenght 3 and max lenght 20' : null ),
      password: ( value: string ) => ( value.trim().length < 3 || value.trim().length > 20 ? 'Password must be min lenght 3 and max lenght 20' : null ),
    },
  } );

  const handleLogin = async () => {
    if ( form.validate().hasErrors ) return;

    
    const { email, password } = form.getValues();
    console.log( email, password );
    const [err, userDto] = UserAuthDto.create( { email, password } )
    if ( !userDto ) { return console.error( err ) }
    
    const result = await AuthService.login( userDto )
    if ( !result ) { return console.error( 'Error al iniciar sesion' ) }

    localStorage.setItem( 'x-token', result.jwt )
  }

  return (
    <Container size={420} my={40}>
      <Title ta='center' className={classes.title}>
        Welcome back!
      </Title>
      <Text c='dimmed' size='sm' ta='center' mt={5}>
        Do not have an account yet?{' '}
        <Anchor size='sm' component='button'>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>

        <TextInput 
          label='Email' placeholder='you@mantine.dev' 
          key={ 'email' }
          {...form.getInputProps( 'email' )}
          required 
        />
        <PasswordInput 
          label='Clave' placeholder='Tu clave' 
          key={ 'password' }
          {...form.getInputProps( 'password' )}
          required mt='md' 
        />

        <Group justify='space-between' mt='lg'>
          <Checkbox label='Remember me' />
          <Anchor component='button' size='sm'>
            Forgot password?
          </Anchor>
        </Group>
        <Button onClick={() => handleLogin()} fullWidth mt='xl'>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}