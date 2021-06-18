import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import preprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'umd', name },
    { file: pkg.main.replace('.js', '.min.js'), format: 'iife', name, plugins: [terser()] },
  ],
  plugins: [
    scss(),
    svelte({
      preprocess: preprocess(),
    }),
    typescript({ sourceMap: !production }),
    commonjs(),
    resolve(),
  ],
};
