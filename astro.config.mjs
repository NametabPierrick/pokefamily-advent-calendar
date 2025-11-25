import { defineConfig } from 'astro/config';

export default defineConfig({
  srcDir: 'src',
  output: 'static',
  build: {
    // Use directory format so routes like /diego resolve to /diego/index.html on static hosts (e.g. Vercel).
    format: 'directory'
  }
});
