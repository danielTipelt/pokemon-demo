import "../styles/globals.css";
import type { AppProps } from "next/app";

// TODO: msw worker might be initialized after first render is done, nextjs should wait for it
if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../msw");
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
