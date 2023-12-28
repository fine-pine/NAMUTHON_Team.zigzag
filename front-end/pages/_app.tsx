import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/header";
import { Auth0Provider } from "@auth0/auth0-react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="환경을 생각한다면, 지그재그." />
        <link rel="icon" type="image/x-icon" href="/zigzag_logo.png"></link>
        <title>지그재그</title>
      </Head>

      <Header />

      <main className="py-14">
        <Component {...pageProps} />
      </main>
    </Auth0Provider>
  );
}
