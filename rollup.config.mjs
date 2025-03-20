import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
export default [
  {
    input: "./lib/index.ts",
    output: {
      file: "./build/index.umd.js",
      format: "umd",
      name: "SmartAppRedirect",
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
      }),
      terser(),
    ],
  },
  {
    input: "./lib/index.ts",
    output: [{ file: "./build/index.d.ts", format: "es" }],
    plugins: [dts({ tsconfig: "./tsconfig.json" })],
  },
];
