import { Route, Routes } from 'react-router-dom'
import { CategoriesPage, HomePage, LocalPage, MenusPage, SchedulesPage, ZonesPage } from '@/pages'

export const HomeRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/categories' element={ <CategoriesPage /> } />
        <Route path='/local' element={ <LocalPage /> } />
        <Route path='/menus' element={ <MenusPage /> } />
        <Route path='/schedules' element={ <SchedulesPage /> } />
        <Route path='/zones' element={ <ZonesPage /> } />
        <Route path='/inicio' element={ <HomePage /> } />
        <Route path='/*' element={ <HomePage /> } />
      </Routes>
    </>
  )
}
