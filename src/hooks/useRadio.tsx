import { useState, useEffect } from 'react';

export const useRadio = ( name: string, defaultValue: string ): [string, any] => {
  const [value, setValue] = useState( defaultValue );

  useEffect( () => {
    const storedValue = sessionStorage.getItem( name );
    setValue( storedValue || defaultValue );
  }, [name, defaultValue] );

  const handleChange = ( event: any ) => {
    const newValue = event.target.value;
    setValue( newValue );
    sessionStorage.setItem( name, newValue );
  };

  const inputProps = {
    name,
    type: 'radio',
    onChange: handleChange,
  };

  return [value, inputProps];
};