import { Link } from 'react-router-dom'
import { HeaderMegaMenu } from '../components/HeaderMenu'

export const HomePage = () => {
  return (
    <>
      <HeaderMegaMenu />
      <header>
        <ul>
          <li><Link to='/inicio/'>Home</Link></li>
          <li><Link to='/auth/login'>Login</Link></li>
          <li><Link to='/auth/register'>Register</Link></li>
        </ul>
      </header>
    </>
  )
}
