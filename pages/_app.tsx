import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContainer } from "../components/layout/appContainer";
import { AppHeader } from "../components/layout/appHeader";
import { ContentContainer } from "../components/layout/contentContainer";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
    </>
  );
}

export default MyApp;
