import React from 'react';
import Head from 'next/head';

export default () => (
  <div>
    <Head>
      <title>My styled page</title>
      <link href="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css" rel="stylesheet"/>
      <script src="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js"></script>
    </Head>
    <p className="some-class-name">
      Hello world!
    </p>
  </div>
)