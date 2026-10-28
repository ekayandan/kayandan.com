import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kayandan.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // The whole stylesheet is small; inlining it avoids a render-blocking request.
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
});
