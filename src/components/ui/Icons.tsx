export const HotelIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' id='hotel'><path d='M39 40h-3V7a1 1 0 0 0-1-1H13a1 1 0 0 0-1 1v33H9a1 1 0 0 0 0 2h30a1 1 0 0 0 0-2Zm-18 0v-6h6v6Zm8 0v-6h1a1 1 0 0 0 0-2H18a1 1 0 0 0 0 2h1v6h-5V8h20v32Z'></path><path d='M19 11h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm6 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm6 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm-12 5h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm6 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm6 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm-12 5h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm6 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm6 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm-12 5h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm6 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm6 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2z'></path></svg>
  )
}

export const TicketIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' id='ticket'><path d='m.586 41.414 5.344 5.343a2 2 0 0 0 2.828 0A5.959 5.959 0 0 1 13 45c3.309 0 6 2.691 6 6a5.964 5.964 0 0 1-1.758 4.243 2 2 0 0 0 0 2.828l5.344 5.343c.391.391.902.586 1.414.586s1.024-.195 1.414-.586l38-38a1.996 1.996 0 0 0 0-2.828l-5.344-5.343a2 2 0 0 0-2.828 0A5.959 5.959 0 0 1 51 19c-3.309 0-6-2.691-6-6 0-1.603.625-3.109 1.758-4.243a2 2 0 0 0 0-2.828L41.414.586a2 2 0 0 0-2.828 0l-38 38a1.996 1.996 0 0 0 0 2.828zM26 18.828l1.586 1.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586a2 2 0 0 0 0-2.828L28.828 16 40 4.828l2.656 2.655A9.935 9.935 0 0 0 41 13c0 5.514 4.486 10 10 10a9.928 9.928 0 0 0 5.516-1.655L59.171 24 48 35.172l-1.586-1.586a2 2 0 1 0-2.828 2.828L45.172 38 24 59.172l-2.656-2.655A9.935 9.935 0 0 0 23 51c0-5.514-4.486-10-10-10a9.928 9.928 0 0 0-5.516 1.655L4.829 40 26 18.828z'></path><path d='M33.586 26.414c.39.391.902.586 1.414.586s1.024-.195 1.414-.586a2 2 0 0 0 0-2.828l-2-2a2 2 0 1 0-2.828 2.828l2 2zM37.586 30.414l2 2c.39.391.902.586 1.414.586s1.024-.195 1.414-.586a2 2 0 0 0 0-2.828l-2-2a2 2 0 1 0-2.828 2.828z'></path></svg>
  )
}

export const ArrowLeftBtn = ( { classes }: any ) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-6 ${ classes }`}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
    </svg>
  )
}

export const ArrowRightBtn = ( { classes }: any ) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-6 ${ classes }`}>
      <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
    </svg>
  )
}

export const ArrowLongRightBtn = ( { classes = '' }: any ) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-6 ${ classes }`}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
    </svg>
  )
}

export const ArrowLongLeftBtn = ( { classes = '' }: any ) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-6 ${ classes }`}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18' />
    </svg>
  )
}

