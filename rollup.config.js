import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const pkg = require('./package.json')

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'umd', name: 'dispatcher', exports: 'named' },
    { file: pkg.module, format: 'es', exports: 'named' },
  ],
  plugins: [
    nodeResolve({
      jsnext: true,
    }),
    babel(),
    commonjs(),
  ],
}
