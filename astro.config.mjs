// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// import node from '@astrojs/node';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), db()],

  output: 'server',
  /*
  adapter: node({
    mode: 'standalone',
  }),
  */
  image: {
    service: {
      entrypoint: 'astro/assets/service/noop'
    }
  },
  adapter: cloudflare({
    imageService: 'cloudflare'
  }),
  vite: {
    ssr: {
      external: ['cssesc'],
    },
  },
});
