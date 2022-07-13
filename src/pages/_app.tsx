import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRef, useState } from "react";
import { initMocks } from "../msw";

const shouldLoadMSW = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

function DelayedApp({ Component, pageProps }: AppProps) {
  const [appReady, setAppReady] = useState(!shouldLoadMSW);
  const mswLoaded = useRef(false);

  if (shouldLoadMSW && !mswLoaded.current) {
    initMocks().then(() => {
      setAppReady(true);
      mswLoaded.current = true;
    });
  }

  if (appReady) {
    return <Component {...pageProps} />;
  } else {
    return "App is not ready yet - starting Mock Service Worker";
  }
}

export default DelayedApp;
