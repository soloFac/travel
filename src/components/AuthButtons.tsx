import { Button } from '@mantine/core'
import { Link } from 'react-router-dom';

export const AuthButtons = () => {
  return (
    <div>
      <Link to='auth/login'>
        <Button variant='default'>Log in</Button>
      </Link>
      <Link to='auth/signup'>
        <Button>Sign up</Button>
      </Link>
    </div>
  )
}
