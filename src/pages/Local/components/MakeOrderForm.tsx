// import { ModalMantine } from '@/components'
// import { OrderCart } from './OrderCart'
// import { OrderPersonalForm } from './OrderPersonalForm'
// import { ModalPages } from '@/hooks'

// interface MakeOrderFormProps {
//   firstModal: any
//   secondModal: any
// }

// export const MakeOrderForm: React.FC<MakeOrderFormProps> = ( { firstModal, secondModal } ) => {
//   const { openedFirstModal, closeFirstModal } = firstModal
//   const { openedSecondModal, closeSecondModal } = secondModal
//   return (
//     <div>
//       <ModalPages modalHandlers={[firstModal, secondModal]} firstComponent={<OrderCart />} secondComponent={<OrderPersonalForm />} />

//       <ModalMantine opened={openedFirstModal} close={closeFirstModal}>
//         <OrderCart />
//       </ModalMantine>

//       <ModalMantine opened={openedSecondModal} close={closeSecondModal}>
//         <OrderPersonalForm />
//       </ModalMantine>
//     </div>
//   )
// }
