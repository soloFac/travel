import { Extra } from '@/models'

import classes from '../styles/OptionsMenuCard.module.css'

interface OptionsMenuCardProps {
  text: string
  extraClasses: string
  options: Extra[] | string[] | null | undefined
}

export const OptionsMenuCard: React.FC<OptionsMenuCardProps> = ( { text, options, extraClasses } ) => {
  const showSeparator = ( options && options.length > 1 ) && <span className={classes.divider}>-</span>

  return ( 
    <p className={`${ classes.options } ${ extraClasses }`}>{text}: {options?.map( ( option, index ) => {
      if ( typeof option === 'string' ) {
        return <span key={index}>{option}{showSeparator}</span>
      }
      return <span key={index}>{option.name}{showSeparator}</span>
    } )} 
    </p> 
  )  

}
