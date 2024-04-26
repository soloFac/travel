import { Radio } from '@mantine/core';

export const RadioBtn = ( { label, value, checked = false, defaultChecked = false }: any ) => {
  return (
    <Radio
      iconColor='dark.8'
      color='lime.4'
      label={label}
      name={value}
      value={value}
      checked={checked}
      defaultChecked={defaultChecked}
    />
  );
}