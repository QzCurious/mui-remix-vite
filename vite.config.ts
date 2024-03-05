import { vitePlugin as remix } from "@remix-run/dev";
import { cjsInterop } from "vite-plugin-cjs-interop";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  // dev: not working; prod: works
  // ssr: {
  //   noExternal: ["@mui/material"],
  // },
  plugins: [
    remix(),
    tsconfigPaths(),
    // dev: works; prod: works
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
