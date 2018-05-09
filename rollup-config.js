import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/app.ts',
  output:{
    file:'dist/build.js',
    format:'cjs'
  },
  sourceMap: 'inline',
  plugins: [
    typescript(),
    resolve({ jsnext: true }),
    uglify()
  ]
}