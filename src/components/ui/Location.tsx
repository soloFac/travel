import React from 'react'

interface LocationProps {
  size: number
}

export const Location: React.FC<LocationProps> = ( { size } ) => {
  return (
    <svg width={size} height={size} viewBox='0 0 9 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4.04495 0.37941C1.81469 0.37941 4.11795e-05 2.08733 4.11795e-05 4.18404C-0.0146216 7.25107 3.89124 9.79415 4.04495 9.89694C4.04495 9.89694 8.10453 7.25107 8.08986 4.18642C8.08986 2.08733 6.27521 0.37941 4.04495 0.37941ZM4.04495 6.08993C2.92754 6.08993 2.0225 5.23811 2.0225 4.18642C2.0225 3.13474 2.92754 2.28292 4.04495 2.28292C5.16236 2.28292 6.06741 3.13474 6.06741 4.18642C6.06741 5.23811 5.16236 6.08993 4.04495 6.08993Z' fill='black'/>
    </svg>

  )
}
