import React from 'react'

import classes from '../../styles/ShadowText.module.css'

interface ShadowTextProps {
  text: string
  shadowColor?: string
}

export const ShadowText: React.FC<ShadowTextProps> = ( { text = 'hola' } ) => {
  return (
    <div className={classes.container}>
      <p className={classes.back_text}>{text}</p>
      <p className={classes.front_text}>{text}</p>
    </div>
  )
}
