import { useState } from 'react'

interface TogglableProps {
  children: React.ReactNode
  buttonLabel: string
  defaultVisible?: boolean
}

export const Togglable: React.FC<TogglableProps> = ( { children, buttonLabel, defaultVisible = true } ) => {
  const [visible, setVisible] = useState( defaultVisible )

  const hiddenWhenVisible = {  display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <button onClick={() => setVisible( true )}>{ buttonLabel }</button>
      </div>
      <div style={showWhenVisible}>
        { children }
        <button onClick={() => setVisible( false )}>Cancel</button>
      </div>
    </div>
  )
}
