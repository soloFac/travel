import { showNotification } from '@mantine/notifications'

export const ShowNotification = () => {
  return (
    showNotification( {
      title: 'Default notification',
      message: 'Hey there, your code is awesome! 🤥',
    } )
  )
}
