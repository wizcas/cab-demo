import esbuild from "esbuild";
import esbuildServe from "esbuild-serve";
import babel from "esbuild-plugin-babel";
import fs from "fs-extra";

const isProd = process.env.NODE_ENV === "production";
console.log("is production?", isProd);

fs.rmdirSync("./dist", { recursive: true });
fs.mkdirSync("./dist");
fs.copySync("./public", "./dist", { recursive: true });
fs.copySync("./vendor", "./dist/vendor", { recursive: true });

const dir = "./dist";
const buildOptions = {
  entryPoints: ["./src/index.tsx"],
  define: {
    "process.env.NODE_ENV": "'development'",
  },
  bundle: true,
  platform: "browser",
  outdir: dir,
  sourcemap: !isProd,
  // external: ["vendor/*"],
  plugins: [
    babel({
      config: {
        sourceMaps: !isProd,
        presets: [
          "@babel/preset-typescript",
          [
            "@babel/preset-env",
            {
              loose: true,
              modules: "umd",
            },
          ],
          "@babel/preset-react",
        ],
        plugins: [
          [
            "@babel/plugin-transform-runtime",
            {
              regenerator: true,
            },
          ],
        ],
      },
    }),
  ],
  minify: isProd,
};

if (isProd) {
  esbuild.build(buildOptions);
} else {
  esbuildServe(buildOptions, { port: 9527, root: dir });
}
