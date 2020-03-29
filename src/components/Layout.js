import Header from "./Header";
import NavBar from "./NavBar";
import Head from 'next/head';

// mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));

const Layout = props => (
  <>
    <Head>
      <title>Dashboard Inativos</title>
      <link href="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css" rel="stylesheet"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <script src="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js"></script>
      
    </Head>
    <main>{props.children}</main>
  </>
);

export default Layout;
