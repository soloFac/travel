export const ArrowButton = ( { color = 'black', size = 16 } ) => {
  return (
    <svg width='6' height={size} viewBox='0 0 4 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1.0625 1.125L2.9375 3L1.0625 4.875' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
    </svg>
  )
}
