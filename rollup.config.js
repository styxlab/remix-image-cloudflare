import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import filesize from 'rollup-plugin-filesize'

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'build/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      typescript({
        tsconfigOverride: {
          exclude: ['node_modules', 'build', 'tests'],
        },
      }),
      resolve(),
      commonjs(),
      filesize(),
    ],
  },
  {
    input: 'src/component/index.tsx',
    output: [
      {
        file: 'build/component.jsx',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      typescript({
        tsconfigOverride: {
          exclude: ['node_modules', 'build', 'tests'],
        },
      }),
      resolve(),
      commonjs(),
      terser(),
      filesize(),
    ],
  },
  {
    input: 'src/server/index.ts',
    output: [
      {
        file: 'build/server.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      typescript({
        tsconfigOverride: {
          exclude: ['node_modules', 'build', 'tests'],
        },
      }),
      resolve(),
      commonjs(),
      replace({
        preventAssignment: true,
        include: ['node_modules/jpeg-js/**/*.js'],
        values: {
          'Buffer.from': 'new Uint8Array',
        },
      }),
      terser(),
      filesize(),
    ],
  },
]
