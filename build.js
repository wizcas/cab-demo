// const esbuild = require("esbuild");
// const fs = require("fs-extra");
// const esbuildServe = require("esbuild-serve");
import esbuildServe from "esbuild-serve";
import fs from "fs-extra";

fs.rmdirSync("./dist", { recursive: true });
fs.mkdirSync("./dist");
fs.copySync("./public", "./dist", { recursive: true });

const dir = "./dist";
const buildOptions = {
  entryPoints: ["./src/index.tsx"],
  define: {
    "process.env.NODE_ENV": "'development'",
  },
  bundle: true,
  outdir: dir,
  sourcemap: true,
};

esbuildServe(buildOptions, { port: 9527, root: dir });
