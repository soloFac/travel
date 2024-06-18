interface ButtonImageProps {
  link: string;
  children: React.ReactNode;
}

export const ButtonImage: React.FC<ButtonImageProps> = ( { link, children } ) => {
  return (
    <a href={link}>
      {children}
    </a>
  )
}
