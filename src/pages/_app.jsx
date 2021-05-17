import "src/styles/globals.css";
import "node_modules/pokemon-font/css/pokemon-font.css";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>POKEMON !!</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
