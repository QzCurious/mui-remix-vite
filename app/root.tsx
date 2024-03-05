import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import createEmotionCache from "./createEmotionCache";

const cache = createEmotionCache();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={{}}>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
          </head>
          <body>
            {children}
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default function App() {
  return <Outlet />;
}
