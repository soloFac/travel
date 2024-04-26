import { VariantEntity } from '@/models';

export const createAddaptedVariants = ( variants: VariantEntity[] ) => {
  return variants.map( ( variant, index ) => {
    const { name, price } = variant;
    return {
      key: index,
      text: `${ name } $${ price }`,
      color: 'white',
      width: '1px'
    };
  } );
}