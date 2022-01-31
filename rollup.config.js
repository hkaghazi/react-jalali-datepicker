import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import { terser } from "rollup-plugin-terser"
import autoprefixer from 'autoprefixer';
// import scss from "rollup-plugin-scss"

const packageJson = require("./package.json")

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      // scss({
      //   outputStype: "compressed",
      // }),
      
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/__tests__", "**/*.test.ts", "**/*.stories.tsx"],
      }),
      commonjs(),
      resolve(),
      postcss({
        minimize: true,
        modules: true,
        // output: './index.css',
        plugins: [autoprefixer()],
        extensions: [".css", ".scss"],
        extract: true,
        inject: true,
      }),
      terser(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    // NEW
    external: [/\.scss$/],
  },
]
