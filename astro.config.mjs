// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://psicologa-mariela-acotto.vercel.app',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Para un sitio de una sola página, la fecha del último build es la
      // fecha de modificación más honesta. Google usa este <lastmod> solo
      // como pista y siempre lo combina con sus propios datos de rastreo,
      // así que un valor de "hoy del build" no engaña a nadie.
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
