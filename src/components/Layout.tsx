import Head from "next/head";
import { ReactNode } from "react";

export function Layout(props: { children: ReactNode }) {
  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{props.children}</main>
    </div>
  );
}
