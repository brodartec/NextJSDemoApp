import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContainer } from "../components/layout/appContainer";
import { AppHeader } from "../components/layout/appHeader";
import { ContentContainer } from "../components/layout/contentContainer";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { useState } from "react";
import Head from "next/head";

const TEN_MINUTES_IN_MS = 10 * 1000;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        /* since API is ready only we don't have to revalidate the cache as aggressively */
        queries: {
          staleTime: TEN_MINUTES_IN_MS,
          cacheTime: TEN_MINUTES_IN_MS,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>GFM Demo App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppContainer>
        <AppHeader
          links={[
            { label: "A", path: "/PageA" },
            { label: "B", path: "/PageB" },
          ]}
        />
        <ContentContainer>
          <Component {...pageProps} />
        </ContentContainer>
      </AppContainer>
    </QueryClientProvider>
  );
}

export default MyApp;
