import React from 'react'

import classes from '../styles/SectionComponent.module.css'
import { Title } from '@mantine/core'

interface SectionComponentProps {
  title: string
  children: React.ReactNode
}

export const SectionComponent: React.FC<SectionComponentProps> = ( { title, children } ) => {  
  return (
    <div className={classes.container}>
      {/* <Divider className={classes.divider}/> */}
      <Title order={1} className={classes.title}>{title}</Title>
      {children}
    </div>
  )
}
