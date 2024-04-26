import { ModalMantine } from '@/components'

interface ModalPagesProps {
  modalHandlers: any
  firstComponent: React.ReactNode
  secondComponent: React.ReactNode
}

export const ModalPages: React.FC<ModalPagesProps> = ( { modalHandlers, firstComponent, secondComponent } ) => {
  const [firstModal, secondModal] = modalHandlers
  const { openedFirstModal, closeFirstModal } = firstModal
  // const { openedSecondModal, closeSecondModal } = secondModal

  return (
    <div>
      <ModalMantine opened={openedFirstModal} close={closeFirstModal}>
        {firstComponent}
      </ModalMantine>
      <ModalMantine opened={secondModal.openedSecondModal} close={secondModal.closeSecondModal}>
        {secondComponent}
      </ModalMantine>
    </div>
  )
}
