import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import { resolve } from 'path'
import { dependencies, peerDependencies } from './package.json'

const input = resolve(__dirname, './src/index.ts')
const umdName = 'react-erm-editor'

export default [
  {
    input,
    output: [
      {
        dir: resolve(__dirname, './dist'),
        format: 'esm',
        sourcemap: true
      },
      {
        file: resolve(__dirname, `./dist/umd/${umdName}.js`),
        format: 'umd',
        name: umdName,
        sourcemap: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    ],
    plugins: [
      nodeResolve(),
      typescript(),
      postcss({
        extract: false,
        minimize: false,
        modules: false,
        sourceMap: true,
        use: {
          less: { javascriptEnabled: true }
        }
      })
    ],
    external: [
      ...Object.keys(peerDependencies),
      ...Object.keys(dependencies)
    ]
  },
  {
    input,
    output: {
      file: resolve(__dirname, `./dist/umd/${umdName}.min.js`),
      format: 'umd',
      name: umdName,
      sourcemap: false,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
    plugins: [
      nodeResolve(),
      typescript({
        declaration: false,
        declarationMap: false,
        sourceMap: false,
        removeComments: true
      }),
      terser(),
      postcss({
        extract: true,
        minimize: true,
        modules: false,
        sourceMap: false,
        use: {
          less: { javascriptEnabled: true }
        }
      })
    ],

    external: [
      ...Object.keys(peerDependencies),
      ...Object.keys(dependencies)
    ]
  }
]
