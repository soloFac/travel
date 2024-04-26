import { Image } from '@mantine/core'
import classes from '../../styles/ImageMenu.module.css'
import React from 'react'

interface ImageMenuProps {
  path: string,
  alt?: string,
  extraClasses?: string
}

export const ImageMenu: React.FC<ImageMenuProps> = ( { path, alt = '', extraClasses='' } ) => {
  return (
    <Image src={path} alt={alt} className={`${ classes.image } ${ extraClasses }`}/>
  )
}
