import { Extra, MenuEntity } from '@/models';
import { OrderForm } from '../components';

interface ModalOrderFoodProps {
  menu: MenuEntity
  dressings?: string[] | null
  extras?: Extra[] | null
}

export const ModalOrderFood: React.FC<ModalOrderFoodProps> = ( { menu, dressings, extras } ) => {
  return (
    <>
      <OrderForm 
        menu={menu}
        dressings={dressings}
        extras={extras}
      />
    </>
  )
}
