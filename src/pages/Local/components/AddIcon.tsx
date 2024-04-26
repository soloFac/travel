import classes from '../styles/MenuCard.module.css'

export const AddIcon = ( { width = 20 } ) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} className={`w-6 h-6 ${ classes.svg }`} width={width}
      height={width}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
    </svg>


  )
}
