import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)
let plugins = [
  resolve(),
  babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
  commonjs(),
  terser({
    sourcemap: true
  })
]

export default [
  {
    external,
    input: 'src/index.js',
    plugins,
    output: [
      {
        file: pkg.main,
        name: 'auth',
        format: 'umd'
      }
    ]
  },
  {
    external,
    input: 'src/index.js',
    plugins,
    output: [
      {
        file: pkg.module,
        format: 'esm'
      }
    ]
  }
]
