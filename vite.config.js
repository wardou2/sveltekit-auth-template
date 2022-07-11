import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],

  resolve: {
    alias: {
      $components: path.resolve("./src/lib/components"),
      $lib: path.resolve("./src/lib")
    }
  },
  server: { port: 3002 }
};

export default config;
