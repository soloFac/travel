import { Route, Routes } from 'react-router-dom'

import { AuthRoutes } from './'
import { CategoriesPage, HomePage, LocalPage, 
  MenusPage, SchedulesPage, ZonesPage } from '@/pages'
import { LoginStatus } from '@/types'
import { UpdateLocal } from '@/pages/Owner/UpdateLocal'
import { AddLocal } from '@/pages/Owner/AddLocal'

export const AppRouter = () => {

  const status: LoginStatus = 'FAIL' as LoginStatus

  // if ( status === 'checking' ) {
  //   return <CheckingAuth />
  // }

  return (
    <>
      <Routes>
        <Route path='/auth/*' element={ <AuthRoutes /> } />
        <Route path='/updateLocal' element={ <UpdateLocal /> } />
        <Route path='/addLocal' element={ <AddLocal /> } />

        {
          ( status === LoginStatus.SUCCESS )
            ? 
            <>
              <Route path='/' element={ <HomePage /> } />
              <Route path='/inicio' element={ <HomePage /> } />
              <Route path='/categories' element={ <CategoriesPage /> } />
              <Route path='/local' element={ <LocalPage /> } />
              <Route path='/menus' element={ <MenusPage /> } />
              <Route path='/schedules' element={ <SchedulesPage /> } />
              <Route path='/zones' element={ <ZonesPage /> } /> 
            </>
            :
            <>
              <Route path='/' element={ <HomePage /> } />
              <Route path='/inicio' element={ <HomePage /> } />
              <Route path='/:localName' element={ <LocalPage /> } />
              <Route path='/:localName/:menuName' element={ <MenusPage /> } />
            </>
        }
      </Routes>
    </>
  )
}
