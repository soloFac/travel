import { Extra, OrderEntity, OrderInfoDto } from '@/models';
import { CalculateTotalOrders } from './CalculateTotalOrders';
import { Capitalize } from './Capitalize';

// Buenas soy ${name}, me gustaría realizar una orden de: 

// Hola, quiero hacer el siguiente pedido:

// 🥡 *x1 Doble - American Burger* 🥡 *$1.900*

// 🥓 _Extras_
//        * Cebolla Crispy *$70*
// 💵 Subtotal: *$2,310*


// 🥡 *x1 Simple - Crispy Burger*  🥡 *$1.730*
// 🥗 Aderezos
//        * Mayonesa
//        * Mostaza
// 🥓 _Extras_
//        * Bacon *$150*
//        * Huevo *$80*
//        * Salsa cheddar (papas) *$350*
// 💵 Subtotal: *$2,310*

// * Costo de Envío: *$500*
// * Pedido: *$4.430*
// * Método de Pago [Transferencia]

// - Comments: ${comments}

// 💰 Total: 🡒 *$4.930* 💰

// 🙂 Franco Pérez de la Rosa 🙂
// 🚀 *Av. Roca 1541* 🚀 
// -  381 5794360  -

export const getWhatsappMessage = ( orders: OrderEntity[], orderInfo: OrderInfoDto ) => {
  let dressingMsg = ''
  let extraMsg = ''

  if ( orders.length === 0 ) return 'No hay pedidos'

  console.log( 'orders: ', orders )

  let orderMsg = ''
  orders.map( ( order: OrderEntity ) => {
    dressingMsg = ''
    extraMsg = ''
    if ( order.dressing !== undefined ) {
      if ( order.dressing.length > 0 ) {
        dressingMsg +=  '🥗 Aderezos\n' 
        order.dressing.map( ( dressing: string ) => {
          dressingMsg += `    * ${ dressing }\n`
        } )
      }
    }
    if ( order.extras !== undefined ) {
      if ( order.extras.length > 0 ) {
        extraMsg += '🥓 _Extras_\n'
        order.extras.map( ( extra: Extra ) => {
          extraMsg += `    * ${ extra.name }, ${ extra.price }\n` 
        } )
      }
    }
    orderMsg += `
      🥡 *x${ order.amount } ${ Capitalize( order.menu ) } - ${ Capitalize( order.variant.name ) }* 🥡 *$${ order.amount * order.variant.price }* \n ${ dressingMsg } ${ extraMsg }
      💵 Subtotal: *$${ order.total }*
    `
  } )

  // orderInfo.deliveryType

  return `
    Hola, quiero hacer el siguiente pedido:
    ${ orderMsg }  
    ${ ( orderInfo.zone !== undefined ) ? `Costo de Envio: *$${ orderInfo.zone.price }*` : '' }
    Pedido: *$${ CalculateTotalOrders( orders ) }*
    Método de Pago: [ *${ orderInfo.paymentType }* ]
    ${ ( orderInfo.comments !== '' && orderInfo.comments.length > 0 ) ? `Comments: ${ orderInfo.comments }` : '' }

    Total: 💰 *$${ CalculateTotalOrders( orders ) + ( ( orderInfo.zone !== undefined ) ? orderInfo.zone.price : 0 ) }* 💰
    
    🙂 ${ orderInfo.name } 🙂
     ${ ( orderInfo.address !== undefined ) ? `🚀 ${ orderInfo.address } 🚀` : '' } 
    -  ${ orderInfo.phone }  -

  `
}