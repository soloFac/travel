# Store React
El store para clientes que solicitan va a tener:
- Pedido [array]
  [
    infopedido: {
      nombre,
      telefono,
      envio,
      dirección - numero,
      comentarios,
      zona_envio,
      forma_pago,
      total?
    }
    pedidos: [
      {
      nombre_menu,
      variante,
      aderezos?,
      extras?,
      cantidad,
      total
    },
    {
      nombre_menu,
      variante,
      aderezos?,
      extras?,
      cantidad,
      total
    },
    ]
  ]
- LocalInfo...

### Text for whatsapp

https://api.whatsapp.com/send/?phone=5491124091027&text=Hola%2C+quiero+hacer+el+siguiente+pedido%3A%0A%0A%EF%BF+%2A1+x+American+Burger+%5BDoble%5D+%7C+%241.900%2A%0A_Comentario%3A_+sdfdsf%0A_-+Extras_%0A%2A%E2%80%A2+1+x+Bacon+%7C+%24150%2A%0A%2A%E2%80%A2+1+x+Cebolla+Crispy+%7C+%2470%2A%0A%0A%EF%BF%BD+%2A1+x+Crispy+Burger+%5BSimple%5D+%7C+%241.730%2A%0A_Comentario%3A_+ddddd%0A_-+Extras_%0A%2A%E2%80%A2+1+x+Bacon+%7C+%24150%2A%0A%2A%E2%80%A2+1+x+Huevo+%7C+%2480%2A%0A%2A%E2%80%A2+1+x+Salsa+cheddar+%28papas%29+%7C+%24350%2A%0A%0ACosto+de+Env%C3%ADo%3A+%2A%24500%2A%0AProductos%3A+%2A%244.430%2A%0AM%C3%A9todo+de+Pago+%5BTransferencia%5D%0ATotal%3A+%2A%244.930%2A%0A%0APara%3A+%2AAv.+Roca+1541+a+nombre+de+Franco+P%C3%A9rez+de+la+Rosa%2A%0A&type=phone_number&app_absent=0

https://api.whatsapp.com/send/?phone=543815794360&text=Buenas%20soy%20%24%7Bname%7D%2C%20me%20gustar%C3%ADa%20realizar%20una%20orden%20de%3A%20%0A%0AHola%2C%20quiero%20hacer%20el%20siguiente%20pedido%3A%0A%0A%F0%9F%A5%A1%20%2Ax1%20Doble%20-%20American%20Burger%2A%20%F0%9F%A5%A1%20%2A%241.900%2A%0A%20%20%20%20%20%20%20%20%20%20%20%20%0A%F0%9F%A5%93%20_Extras_%0A%20%20%20%20%20%20%20%2A%20Cebolla%20Crispy%20%2A%2470%2A%0A%F0%9F%92%B5%20Subtotal%3A%20%2A%242%2C310%2A%0A%0A%0A%F0%9F%A5%A1%20%2Ax1%20Simple%20-%20Crispy%20Burger%2A%20%20%F0%9F%A5%A1%20%2A%241.730%2A%0A%F0%9F%A5%97%20Aderezos%0A%20%20%20%20%20%20%20%20%2A%20Mayonesa%0A%20%20%20%20%20%20%20%2A%20Mostaza%0A%F0%9F%A5%93%20_Extras_%0A%20%20%20%20%20%20%20%2A%20Bacon%20%2A%24150%2A%0A%20%20%20%20%20%20%20%2A%20Huevo%20%2A%2480%2A%0A%20%20%20%20%20%20%20%2A%20Salsa%20cheddar%20%28papas%29%20%2A%24350%2A%0A%F0%9F%92%B5%20Subtotal%3A%20%2A%242%2C310%2A%0A%0A%2A%20Costo%20de%20Env%C3%ADo%3A%20%2A%24500%2A%0A%2A%20Pedido%3A%20%2A%244.430%2A%0A%2A%20M%C3%A9todo%20de%20Pago%20%5BTransferencia%5D%0A%0A%F0%9F%92%B0%20Total%3A%20%F0%9F%A1%92%20%2A%244.930%2A%20%F0%9F%92%B0%0A%0A%F0%9F%99%82%20Franco%20P%C3%A9rez%20de%20la%20Rosa%20%F0%9F%99%82%0A%F0%9F%9A%80%20%2AAv.%20Roca%201541%2A%20%F0%9F%9A%80%20&type=phone_number&app_absent=0

Buenas soy ${name}, me gustaría realizar una orden de: 

Hola, quiero hacer el siguiente pedido:

🥡 *x1 Doble - American Burger* 🥡 *$1.900*
            
🥓 _Extras_
       * Cebolla Crispy *$70*
💵 Subtotal: *$2,310*


🥡 *x1 Simple - Crispy Burger*  🥡 *$1.730*
🥗 Aderezos
       * Mayonesa
       * Mostaza
🥓 _Extras_
       * Bacon *$150*
       * Huevo *$80*
       * Salsa cheddar (papas) *$350*
💵 Subtotal: *$2,310*

* Costo de Envío: *$500*
* Pedido: *$4.430*
* Método de Pago [Transferencia]

💰 Total: 🡒 *$4.930* 💰

🙂 Franco Pérez de la Rosa 🙂
🚀 *Av. Roca 1541* 🚀 


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
