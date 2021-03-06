import '../styles/styles.scss';
import Head from 'next/head';

import styles from '../styles/styles.scss';

export default ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Buritech | Dashboard</title>
        <link rel="icon" href="/bavicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js"></script>

        <script src="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
};
