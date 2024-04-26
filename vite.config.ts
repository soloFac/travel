import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig( {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve( __dirname, './src/' ),
      '@public': `${ path.resolve( __dirname, './public/' ) }`,
      '@assets': path.resolve( __dirname, './src/assets' ),
      '@adapters': path.resolve( __dirname, './src/adapters' ),
      '@components': `${ path.resolve( __dirname, './src/components/' ) }`,
      '@context': path.resolve( __dirname, './src/context' ),
      '@helper': path.resolve( __dirname, './src/helper' ),
      '@hooks': path.resolve( __dirname, './src/hooks' ),
      '@models': path.resolve( __dirname, './src/models' ),
      '@pages': path.resolve( __dirname, './src/pages' ),
      '@router': path.resolve( __dirname, './src/router' ),
      '@services': path.resolve( __dirname, './src/services' ),
      '@styles': path.resolve( __dirname, './src/styles' ),
      '@types': path.resolve( __dirname, './src/types' ),
      '@utils': path.resolve( __dirname, './src/utils' ),
    },
  },
} )
