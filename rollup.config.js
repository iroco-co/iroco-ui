import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import autoPreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: {
    file: pkg.main,
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    typescript(),
    svelte({
      dev: !production,
      // You can restrict which files are compiled
      // using `include` and `exclude`

      // Optionally, preprocess components with svelte.preprocess:
      // https://svelte.dev/docs#svelte_preprocess
      preprocess: autoPreprocess(),

      // Emit CSS as "files" for other plugins to process. default is true
      // emitCss: false,

      // Warnings are normally passed straight to Rollup. You can
      // optionally handle them here, for example to squelch
      // warnings with a particular code
      // onwarn: (warning, handler) => {
      //   // e.g. don't warn on <marquee> elements, cos they're cool
      //   if (warning.code === 'a11y-distracting-elements') return;
      //
      //   // let Rollup handle all other warnings normally
      //   handler(warning);
      // },

      // You can pass any of the Svelte compiler options
      // compilerOptions: {
      //   customElement: false,
      // },
    }),
    // see NOTICE below
    resolve({ browser: true }),
    production && terser(),
  ],
};
