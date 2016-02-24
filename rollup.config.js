import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'tmp/main.js',
  format: 'iife',
  moduleName: 'cu-patcher-ui',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  dest: 'publish/cu-patcher-ui.js'
};