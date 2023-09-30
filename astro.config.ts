import { defineConfig } from 'astro/config'
import million from 'million/compiler'
import UnoCSS from 'unocss/astro'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://lalagis.github.io',
  base: '/flow_vis',

  vite: {
    plugins: [
      million.vite({
        mode: 'react',
        server: true,
        auto: true,
      }),
    ],

    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
    },
  },
  integrations: [react(), UnoCSS({ injectReset: true })],
})
