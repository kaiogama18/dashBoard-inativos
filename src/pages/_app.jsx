import '../styles/styles.scss';
import Head from 'next/head';

import styles from '../styles/styles.scss';

export default ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Dashboard Inativos</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>

        {/* <script type="text/javascript" src="jscript/graph.js"></script>
        <script defer src="node_modules/swup/dist/swup.js"></script>
        <script defer src="../../script.js"></script> */}

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js"></script>

        <script src="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
};
