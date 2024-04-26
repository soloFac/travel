import { Badge } from '@mantine/core';

import { FoodCategoryEntity } from '@/models';
import classes from '../../styles/Badges.module.css'

interface BadgesProps {
  categories: FoodCategoryEntity[];
}

export const Badges: React.FC<BadgesProps> = ( { categories } ) => {
  return (
    <div className={classes.container}>
      {categories.map( ( category, i ) => (
        <a key={i} href={`#${ category.name }`}><Badge size='lg' className={classes.badge}>{category.name}</Badge></a>
      ) )}
    </div>
  )
}
