import { Title } from '@mantine/core';

import { LocalInfoEntity, MenuEntity } from '@/models';
import { MenuCard } from './MenuCard';
import { GetDressingsByCategory, GetExtrasByCategory } from '@/utils';

import classes from '../styles/MenusCategoryCards.module.css';

interface MenuCategoryCardsProps {
  category: string;
  local: LocalInfoEntity;
}

export const MenusCategoryCards: React.FC<MenuCategoryCardsProps> = ( { category, local } ) => {
  return (
    <div className={classes.container}>
      <Title className={classes.title} id={category}>{category}</Title>
      <div className={classes.categories_container}>
        {local.menus.map( ( menu: MenuEntity, i: number ) => {
          const { categories } = local
          if ( menu.category === category ) {
            return (
              <MenuCard key={i} 
                menu={menu}
                dressings={GetDressingsByCategory( categories, category )}
                extras={GetExtrasByCategory( categories, category )}
              />
            )
          }
        } )}
      </div>
      <div className={classes.divider}/>
    </div>
  )
}
