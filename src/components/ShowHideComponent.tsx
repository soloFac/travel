interface ShowHideComponentProps {
  showComponent?: boolean
  children: React.ReactNode
}

export const ShowHideComponent: React.FC<ShowHideComponentProps> = ( { showComponent = false, children } ) => {
  return (
    <>
      {( showComponent )? children : null}
    </>
  )
}
