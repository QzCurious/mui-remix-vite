import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  // dev: failed; build: success; remix-serve: success
  // ssr: {
  //   noExternal: ["@mui/material"],
  // },

  // dev: failed; build: success; remix-serve: success
  // ssr: {
  //   noExternal: ['@mui/*'],
  // },

  // dev: failed; build: success; remix-serve: success
  // ssr: {
  //   noExternal: ['@mui/**'],
  // },

  // dev: failed; build: success; remix-serve: failed
  // https://github.com/kiliman/remix-vite-mui/blob/aee050114dae1b01d35276a7d7641d5df45fcfba/vite.config.ts#L10
  // ssr: {
  //   noExternal: process.env.NODE_ENV === "production" ? [/^@mui\//] : [],
  // },

  plugins: [
    remix(),
    tsconfigPaths(),
    // dev: success; build: success; remix-serve: failed
    cjsInterop({
      dependencies: ["@mui/material/*"],
    }),
  ],
  server: {
    fs: {
      // Restrict files that could be served by Vite's dev server.  Accessing
      // files outside this directory list that aren't imported from an allowed
      // file will result in a 403.  Both directories and files can be provided.
      // If you're comfortable with Vite's dev server making any file within the
      // project root available, you can remove this option.  See more:
      // https://vitejs.dev/config/server-options.html#server-fs-allow
      allow: ["app"],
    },
  },
});
