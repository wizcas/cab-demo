import esbuild from "esbuild";
import esbuildServe from "esbuild-serve";
import fs from "fs-extra";

const isProd = process.env.NODE_ENV === "production";
console.log("is production?", isProd);

fs.rmdirSync("./dist", { recursive: true });
fs.mkdirSync("./dist");
fs.copySync("./public", "./dist", { recursive: true });

const dir = "./dist";
const buildOptions = {
  entryPoints: ["./src/index.tsx"],
  external: ["./vendor/*"],
  define: {
    "process.env.NODE_ENV": "'development'",
  },
  bundle: true,
  platform: "browser",
  outdir: dir,
  sourcemap: true,
  minify: isProd,
};

if (isProd) {
  esbuild.build(buildOptions);
} else {
  esbuildServe(buildOptions, { port: 9527, root: dir });
}
