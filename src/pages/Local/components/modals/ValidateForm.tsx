// import { DeliveryType, PaymentType } from '@/models'
// import { isMemberOfEnum } from '@/utils'

// export const ValidateForm = () => {
//   const orderValidation = ( values: any ) => {
//     return {
//       name: ( values.name.trim().length < 3 || values.name.trim().length > 40 ) ? 'Nombre debería tener al menos 3 caracteres y ser menor a 40 caracteres' : null,
//       phone: /^\d{10}$/.test( values.phone ) ? null : 'Número de telefono invalido, debería tener 10 dígitos ejemplo: 3815668899',
//       deliveryType: ( !isMemberOfEnum( values.deliveryType, DeliveryType ) ? 'Tipo de entrega invalido' : null ),
//       comments: values.comments.trim().length > 100 ? 'Comentarios deberían ser menores a 100 caracteres' : null,
//       paymentType: ( !isMemberOfEnum( values.paymentType, PaymentType ) ? 'Tipo de pago invalido' : null ),
//     }
//   }

//   const zoneValidation = ( values: any ) => {
//     return {
//       address: ( values.address === undefined || values.address.trim().length < 3 || values.address.trim().length > 50 ) ? 'Dirección debería tener al menos 5 caracteres y ser menor a 50' : null,
//       // addressNumber debería ser menor a 5 caracteres y solo números
//       addressNumber: /^\d{1,6}$/.test( values?.addressNumber ) ? null : 'Número de dirección puede contener solo números y debería ser menor a 6 caracteres',
//       // Cambiar, hacer que compruebe que pertenece al array de zonas
//       zone: ( !values.zone ) ? 'Por favor selecciona una zona' : null,
//     }
//   }

//   return (
//     <p>Hola</p>
//   )
// }
